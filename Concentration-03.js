//カードの場所の幅
const CARD_WIDTH = 60;
//カードの場所の高さ
const CARD_HEIGHT = 90;

//スートの種類
const SUIT = {
  SPADE: 0,
  HEART: 1,
  DIA: 2,
  CLUB: 3
};
const RANK = {
  ACE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13
}

let card;

//最初に一回だけ呼び出される初期設定
function setup() {
  //キャンバスを作成
  createCanvas(CARD_WIDTH, CARD_HEIGHT);

  card = new Card(int(random(0, 4)), int(random(1, 14)));
}

//繰り返し呼び出される処理
function draw() {
  //背景色
  background(220);

  card.display();
}

//マウスが押されたときに実行される処理
function mousePressed() {
  if (card.isMouseOver()) {
    card.isSelecting = !card.isSelecting;
  }
}

//ランク番号からランク記号に変換
function rankNumToSymbol(rank) {
  //rankが1だったらAを返す
  if (rank === RANK.ACE) {
    return 'A';
    //rankNumberが2~10だったら文字列にして返す
  } else if (RANK.TWO <= rank && rank <= RANK.TEN) {
    return rank;
    //rankが11だったらJを返す
  } else if (rank === RANK.JACK) {
    return 'J';
    //rankが12だったらQを返す
  } else if (rank === RANK.QUEEN) {
    return 'Q';
    //rankが13だったらKを返す
  } else if (rank === RANK.KING) {
    return 'K';
  } else {
    throw new RangeError("ランクが範囲外です1~13に設定してください");
  }
}

//スート番号から色に変換
function suitNumToColor(suit) {
  //suitが0か3だったら黒を返す
  if (suit === SUIT.CLUB || suit === SUIT.SPADE) {
    return color(0);
    //suitが1か2だったら赤を返す
  } else if (suit === SUIT.HEART || suit === SUIT.DIA) {
    return color(255, 0, 0);
  } else {
    throw new RangeError("スートが範囲外です0~3に設定してください");
  }
}

//スート番号からスート図形に変換
function suitNumToSymbol(suit) {
  switch (suit) {
    //0だったら♠を返す
    case SUIT.SPADE:
      return `♠`
      //suitが1だったら♥を返す
    case SUIT.HEART:
      return '♥';
      //suitが2だったら♦を返す
    case SUIT.DIA:
      return '♦';
      //suitが3だったら♣を返す
    case SUIT.CLUB:
      return '♣';
    default:
      throw new RangeError("スートが範囲外です0~3に設定してください");
  }
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
    //選択中か
    this.isSelecting = false;
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
    text(suitNumToSymbol(suit), this.x, this.y);
  }

  //ランクを描画
  drawRank(rank) {
    //テキストアラインの設定
    textAlign(CENTER, CENTER);
    //テキストサイズの設定
    textSize(32);
    //ランクシンボルのテキストを描画
    text(rankNumToSymbol(rank), this.x + this.width / 2, this.y + this.height / 2);
  }

  //マウスオーバーしているか
  isMouseOver() {
    //マウスがカードの範囲に入っていたらtrueを返すそうでなければfalseを返す
    return (this.x < mouseX && mouseX < this.x + this.width && this.y < mouseY && mouseY < this.y + this.height)
  }

  //表
  front() {
    //色の設定
    fill(suitNumToColor(this.suit));
    //ランクを描画
    this.drawRank(this.rank);
    //スートを描画
    this.drawSuit(this.suit);
  }

  //裏
  back() {
    //塗りつぶす色の設定
    fill(128, 0, 0);
    //offsetの値だけ内側に四角を描画
    let offset = 10;
    rect(this.x + offset, this.y + offset, this.width - offset * 2, this.height - offset * 2, 5);
  }

  //表示
  display() {

    //マウスオーバーしていたらbaseColorを薄いグレイにする
    if (this.isMouseOver()) {
      //塗りつぶす色の設定
      fill(240);
      //そうでなければbaseColorを白にする
    } else {
      //塗りつぶす色の設定
      fill(255);
    }

    //四角の描画
    rect(this.x, this.y, this.width, this.height, 5);

    //選択中かペアになっていたら表そうでなければ裏を表示
    if (this.isSelecting) {

      this.front();

      //そうでなければ裏を表示
    } else {
      this.back();

    }
  }
}
