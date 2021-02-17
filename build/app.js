

//html内で定義した、任意のcanvas要素のIDを取得
var canvas = document.getElementById("myCanvas");

// canvas要素が持つgetContext()メソッドを実行し、
// グラフィック描画のためのメソッドやプロパティを持つオブジェクトを取得する。
// 引数を"2d"とすることで2Dグラフィックの描画に特化した
// メソッドやプロパティを持つオブジェクトを取得し、定数ctxに格納する。
var ctx = canvas.getContext("2d");

// ボール関連の変数
var x = canvas.width / 2;       // 位置(X方向)
var y = canvas.height - 30;     // 位置(Y方向)
var dx = 2;                     // 単位時間あたりの移動量(X方向)
var dy = -2;                    // 単位時間あたりの移動量(Y方向)
var ballRadius = 10;            // 半径

// パドル関連の変数
var paddleX = 10;               // 位置
var paddleWidth = 100;          // 幅
var paddleHeight = 5;           // 高さ

// ブロック関連の変数
var brickRowCount = 3;          // 行数
var brickColumnCount = 5;       // 列数
var brickWidth = 75;            // 幅
var brickHeight = 20;           // 高さ
var brickPadding = 10;          // パドル間の距離
var brickOffsetTop = 30;        // 始点(Y軸方向)
var brickOffsetLeft = 30;       // 始点(X軸方向)

// スコアを記録する変数
var score = 0;

// ブロックそれぞれの情報を格納する為の配列を定義
var bricks = [];
for(var column = 0; column < brickColumnCount; column++)
{
    bricks[column] = [];
    for(var row = 0; row < brickRowCount; row++)
    {
        bricks[column][row] = { x: 0, y: 0, status: 1};
    }
}


// draw関数の処理をintervalCycleTime[ms]の間隔で繰り返す
var intervalCycleTime = 10;                             //setIntervalの間隔[ms]
var interval = setInterval(draw, intervalCycleTime);

// 画面描写の関数
function draw()
{
    // キーを押下した際、定義したキーであれば、所定の処理を行う
    addEventListener("keydown", keydownfunc);

    // Canvas全体の描画をリセット
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvasにボールを描画
    drawBall();

    // Canvasにパドルを描画
    drawPaddle();

    // Canvasにブロックを描画する処理
    drawbricks();

    // ボールが何かと衝突した際の処理
    collisionDetection();

    // スコアは最新の状態に保つ
    drawScore();
}



// ボールとブロックの衝突をチェックする処理　"column >> c"　"row >> r" と表現する
function collisionDetection()
{
    // ボールとブロックの衝突した際の処理
    // "column >> c"　"row >> r" と表現する
    for(c = 0; c < brickColumnCount; c++)
    {
        for(r = 0; r < brickRowCount; r++)
        {
            // ブロックの上辺もしくは下辺に衝突した場合　>>　ボールの進行方向を反転(Y方向)
            if(x > bricks[c][r].x && x < (bricks[c][r].x + brickWidth) && y > bricks[c][r].y && y <  (bricks[c][r].y + brickHeight) && bricks[c][r].status == 1)
            {
                dy = -dy;
                bricks[c][r].status = 0
                score++;
            }
        }
    }

    // ボールとcanvasの端もしくはパドルの衝突した際の処理
    // ボールがcanvasの上辺、左辺、右辺もしくはパドルにぶつかった場合、進行方向を変える
    if(y + dy < ballRadius)
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
            // ↓↓ ＊デバッグ中のみ使用　最後は削除する
            // dy = -dy;

            // ↓↓　＊正式な処理
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
    }
    x += dx;
    y += dy;

}

// スコア表示を作成し更新するための関数
function drawScore()
{
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20); //キャンバス上に配置される文章設定
}

// ブロックを描画する関数
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

// パドルを描画する関数
function drawPaddle()
{
    drawSquare(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, "#0095DD");
}

// 丸を描画する関数
function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// 四角を描画する関数
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
