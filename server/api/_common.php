<?php
// 各エンドポイント共通の初期化処理(CORS、認証、DB接続、JSON入出力)。

declare(strict_types=1);

// 直列キューを通した呼び出し1件がタイムアウトで詰まらないよう、
// フロントエンド側の20秒タイムアウトより十分短い実行時間で必ず終わらせる。
ini_set('max_execution_time', '15');
set_time_limit(15);

function kv_config(): array {
    static $config = null;
    if ($config === null) {
        $path = __DIR__ . '/config.php';
        if (!is_file($path)) {
            kv_fail(500, 'config.php が見つかりません。config.sample.php を config.php にコピーして値を設定してください。');
        }
        $config = require $path;
    }
    return $config;
}

function kv_fail(int $status, string $message): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

function kv_send_cors_headers(): void {
    $config = kv_config();
    $allowed = $config['allowed_origins'] ?? [];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (empty($allowed)) {
        // 同一オリジン運用が前提。allowed_origins が空なら CORS ヘッダは付けない
        // (同一オリジンなら不要で、余計な * 許可による事故を避ける)。
    } elseif ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
    header('Access-Control-Max-Age: 600');
}

function kv_handle_preflight(): void {
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function kv_require_api_key(): void {
    $config = kv_config();
    $expected = $config['api_key'] ?? '';
    if ($expected === '') return; // 空文字ならチェック無効(段階的導入用)

    $provided = $_SERVER['HTTP_X_API_KEY'] ?? '';
    if (!hash_equals($expected, $provided)) {
        kv_fail(401, 'API key が不正です。');
    }
}

function kv_db(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $config = kv_config();
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=utf8mb4',
            $config['db_host'],
            $config['db_name']
        );
        try {
            $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 10,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            kv_fail(500, 'データベースに接続できませんでした。');
        }
    }
    return $pdo;
}

// 保存キーの妥当性チェック。想定は "zk-inv:masters" のような
// 英数字・コロン・ハイフン・アンダースコアのみの短い文字列。
function kv_valid_key(?string $key): bool {
    if ($key === null || $key === '') return false;
    if (mb_strlen($key) > 255) return false;
    return (bool) preg_match('/^[A-Za-z0-9:_\-]+$/', $key);
}

function kv_json_response(array $data): never {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function kv_bootstrap(): void {
    kv_send_cors_headers();
    kv_handle_preflight();
    kv_require_api_key();
}
