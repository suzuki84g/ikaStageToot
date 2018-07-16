const request = require('request'); //html通信用

module.exports = class IkaStage {
  constructor (schedules) {
    // 変数の初期化
    // schedules は外部から受け取る
    // より固く組むなら schedules の validation を書くべきだけどコードが小さいので省略
    this.schedules = schedules
    this.init ()
  }

  // ステージ情報初期化
  init () {
    this.stageInfo = {
      regular: [],
      gachi: [],
      league: []
    }
  }

  // 外部からはこの関数をコール
  execute () {
    const URL = 'https://spla2.yuu26.com/schedule';
    request (URL, (err, res, body) => {
      this.parse (body)
      let statuses = this.statuses ()
      console.log (statuses)
      this.toot (statuses)
    })
  }

  // spla2.yuu26.com から受け取ったステージ情報を出力用に変形
  parse (body) {
    this.init()
    this.schedules.forEach ((schedule) => {
      this.stageInfo.regular.push ({
        time: schedule.fromTime,
        mapA: JSON.parse (body).result.regular[schedule.index].maps[0],
        mapB: JSON.parse (body).result.regular[schedule.index].maps[1]
      })
      this.stageInfo.gachi.push ({
        time: schedule.fromTime,
        rule: JSON.parse (body).result.gachi[schedule.index].rule,
        mapA: JSON.parse (body).result.gachi[schedule.index].maps[0],
        mapB: JSON.parse (body).result.gachi[schedule.index].maps[1]
      })
      this.stageInfo.league.push ({
        time: schedule.fromTime,
        rule: JSON.parse (body).result.league[schedule.index].rule,
        mapA: JSON.parse (body).result.league[schedule.index].maps[0],
        mapB: JSON.parse (body).result.league[schedule.index].maps[1]
      })
    })
  }

  // ナワバリ・ガチ・リーグの status を作成
  statuses () {
    //日付取得関連
    const date_utils = require ('date-utils');        //日付モジュール
    const dt = new Date ();                            //今日の日付を取得
    const formatted = dt.toFormat ("YYYY年MM月DD日");  //フォーマットを整えて変数に登録

    let regular_toot  = '【' + formatted + '】\n' + '今晩のナワバリバトルはイカの通りです\n'
    let gachi_toot    = '【' + formatted + '】\n' + '今晩のガチマッチはイカの通りです\n'
    let league_toot   = '【' + formatted + '】\n' + '今晩のリーグマッチはイカの通りです\n'

    this.stageInfo.regular.forEach ((schedule) => {
      regular_toot += ' ' + schedule.time + '〜\n　' + schedule.mapA + '\n　' + schedule.mapB + '\n'
    })
    this.stageInfo.gachi.forEach ((schedule) => {
      gachi_toot += ' ' + schedule.time + '〜[' + schedule.rule + ']\n　' + schedule.mapA + '\n　' + schedule.mapB + '\n'
    })
    this.stageInfo.league.forEach ((schedule) => {
      league_toot += ' ' + schedule.time + '〜[' + schedule.rule + ']\n　' + schedule.mapA + '\n　' + schedule.mapB + '\n'
    })

    return [
      regular_toot,
      gachi_toot,
      league_toot
    ]
  }

  // status を toot
  toot (statuses) {
    //mastodon投稿用情報
    //password情報はrequireを使って外出しに直す
    const mastodon = require ('mastodon')            //toot用
    const mstdn = require ('mastodon')               //mastodon関数を呼び出し
    const access_token = require ('./tootPass.js')   //pass取得
    let acount = new mstdn ({
        access_token: access_token.token,           //module.exportsで定義
        timeout_ms: 60 * 1000,
        api_url: 'https://ika.queloud.net/api/v1/',
    });

    statuses.forEach ((status) => {
      acount.post('statuses', {status: status}, function (err, data, res) {
      })
    })
  }
}
