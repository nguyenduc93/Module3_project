import React, { useEffect, useState } from "react";
import "./DetailUser.css";
import Sidenav from "../navigation/Sidenav.jsx";
import Footer from "../footer/footer.jsx";
import { Avatar } from "antd";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "antd";

const DetailFr = () => {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFolloweesModalOpen, setIsFolloweesModalOpen] = useState(false);
  const showModal = () => {
    setIsFollowersModalOpen(true);
  };
  const showModal1 = () => {
    setIsFolloweesModalOpen(true);
  };
  const { id } = useParams();
  const [friends, setfriends] = useState("");
  const [friends1, setfriends1] = useState("");
  const [followee, setFollowee] = useState("");
  const [follower, setFollower] = useState("");
  useEffect(() => {
    // Lấy bài đăng và thông tin cá nhân của người mình đang follow
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/friends/${id}`);
        const data = response.data.data;
        const data1 = response.data.data1;
        setfriends(data);
        setfriends1(data1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  // Hàm lấy những người mình theo dõi và những người theo dõi mình
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/follow/${id}`);
        if (response.data) {
          setFollowee(response.data.followee);
          setFollower(response.data.follower);
        } else {
          console.log("No countFollow data found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);
  return (
    <div>
      <div className="box-profile">
        <div className="nav">
          <Sidenav />
        </div>
        <div className="box-profile-content">
          <div className="profile-info-content">
            <div className="user-profile">
              <label htmlFor="avatar-input" className="avatar-label">
                <Avatar
                  src={friends1.avatarURL}
                  className="avatarrr"
                  size={150}
                >
                  ĐN
                </Avatar>
              </label>
              <input type="file" name="avatar" id="avatar-input" hidden />
              <div className="info">
                <div className="info-user user-info">
                  <button className="edit-profile1">{friends1.userName}</button>
                  <div className="btn_edit">
                    <button className="edit-profile">Đang theo dõi</button>
                  </div>
                  <div className="btn_edit">
                    <button
                      className="edit-profile edit_profile"
                      style={{ color: "black" }}
                    >
                      Nhắn tin
                    </button>
                  </div>
                  <button className="setting">
                    {" "}
                    <PersonAddOutlinedIcon />
                  </button>
                  <button className="setting">
                    {" "}
                    <MoreHorizIcon />
                  </button>
                </div>
                <div className="info-user">
                  <button className="btn_flow">
                    <span className="qty">{friends.length}</span> bài viết
                  </button>
                  <Button className="btn_flow" onClick={showModal1}>
                    <span className="qty qty1">{followee.length}</span> người
                    theo dõi
                  </Button>

                  {/* Modal hiển thị người mình theo dõi */}
                  <Modal
                    title="Người theo dõi"
                    open={isFolloweesModalOpen}
                    onOk={() => setIsFolloweesModalOpen(false)}
                    onCancel={() => setIsFolloweesModalOpen(false)}
                    footer={[]}
                    width={500}
                  >
                    {" "}
                    <hr />{" "}
                    <div className="render_follow">
                      <p className="everybody">Mọi người</p>
                      <p>Hashtag</p>
                    </div>{" "}
                    {followee &&
                      followee.map((follow) => {
                        return (
                          <div className="content_follow" key={follow.userId}>
                            <Avatar
                              src={follow.avatarURL}
                              className="avatarrr"
                              size={70}
                            >
                              ĐN
                            </Avatar>
                            <div className="usersName">
                              <p>{follow.userName}</p>
                              <p>{follow.fullName}</p>
                            </div>
                            <button className="edit-profile">
                              Đang theo dõi
                            </button>
                          </div>
                        );
                      })}
                  </Modal>

                  {/* Modal hiển thị người đang theo dõi */}
                  <Button className="btn_flow" onClick={showModal}>
                    Đang theo dõi{" "}
                    <span className="qty qty1">{follower.length}</span> người
                    dùng
                  </Button>
                  <Modal
                    title="Đang theo dõi"
                    open={isFollowersModalOpen}
                    onOk={() => setIsFollowersModalOpen(false)}
                    onCancel={() => setIsFollowersModalOpen(false)}
                    footer={[]}
                    width={500}
                  >
                    {" "}
                    <hr />{" "}
                    <div className="render_follow">
                      <p className="everybody">Mọi người</p>
                      <p>Hashtag</p>
                    </div>{" "}
                    {follower &&
                      follower.map((follow) => {
                        return (
                          <div className="content_follow" key={follow.userId}>
                            <Avatar
                              src={follow.avatarURL}
                              className="avatarrr"
                              size={70}
                            >
                              ĐN
                            </Avatar>
                            <div className="usersName">
                              <p>{follow.userName}</p>
                              <p>{follow.fullName}</p>
                            </div>
                            <button className="edit-profile">
                              Đang theo dõi
                            </button>
                          </div>
                        );
                      })}
                  </Modal>
                </div>
                <div className="info-user">
                  <b>{friends1.fullName}</b>
                  <br />
                </div>
                <div className="profile_user">
                  <p style={{ color: "black" }}>😛 DEV Cỏ 😛</p>
                  <p>Hai mét mốt 🙆🏻‍♀️</p>
                  <a
                    href="https://www.facebook.com/nguyen.v.duc.50"
                    className="facbook"
                    target="blank"
                    style={{ textDecoration: "none" }}
                  >
                    https://www.facebook.com/nguyen.v.duc.50
                  </a>
                </div>
              </div>
            </div>{" "}
            {/* Sở thích */}
            <div className="interest">
              <Avatar
                src={
                  "https://www.elle.vn/wp-content/uploads/2017/04/19/anh-nude-nghe-thuat-elle-viet-nam-26.jpg"
                }
                className="avatarrr"
                size={100}
              >
                ĐN
              </Avatar>
              <Avatar
                src={
                  "https://thpttranhungdao.edu.vn/wp-content/uploads/2022/11/Anh-Dep-Lam-Hinh-Nen.jpg"
                }
                className="avatarrr"
                size={100}
              >
                ĐN
              </Avatar>
              <Avatar
                src={
                  "https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
                }
                className="avatarrr"
                size={100}
              >
                ĐN
              </Avatar>
              <Avatar
                src={
                  "https://thuthuatnhanh.com/wp-content/uploads/2019/08/anh-nen-3d-thien-nhien.jpg"
                }
                className="avatarrr"
                size={100}
              >
                ĐN
              </Avatar>
              <Avatar
                src={
                  "https://hanoimoi.com.vn/Uploads/tuandiep/2018/4/8/1(1).jpg"
                }
                className="avatarrr"
                size={100}
              >
                ĐN
              </Avatar>
            </div>
            {/* Phần body */}
            <div className="user-post">
              <div className="action">
                <button className="btn-action active">
                  <div className="active1">
                    <span>
                      <ViewCompactOutlinedIcon />
                    </span>
                    &nbsp;&nbsp;<p>BÀI VIẾT</p>
                  </div>
                </button>
                <button className="btn-action">
                  <div className="active1">
                    <span>
                      {" "}
                      <SlideshowIcon />
                    </span>
                    &nbsp;&nbsp;<p>REELS</p>
                  </div>
                </button>
                <button className="btn-action">
                  <div className="active1">
                    <span>
                      <PermContactCalendarOutlinedIcon />
                    </span>
                    &nbsp;&nbsp;<p>ĐƯỢC GẮN THẺ</p>
                  </div>
                </button>
              </div>

              <div className="container">
                <div className="gallery">
                  {friends &&
                    friends.map((friend) => {
                      return (
                        <div
                          className="gallery-item"
                          tabIndex={0}
                          key={friend.postId}
                        >
                          <img
                            src={friend.image}
                            className="gallery-image"
                            alt=""
                          />
                          <div className="gallery-item-info">
                            <ul>
                              <li className="gallery-item-likes">
                                <span className="visually-hidden">Likes:</span>
                                <i
                                  className="fas fa-heart"
                                  aria-hidden="true"
                                />{" "}
                                56
                              </li>
                              <li className="gallery-item-comments">
                                <span className="visually-hidden">
                                  Comments:
                                </span>
                                <i
                                  className="fas fa-comment"
                                  aria-hidden="true"
                                />{" "}
                                2
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DetailFr;
