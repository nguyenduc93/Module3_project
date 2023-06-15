import { Route, Routes } from "react-router-dom";

import "./App.css";
import Homepage from "./components/home/Homepage";
import Login from "./components/authennaticate/Login";
import Signup from "./components/authennaticate/Signup";
import DetailUser from "./components/detailProf/DetailUser";
import DetailFr from "./components/detailProf/DetailFr";
import Notfound from "./components/NotFound/Notfound";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detail/:id" element={<DetailUser />} />
        <Route path="/detail/friends/:id" element={<DetailFr />} />

        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
