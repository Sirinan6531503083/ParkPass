import React, { useState } from "react";
import Navbar from "./Navbar";
import "./ParksInfo.css";

const parksData = [
  { id: 1, name: "อุทยานแห่งชาติเขาใหญ่", description: "อุทยานแห่งชาติที่ใหญ่ที่สุดในประเทศไทย", history: "ก่อตั้งปี 2505 เพื่ออนุรักษ์สัตว์ป่าและป่าไม้", image: "/assets/IMG_33.jpg", address: "อ.ปากช่อง จ.นครราชสีมา", highlights: ["น้ำตกเหวสุวัต", "ผาเดียวดาย", "จุดชมวิวเขาใหญ่"] },
  { id: 2, name: "อุทยานแห่งชาติแก่งกระจาน", description: "อุทยานที่มีความหลากหลายทางชีวภาพ", history: "ก่อตั้งปี 2524 เพื่ออนุรักษ์ป่าและสัตว์ป่าหายาก", image: "/assets/IMG_40.jpg", address: "อ.แก่งกระจาน จ.เพชรบุรี", highlights: ["อ่างเก็บน้ำแก่งกระจาน", "น้ำตกห้วยแม่ขมิ้น", "เส้นทางศึกษาธรรมชาติ"] },
  { id: 3, name: "อุทยานแห่งชาติภูเรือ", description: "ภูเขาสูงและทะเลหมอก", history: "ก่อตั้งปี 2518 เพื่ออนุรักษ์ธรรมชาติและพืชพรรณ", image: "/assets/IMG_41.jpg", address: "อ.ภูเรือ จ.เลย", highlights: ["จุดชมวิวภูเรือ", "ทะเลหมอก", "ดอกไม้ป่า"] },
  { id: 4, name: "อุทยานแห่งชาติดอยอินทนนท์", description: "ยอดเขาที่สูงที่สุดในไทย", history: "ก่อตั้งปี 2500 เพื่ออนุรักษ์พันธุ์ไม้และสัตว์ป่า", image: "/assets/IMG_42.jpg", address: "อ.จอมทอง จ.เชียงใหม่", highlights: ["น้ำตกวชิรธาร", "ดอยอินทนนท์", "จุดชมวิว"] },
  { id: 5, name: "อุทยานแห่งชาติศรีลานนา", description: "ป่าเขาและน้ำตกสวยงาม", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ธรรมชาติ", image: "/assets/IMG_43.jpg", address: "อ.แม่แตง จ.เชียงใหม่", highlights: ["น้ำตกแม่สา", "จุดกางเต็นท์", "ป่าเขา"] },
  { id: 6, name: "อุทยานแห่งชาติห้วยน้ำดัง", description: "ทะเลหมอกและทิวเขาสวย", history: "ก่อตั้งปี 2520 เพื่อปกป้องสัตว์ป่าหายาก", image: "/assets/IMG_44.jpg", address: "อ.แม่แตง จ.เชียงใหม่", highlights: ["ทะเลหมอก", "น้ำตก", "เส้นทางศึกษาธรรมชาติ"] },
  { id: 7, name: "อุทยานแห่งชาติขุนสถาน", description: "ภูเขาและธรรมชาติ", history: "ก่อตั้งปี 2523 เพื่ออนุรักษ์ป่าและสัตว์ป่า", image: "/assets/IMG_45.jpg", address: "อ.นาน้อย จ.น่าน", highlights: ["จุดชมวิว", "น้ำตก", "เส้นทางเดินป่า"] },
  { id: 8, name: "อุทยานแห่งชาติแม่วงก์", description: "ป่าดิบและน้ำตก", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์สัตว์ป่า", image: "/assets/IMG_46.jpg", address: "อ.แม่วงก์ จ.นครสวรรค์", highlights: ["น้ำตกคลองพา", "ป่าเขา", "เส้นทางศึกษา"] },
  { id: 9, name: "อุทยานแห่งชาติทองผาภูมิ", description: "ภูเขาและอ่างเก็บน้ำ", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ป่า", image: "/assets/IMG_47.jpg", address: "อ.ทองผาภูมิ จ.กาญจนบุรี", highlights: ["เขื่อนวชิราลงกรณ", "น้ำตกเอราวัณ", "เส้นทางเดินป่า"] },
  { id: 10, name: "อุทยานแห่งชาติน้ำหนาว", description: "ภูเขาและป่าเขียวชอุ่ม", history: "ก่อตั้งปี 2520 เพื่ออนุรักษ์ธรรมชาติ", image: "/assets/IMG_48.jpg", address: "อ.น้ำหนาว จ.เพชรบูรณ์", highlights: ["ทะเลหมอก", "น้ำตก", "เส้นทางเดินป่า"] },
  { id: 11, name: "อุทยานแห่งชาติแม่เมย", description: "ป่าฝนและธรรมชาติ", history: "ก่อตั้งปี 2523 เพื่ออนุรักษ์สัตว์ป่า", image: "/assets/IMG_49.jpg", address: "อ.แม่เมย จ.ตาก", highlights: ["น้ำตกแม่เมย", "ป่าเขา", "จุดชมวิว"] },
  { id: 12, name: "อุทยานแห่งชาติดอยผาแดง", description: "ภูเขาและธรรมชาติ", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ธรรมชาติ", image: "/assets/IMG_50.jpg", address: "อ.เชียงดาว จ.เชียงใหม่", highlights: ["จุดชมวิว", "ผาหินแดง", "เส้นทางเดินป่า"] },
  { id: 13, name: "อุทยานแห่งชาติแจ้ซ้อน", description: "น้ำตกและป่าดงดิบ", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ธรรมชาติ", image: "/assets/IMG_51.jpg", address: "อ.เมือง จ.ลำปาง", highlights: ["น้ำตกแจ้ซ้อน", "น้ำพุร้อน", "เส้นทางศึกษาธรรมชาติ"] },
  { id: 14, name: "อุทยานแห่งชาติภูสอยดาว", description: "ภูเขาและทะเลหมอก", history: "ก่อตั้งปี 2522 เพื่ออนุรักษ์ป่าและสัตว์ป่า", image: "/assets/IMG_52.jpg", address: "อ.ชาติตระการ จ.พิษณุโลก", highlights: ["จุดชมวิว", "ทะเลหมอก", "ดอกไม้ป่า"] },
  { id: 15, name: "อุทยานแห่งชาติภูพญา", description: "ภูเขาและธรรมชาติ", history: "ก่อตั้งปี 2523 เพื่ออนุรักษ์ป่าและสัตว์ป่า", image: "/assets/IMG_53.jpg", address: "อ.แม่สาย จ.เชียงราย", highlights: ["จุดชมวิว", "น้ำตก", "เส้นทางเดินป่า"] },
  { id: 16, name: "อุทยานแห่งชาติห้วยน้ำใส", description: "น้ำตกและป่า", history: "ก่อตั้งปี 2524 เพื่ออนุรักษ์น้ำตกและป่า", image: "/assets/IMG_54.jpg", address: "อ.เมือง จ.เลย", highlights: ["น้ำตก", "จุดกางเต็นท์", "เส้นทางเดินป่า"] },
  { id: 17, name: "อุทยานแห่งชาติหาดเจ้าไหม", description: "ชายหาดและทะเลสวย", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ชายหาด", image: "/assets/IMG_57.jpg", address: "อ.กันตัง จ.ตรัง", highlights: ["ชายหาด", "เกาะสุกร", "เส้นทางศึกษาธรรมชาติ"] },
  { id: 18, name: "อุทยานแห่งชาติหมู่เกาะสุรินทร์", description: "เกาะและปะการังสวย", history: "ก่อตั้งปี 2524 เพื่ออนุรักษ์ทะเล", image: "/assets/IMG_58.jpg", address: "อ.คุระบุรี จ.พังงา", highlights: ["เกาะสุรินทร์เหนือ", "เกาะสุรินทร์ใต้", "จุดดำน้ำ"] },
  { id: 19, name: "อุทยานแห่งชาติหมู่เกาะสิมิลัน", description: "เกาะและทะเลสวย", history: "ก่อตั้งปี 2524 เพื่ออนุรักษ์ทะเล", image: "/assets/IMG_59.jpg", address: "อ.ตะกั่วป่า จ.พังงา", highlights: ["เกาะสี่", "เกาะห้า", "จุดดำน้ำหินเรือ"] },
  { id: 20, name: "อุทยานแห่งชาติคลองวังเจ้า", description: "ป่าชายเลนและแม่น้ำ", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ป่าชายเลน", image: "/assets/IMG_61.jpg", address: "อ.เมือง จ.ตราด", highlights: ["ป่าชายเลน", "คลองวังเจ้า", "นกน้ำ"] },
  { id: 21, name: "อุทยานแห่งชาติแก่งคอย", description: "ป่าร้อนและน้ำตก", history: "ก่อตั้งปี 2520 เพื่ออนุรักษ์สัตว์ป่า", image: "/assets/IMG_60.jpg", address: "อ.แก่งคอย จ.สระบุรี", highlights: ["น้ำตก", "เส้นทางเดินป่า", "จุดชมวิว"] },
  { id: 22, name: "อุทยานแห่งชาติทุ่งแสลงหลวง", description: "ทุ่งหญ้าและภูเขา", history: "ก่อตั้งปี 2518 เพื่ออนุรักษ์ทุ่งหญ้าและป่า", image: "/assets/IMG_62.jpg", address: "อ.นครไทย จ.พิษณุโลก", highlights: ["จุดชมวิว", "ทุ่งหญ้า", "ดอกไม้ป่า"] },
  { id: 23, name: "อุทยานแห่งชาติภูหินร่องกล้า", description: "ภูเขาหินปูนและทุ่งหญ้า", history: "ก่อตั้งปี 2519 เพื่ออนุรักษ์ธรรมชาติ", image: "/assets/IMG_63.jpg", address: "อ.นครไทย จ.พิษณุโลก", highlights: ["จุดชมวิว", "น้ำตก", "เส้นทางศึกษาธรรมชาติ"] },
  { id: 24, name: "อุทยานแห่งชาติแม่วงก์", description: "ป่าดิบเขาและสัตว์ป่า", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์สัตว์ป่า", image: "/assets/IMG_64.jpg", address: "อ.แม่วงก์ จ.นครสวรรค์", highlights: ["น้ำตกคลองพา", "เส้นทางเดินป่า", "สัตว์ป่า"] },
  { id: 25, name: "อุทยานแห่งชาติสามร้อยยอด", description: "ชายฝั่งทะเลและหาดทราย", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ทะเลและชายฝั่ง", image: "/assets/IMG_65.jpg", address: "อ.สามร้อยยอด จ.ประจวบคีรีขันธ์", highlights: ["หาดทราย", "เกาะ", "เส้นทางศึกษา"] },
  { id: 26, name: "อุทยานแห่งชาติแก่งกระจาน", description: "ป่าดิบและน้ำตก", history: "ก่อตั้งปี 2524 เพื่ออนุรักษ์สัตว์ป่า", image: "/assets/IMG_66.jpg", address: "อ.แก่งกระจาน จ.เพชรบุรี", highlights: ["น้ำตก", "เส้นทางเดินป่า", "ป่าเขา"] },
  { id: 27, name: "อุทยานแห่งชาติแม่ปิง", description: "ป่าเขาและน้ำตก", history: "ก่อตั้งปี 2523 เพื่ออนุรักษ์ป่า", image: "/assets/IMG_68.jpg", address: "อ.แม่แตง จ.เชียงใหม่", highlights: ["น้ำตก", "จุดชมวิว", "เส้นทางเดินป่า"] },
  { id: 28, name: "อุทยานแห่งชาติคลองลาน", description: "ภูเขาและป่าเขียว", history: "ก่อตั้งปี 2523 เพื่ออนุรักษ์ป่าไม้", image: "/assets/IMG_67.jpg", address: "อ.คลองลาน จ.กำแพงเพชร", highlights: ["น้ำตก", "ป่าไม้", "เส้นทางเดินป่า"] },
  { id: 29, name: "อุทยานแห่งชาติศรีนครินทร์", description: "ป่าเขาและอ่างเก็บน้ำ", history: "ก่อตั้งปี 2524 เพื่ออนุรักษ์ธรรมชาติ", image: "/assets/IMG_69.jpg", address: "อ.พนม จ.กาญจนบุรี", highlights: ["น้ำตก", "เขื่อน", "เส้นทางศึกษาธรรมชาติ"] },
  { id: 30, name: "อุทยานแห่งชาติขนอม-หมู่เกาะทะเลใต้", description: "ชายหาดและเกาะ", history: "ก่อตั้งปี 2525 เพื่ออนุรักษ์ทะเล", image: "/assets/IMG_70.jpg", address: "อ.ขนอม จ.นครศรีธรรมราช", highlights: ["ชายหาด", "เกาะ", "ดำน้ำ"]}
];

const ParksInfo = () => {
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <div>
      <Navbar />

      <header className="welcome-section">
        <h1>ยินดีต้อนรับสู่ สมุดอุทยาน Park Pass</h1>
        <p>รวมข้อมูลอุทยานแห่งชาติที่น่าสนใจ พร้อมประวัติและไฮไลต์สำคัญ</p>
      </header>

      <section className="parks-list">
        {parksData.map((park) => (
          <div key={park.id} className="park-card" onClick={() => setSelectedPark(park)}>
            <img src={park.image} alt={park.name} className="park-image" />
            <h2>{park.name}</h2>
            <p>{park.description}</p>
          </div>
        ))}
      </section>

      {selectedPark && (
        <div className="modal-overlay" onClick={() => setSelectedPark(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedPark(null)}>×</button>
            <h2>{selectedPark.name}</h2>
            <img src={selectedPark.image} alt={selectedPark.name} className="park-detail-image" />
            <p><strong>ที่อยู่:</strong> {selectedPark.address}</p>
            <p><strong>ประวัติ:</strong> {selectedPark.history}</p>
            <p><strong>ไฮไลต์:</strong></p>
            <ul>
              {selectedPark.highlights.map((item, idx) => (<li key={idx}>{item}</li>))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParksInfo;
