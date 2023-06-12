const express = require("express");
const router = express.Router();
const database = require("../utils/database");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Lưu file vào thư mục public/images
    cb(null, "./public/images");
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
}).single("avatar");

// Thay đổi avatar của người dùng
router.post("/:id", async (req, res) => {
  // Lấy userId từ request parameter
  upload(req, res, async function (err) {
    const { id } = req.params;
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
      const query = `UPDATE instagram.users SET avatarURL = 'http://localhost:8001/images/${req.file.filename}' WHERE (userName = '${id}')`;
      await database.execute(query);
      res.json({
        status: "Success123",
        url: `http://localhost:8001/images/${req.file.filename}`,
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

module.exports = router;
