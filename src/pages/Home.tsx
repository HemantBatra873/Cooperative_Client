import { Box} from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
  return (
    <Box width={"100%"} height={"80vh"} display={"flex"} alignItems={"center"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent:"center",
        }}
      >
        <TypingAnim />
      </Box>
    </Box>
  );
};

export default Home;