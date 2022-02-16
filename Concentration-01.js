//カードの場所の幅
const CARD_WIDTH = 60;
//カードの場所の高さ
const CARD_HEIGHT = 90;

// カードの変数
let card;

//最初に一回だけ呼び出される初期設定
function setup() {
  //キャンバスを作成
  createCanvas(CARD_WIDTH, CARD_HEIGHT);
  //カードの生成
  card = new Card(int(random(0,4)), int(random(1,13)));
                      
}

//繰り返し呼び出される処理
function draw() {
  //背景色
  background(120);
  
    card.display();
}


//カードクラス
class Card {
  constructor(suit, rank) {
    //スート
    this.suit = suit;
    //ランク
    this.rank = rank;
    //横幅
    this.width = CARD_WIDTH;
    //高さ
    this.height = CARD_HEIGHT;
    //x座標
    this.x = 0;
    //y座標
    this.y = 0;
  }

  //スートを描画
  drawSuit(suit) {
    //テキストアラインの設定
    textAlign(LEFT, TOP);
    //テキストサイズの設定
    textSize(16);
    //スートシンボルのテキストを描画
    text(suit, this.x, this.y);
  }

  //ランクを描画
  drawRank(rank) {
    //テキストアラインの設定
    textAlign(CENTER, CENTER);
    //テキストサイズの設定
    textSize(32);
    //ランクシンボルのテキストを描画
    text(rank, this.x + this.width / 2, this.y + this.height / 2);
  }


  //表示
  display() {
    fill(255);
    //四角の描画
    rect(this.x, this.y, this.width, this.height, 5);
    //色の設定
    fill(0);
    //ランクを描画
    this.drawRank(this.rank);
    //スートを描画
    this.drawSuit(this.suit);

  }
}
