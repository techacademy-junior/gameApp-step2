//プレイヤーの変数
let player;

//初期設定
function setup() {
  //キャンバスの大きさ
  createCanvas(460, 680);
  //rectの描画モード
  rectMode(CENTER);
  //プレイヤー(X座標・Y座標・横幅・スピード)
  player = new Player(width / 2, height - 50, 25, 10);
}

//繰り返し呼び出される描画処理
function draw() {
  //プレイヤーの移動
  player.move();
  
    //背景色
  background(0);

  //プレイヤーの表示
  player.display();
}

//プレイヤークラス
class Player {

  //コンストラクタ
  constructor(x, y, size, speedX) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
  }

  //移動
  move() {
    if (this.x > mouseX) {
      this.x -= this.speedX;
    }
    if (this.x < mouseX) {
      this.x += this.speedX;
    }
    if (this.x + this.size / 2 > width) {
      this.x = width - (this.size / 2);
    }
    if (this.x - this.size / 2 < 0) {
      this.x = this.size / 2;
    }
  }

  //表示
  display() {
    fill(0, 255, 255);
    stroke(0, 255, 255);
    rect(this.x, this.y, this.size, this.size);
  }
}
