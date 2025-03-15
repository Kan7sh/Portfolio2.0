import React from "react";
import { QRCodeSVG } from "qrcode.react"; 
const QRComponent = ({ email, color }) => {
  // Generate the email link
  const emailLink = `mailto:${email}`;

  return (
    <div style={{ position: "fixed", top: "25px", left: "25px", zIndex: 1000 }}>
      <QRCodeSVG
        value={emailLink}
        size={80} 
        fgColor={color} 
        bgColor="transparent" 
      />
    </div>
  );
};

export default QRComponent;