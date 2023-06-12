import React, { useState } from "react";
import "./Signup.css";
import "./Authenticate.css";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../footer/footer.jsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";
import { notification } from "antd";

function Signup() {
  const [email, setEmail] = useState([]);
  const [userName, setUserName] = useState([]);
  const [fullName, setFullName] = useState([]);
  const [password, setPassword] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (!email || email.length === 0) {
        notification.error({
          message: "Email không được để trống!",
        });
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        notification.error({
          message: "Email không đúng định dạng!",
        });
        return;
      }
      if (!userName || userName.length === 0) {
        notification.error({
          message: "Tên người dùng không được để trống!",
        });
        return;
      }
      if (!/^[\p{L}\s']+$/u.test(userName)) {
        notification.error({
          message:
            "Tên người dùng chỉ được chứa chữ cái, khoảng trắng và có dấu!",
        });
        return;
      }

      if (!fullName || fullName.length === 0) {
        notification.error({
          message: "Họ và tên không được để trống!",
        });
        return;
      }
      if (!/^[\p{L}\s']+$/u.test(fullName)) {
        notification.error({
          message: "Họ và tên chỉ được chứa chữ cái, khoảng trắng và có dấu!",
        });
        return;
      }
      if (!password || password.length === 0) {
        notification.error({
          message: "Mật khẩu không được để trống!",
        });
        return;
      }
      if (password.length < 3) {
        notification.error({
          message: "Mật khẩu phải trên 3 ký tự!",
        });
        return;
      }
      const response = await axios.post(
        "http://localhost:8001/api/v1/users/register",
        {
          email,
          userName,
          fullName,
          passwordUser: password,
          avatarURL: "",
        }
      );
      if (response.status === 200) {
        notification.success({
          message: "Đăng ký thành công!",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error.response.status === 409) {
        notification.error({
          message: "Email đã được đăng ký!",
        });
      }
    }
  };

  return (
    <div>
      <div className="authenticate">
        <div className="auth__left">
          <img
            src="https://i.imgur.com/P3Vm1Kq.png"
            alt="Instagram Screenshots"
          />
        </div>
        <div className="auth__right">
          <div className="signup">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/logoInsta.png?alt=media&token=961de6c5-5e7b-488b-aea9-d7deb552acad"
              alt=""
            />
            <div className="text">Đăng ký để xem ảnh và video từ bạn bè.</div>
            <button className="login1">
              <FacebookIcon />
              <span>Đăng nhập bằng facebook</span>
            </button>
            <div className="text-divider">
              <p>
                <i
                  className="fa fa-star"
                  aria-hidden="true"
                  style={{ color: "gray" }}
                />{" "}
                Hoặc
              </p>
            </div>
            <input
              type="email"
              placeholder="Số di động hoăc email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="email"
              placeholder="Tên đầy đủ"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Tên người dùng"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Đăng ký</button>
            <div className="yes">
              Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền
              riêng tư và Chính sách cookie của chúng tôi.
            </div>
          </div>

          <div className="auth__more">
            <span>
              Bạn có tài khoản?{" "}
              <NavLink to={"/login"}>
                <button>Đăng nhập</button>
              </NavLink>
            </span>
          </div>
          <div className="load_img">
            <div className="load">Tải ứng dụng.</div>
            <div className="image">
              <NavLink>
                <img
                  src="https://mobiwork.vn/wp-content/uploads/2022/01/Google-play-logo-dms.png"
                  alt="Instagram Screenshots"
                />
              </NavLink>
              <NavLink>
                {" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHFGK5PdyluPf8A3ds70-Hm1DmZBsb7qhjFw&usqp=CAU"
                  alt="Instagram Screenshots"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
