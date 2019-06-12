var CellSelected_x;
var CellSelected_y;
var Movimientos;
var puntuacion;

var secs;
var mins;
var cronometer;

var board = new Array(7);


function StartTime(){
    secs =60;
    mins =0;
    s = document.getElementById("seconds");
    m = document.getElementById("minutes");

    cronometer = setInterval(
        function(){
            if(secs==60){
                secs=59;
                mins--;
                if (mins<10) m.innerHTML ="0"+mins;
                else m.innerHTML = mins;

                if(mins==60) mins=0;
            }
            if (secs<10) s.innerHTML ="0"+secs;
            else s.innerHTML = secs;

            secs--;
        }
        ,1000);
}

function PaintCell(x, y){
    cell = document.getElementById("c"+CellSelected_x+CellSelected_y);
    cell.style.background = "none repeat scroll 0% 0% orange";
    
}


function SelectCell(x, y){

    Movimientos--;
    cont_moves = document.getElementById("moves").innerHTML = Movimientos;
    
    PaintCell(x, y);

    cell = document.getElementById("c"+x+y);
    cell.style.background = "none repeat scroll 0% 0% green";
    cell = document.getElementById("c"+x+y).innerHTML = 
        "<img id='" + x + y + "' src='1.png'></img>"
    
    board[x][y]=1;
    CellSelected_x=x;
    CellSelected_y=y;

}

function CheckCell(x, y){
    dif_x = x - CellSelected_x;
    dif_y = y - CellSelected_y;
    CheckTrue = false;

    if (dif_x == 1 && dif_y == 2)   CheckTrue = true; // right - top long
    if (dif_x == 1 && dif_y == -2)  CheckTrue = true; // right - bottom long
    if (dif_x == 2 && dif_y == 1)   CheckTrue = true; // right long - top
    if (dif_x == 2 && dif_y == -1)  CheckTrue = true; // rightlong - bottom
    if (dif_x == -1 && dif_y == 2)  CheckTrue = true; // left - top long
    if (dif_x == -1 && dif_y == -2) CheckTrue = true; // left - bottom long
    if (dif_x == -2 && dif_y == 1)  CheckTrue = true; // left long - top
    if (dif_x == -2 && dif_y == -1) CheckTrue = true; // left long - bottom


    if (board[x][y]==1) CheckTrue=false;

    if (CheckTrue) SelectCell(x, y);
}