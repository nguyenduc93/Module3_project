const express = require("express");
const router = express.Router();
const database = require("../utils/database");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Lưu file vào thư mục public/images
    cb(null, "./public/posts");
  },
  filename: function (req, file, cb) {
    // Lấy phần tử sau dấu chấm của tên file
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// Giới hạn kích thước file upload là 10MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("image");

// Upload bài viết
router.post("/", async (req, res) => {
  upload(req, res, async function (err) {
    const { content, userId } = req.body;
    const image = `http://localhost:8001/posts/${req.file.filename}`;
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "Failed to upload",
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: "Failed to upload",
        error: err.message,
      });
    }
    try {
      // Thực hiện câu lệnh SQL để lưu URL của ảnh vào CSDL
      let insertData = await database.execute(
        `INSERT INTO instagram.posts (content, image, userId) VALUES (?, ?, ?)`,
        [content, image, userId]
      );
      res.json({
        status: "Success123",
        insertData,
      });
    } catch (error) {
      console.log("Insert failed", error);
      return res.status(500).json({
        status: 500,
        message: "Failed",
        error: error.message,
      });
    }
  });
});

//lấy những bài đăng trang cá nhân của người đang đăng nhập
router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let data = await database.execute(
      `SELECT * FROM instagram.posts WHERE userId = ${id}`
    );
    let [posts] = data;
    res.json({
      status: "success get",
      posts,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
