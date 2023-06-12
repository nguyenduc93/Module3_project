const express = require("express");
const router = express.Router();
const database = require("../utils/database");

// Lấy danh sách bài post user đăng nhập đang theo dõi
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await database.execute(
      `SELECT p.userId, p.postId, p.image, p.content, u.avatarURL, u.userName, u.userId FROM posts p JOIN users u ON p.userId = u.userId WHERE p.userId IN ( SELECT followeeId FROM friends WHERE followerId = ? ) OR p.userId = ?;`,
      [id, id]
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

// Lấy đúng bài post để xem chi tiết
router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await database.execute(
      `SELECT p.postId, p.image, p.content, u.avatarURL, u.userName FROM posts p JOIN users u ON p.userId = u.userId WHERE p.postId = ?;`,
      [id]
    );
    [[data]] = result;
    res.json({
      message: "Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
