import { Box, Avatar, Typography , useMediaQuery , useTheme, Theme} from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuth } from "../../contexts/AuthContext";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}


const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "model";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return role == "model" ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start", 
        justifyContent: "flex-start", 
        p: 1,
        gap: 2,
        borderRadius: 2,
        my: 1,
        mt:1,
      }}
    >
        <img src="/logo.svg" alt="ai" width={isMobile? 20 : 40} />
      <Box textOverflow={"wrap"}>
        {!messageBlocks && (
          <Typography sx={{ fontSize: isMobile? "15px":"20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript" className="syntax-highlighter">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: isMobile? "15px":"20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start", 
        justifyContent: "flex-start",
        p: isMobile? 1 : 3,
        bgcolor: "#2F2F2F",
        gap: 2,
        borderRadius: 7,
        mt:1,
        width:"full"
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "white", color: "black" , fontWeight:700 , width:isMobile? "20px" : "40px" , height:isMobile? "20px" : "40px" , fontSize:isMobile?"10px":"20px"}}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: isMobile? "15px":"20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript" className="syntax-highlighter">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: isMobile? "15px":"20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;