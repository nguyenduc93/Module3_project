import React, { useEffect } from "react";
import "./Post.css";
import { Avatar } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VerifiedIcon from "@mui/icons-material/Verified";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Image } from "antd";
import { Button, Modal } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState("");
  const [detail, setDetail] = useState("");
  const [comment, setComment] = useState("");
  const [getComments, setGetComments] = useState("");
  const [tableCommets, setTableComments] = useState("");

  // Mở modal và hiển thị chi tiết ảnh vừa click
  const showModal = async (id) => {
    // Gọi API
    try {
      let response = await axios.get(
        `http://localhost:8001/newfeeds/detail/${id}`
      );
      setDetail(response.data.data);
      let result = await axios.get(`http://localhost:8001/comments/${id}`);

      setGetComments(result.data.data);
    } catch (error) {
      console.log(error);
    }
    setOpen(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // Lấy những bài post của người mình đang theo dõi
  useEffect(() => {
    const fethData = async () => {
      try {
        let userPost = await axios.get(
          `http://localhost:8001/newfeeds/${user.userId}`
        );
        setPosts(userPost.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fethData();
  }, [user.userId]);

  // Hàm hiển thị users
  const [userFr, setUserFr] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/v1/users");
        const newUsers = response.data.users;
        setUserFr((prevUsers) => [...prevUsers, ...newUsers]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Bỏ theo dõi người dùng
  const handleUnfollow = async (id) => {
    try {
      await axios.post("http://localhost:8001/follow/unfollow", {
        followerId: user.userId,
        followeeId: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Thêm mới comments
  const handleComments = async (postId) => {
    try {
      await axios.post("http://localhost:8001/comments", {
        commentUser: comment,
        reaction: 0,
        postId: postId,
        userId: user.userId,
      });
      setTableComments((prevGetComments) => [
        ...prevGetComments,
        {
          commentUser: comment,
          reaction: 0,
          postId: postId,
          userId: user.userId,
        },
      ]);
      setGetComments((prevGetComments) => [
        ...prevGetComments,
        {
          commentUser: comment,
          reaction: 0,
          avatarURL: user.avatarURL,
          userName: user.userName,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // Thả tim
  const handleReaction = async (id) => {
    try {
      await axios.post("http://localhost:8001/comments/update", {
        commentUser: comment,
        reaction: 1,
        postId: id,
        userId: user.userId,
      });
      setTableComments((prevComments) => [
        ...prevComments,
        { commentUser: "", reaction: 1, postId: id, userId: user.userId },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // Bỏ thả tim
  const handleuUnReaction = async (id) => {
    try {
      await axios.post("http://localhost:8001/comments/update", {
        commentUser: comment,
        reaction: 0,
        postId: id,
        userId: user.userId,
      });

      setTableComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.postId === id && comment.userId === user.userId) {
            return { ...comment, reaction: 0 };
          }
          return comment;
        });
      });
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
  return (
    <div>
      <div className="renderA">
        {userFr &&
          userFr
            .filter((users) => users.userId !== user.userId)
            .slice(-5)
            .map((usersFr, index) => {
              return (
                <NavLink
                  style={{ color: "black", textDecoration: "none" }}
                  to={
                    usersFr.userId === user.userId
                      ? `/detail/${user.userId}`
                      : `/detail/friends/${usersFr.userId}`
                  }
                >
                  <div className="renderAv" key={index}>
                    <Avatar
                      src={usersFr.avatarURL}
                      className="avatarrr"
                      size={80}
                    >
                      ĐN
                    </Avatar>
                    <p>{usersFr.useName}</p>
                  </div>
                </NavLink>
              );
            })}
      </div>

      <div className="post">
        {posts &&
          posts.map((post, index) => {
            return (
              <>
                <div className="post_header">
                  <div className="post_headerAuthor" key={index}>
                    <Avatar src={post.avatarURL} className="avatarrr" size={50}>
                      ĐN
                    </Avatar>
                    <NavLink
                      style={{ color: "black", textDecoration: "none" }}
                      to={
                        post.userId === user.userId
                          ? `/detail/${user.userId}`
                          : `/detail/friends/${post.userId}`
                      }
                    >
                      <b style={{ marginRight: 10 }}>{post.userName}</b>
                    </NavLink>{" "}
                    <VerifiedIcon className="icon" />
                    <span>
                      <li>12 giờ</li>
                    </span>
                  </div>
                  {/* <MoreHorizIcon /> */}

                  <div className="dropdown">
                    <button
                      className="btn dropdown"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <MoreHorizIcon />
                    </button>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <NavLink className="dropdown-item">Báo Cáo</NavLink>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleUnfollow(post.userId)}
                        >
                          Bỏ theo dõi
                        </button>
                      </li>
                      <li>
                        <NavLink className="dropdown-item">
                          Thêm mục yêu thích
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item">
                          Đi tới bài viết
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item">
                          Chia sẻ lên...
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item">
                          Sao chép liên kết
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="post_image">
                  <Image className="Image_post" width={550} src={post.image} />
                </div>

                {/* Thay đổi trạng thái tim */}
                <div className="post_footer">
                  <div className="post_footerIcons">
                    <div className="post_iconsMain">
                      {tableCommets &&
                        (tableCommets.find(
                          (tables) =>
                            tables.postId === post.postId &&
                            tables.userId === user.userId &&
                            tables.reaction === 1
                        ) ? (
                          <span>
                            <button
                              onClick={() => handleuUnReaction(post.postId)}
                            >
                              <FavoriteIcon
                                className="postIcon"
                                style={{ color: "red" }}
                              />
                            </button>
                          </span>
                        ) : (
                          <span>
                            <button onClick={() => handleReaction(post.postId)}>
                              <FavoriteBorderIcon className="postIcon" />
                            </button>
                          </span>
                        ))}

                      {/* Modal comments */}
                      <>
                        <span className="span_comment">
                          <Button
                            onClick={() => showModal(post.postId)}
                            type="link"
                            style={{ outline: "none" }}
                          >
                            <ChatBubbleOutlineIcon className="postIcon" />
                          </Button>
                        </span>
                        <span className="modal_comment">
                          <Modal
                            open={open}
                            centered
                            onOk={handleOk}
                            footer={[]}
                            onCancel={handleCancel}
                            width={1000}
                            bodyStyle={{ maxHeight: "500px" }}
                          >
                            <div className="container_img">
                              <div className="detail_imgL">
                                <img src={detail.image} alt="" />
                              </div>
                              <div className="detail_right">
                                <div className="header_right">
                                  <div className="header_right1">
                                    <div className="avatarr">
                                      {" "}
                                      <Avatar
                                        src={detail.avatarURL}
                                        className="avatarrr"
                                        size={50}
                                      >
                                        ĐN
                                      </Avatar>
                                    </div>
                                    <div className="user_post">
                                      <b>{detail.userName}</b>{" "}
                                      <VerifiedIcon className="icon" />{" "}
                                      <span>Theo Dõi</span>
                                    </div>
                                  </div>
                                  <div
                                    className="user_post"
                                    style={{ marginRight: 10 }}
                                  >
                                    {" "}
                                    <MoreHorizIcon />
                                  </div>
                                </div>
                                <hr />
                                <div className="main_comment">
                                  <div className="main_comment 1">
                                    <div className="avatarr">
                                      {" "}
                                      <Avatar
                                        src={detail.avatarURL}
                                        className="avatarrr"
                                        size={50}
                                      >
                                        ĐN
                                      </Avatar>
                                    </div>
                                    <div className="name_user">
                                      <b>{detail.userName}</b>{" "}
                                      <span>{detail.content}</span>
                                    </div>
                                  </div>
                                  <div className="icon_comment">
                                    {" "}
                                    <FavoriteIcon
                                      className="postIcon"
                                      style={{ color: "red" }}
                                    />
                                  </div>
                                </div>{" "}
                                {getComments &&
                                  getComments.map((commnent) => {
                                    return (
                                      commnent.commentUser && (
                                        <div className="main_comment">
                                          <div className="main_comment 1">
                                            <div className="avatarr">
                                              {" "}
                                              <Avatar
                                                src={commnent.avatarURL}
                                                className="avatarrr"
                                                size={50}
                                              >
                                                ĐN
                                              </Avatar>
                                            </div>
                                            <div className="name_user">
                                              <b>{commnent.userName}</b>{" "}
                                              <span>
                                                {commnent.commentUser}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="icon_comment">
                                            {" "}
                                            <FavoriteBorderIcon className="postIcon" />
                                          </div>
                                        </div>
                                      )
                                    );
                                  })}
                                <div className="post_footer1">
                                  <div className="post_footerIcons">
                                    <div className="post_iconsMain">
                                      <FavoriteIcon
                                        className="postIcon"
                                        style={{ color: "red" }}
                                      />
                                      <ChatBubbleOutlineIcon className="postIcon" />
                                      <TelegramIcon className="postIcon" />
                                    </div>
                                    <div className="post_iconsSave">
                                      <BookmarkBorderIcon className="postIcon" />
                                    </div>
                                  </div>
                                  <div style={{ marginLeft: 10 }}>
                                    {" "}
                                    {tableCommets &&
                                      tableCommets.filter(
                                        (tables) =>
                                          tables.reaction === 1 &&
                                          tables.postId === detail.postId
                                      ).length}{" "}
                                    lượt thích
                                  </div>
                                  <div className="comments">
                                    <input
                                      // style={{ width: "100%" }}
                                      className="commentss"
                                      type="text"
                                      value={comment}
                                      placeholder="Thêm bình luận..."
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                          handleComments(detail.postId);
                                          setComment("");
                                        }
                                      }}
                                    />
                                    <button
                                      onClick={() => {
                                        handleComments(detail.postId);
                                      }}
                                    >
                                      <SendIcon />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </span>
                      </>
                      <TelegramIcon className="postIcon" />
                    </div>
                    <div className="post_iconsSave">
                      <BookmarkBorderIcon className="postIcon" />
                    </div>
                  </div>
                  <div style={{ marginLeft: 8 }}>
                    {" "}
                    {tableCommets &&
                      tableCommets.filter(
                        (tables) =>
                          tables.reaction === 1 && tables.postId === post.postId
                      ).length}{" "}
                    lượt thích
                  </div>
                  <div className="contents" style={{ marginLeft: 6 }}>
                    <b>{post.userName}</b> <span> {post.content}</span>
                  </div>
                  <button
                    className="comments_user"
                    onClick={() => {
                      showModal(post.postId);
                    }}
                  >
                    Xem tất cả{" "}
                    {tableCommets &&
                      tableCommets.filter(
                        (tables) =>
                          tables.commentUser !== "" &&
                          tables.postId === post.postId
                      ).length}{" "}
                    bình luận
                  </button>
                  <div
                    className="comments comments11"
                    style={{ marginLeft: 4 }}
                  >
                    <input
                      type="text"
                      placeholder="Thêm bình luận..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleComments(post.postId);
                          setComment("");
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        handleComments(post.postId);
                      }}
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        <hr />
      </div>
    </div>
  );
};

export default Post;
