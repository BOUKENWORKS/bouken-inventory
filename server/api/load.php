<?php
declare(strict_types=1);
require __DIR__ . '/_common.php';

kv_bootstrap();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    kv_fail(405, 'GET のみ対応しています。');
}

$key = $_GET['key'] ?? null;
if (!kv_valid_key($key)) {
    kv_fail(400, 'key が不正です。');
}

$pdo = kv_db();
$stmt = $pdo->prepare('SELECT `value` FROM kv_store WHERE `key` = :key LIMIT 1');
$stmt->execute(['key' => $key]);
$row = $stmt->fetch();

if ($row === false) {
    // フロントエンドは "null" を「キーが存在しない」として扱う。
    header('Content-Type: application/json; charset=utf-8');
    echo 'null';
    exit;
}

kv_json_response(['key' => $key, 'value' => $row['value'], 'shared' => true]);
