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
        "Experience Intelligent Conversations with CooperativeAI",
        1200,
        "Powered by Gemini 2.0 Flash for Lightning-Fast Responses",
        1200,
        "Your 24/7 Smart Assistant, Always Ready to Help",
        1200,
      ]}
      speed={50}
      style={{
        fontSize: isMobile ? "40px" : isTab ? "50px" : '80px',
        width: isMobile ? "250px" : isTab ? "460px" : '690px',
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