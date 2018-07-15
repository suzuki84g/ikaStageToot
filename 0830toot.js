//stage情報をJSONで取得してtootするやつ。
//crontabから8時半に実行されます。

//日付取得関連
const date_utils = require('date-utils');  //日付モジュール
const dt = new Date();  //今日の日付を取得
const formatted = dt.toFormat("YYYY年MM月DD日");  //フォーマットを整えて変数に登録

//mastodon投稿用情報
//password情報はrequireを使って外出しに直す
const mastodon = require('mastodon') //toot用
const mstdn = require('mastodon') //mastodon関数を呼び出し
const access_token = require('./tootPass.js')  //pass取得
let acount = new mstdn({ 
    access_token: access_token.token,    //module.exportsで定義
    timeout_ms: 60 * 1000,
    api_url: 'https://ika.queloud.net/api/v1/',
});

//全ルール情報を取得
const request = require('request'); //html通信用
const URL = 'https://spla2.yuu26.com/schedule';

//配列使って綺麗にしたい
request(URL, function (err, res, body){
  const reg19_map_A = JSON.parse(body).result.regular[6].maps[0]
  const reg19_map_B = JSON.parse(body).result.regular[6].maps[1]
  const reg21_map_A = JSON.parse(body).result.regular[7].maps[0]
  const reg21_map_B = JSON.parse(body).result.regular[7].maps[1]
  const reg23_map_A = JSON.parse(body).result.regular[8].maps[0]
  const reg23_map_B = JSON.parse(body).result.regular[8].maps[1]
    
  const gac19_rule = JSON.parse(body).result.gachi[6].rule
  const gac19_map_A = JSON.parse(body).result.gachi[6].maps[0]
  const gac19_map_B = JSON.parse(body).result.gachi[6].maps[1]
  const gac21_rule = JSON.parse(body).result.gachi[7].rule
  const gac21_map_A = JSON.parse(body).result.gachi[7].maps[0]
  const gac21_map_B = JSON.parse(body).result.gachi[7].maps[1]
  const gac23_rule = JSON.parse(body).result.gachi[8].rule
  const gac23_map_A = JSON.parse(body).result.gachi[8].maps[0]
  const gac23_map_B = JSON.parse(body).result.gachi[8].maps[1]

  const lea19_rule = JSON.parse(body).result.league[6].rule
  const lea19_map_A = JSON.parse(body).result.league[6].maps[0]
  const lea19_map_B = JSON.parse(body).result.league[6].maps[1]
  const lea21_rule = JSON.parse(body).result.league[7].rule
  const lea21_map_A = JSON.parse(body).result.league[7].maps[0]
  const lea21_map_B = JSON.parse(body).result.league[7].maps[1]
  const lea23_rule = JSON.parse(body).result.league[8].rule
  const lea23_map_A = JSON.parse(body).result.league[8].maps[0]
  const lea23_map_B = JSON.parse(body).result.league[8].maps[1]
  
  console.log('error:', err);
  console.log('statusCode:', res && res.statusCode);

  const regular_toot = ("【"+formatted+"】\n"+"今晩のナワバリバトルはイカの通りです\n"+" 19:00〜\n"+"　"+reg19_map_A+"\n　"+reg19_map_B+"\n 21:00〜\n"+"　"+reg21_map_A+"\n　"+reg21_map_B+"\n 23:00〜\n"+"　"+reg23_map_A+"\n　"+reg23_map_B);
  const gachi_toot = ("【"+formatted+"】\n"+"今晩のガチマッチはイカの通りです\n"+" 19:00〜"+"["+gac19_rule+"]"+"\n"+"　"+gac19_map_A+"\n　"+gac19_map_B+"\n 21:00〜"+"["+gac21_rule+"]"+"\n"+"　"+gac21_map_A+"\n　"+gac21_map_B+"\n 23:00〜"+"["+gac23_rule+"]"+"\n"+"　"+gac23_map_A+"\n　"+gac23_map_B);
  const league_toot = ("【"+formatted+"】\n"+"今晩のリーグマッチはイカの通りです\n"+" 19:00〜"+"["+lea19_rule+"]"+"\n"+"　"+lea19_map_A+"\n　"+lea19_map_B+"\n 21:00〜"+"["+lea21_rule+"]"+"\n"+"　"+lea21_map_A+"\n　"+lea21_map_B+"\n 23:00〜"+"["+lea23_rule+"]"+"\n"+"　"+lea23_map_A+"\n　"+lea23_map_B);

//console.log(regular_toot)

  acount.post('statuses', {status: regular_toot}, function (err, data, res) {
  })
  acount.post('statuses', {status: gachi_toot}, function (err, data, res) {
  })
  acount.post('statuses', {status: league_toot}, function (err, data, res) {
  })

});