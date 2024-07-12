import { useMediaQuery, useTheme , Theme} from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat With Your OWN AI",
        1000,
        "Built With Gemini Pro",
        1000,
        "Your fulltime assistant",
        1000,
      ]}
      speed={50}
      style={{
        fontSize:isMobile ? "40px" : "60px",
        color: "white",
        display: "flex",
        alignItems:"center",
        justifyContent:'center',
        textShadow: "1px 1px 20px #000",
        margin:"0px 20px 0px 20px"
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;