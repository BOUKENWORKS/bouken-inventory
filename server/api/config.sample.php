<?php
// config.php の雛形です。
// このファイルを "config.php" という名前でコピーし、実際の値を入れてください。
// config.php はリポジトリにコミットしないでください(.gitignore 済み)。
//
// 推奨: このディレクトリを Web公開ディレクトリ(www/ の下)の「外」に置ける場合は
//   /home/<アカウント名>/www/api/ ではなく /home/<アカウント名>/api/ のように
//   ドキュメントルートの外側に config.php を配置し、save.php 等からは
//   require '/home/<アカウント名>/api/config.php'; のように絶対パスで読み込むと、
//   万一 .htaccess の設定漏れがあっても config.php がブラウザから直接読めません。
//   ドキュメントルート外に置けない場合は、同梱の .htaccess が config.php への
//   直アクセスを拒否します。

return [
    // さくらのレンタルサーバー(スタンダードプラン)のデータベース接続情報
    // コントロールパネルの「データベースの管理」に表示されている値を使ってください。
    'db_host' => 'mysqlXXX.db.sakura.ne.jp',
    'db_name' => 'accountname_dbname',
    'db_user' => 'accountname_dbname',
    'db_pass' => 'CHANGE_ME',

    // フロントエンド(SPA)からのアクセスを許可するオリジン。
    // 同一オリジン(同じドメイン配下)で配信する場合は空配列のままでOK(CORS不要)。
    // 別ドメイン/別ポートから呼ぶ場合は本番URLを追加してください。
    'allowed_origins' => [
        // 'https://your-domain.example.com',
    ],

    // 簡易的な共有シークレット。フロントエンドのビルド時にも同じ値を設定します
    // (.env の VITE_API_KEY)。ビルド後のJSバンドルに埋め込まれるため、
    // 「知らない第三者がURLを推測して直接叩くのを防ぐ」程度の効果である点に
    // 注意してください(真の認証ではありません)。空文字にするとチェックを無効化します。
    'api_key' => 'CHANGE_ME_TO_A_RANDOM_STRING',
];
