import React from "react";
import { NavLink } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-3">
        <div>
          <NavLink className="footer1">Meta</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Giới thiệu</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Blogs</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Việc làm</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Trợ giúp</NavLink>
        </div>
        <div>
          <NavLink className="footer1">API</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Quyền riêng tư</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Điều khoản</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Tài khoản liên quan nhất</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Vị trí</NavLink>
        </div>
        <div>
          <NavLink className="footer1">Instagram lite</NavLink>
        </div>
        {/* <div>
          <NavLink className="footer1">
            Tải thông tin người liên hệ lên & người không phải người dùng
          </NavLink>
        </div>
        <div>
          <NavLink className="footer1">Meta đã xác minh</NavLink>
        </div> */}
      </div>
      <div className="footer2">
        <div>
          <NavLink className="footer1">Tiếng Việt &nbsp; &nbsp;</NavLink>
        </div>
        <div>
          <NavLink className="footer1">© 2023 Instagram from Meta</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
