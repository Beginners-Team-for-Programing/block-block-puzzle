
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

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

// それぞれのブロックの位置を保存する配列を生成
var bricks = [];
for(var column = 0; column < brickColumnCount; column++)
{
    bricks[column] = [];

    for(var row = 0; row < brickRowCount; row++)
    {
        bricks[column][row] = { x: 0, y: 0, status: 1};
    }
}

var interval = setInterval(draw, 10);

// 画面描写の関数
function draw()
{
    addEventListener("keydown", keydownfunc);

    ctx.clearRect(0, 0, canvas.width, canvas.height);   // Canvas全体の描画をクリア
    drawBall();     // Canvasにボールを描画
    drawSquare(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, "#0095DD");   // Canvasにパドルを描画

    drawbricks();    // Canvasにブロックを描画する処理

    // ボールとブロックの衝突をチェックする処理
    for(column = 0; column < brickColumnCount; column++)
    {
        for(row = 0; row < brickRowCount; row++)
        {
            // ブロックの上辺もしくは下辺に衝突した場合　>>　ボールの進行方向を反転(Y方向)
            if(x > bricks[column][row].x && x < bricks[column][row].x + brickWidth && y > bricks[column][row].y && y <  bricks[column][row].y + brickHeight)
            {
                    dy = -dy;
                    bricks[column][row].status = 0
            }
        }

    }

    if(y + dy < ballRadius)    //y方向でcanvasの端にぶつかると、進行方向を変える
    {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius)
    {
        if (x > paddleX && x < paddleX + paddleWidth)
        {
            dy = -dy;
        }
        else
        {
            // デバッグ中のみ使用　最後は修正する
            dy = -dy;
            // alert("GAME OVER");
            // document.location.reload();
            // clearInterval(interval);
        }
        
    }

    // x方向でcanvasの端にぶつかると、進行方向を変える
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
    }

    x += dx;
    y += dy;

}

function drawbricks()
{
    for(column = 0; column < brickColumnCount; column++)
    {
        for(row = 0; row < brickRowCount; row++)
        {
            if( bricks[column][row].status == 1)
            {
                // ブロックの位置情報を更新
                var brickX = brickOffsetLeft + column * (brickWidth + brickPadding);
                var brickY = brickOffsetTop + row * (brickHeight + brickPadding);
                bricks[column][row].x = brickX;
                bricks[column][row].y = brickY;

                // Canvasにブロックを描画
                drawSquare(brickX, brickY, brickWidth, brickHeight, "#0095DD");
            }
        }
    }

}


// 丸を描画するメソッド
function drawBall() 
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// 四角を描画するメソッド
function drawSquare(a_x, a_y, a_width, a_height, a_color)
{
    ctx.beginPath();
    ctx.rect(a_x, a_y, a_width, a_height);
    // ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = a_color;
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
