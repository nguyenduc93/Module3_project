import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Homepage from "./components/home/Homepage";
import Login from "./components/authennaticate/Login";
import Signup from "./components/authennaticate/Signup";
import DetailUser from "./components/detailProf/DetailUser";
import DetailFr from "./components/detailProf/DetailFr";
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div className="app">
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/detail/:id" element={<DetailUser />} />
            <Route path="/detail/friends/:id" element={<DetailFr />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
