import { Box, Typography, useMediaQuery, useTheme, Theme } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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

function formatResponse(response: string): string {
  // Split response by newline indicators and format them appropriately
  const formattedResponse = response
    .split('\n')
    .map((line) => {
      // Handle bold text formatting
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Handle list items
      if (line.trim().startsWith('*')) {
        return `<li>${line.trim().substring(1).trim()}</li>`;
      }

      // Handle normal paragraphs
      return `<p>${line.trim()}</p>`;
    })
    .join('');

  return formattedResponse;
}


const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "model";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return role == "model" ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        p: 1,
        borderRadius: 2,
      }}
    >
      <img src="/logow.svg" alt="ai" width={isMobile ? 120 : 140} />
      <Box textOverflow={"wrap"}>
        {!messageBlocks && (
          <Typography component="div" sx={{ fontSize: isMobile ? '17px' : '20px' }}>
            <div dangerouslySetInnerHTML={{ __html: formatResponse(content) }} />
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript" className="syntax-highlighter">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: isMobile ? "17px" : "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
    >
      <Box>
        {!messageBlocks && (
          <Typography sx={{
            maxWidth: isMobile ? '250px' : '550px',
            fontSize: isMobile ? '17px' : '20px', color: "black",
            bgcolor: "white",
            fontWeight: isMobile ? '700' : '400',
            p: isMobile ? '10px' : '12px',
            gap: 2,
            borderRadius: 5,
            borderTopRightRadius: 1,
          }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript" className="syntax-highlighter">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: isMobile ? "17px" : "20px" }}>{block}</Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;