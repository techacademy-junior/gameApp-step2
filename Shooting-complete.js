//プレイヤーの変数
let player;
//敵の変数
let enemys = [];
//プレイヤーの弾の変数
let playerBalls = [];

//初期設定
function setup() {
  //キャンバスの大きさ
  createCanvas(400, 640);
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
    //敵追加(X座標・横幅・xスピード(乱数)・Yスピード(乱数))
    enemys.push(new Enemy(random(30, width - 30), 0, 30, random(3), random(1, 2)));
  }

  //敵の数だけ繰り返す
  for (let enemy of enemys) {
    //敵の移動
    enemy.move();
    //敵の表示
    enemy.display();

    //敵とプレイヤーとの当たり判定
    if (isCollided(enemy, player)) {
      textSize(32);
      textAlign(CENTER, CENTER);
      stroke(255, 0, 0);
      fill(255, 0, 0);
      text("GameOver", width / 2, height / 2);
      noLoop();
    }

    //弾の数だけ繰り返す
    for (let playerBall of playerBalls) {
      //弾と敵が当たっていたら
      if (isCollided(playerBall, enemy)) {
        // 敵を無効フラグを立てる
        enemy.isValid = false;
        // 弾を無効フラグを立てる
        playerBall.isValid = false;
        break;
      }
    }
  }
  //敵の配列を有効な物だけ残す
  enemys = enemys.filter(enemy => enemy.isValid);
  //弾の配列を有効な物だけ残す
  playerBalls = playerBalls.filter(playerBall => playerBall.isValid);

  //弾の数だけ繰り返す
  for (let playerBall of playerBalls) {
    //プレイヤーの弾の移動
    playerBall.move();
    //プレイヤーの弾の表示
    playerBall.display();
  }

  //プレイヤーの移動
  player.move();

  //プレイヤーの表示
  player.display();
}

//マウスを押してる時のイベント
function mousePressed() {
  //プレイヤーの弾を追加(x座標,y座標,y方向の速度)
  playerBalls.push(new Ball(player.x, player.y, -10))
}

//四角形同士の当たり判定の関数
function isCollided(rect1, rect2) {
  return (abs(rect1.x - rect2.x) < (rect1.size + rect2.size) / 2) && abs(rect1.y - rect2.y) < (rect1.size + rect2.size) / 2;
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
    //微調整（右端）
    if (this.x + this.size / 2 > width) {
      this.x = width - (this.size / 2);
    }
    //微調整（左端）
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
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.isValid = true;
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
    if (height < this.y - this.size / 2) {
      this.isValid = false;
    }
  }

  //表示
  display() {
    fill(255);
    stroke(255);
    rect(this.x, this.y, this.size, this.size);
  }
}

//弾クラス
class Ball {

  //コンストラクタ
  constructor(x, y, speedY) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.speedY = speedY;
    this.isValid = true;
  }

  //移動
  move() {
    this.y += this.speedY;

    //表示画面より上に移動したら
    if (this.y < 0 - this.size / 2) {
      //無効フラグを立てる
      this.isValid = false;
    }
  }

  //表示
  display() {
    fill(0, 0, 255);
    stroke(0, 0, 255);
    rect(this.x, this.y, this.size, this.size);
  }
}
