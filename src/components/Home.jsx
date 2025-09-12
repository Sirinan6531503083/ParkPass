
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import FeatureCard from "./FeatureCard"; 
import Navbar from "./Navbar";
import "./Home.css";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const openLightbox = (img) => {
    setLightboxImg(img);
    setShowLightbox(true);
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 250;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ฟังก์ชันช่วยตรวจสอบสิทธิ์ก่อนเข้า feature
  const requireLogin = (e) => {
    if (!user) {
      e.preventDefault();
      alert("กรุณาเข้าสู่ระบบเพื่อใช้งานฟีเจอร์นี้");
    }
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* Header Section */}
      <header className="home-header">
        <h1>ยินดีต้อนรับ {user?.email || "ผู้เยี่ยมชม"}</h1>
        <h2>สมุดสะสมสแตมป์ดิจิทัล เที่ยวอุทยานทั่วไทย</h2>
        <p>
          "เก็บทุกความทรงจำการท่องเที่ยวอุทยานในรูปแบบดิจิทัล
          <br />
          สะสมสแตมป์ แลกรางวัล และติดตามสิทธิพิเศษได้ในที่เดียว"
        </p>
        <div className="header-buttons">
          <Link to="/parks-info">
            <button className="home-btn">ข้อมูลเพิ่มเติม</button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-container">
        <h2 className="feature-group-title">หมวดหมู่</h2>
        <div className="features">
          <Link to="/collect" className="feature-link" onClick={requireLogin}>
            <FeatureCard
              title="สมุดสะสมสแตมป์"
              desc="เก็บสแตมป์ดิจิทัลทุกครั้งที่คุณเข้าอุทยาน"
            />
          </Link>
          <Link to="/diary" className="feature-link" onClick={requireLogin}>
            <FeatureCard
              title="สมุดบันทึก"
              desc="บันทึกความทรงจำและประสบการณ์การเที่ยวของคุณ"
            />
          </Link>
          <Link to="/scan" className="feature-link" onClick={requireLogin}>
            <FeatureCard
              title="สแกน QR"
              desc="สแกน QR Code เพื่อยืนยันการเยี่ยมชม"
            />
          </Link>
          <Link to="/mission" className="feature-link" onClick={requireLogin}>
            <FeatureCard
              title="ภารกิจสนุกๆ"
              desc="ทำภารกิจประจำอุทยานเพื่อปลดล็อคตราพิเศษ"
            />
          </Link>

          {/* ข้อมูลเพิ่มเติมยังสามารถกดได้แม้ไม่ล็อกอิน */}
          <Link to="/parks-info" className="feature-link">
            <FeatureCard
              title="ข้อมูลเพิ่มเติม"
              desc="ข้อมูลอุทยานและประวัติศาสตร์"
            />
          </Link>
        </div>
      </section>

      {/* Guide Section */}
      <section className="guide-section">
        <h2>คู่มือแนะนำการใช้งาน สมุดอุทยาน Park Pass 🌿</h2>

        {[
          {
            title: "1. เริ่มต้นการผจญภัยของคุณ",
            desc: `เปิดเว็บมาหน้าแรก คุณจะพบข้อความต้อนรับอบอุ่น พร้อมปุ่ม "ข้อมูลเพิ่มเติม"
            จะเป็นการบอกที่ตั้งและประวัติเกี่ยวกับอุทยาน เตรียมตัวเก็บสแตมป์ดิจิทัลของคุณได้เลย!`
          },
          {
            title: "2. สมุดสะสมสแตมป์ดิจิทัล 🔍",
            desc: `สมุดสะสมสแตมป์จะแสดงหน้าอุทยานทั้งหมด ถ้าคุณได้ไปแล้วโดยที่คุณสแกน QR Code เช็คอิน
            การ์ดอุทยานจะขึ้นว่าไปแล้ว และเมื่อสะสมครบคุณจะได้รับสิทธิพิเศษ`
          },
          {
            title: "3. สแกน QR Code หรือ ใส่ภาพ",
            desc: `คุณสามารถเลือกได้ว่าจะสแกน QR Code หรือใส่ภาพจากแกลเลอรี่ โดยการใส่ภาพจากแกลเลอรี่จะต้องมีลายเซ็นต์จากเจ้าหน้าที่ยืนยันก่อน`
          },
          {
            title: "4. ทำภารกิจสนุก ๆ 🎯",
            desc: `เลือกอุทยานที่คุณสนใจ แล้วทำภารกิจ คลิก "ทำภารกิจ" เพื่อทำเครื่องหมาย ✅`
          },
          {
            title: "5. ปลดล็อคตราพิเศษ 🏅",
            desc: `เมื่อทำภารกิจครบ ระบบจะแสดงตราพิเศษและข้อความยินดี เก็บเป็นความทรงจำดิจิทัลของคุณ`
          },
          {
            title: "6. สมุดบันทึก",
            desc: `บันทึกความทรงจำและประสบการณ์การเที่ยวอุทยานของคุณ`
          },
          {
            title: "7. ใช้งานง่ายบนทุกอุปกรณ์ 📱💻",
            desc: `ไม่ว่าคุณจะใช้มือถือหรือคอมพิวเตอร์ การ์ดอุทยานจะใช้ได้อย่างสะดวก`
          }
        ].map((item, index) => (
          <div key={index} className="guide-item">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© สมุดอุทยาน - Park Pass</p>
      </footer>
    </div>
  );
};

export default Home;
