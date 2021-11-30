//カードの場所の幅
const CARD_WIDTH = 60;
//カードの場所の高さ
const CARD_HEIGHT = 90;
//列数
const COLUMNS = 13;
//行数
const ROWS = 4;
//スートの種類
const SUIT = {
  SPADE: 0,
  HEART: 1,
  DIA: 2,
  CLUB: 3
};
//ランクの種類
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

//カードの配列
let cards = [];

//最初に一回だけ呼び出される初期設定
function setup() {
  //キャンバスを作成
  createCanvas(CARD_WIDTH * COLUMNS, CARD_HEIGHT * ROWS);

  //縦のループでスートの追加
  for (let suit = SUIT.SPADE; suit <= SUIT.CLUB; suit++) {
    //横のループでランクの追加
    for (let rank = RANK.ACE; rank <= RANK.KING; rank++) {
      //カードの生成、配列に追加
      cards.push(new Card(suit, rank))
    }
  }

  //配列のシャッフル
  shuffle(cards, true);

  //カードの数だけ繰り返す(cardに配列の要素iにインデックス番号が取り出される)
  cards.forEach((card, i) => {
    //カードの位置を設定、横13　縦4
    card.setPosition(i % COLUMNS * CARD_WIDTH, floor(i / COLUMNS) * CARD_HEIGHT);
  });

}

//繰り返し呼び出される処理
function draw() {
  //背景色
  background(220);

  //カードの表示
  for (let card of cards) {
    card.display();
  }
}

//マウスが押されたときに実行される処理
function mousePressed() {

  //選択中のカードだけを配列に「取り出す
  let selectedCards = cards.filter(card => card.isSelecting);

  //カードが二枚以上選択中だったら何もしないで呼び出しもとに戻る
  if (selectedCards.length >= 2) {
    return;
  }

  //繰り返す
  for (let card of cards) {
    //マウスオーバーしていて選択中でなければ
    if (card.isMouseOver() && !card.isSelecting) {
      //カードを選択中に設定
      card.isSelecting = true;
      //ループを抜ける
      break;
    }
  }

  //選択中のカードが増えている可能性があるので選択中のカードを更新
  selectedCards = cards.filter(card => card.isSelecting);

  //選択中のカードが二枚でなければ何もしないでリターン
  if (selectedCards.length != 2) {
    return;
  }

  //2枚のカードのランクが同じだったら
  if (selectedCards[0].rank == selectedCards[1].rank) {
    
    //カードのペアフラグを立て、選択中のフラグは解除
    for (let card of selectedCards) {
      card.isPaired = true;
      card.isSelecting = false;
    }
  } else {
    //遅延実行
    setTimeout(() => {
      //選択中のフラグを解除
      for (let card of selectedCards) {
        card.isSelecting = false;
      }
    }, 500);
  }
}

//ランク番号からランク記号に変換
function rankNumToSymbol(rank) {
  //rankが1だったらAを返す
  if (rank == RANK.ACE) {
    return 'A';
    //rankNumberが2~10だったら文字列にして返す
  } else if (RANK.TWO <= rank && rank <= RANK.TEN) {
    return rank.toString();
    //rankが11だったらJを返す
  } else if (rank == RANK.JACK) {
    return 'J';
    //rankが12だったらQを返す
  } else if (rank == RANK.QUEEN) {
    return 'Q';
    //rankが13だったらKを返す
  } else if (rank == RANK.KING) {
    return 'K';
  } else {
    throw "ランクが範囲外です1~13に設定してください";
  }
}

//スート番号から色に変換
function suitNumToColor(suit) {
  //suitが0か3だったら黒を返す
  if (suit == SUIT.CLUB || suit == SUIT.SPADE) {
    return color(0);
    //suitが1か2だったら赤を返す
  } else if (suit == SUIT.HEART || suit == SUIT.DIA) {
    return color(255, 0, 0);
  } else {
    throw "スートが範囲外です0~3に設定してください";
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
      throw "スートが範囲外です0~3に設定してください";
  }
}

//カードクラス
class Card {
  constructor(suit, rank) {
    //ランク
    this.rank = rank;
    //スート
    this.suit = suit;
    //横幅
    this.width = CARD_WIDTH;
    //高さ
    this.height = CARD_HEIGHT;
    //選択中か
    this.isSelecting = false;
    //ペアになったか
    this.isPaired = false;
    //x座標
    this.x = 0;
    //y座標
    this.y = 0;
  }

  //表示位置を設定
  setPosition(x, y) {
    this.x = x;
    this.y = y;
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
    if (this.isSelecting || this.isPaired) {

      this.front();

      //そうでなければ裏を表示
    } else {
      this.back();

    }
  }
}
