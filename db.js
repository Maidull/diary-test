import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./diary.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS diary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

export default db;
