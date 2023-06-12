import React, { useState } from "react";
import "./Authenticate.css";
import Login from "./Login";
import Signup from "./Signup";
import { NavLink } from "react-bootstrap";
import Footer from "../footer/footer.jsx";

function Authenticate() {
  const [active, setActive] = useState("login");

  const handleChange = () => {
    setActive(active === "login" ? "signup" : "login");
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
          {active === "login" ? <Login /> : <Signup />}

          <div className="auth__more">
            <span>
              {active === "login" ? (
                <>
                  Bạn chưa có tài khoản ư?{" "}
                  <button onClick={handleChange}>Đăng ký</button>
                </>
              ) : (
                <>
                  Bạn có tài khoản?{" "}
                  <button onClick={handleChange}>Đăng nhập</button>
                </>
              )}
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

export default Authenticate;
