const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const validateDataUser = require("../middleware/checkIs");
// const util = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// database.execute = util.promisify(database.execute);

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM instagram.users");
    let [users] = data;
    res.json({
      status: "success",
      users,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Đăng Ký
router.post("/register", validateDataUser, async (req, res) => {
  const { email, userName, fullName, passwordUser, avatarURL } = req.body;

  try {
    // Kiểm tra email đã có chưa
    let data = await database.execute(
      `SELECT * FROM instagram.users WHERE email = ?`,
      [email]
    );
    let [existingUser] = data;

    if (existingUser.length > 0) {
      return res.status(409).send("Email already registered");
    }

    // Mã hóa password
    bcrypt.hash(passwordUser, 5, async (err, hash) => {
      if (err) {
        console.log("Hashing failed", err);
        return res.status(500).json({
          status: 500,
          message: "Hashing failed",
        });
      }

      try {
        let insertData = await database.execute(
          `INSERT INTO instagram.users (email, userName, fullName, passwordUser, avatarURL ) VALUES (?, ?, ?, ?, ?)`,
          [email, userName, fullName, hash, avatarURL]
        );

        res.json({
          status: "Success",
        });
      } catch (error) {
        console.log("Insert failed", error);
        return res.status(500).json({
          status: 500,
          message: "Insert failed",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.log("Select failed", error);
    return res.status(500).json({
      status: 500,
      message: "Select failed",
      error: error.message,
    });
  }
});

// Đăng Nhập
router.post("/login", async (req, res) => {
  const { email, passwordUser } = req.body;
  // Lấy thông tin tài khoản từ cơ sở dữ liệu
  let insertData = await database.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );
  if (insertData[0].length === 0) {
    res.json({
      status: 201,
      message: "User không tồn tại",
    });
  } else {
    const user = insertData[0];
    // console.log(user[0]);
    // console.log(user[0].passwordUser);
    // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
    bcrypt.compare(passwordUser, user[0].passwordUser, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: err,
        });
      } else {
        if (!isMatch) {
          res.status(401).json({
            status: 401,
            message: "Email hoặc mật khẩu không đúng",
          });
        } else {
          // Tạo token JWT
          const token = jwt.sign({ id: user.UserId }, "your_secret_key", {
            expiresIn: "24h",
          });

          res.status(200).json({
            status: 200,
            message: "Đăng nhập thành công!",
            data: user,
            token,
          });
        }
      }
    });
  }
});

// Middleware xác thực token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({ error: "No token provided" });
  } else {
    jwt.verify(token, "your_secret_key", (err, decoded) => {
      if (err) {
        res.status(403).json({ error: "Failed to authenticate token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}

// API bảo vệ bằng token
router.get("/protected", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Protected API endpoint" });
});

router.get("/search", async (req, res) => {
  const { name } = req.query;
  try {
    let data = await database.execute(
      `SELECT * FROM instagram.users WHERE userName LIKE "%${name}%"`
    );
    let [users] = data;
    res.json({
      status: "Success",
      users,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
