import { Box } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Header from "../components/Header";
import video from '/video.mp4';

const Home = () => {
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%) brightness(0.6) contrast(1.9) saturate(1.9)",
          zIndex: 0, // Push it behind content
        }}
      />
      <Header />
      {/* Other Content on top of video */}
      <Box
        sx={{
          position: "relative",
          bgcolor: 'transparent',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Example: Your Typing Animation Component */}
        <TypingAnim />
      </Box>
    </Box>
  );
};

export default Home;