# 保存API (さくらインターネット レンタルサーバー / スタンダードプラン向け)

`src/App.jsx` の `rawGet`/`rawSet`/`rawList` が呼び出す、PHP + MySQL によるシンプルなKVS(キー・バリューストア)APIです。
Node.js の常駐プロセスは使わず、さくらの共有ホスティング(スタンダードプラン)でそのまま動く構成にしています。

## エンドポイント

| ファイル | メソッド | 用途 |
|---|---|---|
| `api/save.php` | POST | `{key, value}` を丸ごと上書き保存(INSERT ... ON DUPLICATE KEY UPDATE) |
| `api/load.php` | GET `?key=` | 該当キーの値を1件取得。無ければ JSON の `null` を返す |
| `api/list.php` | GET `?prefix=` | 前方一致するキー一覧を返す |

いずれもレスポンスはフロントエンドの `window.storage.get/set/list` が返していた形と揃えてあります。

```json
{ "key": "zk-inv:masters", "value": "...JSON文字列...", "shared": true }
```

## セットアップ手順

1. **データベースを作成**
   さくらのコントロールパネル「データベースの管理」からMySQLデータベースを1つ作成し、
   接続情報(ホスト名・DB名・ユーザー名・パスワード)を控える。

2. **テーブルを作成**
   phpMyAdmin などから `api/schema.sql` を実行する。

3. **設定ファイルを配置**
   `api/config.sample.php` を `api/config.php` としてコピーし、DB接続情報・
   `allowed_origins`・`api_key` を埋める(`config.php` は `.gitignore` 済みでリポジトリには含めない)。

   可能であれば `config.php` はドキュメントルート(`www/` 以下)の**外**に置き、
   `_common.php` の `require` を絶対パスに変更するとより安全です
   (例: `/home/アカウント名/config/api-config.php` に置いて
   `require '/home/アカウント名/config/api-config.php';` のように読み込む)。
   ドキュメントルート外に置けない場合でも、同梱の `.htaccess` が
   `config.php` への直アクセスを拒否します。

4. **ファイルをアップロード**
   `server/api/` 一式を、公開したいURL配下(例: `www/api/`)にアップロードする。
   さくらのスタンダードプランはPHPが標準で動作するため、追加設定は不要。

5. **動作確認**

   ```bash
   curl -X POST https://<あなたのドメイン>/api/save.php \
     -H "Content-Type: application/json" \
     -H "X-API-Key: <config.phpに設定したapi_key>" \
     -d '{"key":"zk-inv:test","value":"{\"ok\":true}"}'

   curl "https://<あなたのドメイン>/api/load.php?key=zk-inv:test" \
     -H "X-API-Key: <api_key>"

   curl "https://<あなたのドメイン>/api/list.php?prefix=zk-inv:" \
     -H "X-API-Key: <api_key>"
   ```

6. **フロントエンド側の設定**
   リポジトリルートの `.env.example` を参考に `.env.production.local` を作成し、
   `VITE_API_BASE_URL` にAPIのURL(例: `https://<あなたのドメイン>/api`)、
   `VITE_API_KEY` に手順3と同じ値を設定してからビルドする。

   ```bash
   npm run build
   ```

   生成された `dist/` の中身を、さくらの公開ディレクトリ(`www/` 直下など)にアップロードする。

## 認証について(重要な注意点)

`api_key` はURLを知らない第三者による直接アクセスを防ぐための簡易的な仕組みです。
静的サイトとしてビルドする以上、`VITE_API_KEY` はJSバンドルに埋め込まれ、ブラウザの開発者ツールから
閲覧可能な状態になります。**真の認証・アクセス制御ではありません。**

アプリ自体のログイン(Googleログイン、`googleClientId`/`allowedDomain` 設定)とは別レイヤーの話である点に注意してください。
より強いアクセス制御が必要な場合は、以下のような追加策を検討してください。

- さくらの「WAF」「アクセス制限」機能でIPアドレス制限をかける
- `api/` を Basic認証(`.htpasswd`)で保護する(その場合フロントエンドの `fetch` に認証情報を含める必要あり)
- 将来的にサーバーサイドでGoogleログインのIDトークンを検証してから読み書きさせる

## タイムアウト・直列化について

フロントエンド側は保存処理を単一の直列キュー(`queuedOp`)で処理し、1リクエストあたり20秒でタイムアウトさせる
実装になっています。サーバー側でも `_common.php` で `max_execution_time` を15秒に制限し、
フロントエンドのタイムアウトより先にサーバー側の処理が終わるようにしています
(PDO接続タイムアウトも10秒に設定)。

## データ移行

これまで `window.storage`(Claude.ai Artifact)や `localStorage` に保存されていたデータがある場合は、
ブラウザの開発者ツールなどで値を取り出し、上記の `save.php` に対して同じキー・値でPOSTすることで
移行できます。
