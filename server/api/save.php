<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

kv_bootstrap();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    kv_fail(405, 'POST のみ対応しています。');
}

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '', true);
if (!is_array($body)) {
    kv_fail(400, 'JSONボディが不正です。');
}

$key = $body['key'] ?? null;
$value = $body['value'] ?? null;

if (!kv_valid_key($key)) {
    kv_fail(400, 'key が不正です。');
}
if (!is_string($value)) {
    kv_fail(400, 'value は文字列(JSON文字列)である必要があります。');
}

$pdo = kv_db();
// 値は丸ごと上書き(部分更新はしない)。
$stmt = $pdo->prepare(
    'INSERT INTO kv_store (`key`, `value`) VALUES (:key, :value)
     ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP'
);
$stmt->execute(['key' => $key, 'value' => $value]);

kv_json_response(['key' => $key, 'value' => $value, 'shared' => true]);
