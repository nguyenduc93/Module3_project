// Kiểm tra các giá trị bỏ trống
const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// middleware validate dữ liệu
const validateData = (req, res, next) => {
  const { email, userName, fullName, passwordUser, avatarURL } = req.body;
  if (checkIsEmpty(email)) {
    return res.status(400).json({
      status: 400,
      message: "Email không được để trống!",
    });
  }
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      message: "Email không hợp lệ!",
    });
  }
  if (checkIsEmpty(userName)) {
    return res.status(400).json({
      status: 400,
      message: "Tên người dùng không được để trống!",
    });
  }
  // const usernameRegex = !/^[\p{L}\s']+$/u;
  // if (!usernameRegex.test(userName)) {
  //   return res.status(400).json({
  //     status: 400,
  //     message: "Tên người dùng chỉ được chứa chữ cái, khoảng trắng và có dấu!",
  //   });
  // }
  if (checkIsEmpty(passwordUser)) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu không được để trống!",
    });
  }
  if (passwordUser.length < 3) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu phải trên 3 ký tự",
    });
  }
  if (checkIsEmpty(fullName)) {
    return res.status(400).json({
      status: 400,
      message: "Họ và tên không được để trống!",
    });
  }
  // const fullNameRegex = /^[A-Za-z\s']+$/;
  // if (!fullNameRegex.test(fullName)) {
  //   return res.status(400).json({
  //     status: 400,
  //     message: "Họ và tên chỉ được chứa chữ cái và khoảng trắng!",
  //   });
  // }

  next();
};

// middleware validate dữ liệu
// const validateData1 = (req, res, next) => {
//   const { email, userName, fullName, passwordUser, avatarURL } = req.body;
//   if (Content.length < 10) {
//     return res.status(400).json({
//       message: "Nội dung không được dưới 10 ký tự",
//     });
//   }
//   if (checkIsEmpty(CreatedDate)) {
//     return res.status(400).json({
//       message: "Ngày thêm không được phép để trống 1",
//     });
//   }
//   if (checkIsEmpty(Status)) {
//     return res.status(400).json({
//       message: "Trạng thái không được phép để trống 1",
//     });
//   }
//   if (checkIsEmpty(CreatedBy)) {
//     return res.status(400).json({
//       message: "Người thêm không được phép để trống 1",
//     });
//   }
//   next();
// };

module.exports = validateData;
