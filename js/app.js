//punto 1. cambia el color del titulo y alterna 
function colorBlink(selector) {
    $(selector).animate({
            opacity: '1',
        }, {
            step: function () {
                $(this).css('color', 'white');
            },
            queue: true
        })
        .animate({
            opacity: '1'
        }, {
            step: function () {
                $(this).css('color', 'yellow');
            },
            queue: true
        }, 600)
        .delay(1000)
        .animate({
            opacity: '1'
        }, {
            step: function () {
                $(this).css('color', 'white');
            },
            queue: true
        })
        .animate({
            opacity: '1'
        }, {
            step: function () {
                $(this).css('color', 'yellow');
                colorBlink('h1.main-titulo');
            },
            queue: true
        });
}

//punto 2. funcion para generar números aleatorios
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// obtiene filas de dulces o columas
function giveCandyArrays(arrayType, index) {

    var candyCol1 = $('.col-1').children();
    var candyCol2 = $('.col-2').children();
    var candyCol3 = $('.col-3').children();
    var candyCol4 = $('.col-4').children();
    var candyCol5 = $('.col-5').children();
    var candyCol6 = $('.col-6').children();
    var candyCol7 = $('.col-7').children();

    var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
        candyCol5, candyCol6, candyCol7
    ]);

    if (typeof index === 'number') {
        var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
            candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
            candyCol7.eq(index)
        ]);
    } else {
        index = '';
    }

    if (arrayType === 'columns') {
        return candyColumns;
    } else if (arrayType === 'rows' && index !== '') {
        return candyRow;
    }
}

// arreglos de filas
function candyRows(index) {
    var candyRow = giveCandyArrays('rows', index);
    return candyRow;
}

// arreglos de colunmnas
function candyColumns(index) {
    var candyColumn = giveCandyArrays('columns');
    return candyColumn[index];
}

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

function autoplay(){
    
    message = document.getElementById("message");
    message.style.display = "none";

    for (i=0; i<7; i++) board[i]= new Array(7);

    ClearBoard();
    ResetTime();
    StartTime();
    Movimientos=15;
    
    
    x=Math.round(Math.random()*6);
    y=Math.round(Math.random()*6);
    
    CellSelected_x=x;
    CellSelected_y=y;

    SelectCell(x, y);
}

function ClearBoard(){
    for (i=0; i<7; i++){
        for (j=0; j<7; j++){
            board[i][j]=0;

            cell = document.getElementById("c"+i+j);
            cell.style.background = "";  
            cell = document.getElementById("c"+i+j).innerHTML = "";
        }
    }

}
