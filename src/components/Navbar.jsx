import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProtectedClick = (e, path) => {
    if (!user) {
      e.preventDefault(); // ป้องกันการไปหน้าที่ลิงก์
      alert("กรุณาเข้าสู่ระบบก่อนเข้าใช้งานหน้านี้!");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo - เข้าหน้าหลักได้เสมอ */}
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="/assets/IMG_7.png"
            alt="Park Pass Logo"
            className="logo-img"
          />
        </Link>
      </div>

      <ul className="navbar-menu">
        {/* หน้าหลัก - ไม่ต้องล็อกอิน */}
        <li>
           <Link to="/">หน้าหลัก</Link>
        </li>

        <li>
          <Link onClick={(e) => handleProtectedClick(e, "/collect")} to="/collect">
            สมุดสะสมแสตมป์
          </Link>
        </li>
        <li>
          <Link onClick={(e) => handleProtectedClick(e, "/scan")} to="/scan">
            สแกน QR
          </Link>
        </li>

        {/* Auth / Profile */}
        {user ? (
          <>
            <li>
              <Link to="/profile">
                <img
                  src={user.photoURL || "/assets/default-profile.png"}
                  alt="Profile"
                  className="navbar-profile-img"
                />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                ออกจากระบบ
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">เข้าสู่ระบบ</Link>
            </li>
            <li>
              <Link to="/register">ลงทะเบียน</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
