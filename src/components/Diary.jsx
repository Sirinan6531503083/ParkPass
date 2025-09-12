import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "./Diary.css";

const Diary = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("diaryEntries");
    if (saved) {
      return JSON.parse(saved).map(entry => ({
        ...entry,
        keywords: Array.isArray(entry.keywords) ? entry.keywords : [],
        favorite: entry.favorite || false
      }));
    }
    return [];
  });

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [keywords, setKeywords] = useState(""); 
  const [editingId, setEditingId] = useState(null);
  const [modalEntry, setModalEntry] = useState(null);
  const fileInputRef = useRef(null);

  const saveEntry = () => {
    if (text.trim() === "" && !image) return;

    const newEntry = {
      id: editingId || Date.now(),
      text,
      image,
      keywords: keywords.split(",").map(k => k.trim()).filter(k => k),
      date: new Date().toLocaleString(),
      favorite: false
    };

    let updatedEntries;
    if (editingId) {
      updatedEntries = entries.map(e => (e.id === editingId ? newEntry : e));
    } else {
      updatedEntries = [newEntry, ...entries];
    }

    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));

    setText("");
    setImage(null);
    setKeywords("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const deleteEntry = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem("diaryEntries", JSON.stringify(updated));
  };

  const editEntry = (entry) => {
    setText(entry.text);
    setImage(entry.image || null);
    setKeywords(entry.keywords.join(", "));
    setEditingId(entry.id);
  };

  const toggleFavorite = (id) => {
    const updated = entries.map(e => e.id === id ? { ...e, favorite: !e.favorite } : e);
    setEntries(updated);
    localStorage.setItem("diaryEntries", JSON.stringify(updated));
  };

  const viewEntry = (entry) => {
    setModalEntry(entry);
  };

  const closeModal = () => setModalEntry(null);

  return (
    <div>
      <Navbar />
      <div className="diary-container">
        <h1>สมุดบันทึก</h1>

        <div className="diary-editor">
          <textarea
            placeholder="เขียนบันทึกของคุณที่นี่..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {image && <img src={image} alt="Preview" className="preview-img" />}
          <input
            type="text"
            placeholder="คีย์เวิร์ดหลัก (คั่นด้วย ,)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <div className="diary-actions">
            <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            <button onClick={saveEntry}>{editingId ? "บันทึกการแก้ไข" : "บันทึก"}</button>
          </div>
        </div>

        <div className="entries">
          {entries.length === 0 && <p>ยังไม่มีบันทึก</p>}
          {entries.map((entry) => (
            <div key={entry.id} className="entry-card">
              <div className="entry-date">{entry.date}</div>
              <div className="entry-keywords">
                {Array.isArray(entry.keywords) &&
                  entry.keywords.map((k, i) => (
                    <span key={i} className="keyword" onClick={() => viewEntry(entry)}>
                      #{k}
                    </span>
                  ))}
              </div>
              {entry.text && <p>{entry.text}</p>}
              {entry.image && <img src={entry.image} alt="Entry" />}
              <div className="entry-actions">
                <button onClick={() => editEntry(entry)}>แก้ไข</button>
                <button onClick={() => deleteEntry(entry.id)}>ลบ</button>
                <button onClick={() => toggleFavorite(entry.id)}>
                  {entry.favorite ? "❤️" : "🤍"}
                </button>
                <button onClick={() => viewEntry(entry)}>ดูเต็ม</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalEntry && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{modalEntry.date}</h3>
            <div className="entry-keywords">
              {Array.isArray(modalEntry.keywords) &&
                modalEntry.keywords.map((k,i) => <span key={i} className="keyword">#{k}</span>)}
            </div>
            <p>{modalEntry.text}</p>
            {modalEntry.image && <img src={modalEntry.image} alt="Entry" />}
            <button onClick={closeModal}>ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;
