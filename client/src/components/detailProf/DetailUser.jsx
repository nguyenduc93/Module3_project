import React, { useEffect, useState } from "react";
import "./DetailUser.css";
import Sidenav from "../navigation/Sidenav.jsx";
import Footer from "../footer/footer.jsx";
import { Avatar } from "antd";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ViewCompactOutlinedIcon from "@mui/icons-material/ViewCompactOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Modal } from "antd";
import { notification } from "antd";

const DetailUser = () => {
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFolloweesModalOpen, setIsFolloweesModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal2 = () => {
    setIsModalOpen(true);
  };
  const showModal = () => {
    setIsFollowersModalOpen(true);
  };
  const showModal1 = () => {
    setIsFolloweesModalOpen(true);
  };
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAvatarHandled, setIsAvatarHandled] = useState(false);
  const [posts, setPosts] = useState("");
  const [followee, setFollowee] = useState("");
  const [follower, setFollower] = useState("");
  const [followStatus, setFollowStatus] = useState([]);
  const [tableCommets, setTableComments] = useState("");
  const { id } = useParams();

  // Cập nhật avatar
  useEffect(() => {
    const handleAvatar = async () => {
      try {
        const formData = new FormData();
        formData.append("avatar", avatar);
        const response = await axios.post(
          `http://localhost:8001/upload/${id}`,
          formData
        );
        if (response.data.status === "Success123") {
          notification.success({
            message: "Cập nhật avatar thành công!!!",
          });
        }
        const updatedUser = { ...user, avatarURL: response.data.url };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsAvatarHandled(true); // Đánh dấu đã xử lý hoàn tất
      } catch (error) {
        console.log(error);
      }
    };

    if (avatar && !isAvatarHandled) {
      handleAvatar();
    }
  }, [avatar, id, user, isAvatarHandled]);

  // Hiển thị ảnh đã post của người đang đăng nhập
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/post/detail/${user.userId}`
        );
        const data = response.data.posts;
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user.userId]);

  // Hàm lấy những người mình theo dõi và theo dõi mình
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/follow/${user.userId}`
        );
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
  }, [user.userId]);

  // Lấy giá trị bảng friends
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://localhost:8001/follow");
      setFollowStatus(response.data.result);
    };
    fetchData();
  }, []);

  // Hàm post Id vào bảng Friends
  const handleButton = async (followeeId) => {
    try {
      await axios.post(`http://localhost:8001/follow`, {
        followerId: user.userId,
        followeeId: followeeId,
      });
      // Cập nhật trạng thái theo dõi trong state
      setFollowStatus((prevStatus) => [
        ...prevStatus,
        { followerId: user.userId, followeeId: followeeId, statusFl: 0 },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // Bỏ theo dõi người dùng
  const handleUnfollow = async (id) => {
    try {
      await axios.post("http://localhost:8001/follow/unfollow", {
        followerId: user.userId,
        followeeId: id,
      });

      // Cập nhật trạng thái hủy theo dõi trong state
      setFollowStatus((prevStatus) =>
        prevStatus.filter(
          (follow) =>
            follow.followerId !== user.userId || follow.followeeId !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy toàn bộ comments về
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://localhost:8001/comments");
      setTableComments(response.data.result);
    };
    fetchData();
  }, []);

  // Xóa bài viết
  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:8001/post/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      setIsModalOpen(false);
      if (response.data.status === 200) {
        notification.success({
          message: "Xóa bài viết thành công!!!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                  src={user && user.avatarURL}
                  className="avatarrr"
                  size={150}
                >
                  ĐN
                </Avatar>
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar-input"
                onChange={(e) => {
                  setAvatar(e.target.files[0]);
                }}
                hidden
              />
              <div className="info">
                <div className="info-user user-info">
                  <button className="edit-profile1">{user.userName}</button>
                  <div className="btn_edit">
                    <button className="edit-profile">
                      Chỉnh sửa trang cá nhân
                    </button>
                  </div>
                  <button className="setting">
                    {" "}
                    <SettingsOutlinedIcon />
                  </button>
                </div>
                <div className="info-user">
                  <button className="btn_flow qty2">
                    <span className="qty ">{posts.length}</span> bài viết
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
                            {followStatus.length > 0 &&
                            followStatus.filter(
                              (follows) =>
                                follows.followerId === user.userId &&
                                follows.followeeId === follow.userId
                            ).length > 0 ? (
                              followStatus.length > 0 &&
                              followStatus.filter(
                                (follows) =>
                                  follows.followerId === user.userId &&
                                  follows.followeeId === follow.userId &&
                                  follows.statusFl === 0
                              ).length > 0 ? (
                                <button
                                  className="folow_button1"
                                  onClick={() => handleUnfollow(follow.userId)}
                                >
                                  Đang theo dõi
                                </button>
                              ) : (
                                <button
                                  className="folow_button"
                                  onClick={() => handleButton(follow.userId)}
                                >
                                  Theo dõi
                                </button>
                              )
                            ) : (
                              <button
                                className="folow_button"
                                onClick={() => handleButton(follow.userId)}
                              >
                                Theo dõi
                              </button>
                            )}
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
                            <button
                              className="edit-profile"
                              onClick={() => handleUnfollow(follow.userId)}
                            >
                              Đang theo dõi
                            </button>
                          </div>
                        );
                      })}
                  </Modal>
                </div>
                <div className="info-user">
                  <b>{user.fullName}</b>
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
                      <BookmarkBorderIcon />
                    </span>
                    &nbsp;&nbsp;<p>ĐÃ LƯU</p>
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
                {posts.length > 0 ? (
                  <div className="gallery">
                    {posts.map((post) => (
                      <div
                        className="gallery-item"
                        tabIndex={0}
                        key={post.postId}
                      >
                        <img
                          src={post.image}
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
                              {tableCommets &&
                                tableCommets.filter(
                                  (tables) =>
                                    tables.reaction === 1 &&
                                    tables.postId === post.postId
                                ).length}{" "}
                            </li>
                            <Button
                              onClick={showModal2}
                              style={{ background: "none", border: "none" }}
                            >
                              <li className="gallery-item-comments">
                                <span className="visually-hidden">
                                  Comments:
                                </span>
                                <i
                                  className="fas fa-comment"
                                  aria-hidden="true"
                                />{" "}
                                {tableCommets &&
                                  tableCommets.filter(
                                    (tables) =>
                                      tables.commentUser !== "" &&
                                      tables.postId === post.postId
                                  ).length}
                              </li>
                            </Button>
                            <Modal
                              title="Chỉnh sửa bài viết"
                              open={isModalOpen}
                              onOk={() => setIsModalOpen(false)}
                              onCancel={() => setIsModalOpen(false)}
                              footer={[]}
                              width={400}
                            >
                              <div style={{ textAlign: "center" }}>
                                <button
                                  style={{
                                    color: "red",
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => handleDelete(post.postId)}
                                >
                                  Xóa
                                </button>{" "}
                                <hr />
                                <p>Chỉnh sửa</p> <hr />
                                <p>Ẩn lượt thích</p> <hr />
                                <p>Tắt tính năng bình luận</p> <hr />
                                <p>Chia sẻ lên...</p> <hr />
                                <p>Đi tới bài viết</p> <hr />
                                <p>Sao chép liên kết</p> <hr />
                                <p>Nhúng</p> <hr />
                              </div>
                            </Modal>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="upload-post">
                    <div className="icon-cam">
                      <PhotoCameraOutlinedIcon style={{ fontSize: 40 }} />
                    </div>
                    <h1>Chia sẻ ảnh</h1>
                    <p>
                      Khi bạn chia sẻ ảnh, ảnh sẽ xuất hiện trên trang cá nhân
                      của bạn.
                    </p>
                    <button className="share">
                      Chia sẻ ảnh đầu tin của bạn
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
