import React, { useEffect, useState } from "react";
import "./Suggestions.css";
import { Avatar } from "antd";
import { NavLink } from "react-router-dom";
import Footer from "../footer/footer.jsx";
import axios from "axios";

const Suggestions = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const [userFr, setUserFr] = useState("");
  const [followStatus, setFollowStatus] = useState([]);

  // Lấy thông tin của những user đã đăng ký
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

  // Lấy giá trị bảng friends
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get("http://localhost:8001/follow");
      setFollowStatus(response.data.result);
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

  return (
    <div className="suggestions">
      <div className="suggestions_Pro">
        <div className="suggestions_avatar">
          <div>
            <NavLink to={`/detail/${user.userName}`}>
              <Avatar src={user.avatarURL} className="avatarrr" size={65}>
                ĐN
              </Avatar>
            </NavLink>
          </div>
          <NavLink to={`/detail/${user.userName}`} className="user_name">
            <div style={{ fontSize: 15 }}>
              <p className="user_name1">
                <b>{user.userName}</b> <br />{" "}
                <span style={{ color: "grey" }}>{user.fullName}</span>
              </p>
            </div>
          </NavLink>
        </div>
        <div className="text1">Chuyển</div>
      </div>
      <div className="suggestions_title">
        <div>Gợi ý cho bạn</div>
        <div>
          <p className="all">Xem tất cả</p>
        </div>
      </div>
      <div className="suggestions_userNames">
        {userFr &&
          userFr
            .filter((users) => users.userId !== user.userId)
            .slice(-5)
            .map((usersFr) => {
              return (
                <div className="suggestions_userName" key={usersFr.userId}>
                  <div className="userName_left">
                    <NavLink
                      style={{ color: "black", textDecoration: "none" }}
                      to={
                        usersFr.userId === user.userId
                          ? `/detail/${user.userId}`
                          : `/detail/friends/${usersFr.userId}`
                      }
                    >
                      <span className="avatar">
                        <Avatar
                          src={usersFr.avatarURL}
                          className="avatarrr"
                          size={50}
                        >
                          ĐN
                        </Avatar>
                      </span>
                    </NavLink>{" "}
                    <div className="userName_info">
                      <span className="userName">{usersFr.userName}</span>
                      <span className="relation">Có Ngọc Trinh theo dõi</span>
                    </div>
                  </div>
                  {/* <button
                    className="folow_button"
                    onClick={() => handleButton(usersFr.userId)}
                  >
                    Theo dõi
                  </button> */}
                  {followStatus.length > 0 &&
                  followStatus.filter(
                    (follow) =>
                      follow.followerId === user.userId &&
                      follow.followeeId === usersFr.userId
                  ).length > 0 ? (
                    followStatus.length > 0 &&
                    followStatus.filter(
                      (follow) =>
                        follow.followerId === user.userId &&
                        follow.followeeId === usersFr.userId &&
                        follow.statusFl === 0
                    ).length > 0 ? (
                      <button
                        className="folow_button1"
                        onClick={() => handleUnfollow(usersFr.userId)}
                      >
                        Đang theo dõi
                      </button>
                    ) : (
                      <button
                        className="folow_button"
                        onClick={() => handleButton(usersFr.userId)}
                      >
                        Theo dõi
                      </button>
                    )
                  ) : (
                    <button
                      className="folow_button"
                      onClick={() => handleButton(usersFr.userId)}
                    >
                      Theo dõi
                    </button>
                  )}
                </div>
              );
            })}
      </div>

      <Footer />
    </div>
  );
};

export default Suggestions;
