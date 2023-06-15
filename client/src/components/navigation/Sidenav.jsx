import React from "react";
import "./Sidenav.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Menu from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Drawer, Space } from "antd";
import { useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const Sidenav = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // modal ô tìm kiếm
  const [open1, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
    setPlacement("left");
  };
  const onClose = () => {
    setOpen(false);
  };

  // Hàm tìm kiếm trong danh sách users
  const [search, setSearch] = useState("");
  const [results, setResults] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/v1/users/search?name=${search}`
      );
      setResults(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm đăng xuất về trang login
  const handleButton = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Lấy thông tin cá nhân đăng đăng nhập ở trên local
  let user = JSON.parse(localStorage.getItem("user"));

  // modal Tạo để đăng bài viết
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState(null);

  const handleFileSelect = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setModalOpen(true);
    }
  };

  const users = JSON.parse(localStorage.getItem("user"));

  // Hàm đăng bài viết của user đang đăng nhập
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", selectedFile);
      formData.append("userId", users.userId);
      const response = await axios.post("http://localhost:8001/post", formData);
      setModalOpen(false);
      setSelectedFile(null);
      console.log(response);
    } catch (error) {
      alert("Lỗi post");
    }
  };

  return (
    <div className="sidenav">
      <Link to={"/login"}>
        <img
          className="sidenav_logo"
          src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/logoInsta.png?alt=media&token=961de6c5-5e7b-488b-aea9-d7deb552acad"
          alt="logo"
        />
      </Link>
      <div className="sidenav_buttons">
        <NavLink className="sidenav_button" to={"/"}>
          <HomeOutlinedIcon />
          <span>Trang chủ</span>
        </NavLink>
        <div className="containerr">
          <Space className="container">
            <Button onClick={showDrawer} className="btn_search">
              <SearchIcon className="span1 span2" />
              <span className="span1">tìm kiếm</span>
            </Button>
          </Space>
          <Drawer
            className="nav123"
            key={placement}
            placement={placement}
            closable={false}
            onClose={onClose}
            open={open1}
          >
            <div className="search_nav">
              <input
                className="input_nav"
                placeholder="Tìm Kiếm"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />{" "}
              <button className="span_icon" onClick={handleSubmit}>
                <SearchIcon className="span1" />
              </button>
            </div>{" "}
            <hr />
            <h5>Gần đây</h5>
            {results &&
              results.map((result) => {
                return (
                  <div className="search_avatar">
                    <NavLink
                      to={
                        result.userId === user.userId
                          ? `/detail/${user.userId}`
                          : `/detail/friends/${result.userId}`
                      }
                    >
                      <Avatar
                        src={result.avatarURL}
                        className="avatarrr"
                        size={70}
                      >
                        ĐN
                      </Avatar>
                    </NavLink>
                    <div className="search_avatar1">
                      <b>{result.userName}</b>
                      <p>{result.fullName}</p>
                    </div>
                  </div>
                );
              })}
          </Drawer>
        </div>

        <button className="sidenav_button">
          <ExploreOutlinedIcon />
          <span>Khám phá</span>
        </button>
        <button className="sidenav_button">
          <SlideshowIcon />
          <span>Reels</span>
        </button>
        <button className="sidenav_button">
          <MailOutlineIcon />
          <span>Tin nhắn</span>
        </button>
        <button className="sidenav_button">
          <FavoriteBorderIcon />
          <span>Thông báo</span>
        </button>

        {/* Modal để tạo bài viết */}
        <div className="modal___post">
          <button
            onClick={() => setModalOpen(true)}
            className="sidenav_button button_post"
          >
            <AddCircleOutlineIcon />
            <span>Tạo</span>
          </button>
          <Modal
            title="Tạo bài viết mới"
            centered
            open={modalOpen}
            onOk={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
            className="modal__button"
            // width={800}
            footer={[]}
          >
            {" "}
            <hr />
            {selectedFile ? (
              <div className="post__img">
                {" "}
                <div className="post__img1">
                  {selectedFile && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected file preview"
                      style={{
                        width: "100%",
                        height: "400px",
                      }}
                    />
                  )}
                </div>
                <div className="post__img2">
                  <div className="infomation">
                    <div className="avatarr">
                      {" "}
                      <Avatar
                        src={user.avatarURL}
                        className="avatarrr"
                        size={50}
                      >
                        ĐN
                      </Avatar>
                    </div>
                    <div className="info-right">
                      <div className="name-user">{user.userName}</div>
                      <button className="heading-share" onClick={handlePost}>
                        Chia sẻ
                      </button>
                    </div>
                  </div>
                  <div className="right-content">
                    <textarea
                      id="text-content"
                      placeholder="Viết chú thích..."
                      cols="30"
                      rows="7"
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>{" "}
                    <hr />
                  </div>
                  <div className="post__map">
                    <div>Thêm vị trí</div>
                    <div>
                      <PlaceOutlinedIcon />
                    </div>
                  </div>{" "}
                  <hr />
                  <div className="post__map">
                    <div>Cài đặt nâng cao</div>
                    <div>
                      <ArrowDownwardOutlinedIcon />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="modal_post">
                <div>
                  {" "}
                  <PhotoCameraOutlinedIcon style={{ fontSize: 40 }} />{" "}
                  <p>Kéo ảnh và video vào đây</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                  name="image"
                />
                <label htmlFor="fileInput" className="label">
                  {selectedFile ? "Chọn ảnh khác" : "Chọn từ máy tính"}
                </label>
                <br />
              </div>
            )}
          </Modal>
        </div>

        <NavLink
          className="sidenav_button sidenav_button1"
          to={`/detail/${user.userName}`}
        >
          {/* <PermIdentitySharpIcon /> */}
          <Avatar
            src={user && user.avatarURL}
            className="avatarrr"
            size={40}
            style={{ marginLeft: -1.5 }}
          >
            ĐN
          </Avatar>
          <span>Trang cá nhân</span>
        </NavLink>
      </div>
      <div className="sidenav_more">
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
        >
          <span className="sidenav_button">
            <MenuIcon /> &nbsp; Xem thêm
          </span>
        </Button>
        <div className="menuu">
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {" "}
            <div className="btn_bot">
              <MenuItem
                onClick={handleClose}
                disableRipple
                className="menuDrop"
              >
                <SettingsOutlinedIcon />
                Cài đặt
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableRipple
                className="menuDrop"
              >
                <AccessTimeSharpIcon />
                Hoạt động của bạn
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableRipple
                className="menuDrop"
              >
                <BookmarkBorderIcon />
                Đã lưu
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableRipple
                className="menuDrop"
              >
                <LightModeOutlinedIcon />
                Chuyển chế độ
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                disableRipple
                className="menuDrop"
              >
                <ErrorOutlineOutlinedIcon />
                Báo cáo sự cố
              </MenuItem>
              <hr />
              <div className="menuDrop1">
                <MenuItem
                  onClick={handleClose}
                  disableRipple
                  className="menuDrop "
                >
                  Chuyển tài khoản
                </MenuItem>{" "}
                <hr />
                {/* <MenuItem className="menuDrop "> </MenuItem> */}
                <button onClick={handleButton} className="menuDrop2 ">
                  Đăng xuất
                </button>
              </div>
            </div>
          </StyledMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
