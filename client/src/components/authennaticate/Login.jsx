import "./Authenticate.css";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../footer/footer.jsx";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { notification } from "antd";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8001/api/v1/users/login",
        {
          email,
          passwordUser: password,
        }
      );

      // console.log(response);

      if (response.data.status === 200) {
        notification.success({
          message: "Đăng nhập thành công!",
          placement: "top",
          duration: 2,
        });
        localStorage.setItem("user", JSON.stringify(response.data.data[0]));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        notification.error({
          message: "Tài khoản không tồn tại!",
          placement: "top",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Email hoặc Password sai!",
        placement: "top",
        duration: 2,
      });
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
          <div className="login">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/logoInsta.png?alt=media&token=961de6c5-5e7b-488b-aea9-d7deb552acad"
              alt=""
            />
            <input
              type="email"
              placeholder="SĐT, tên người dùng hoặc email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Đăng nhập</button> <br />
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
            <NavLink>
              <div className="login111">
                <div>
                  <FacebookIcon />
                </div>
                <div>Đăng nhập bằng facebook</div>
              </div>
            </NavLink>
            <div className="forgot">
              <NavLink className="forgot1">Quên mật khẩu?</NavLink>
            </div>
          </div>
          <div className="auth__more">
            <span>
              Bạn chưa có tài khoản ư?
              <NavLink to={"/register"}>
                <button>Đăng ký</button>{" "}
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

export default Login;
