const express = require("express");
const router = express.Router();
const database = require("../utils/database");

// Lấy thông tin của trang cá nhân người mình follow
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let result = await database.execute(
      `SELECT p.postId, p.image, p.content, u.userName, u.avatarURL, u.fullName FROM posts p JOIN users u ON p.userId = u.userId WHERE p.userId = ?`,
      [id]
    );
    [data] = result;
    [[data1]] = result;
    res.json({
      message: "Successfully",
      data,
      data1,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
