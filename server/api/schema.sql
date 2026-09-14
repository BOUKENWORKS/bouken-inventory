-- bouken-inventory KVS schema
-- さくらインターネット レンタルサーバー(スタンダードプラン)のMySQLで実行してください。
-- (コントロールパネルの「データベースの管理」→ phpMyAdmin などからそのまま流し込めます)

CREATE TABLE IF NOT EXISTS `kv_store` (
  `key`        VARCHAR(255) NOT NULL,
  `value`      LONGTEXT NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
