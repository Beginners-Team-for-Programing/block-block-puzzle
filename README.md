# block-block-puzzle
ブロック崩しゲーム

■GitHub
https://github.com/Beginners-Team-for-Programing/block-block-puzzle/pull/1
■ブロック崩し参考動画
https://www.youtube.com/watch?v=g2FlXCSy0yI
■ブロック崩し参考サイト
https://developer.mozilla.org/ja/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

■canvasについての記事
http://www.htmq.com/canvas/002.shtml

■Canvasリファレンス

　rect(x, y, w, h)　>>　四角形を作成する

　arc(x, y, radius, startAngle, endAngle [, anticlockwise ] )　>>　円を作成する

　clearRect(x, y, w, h)　>>　四角形の形にクリアする

■JavaScriptリファレンス

　setInterval（func, time)　>>　"func"を指定した間隔(time)で繰り返す

■残件
[基本]
　済　（2021/3/3）

[+α]
・動きをなめらかにする　requestAnimationFrame()　を使用
・ボールのサイズを大・中・小と切り替える　画面で設定
・モード追加　ボール衝突のたびに背景色が変わる　画面で設定
・パドルの速度を可変にする　画面で設定
・モード追加　パドル衝突のたびにボール速度上昇　画面で設定
・スコアの表示方法変更　画面の中央にでっかく　(ツムツムみたいな感じ)
・パドルの操作方法変更　画面で設定
・マウス操作時、パドルの移動量でボールの反射角度変更
・変数は別のファイルから呼び出す形にしたい >> おそらく"require"を使用する
・ブロックの右辺もしくは左辺にぶつかった場合、X方向に跳ね返る　>>　お手本では実装されていない
・GameOverになった後の　選択肢　Continue? or close? など
・勝利メッセージが出た際、最後のブロックを描画しないようにする

■実装済み
・パドルをマウスで動かす
・ライフを追加
・ライフを表示
・全ブロックが消えると、勝利メッセージを表示
・ブロックが消えるたびに上がるスコアを表示