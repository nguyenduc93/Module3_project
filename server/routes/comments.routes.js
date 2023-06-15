const express = require("express");
const router = express.Router();
const database = require("../utils/database");

// Thêm mới commnets
router.post("/", async (req, res) => {
  const { commentUser, reaction, postId, userId } = req.body;
  try {
    await database.execute(
      `INSERT INTO instagram.comments (commentUser, reaction, postId, userId) VALUES (?, ?, ?, ?);`,
      [commentUser, reaction, postId, userId]
    );
    res.json({
      message: "Thêm mới comment thành công",
    });
  } catch (error) {
    console.log(error);
  }
});

// Lấy comments về
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await database.execute(
      `SELECT p.postId, p.image, p.content, u.userId, u.userName, u.avatarURL, c.commentUser, c.reaction FROM instagram.comments AS c JOIN users AS u ON c.userId = u.userId JOIN posts AS p ON p.postId = c.postId WHERE p.postId = ?`,
      [id]
    );
    [data] = result;
    res.json({
      message: "Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

// Thêm mới commnets hoặc cập nhật reaction
router.post("/update", async (req, res) => {
  const { commentUser, reaction, postId, userId } = req.body;
  try {
    // Kiểm tra xem đã có comment của người dùng cho bài đăng này chưa
    let [result] = await database.execute(
      `SELECT * FROM instagram.comments WHERE postId = ? AND userId = ?`,
      [postId, userId]
    );

    if (result && result.length > 0) {
      // Nếu đã tồn tại comment thì cập nhật lại reaction
      await database.execute(
        `UPDATE instagram.comments SET reaction = ? WHERE postId = ? AND userId = ?`,
        [reaction, postId, userId]
      );

      res.json({
        message: "Cập nhật reaction thành công",
      });
    } else {
      // Nếu chưa có comment thì thêm mới
      await database.execute(
        `INSERT INTO instagram.comments (commentUser, reaction, postId, userId) VALUES (?, ?, ?, ?);`,
        [commentUser, reaction, postId, userId]
      );

      res.json({
        message: "Thêm mới comment thành công",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Lấy danh sách comments
router.get("/", async (req, res) => {
  try {
    let data = await database.execute(`SELECT * FROM instagram.comments`);
    [result] = data;
    res.json({
      message: "Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
