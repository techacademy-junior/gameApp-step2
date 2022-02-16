//プレイヤーの変数
let player;
//敵の変数
let enemys = [];

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
  //背景色
  background(0);

  //60フレーム毎に敵を出現させる
  if (frameCount % 60 == 0) {
    //敵追加(X座標・Y座標・サイズ・スピードX・スピードY)
    enemys.push(new Enemy(width/2, 0, 30, random(-3,3), random(1, 2)));
  }

  //敵の数だけ繰り返す
  for (let enemy of enemys) {
    //敵の移動
    enemy.move();
    //敵の表示
    enemy.display();
  }

  //プレイヤーの移動
  player.move();

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

//敵クラス
class Enemy {

  //コンストラクタ
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  //移動
  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    //X0〜X460に当たった時は跳ね返るように−1を掛けて反転する
    if (this.x + this.size / 2 > width) {
      this.speedX *= -1;
    }
    if (this.x - this.size / 2 < 0) {
      this.speedX *= -1;
    }
  }

  //表示
  display() {
    fill(255);
    stroke(255);
    rect(this.x, this.y, this.size, this.size);
  }
}
