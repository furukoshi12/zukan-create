■ 画面遷移図
https://www.figma.com/file/BFcNSvPwZTvkSdirEw6Ptb/%E5%9B%B3%E9%91%91%E3%82%AF%E3%83%AA%E3%82%A8%E3%82%A4%E3%83%88?type=design&node-id=0%3A1&mode=design&t=v262gEWiYkg2AI9j-1


■ サービス名
図鑑くりえいと

■ サービス概要
動物園や街中で出会った生き物を記録していくことでオリジナルの図鑑が作成できるサービスです。
図鑑のテンプレートやユーザーが入力フォームを追加しテンプレートをアレンジする機能を付け、完成した図鑑を共有し合うことができます。

■ サービスコンセプト
私は生き物が好きで様々な生き物を探したり、動物園に行くのが好きです。
しかし動物園などに行ってただ生き物を見るだけではだいたいの生き物は記憶に残らないので、実際に図鑑作成をすることで手を動かし生き物について深く考察できるようにしたいと思いこのサービスを考案しました。
また採取などで見つけた生き物を記録したり周辺の野良猫たちを区別するなど、図鑑を登録していくことで生き物との出会いを楽しめるようなサービスにしたいと思っています。

■　想定されるユーザー層
生き物好きの方
夏休みの自由研究で困っている小学生

■ サービスの利用イメージ
図鑑を作成していく中でその生き物を深く観察し疑問を持って調べてそれを更に図鑑にアウトプット
してもらう。他のユーザーの図鑑を見て生き物の情報を得ることができる。

■ ユーザーの獲得について
x(旧twitter)やtimesなどSNSで発信
知り合いへ直接宣伝

■ サービスの差別化ポイント・推しポイント
競合サービス：https://kaihawk.jp/my_dictionary.html
差別化ポイント：テンプレートから更に追加で画像やテキストボックスを追加できるようにする。
オリジナル度が増し、図鑑をデザインする楽しさがある。
また単純な情報から自分の考察など分けて入力できる。

■ 実装を予定している機能
 ### MVP
 * 会員登録
 * ログイン
 * マイページ
 * 自作図鑑一覧
 * お気に入り一覧
 * 投稿された図鑑一覧
 * 図鑑作成
 * テンプレート選択して更にテキストボックスや画像などを追加可能にする
 * 図鑑詳細
 * 図鑑お気に入り
   
 ### 本リリース
 * 投稿済み図鑑編集
 * 画像加工
 * 画像内の人物にモザイク処理
 * 動物園などの解説文は自動でテキストにして貼り付け
 * タグ付け
 * マルチ検索
 * 見つけた場所をマップ上に表示する（地図の公開、非公開選択）
 * ある生き物の図鑑作成をするとその生き物のアイコンを使用可能にする
   * 使用可能アイコン一覧

■ 機能の実装方針予定
RailsAPIモード
React
interact.js
Cloud Vision API（画像から日本語抽出）
Google Maps API
Google Cloud Vision API
