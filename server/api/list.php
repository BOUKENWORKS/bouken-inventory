<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

kv_bootstrap();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    kv_fail(405, 'GET のみ対応しています。');
}

$prefix = $_GET['prefix'] ?? '';
if (!is_string($prefix) || mb_strlen($prefix) > 255 || !preg_match('/^[A-Za-z0-9:_\-]*$/', $prefix)) {
    kv_fail(400, 'prefix が不正です。');
}

$pdo = kv_db();
// LIKE のワイルドカード(% と _)をエスケープしてから前方一致検索する。
$escaped = str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $prefix);
$stmt = $pdo->prepare(
    "SELECT `key` FROM kv_store WHERE `key` LIKE CONCAT(:prefix, '%') ESCAPE '\\\\' ORDER BY `key`"
);
$stmt->execute(['prefix' => $escaped]);
$keys = array_map(fn($row) => $row['key'], $stmt->fetchAll());

kv_json_response(['keys' => $keys, 'prefix' => $prefix, 'shared' => true]);
