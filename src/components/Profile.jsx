import React, { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./Profile.css";

const Profile = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    phone: "",
    address: "",
    photoURL: "/assets/default-profile.png",
  });

  const [previewImg, setPreviewImg] = useState("/assets/default-profile.png");
  const [isEditing, setIsEditing] = useState(false);

  // โหลดข้อมูลจาก Firebase
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "/assets/default-profile.png",
      }));
      setPreviewImg(user.photoURL || "/assets/default-profile.png");

      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData((prev) => ({
            ...prev,
            phone: data.phone || "",
            address: data.address || "",
          }));
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result);
        setProfileData({ ...profileData, photoURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      // อัปเดตชื่อและรูปโปรไฟล์
      await updateProfile(user, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      // บันทึกข้อมูลเพิ่มเติม (phone, address) ใน Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          phone: profileData.phone,
          address: profileData.address,
        },
        { merge: true }
      );

      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
      alert("เกิดข้อผิดพลาด: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <h1>โปรไฟล์ของคุณ</h1>
        {user ? (
          <div className="profile-card">
            <div className="profile-img-section">
              <img src={previewImg} alt="Profile" className="profile-img" />
              {isEditing && (
                <input type="file" accept="image/*" onChange={handleImageChange} />
              )}
            </div>

            <div className="profile-info">
              <label>ชื่อ-สกุล</label>
              {isEditing ? (
                <input
                  type="text"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleChange}
                />
              ) : (
                <p>{profileData.displayName || "-"}</p>
              )}

              <label>อีเมล</label>
              <p>{profileData.email}</p>

              <label>เบอร์โทรศัพท์</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p>{profileData.phone || "-"}</p>
              )}

              <label>ที่อยู่</label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                />
              ) : (
                <p>{profileData.address || "-"}</p>
              )}

              <div className="profile-buttons">
                {isEditing ? (
                  <button className="save-btn" onClick={handleSave}>
                    บันทึกข้อมูล
                  </button>
                ) : (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>
                    แก้ไขข้อมูล
                  </button>
                )}
                <button className="logout-btn" onClick={handleLogout}>
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>กรุณาเข้าสู่ระบบเพื่อดูโปรไฟล์</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
