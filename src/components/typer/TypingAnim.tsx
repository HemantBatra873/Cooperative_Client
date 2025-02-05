import { useMediaQuery, useTheme, Theme } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With CooperativeAI",
        1000,
        "Built With Gemini 2.0 Flash",
        1000,
        "Fulltime assistance",
        1000,
      ]}
      speed={50}
      style={{
        fontSize: isMobile ? "50px" : isTab ? "60px" : '90px',
        color: "white",
        fontWeight: '900',
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        textShadow: "1px 1px 20px #000",
        margin: "0px 20px 160px 20px",
        alignContent: 'center',
        textAlign: 'center'
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;