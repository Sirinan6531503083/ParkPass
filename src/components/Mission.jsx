import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Mission.css";


const parksWithMissions = [
  {
    id: 1,
    name: "อุทยานแห่งชาติดอยอินทนนท์",
    image: "/assets/IMG_42.jpg",
    missions: [
      { id: 1, title: "ไปถึงจุดสูงสุดแดนสยาม", completed: false },
      { id: 2, title: "ถ่ายรูปกับน้ำตกวชิรธาร", completed: false },
      { id: 3, title: "สังเกตนกกินปลีหางยาวเขียว", completed: false },
    ],
  },
  {
    id: 2,
    name: "อุทยานแห่งชาติเขาใหญ่",
    image: "/assets/IMG_41.jpg",
    missions: [
      { id: 1, title: "เดินป่าศึกษาธรรมชาติผากล้วยไม้", completed: false },
      { id: 2, title: "ชมพระอาทิตย์ขึ้นที่ผาเดียวดาย", completed: false },
      { id: 3, title: "ถ่ายรูปน้ำตกเหวสุวัต", completed: false },
    ],
  },
  {
    id: 3,
    name: "อุทยานแห่งชาติภูเรือ",
    image: "/assets/IMG_47.jpg",
    missions: [
      { id: 1, title: "ชมทะเลหมอกยามเช้า", completed: false },
      { id: 2, title: "เดินป่าศึกษาธรรมชาติ", completed: false },
      { id: 3, title: "ถ่ายรูปดอกไม้ป่า", completed: false },
    ],
  },
  {
    id: 4,
    name: "อุทยานแห่งชาติน้ำหนาว",
    image: "/assets/IMG_48.jpg",
    missions: [
      { id: 1, title: "เดินเส้นทางศึกษาธรรมชาติ", completed: false },
      { id: 2, title: "ถ่ายรูปกับป้ายอุทยาน", completed: false },
      { id: 3, title: "ชมทะเลหมอกตอนเช้า", completed: false },
    ],
  },
  {
    id: 5,
    name: "อุทยานแห่งชาติห้วยน้ำดัง",
    image: "/assets/IMG_44.jpg",
    missions: [
      { id: 1, title: "ชมพระอาทิตย์ขึ้นที่ดอยกิ่วลม", completed: false },
      { id: 2, title: "ถ่ายรูปทุ่งดอกบัวตอง", completed: false },
      { id: 3, title: "เดินป่าเส้นทางศึกษาธรรมชาติ", completed: false },
    ],
  },
  {
    id: 6,
    name: "อุทยานแห่งชาติแก่งกระจาน",
    image: "/assets/IMG_66.jpg",
    missions: [
      { id: 1, title: "เดินเส้นทางศึกษาป่า", completed: false },
      { id: 2, title: "ถ่ายรูปน้ำตกห้วยแม่ขมิ้น", completed: false },
      { id: 3, title: "ชมอ่างเก็บน้ำแก่งกระจาน", completed: false },
    ],
  },
  {
    id: 7,
    name: "อุทยานแห่งชาติแม่วงก์",
    image: "/assets/IMG_46.jpg",
    missions: [
      { id: 1, title: "เดินป่าเส้นทางศึกษาธรรมชาติ", completed: false },
      { id: 2, title: "ถ่ายรูปน้ำตกคลองพา", completed: false },
      { id: 3, title: "สังเกตสัตว์ป่า", completed: false },
    ],
  },
  {
    id: 8,
    name: "อุทยานแห่งชาติหมู่เกาะสิมิลัน",
    image: "/assets/IMG_57.jpg",
    missions: [
      { id: 1, title: "ดำน้ำชมปะการัง", completed: false },
      { id: 2, title: "ถ่ายรูปกับหินเรือใบ", completed: false },
      { id: 3, title: "ว่ายน้ำกับฝูงปลา", completed: false },
    ],
  },
  {
    id: 9,
    name: "อุทยานแห่งชาติภูสอยดาว",
    image: "/assets/IMG_53.jpg",
    missions: [
      { id: 1, title: "ชมทะเลหมอก", completed: false },
      { id: 2, title: "ถ่ายรูปดอกไม้ป่า", completed: false },
      { id: 3, title: "เดินป่าเส้นทางศึกษาธรรมชาติ", completed: false },
    ],
  },
  {
    id: 10,
    name: "อุทยานแห่งชาติศรีลานนา",
    image: "/assets/IMG_49.jpg",
    missions: [
      { id: 1, title: "เดินป่าศึกษาธรรมชาติ", completed: false },
      { id: 2, title: "ชมทะเลสาบ", completed: false },
      { id: 3, title: "ถ่ายรูปน้ำตกแม่สา", completed: false },
    ],
  },
];

const Mission = () => {
  const [search, setSearch] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);
  const [missions, setMissions] = useState([]);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);

  const selectPark = (park) => {
    setSelectedPark(park);
    const saved = localStorage.getItem(`parkMissions-${park.id}`);
    if (saved) {
      setMissions(JSON.parse(saved));
    } else {
      setMissions(park.missions);
    }
  };

  useEffect(() => {
    if (!selectedPark) return;
    localStorage.setItem(`parkMissions-${selectedPark.id}`, JSON.stringify(missions));
    const allCompleted = missions.length > 0 && missions.every((m) => m.completed);
    setBadgeUnlocked(allCompleted);
  }, [missions, selectedPark]);

  const toggleMission = (id) => {
    setMissions(missions.map((m) => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const filteredParks = parksWithMissions.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="mission-container">
        <h1>ภารกิจประจำอุทยาน</h1>

        {!selectedPark && (
          <div>
            <input
              type="text"
              placeholder="ค้นหาอุทยาน..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="park-search"
            />
            <div className="parks-list">
              {filteredParks.map((park) => (
                <div key={park.id} className="park-card" onClick={() => selectPark(park)}>
                  <img src={park.image} alt={park.name} className="park-card-image" />
                  <h3>{park.name}</h3>
                  <p>คลิกเพื่อดูภารกิจและปลดล็อคตราพิเศษ</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPark && (
          <div className="missions">
            <h2>{selectedPark.name}</h2>
            {missions.map((m) => (
              <div key={m.id} className={`mission-card ${m.completed ? "completed" : ""}`}>
                <span>{m.title}</span>
                <button onClick={() => toggleMission(m.id)}>
                  {m.completed ? "✅ สำเร็จ" : "ทำภารกิจ"}
                </button>
              </div>
            ))}

            {badgeUnlocked && (
              <div className="badge">
                <h2>🎖️ คุณปลดล็อคตราพิเศษของ {selectedPark.name} แล้ว!</h2>
                <p>ยินดีด้วย! ทำภารกิจครบทุกข้อ</p>
              </div>
            )}

            <button className="back-btn" onClick={() => setSelectedPark(null)}>
              ◀ กลับไปเลือกอุทยาน
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mission;
