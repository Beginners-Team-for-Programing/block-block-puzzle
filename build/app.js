
// requireについて
// https://www.sejuku.net/blog/66950
// require('css/app.css');


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // Canvas全体の描画をクリア
    drawBall();                                         // Canvasに球を描画

    if(y + dy > canvas.height || y + dy < 0)    //y方向でcanvasの端にぶつかると、進行方向を変える
    {
        dy = -dy;
    }
    if(x + dx > canvas.width || x + dx < 0)     // x方向でcanvasの端にぶつかると、進行方向を変える
    {
        dx = -dx;
    }


    x += dx;
    y += dy;

}

setInterval(draw, 10);













// Canvas上に図形を描写

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "raba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
