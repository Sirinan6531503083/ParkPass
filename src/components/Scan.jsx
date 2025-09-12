import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { Html5Qrcode } from "html5-qrcode";
import Navbar from "./Navbar";
import "./Scan.css";

const Scan = () => {
  const [step, setStep] = useState(1);
  const [scannedData, setScannedData] = useState(null);
  const [image, setImage] = useState(null);
  const [signed, setSigned] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const sigPad = useRef(null);
  const navigate = useNavigate();
  const qrRegionId = "qr-reader";

  const startScanner = () => {
    const html5QrCode = new Html5Qrcode(qrRegionId);
    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setScannedData(decodedText);
          html5QrCode.stop().catch(() => {});
          setStep(2);
        }
      )
      .catch((err) => console.error("QR Scanner start error:", err));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setStep(2);
    }
  };

  const clearSignature = () => {
    sigPad.current.clear();
    setSigned(false);
  };

  const saveSignature = () => {
    if (!sigPad.current.isEmpty()) setSigned(true);
  };

  const confirm = () => {
    alert(`ยืนยันสำเร็จ! สถานที่: ${scannedData || "รูปอัปโหลด"}`);
    navigate("/collect");
  };

  const verifyStaff = () => setIsStaff(true);

  return (
    <div className="checkin-container">
      <Navbar />

      {step === 1 && (
        <div className="checkin-step">
          <h1>สแกน QR Code</h1>

          <div id={qrRegionId} className="qr-reader"></div>
          <button onClick={startScanner} className="btn">เริ่มสแกน QR Code</button>

          <p>หรือเลือกภาพจากเครื่อง</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}

      {step === 2 && (
        <div className="signature-step">
          {!isStaff ? (
            <>
              <h2>เจ้าหน้าที่ต้องยืนยันตัวตนก่อนเซ็น</h2>
              <button onClick={verifyStaff} className="btn">
                ลายเซ็นต์ยืนยันตัวตนเจ้าหน้าที่
              </button>
            </>
          ) : (
            <>
              <h2>✅ ยืนยันการมาถึงที่นี่</h2>
              <p>สถานที่: {scannedData || "รูปอัปโหลด"}</p>

              {image && <img src={image} alt="Uploaded" className="preview-img" />}

              <SignatureCanvas
                ref={sigPad}
                penColor="black"
                canvasProps={{ width: 300, height: 150, className: "signature-canvas" }}
              />
              <div className="sig-buttons">
                <button onClick={clearSignature} className="btn-small">ล้าง</button>
                <button onClick={saveSignature} className="btn-small">บันทึก</button>
              </div>
              {signed && <p>✅ เซ็นเรียบร้อยแล้ว</p>}

              <button onClick={confirm} className="btn" disabled={!signed}>
                ยืนยัน
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Scan;
