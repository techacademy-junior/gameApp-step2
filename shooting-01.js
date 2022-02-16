let x; //X座標
let y; //Y座標
let size = 25; //幅・高さ
let speedX = 10; //スピード

//初期設定
function setup() {
  //キャンバスの大きさ
  createCanvas(460, 680);
  //rectの描画モード
  rectMode(CENTER);
  x = width / 2; //X座標
  y = height - 50; //Y座標
}

//繰り返し呼び出される描画処理
function draw() {
  
  //プレイヤー左に移動
  if (x > mouseX) {
    x -= speedX;
  }
  //プレイヤー右に移動
  if (x < mouseX) {
    x += speedX;
  }
  //プレイヤー画面右にはみ出さないようにする
  if (x + size / 2 > width) {
    x = width - (size / 2);
  }
  //プレイヤー画面左にはみ出さないようにする
  if (x - size / 2 < 0) {
    x = size / 2;
  }
  
  //背景色
  background(0);
  
  //塗りの指定
  fill(0, 255, 255);
  //枠線の色
  stroke(0,255,255);
  //四角の描画
  rect(x, y, size, size);

}
