import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "./Share.css";

const Share = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("parkPosts");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const addPost = () => {
    if (text.trim() === "" && !image) return;

    const newPost = {
      id: Date.now(),
      username: "ผู้ใช้ตัวอย่าง", // สามารถดึงจาก auth จริง
      avatar: "https://i.pravatar.cc/50", // ตัวอย่าง avatar
      text,
      image,
      date: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("parkPosts", JSON.stringify(updatedPosts));

    setText("");
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const shareToFacebook = (post) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.text);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      "_blank"
    );
  };

  return (
    <div>
      <Navbar />
      <div className="share-container">
        <h1>แชร์ความสำเร็จของคุณ</h1>

        <div className="share-editor">
          <textarea
            placeholder="เขียนความสำเร็จหรือโพสต์ข้อความของคุณ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {image && <img src={image} alt="Preview" className="preview-img" />}
          <div className="share-actions">
            <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
            <button onClick={addPost}>โพสต์</button>
          </div>
        </div>

        <div className="posts">
          {posts.length === 0 && <p>ยังไม่มีโพสต์</p>}
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <img src={post.avatar} alt="avatar" className="avatar"/>
                <div>
                  <strong>{post.username}</strong>
                  <div className="post-date">{post.date}</div>
                </div>
              </div>
              {post.text && <p className="post-text">{post.text}</p>}
              {post.image && <img src={post.image} alt="Post" className="post-img"/>}
              <div className="post-footer">
                <button onClick={() => shareToFacebook(post)}>แชร์ไป Facebook</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Share;
