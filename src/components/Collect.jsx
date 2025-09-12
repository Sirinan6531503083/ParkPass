import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Collect.css";


const parksData = [
  { id: 1, name: "อุทยานแห่งชาติดอยอินทนนท์", img: "/assets/IMG_30.jpg" },
  { id: 2, name: "อุทยานแห่งชาติเขาใหญ่", img: "/assets/IMG_33.jpg" },
  { id: 3, name: "อุทยานแห่งชาติเอราวัณ", img: "/assets/IMG_32.jpg" },
  { id: 4, name: "อุทยานแห่งชาติภูเรือ", img: "/assets/IMG_40.jpg" },
  { id: 5, name: "อุทยานแห่งชาติเขาสก", img: "/assets/IMG_41.jpg" },
  { id: 6, name: "อุทยานแห่งชาติแม่ปิง", img: "/assets/IMG_42.jpg" },
  { id: 7, name: "อุทยานแห่งชาติทุ่งแสลงหลวง", img: "/assets/IMG_43.jpg" },
  { id: 8, name: "อุทยานแห่งชาติเขาหลวง", img: "/assets/IMG_44.jpg" },
  { id: 9, name: "อุทยานแห่งชาติเขาชะเมา", img: "/assets/IMG_45.jpg" },
  { id: 10, name: "อุทยานแห่งชาติแก่งกระจาน", img: "/assets/IMG_46.jpg" },
  { id: 11, name: "อุทยานแห่งชาติหมู่เกาะสุรินทร์", img: "/assets/IMG_47.jpg" },
  { id: 12, name: "อุทยานแห่งชาติหมู่เกาะสิมิลัน", img: "/assets/IMG_48.jpg" },
  { id: 13, name: "อุทยานแห่งชาติเขาใหญ่ฝั่งปราจีน", img: "/assets/IMG_49.jpg" },
  { id: 14, name: "อุทยานแห่งชาติแม่วงก์", img: "/assets/IMG_50.jpg" },
  { id: 15, name: "อุทยานแห่งชาติหาดเจ้าไหม", img: "/assets/IMG_51.jpg" },
  { id: 16, name: "อุทยานแห่งชาติเขาแหลมหญ้า", img: "/assets/IMG_52.jpg" },
  { id: 17, name: "อุทยานแห่งชาติขุนสถาน", img: "/assets/IMG_53.jpg" },
  { id: 18, name: "อุทยานแห่งชาติภูสอยดาว", img: "/assets/IMG_54.jpg" },
  { id: 19, name: "อุทยานแห่งชาติเขาสามร้อยยอด", img: "/assets/IMG_57.jpg" },
  { id: 20, name: "อุทยานแห่งชาติเขาใหญ่ตอนเหนือ", img: "/assets/IMG_58.jpg" },
  { id: 21, name: "อุทยานแห่งชาติคลองลาน", img: "/assets/IMG_59.jpg" },
  { id: 22, name: "อุทยานแห่งชาติเขาค้อ", img: "/assets/IMG_60.jpg" },
  { id: 23, name: "อุทยานแห่งชาติทับลาน", img: "/assets/IMG_61.jpg" },
  { id: 24, name: "อุทยานแห่งชาติศรีลานนา", img: "/assets/IMG_62.jpg" },
  { id: 25, name: "อุทยานแห่งชาติแจ้ซ้อน", img: "/assets/IMG_63.jpg" },
  { id: 26, name: "อุทยานแห่งชาติภูหินร่องกล้า", img: "/assets/IMG_64.jpg" },
  { id: 27, name: "อุทยานแห่งชาติน้ำหนาว", img: "/assets/IMG_65.jpg" },
  { id: 28, name: "อุทยานแห่งชาติแม่วงก์ตอนเหนือ", img: "/assets/IMG_66.jpg" },
  { id: 29, name: "อุทยานแห่งชาติคลองน้ำใส", img: "/assets/IMG_67.jpg" },
  { id: 30, name: "อุทยานแห่งชาติปางสีดา", img: "/assets/IMG_68.jpg" },
  { id: 31, name: "อุทยานแห่งชาติบูโด-สุไหงปาดี", img: "/assets/IMG_69.jpg" },
  { id: 32, name: "อุทยานแห่งชาติป่าหินงาม", img: "/assets/IMG_70.jpg" },
  { id: 33, name: "อุทยานแห่งชาติศรีเทพ", img: "/assets/IMG_2.jpg" },
  { id: 34, name: "อุทยานแห่งชาติสาละวิน", img: "/assets/IMG_3.jpg" },
  { id: 35, name: "อุทยานแห่งชาติภูพาน", img: "/assets/IMG_14.jpg" },
  { id: 36, name: "อุทยานแห่งชาติแม่เมย", img: "/assets/IMG_4.jpg" },
  { id: 37, name: "อุทยานแห่งชาติเขาสกฝั่งตะวันตก", img: "/assets/IMG_5.jpg" },
  { id: 38, name: "อุทยานแห่งชาติทุ่งใหญ่นเรศวร", img: "/assets/IMG_6.jpg" },
  { id: 39, name: "อุทยานแห่งชาติหาดนพรัตน์ธารา", img: "/assets/IMG_17.jpg" },
  { id: 40, name: "อุทยานแห่งชาติหมู่เกาะช้าง", img: "/assets/IMG_16.jpg" },
  { id: 41, name: "อุทยานแห่งชาติห้วยขาแข้ง", img: "/assets/IMG_9.jpg" },
  { id: 42, name: "อุทยานแห่งชาติคลองใหญ่", img: "/assets/IMG_10.jpg" },
  { id: 43, name: "อุทยานแห่งชาติเขาแหลมงอบ", img: "/assets/IMG_11.jpg" },
  { id: 44, name: "อุทยานแห่งชาติทับพง", img: "/assets/IMG_12.jpg" },
  { id: 45, name: "อุทยานแห่งชาติหาดวนกร", img: "/assets/IMG_13.jpg" },
];

const Collect = () => {

  const [visitedParks, setVisitedParks] = useState({
    1: "2025-01-15",
    3: "2025-02-20",
    5: "2025-03-10",
    7: "2025-04-05",
    10: "2025-05-18",
  });

  const [selectedPark, setSelectedPark] = useState(null);

  const handleCardClick = (park) => {
    if (visitedParks[park.id]) {
      setSelectedPark({ ...park, date: visitedParks[park.id] });
    }
  };

  const closeModal = () => setSelectedPark(null);

  return (
    <div className="collect-container">
      <Navbar />
      <h1>สมุดสะสมสแตมป์อุทยาน</h1>
      <div className="parks-grid">
        {parksData.map((park) => {
          const visited = visitedParks[park.id];
          return (
            <div
              key={park.id}
              className={`park-card ${visited ? "visited" : "not-visited"}`}
              onClick={() => handleCardClick(park)}
            >
              <img src={park.img} alt={park.name} />
              <h3>{park.name}</h3>
              {visited && <span className="stamp">✅ เคยไปแล้ว</span>}
            </div>
          );
        })}
      </div>

      {/* Modal แสดงวันที่ */}
      {selectedPark && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPark.name}</h2>
            <p>คุณเคยไปเมื่อวันที่: {selectedPark.date}</p>
            <button onClick={closeModal}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collect;
