import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
const PORT = 3000;

// Cấu hình view engine và thư mục tĩnh
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Trang chủ: hiển thị danh sách bài viết
app.get("/", (req, res) => {
  db.query("SELECT * FROM diary ORDER BY id DESC", (err, rows) => {
    if (err) {
      console.error("Lỗi truy vấn DB:", err);
      return res.status(500).send("Lỗi truy vấn DB");
    }
    res.render("index", { diary: rows });
  });
});

// Thêm bài viết
app.post("/add", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Thiếu tiêu đề hoặc nội dung");
  }

  db.query(
    "INSERT INTO diary (title, content) VALUES (?, ?)",
    [title, content],
    (err) => {
      if (err) {
        console.error("Lỗi thêm bài:", err);
        return res.status(500).send("Lỗi khi thêm bài viết");
      }
      res.redirect("/");
    }
  );
});

// Xóa bài viết
app.post("/delete/:id", (req, res) => {
  db.query("DELETE FROM diary WHERE id = ?", [req.params.id], (err) => {
    if (err) {
      console.error("Lỗi xóa bài:", err);
      return res.status(500).send("Lỗi khi xóa bài viết");
    }
    res.redirect("/");
  });
});

// Sửa bài viết
app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;

  db.query(
    "UPDATE diary SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err) => {
      if (err) {
        console.error("Lỗi cập nhật bài:", err);
        return res.status(500).send("Lỗi cập nhật bài viết");
      }
      res.redirect("/");
    }
  );
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
