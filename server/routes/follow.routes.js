const express = require("express");
const router = express.Router();
const database = require("../utils/database");

// Lấy danh sách của bảng friends
router.get("/", async (req, res) => {
  try {
    let data = await database.execute(`SELECT * FROM instagram.friends`);
    [result] = data;
    res.json({
      message: "Successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
});

// Thêm id của người đăng nhập và người mình theo dõi
router.post("/", async (req, res) => {
  const { followerId, followeeId } = req.body;
  const statusFl = 0;
  try {
    await database.execute(
      `INSERT INTO instagram.friends (followerId, followeeId, statusFl) VALUES (?, ?, ?)`,
      [followerId, followeeId, statusFl]
    );
    res.json({
      message: "Follow successfully",
      statusFl,
    });
  } catch (error) {
    console.log(error);
  }
});

// Lấy danh sách người đang theo dõi mình và người mình theo dõi
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Lấy danh sách những người đang theo dõi mình
    let followeed = await database.execute(
      `SELECT u.userName, u.avatarURL, u.fullName, u.userId FROM instagram.friends AS f JOIN instagram.users AS u ON f.followerId = u.userId WHERE f.followeeId = ?`,
      [id]
    );
    // Lấy danh sách những người mình theo dõi
    let followerd = await database.execute(
      `SELECT u.userName, u.avatarURL, u.fullName, u.userId FROM instagram.friends AS f JOIN instagram.users AS u ON f.followeeId = u.userId WHERE f.followerId = ?`,
      [id]
    );
    let [followee] = followeed;
    let [follower] = followerd;
    res.json({
      message: "Successfully",
      followee,
      follower,
    });
  } catch (error) {
    console.log(error);
  }
});

// Xóa follow
router.post("/unfollow", async (req, res) => {
  const { followerId, followeeId } = req.body;
  try {
    let data = await database.execute(
      `DELETE FROM instagram.friends WHERE followerId = ? && followeeId = ? `,
      [followerId, followeeId]
    );
    res.json({
      message: "Unfollow thành công!",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
