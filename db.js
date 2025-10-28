import mysql from "mysql2";

const db = mysql.createConnection({
  host: "mai-db.cvq02qggo42p.ap-northeast-1.rds.amazonaws.com",  
  user: "admin",            
  password: "12345678", 
  database: "mai-db",         
});

db.connect((err) => {
  if (err) {
    console.error("❌ Lỗi kết nối RDS:", err);
  } else {
    console.log("✅ Đã kết nối thành công tới RDS MySQL (mai-db)");
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS diary (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    db.query(createTableQuery, (err) => {
      if (err) console.error("❌ Lỗi tạo bảng diary:", err);
      else console.log("✅ Bảng diary đã sẵn sàng!");
    });
  }
});

export default db;
