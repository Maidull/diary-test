import mysql from "mysql2";

const db = mysql.createConnection({
  host: "mai-db.cvq02qggo42p.ap-northeast-1.rds.amazonaws.com", 
  user: "admin",
  password: "12345678",
  database: "mai",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Kết nối RDS thất bại:", err.message);
  } else {
    console.log("✅ Đã kết nối thành công tới RDS MySQL");
  }
});

export default db;
