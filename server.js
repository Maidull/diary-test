import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import db from "./db.js";

const app = express();
const PORT = 3001;

// Cấu hình upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Cấu hình view và static
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Trang chủ: hiển thị danh sách bài viết
app.get("/", (req, res) => {
  db.query("SELECT * FROM diary ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("❌ Lỗi truy vấn DB:", err);
      return res.status(500).send("Lỗi truy vấn DB");
    }
    res.render("index", { diary: results });
  });
});

// Thêm bài viết (có ảnh)
app.post("/add", upload.single("image"), (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? "/uploads/" + req.file.filename : null;

  if (!title || !content) return res.status(400).send("Thiếu tiêu đề hoặc nội dung");

  db.query(
    "INSERT INTO diary (title, content, image) VALUES (?, ?, ?)",
    [title, content, image],
    (err) => {
      if (err) {
        console.error("❌ Lỗi thêm bài:", err);
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
      console.error("❌ Lỗi xóa bài:", err);
      return res.status(500).send("Lỗi khi xóa bài viết");
    }
    res.redirect("/");
  });
});

// Sửa bài viết (có thể có ảnh mới)
app.post("/edit/:id", upload.single("image"), (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  // Nếu có ảnh mới thì cập nhật, nếu không giữ nguyên ảnh cũ
  if (req.file) {
    const image = "/uploads/" + req.file.filename;
    db.query(
      "UPDATE diary SET title = ?, content = ?, image = ? WHERE id = ?",
      [title, content, image, id],
      (err) => {
        if (err) {
          console.error("❌ Lỗi cập nhật bài:", err);
          return res.status(500).send("Lỗi cập nhật bài viết");
        }
        res.redirect("/");
      }
    );
  } else {
    db.query(
      "UPDATE diary SET title = ?, content = ? WHERE id = ?",
      [title, content, id],
      (err) => {
        if (err) {
          console.error("❌ Lỗi cập nhật bài:", err);
          return res.status(500).send("Lỗi cập nhật bài viết");
        }
        res.redirect("/");
      }
    );
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});