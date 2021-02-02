
// requireについて
// https://www.sejuku.net/blog/66950
// require('css/app.css');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleX = 10;
var paddleWidth = 100;      
var paddleHeight = 5;

var interval = setInterval(draw, 10);

// 指定間隔で画面描写の関数を呼び出す
setInterval(draw, 10);

// 画面描写の関数
function draw()
{
    addEventListener("keydown", keydownfunc);

    ctx.clearRect(0, 0, canvas.width, canvas.height);   // Canvas全体の描画をクリア
    drawBall();     // Canvasにボールを描画
    drawPaddle();   // Canvasにパドルを描画

    if(y + dy < ballRadius)    //y方向でcanvasの端にぶつかると、進行方向を変える
    {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        alert("GAME OVER");
        document.location.reload();
        clearIntervel(interval);
    }
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius)     // x方向でcanvasの端にぶつかると、進行方向を変える
    {
        dx = -dx;
    }

    x += dx;
    y += dy;

}

// ボールを描画するメソッド
function drawBall() 
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// パドルを描画するメソッド
function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// キー押下時のイベント
function keydownfunc( event )
{
    var key_code = event.keyCode;

    if (key_code == 37)
    {
        if (paddleX > 0) paddleX -=20;
    }
    if (key_code == 39)
    {
        if (paddleX < canvas.width - paddleWidth) paddleX +=20;
    } 
}










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
