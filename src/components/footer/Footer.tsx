import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          height: "20vh",
          display:"flex",
          justifyContent:"center",
          textAlign:"center",
          margin:0,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Copyright 2024 <FaCopyright/> Hemant Batra
        </p>
      </div>
    </footer>
  );
};

export default Footer;