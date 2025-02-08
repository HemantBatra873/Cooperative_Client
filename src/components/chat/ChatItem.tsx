import { Box, Typography, useMediaQuery, useTheme, Theme } from "@mui/material";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike, AiOutlineCopy, AiOutlineSound, AiOutlineExclamationCircle } from "react-icons/ai";
import React, { useRef, useState } from 'react';
import AnimatedThinkingText from "./ThinkingAnimation";
import toast from "react-hot-toast";
import CodeBlock from "./CodeBlock";

interface MessageBlock {
  type: "code" | "text";
  content: string;
  language?: string;
}

function extractCodeBlocks(message: string): MessageBlock[] {
  const blocks: MessageBlock[] = [];
  const regex = /```([a-z]*)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(message)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({ type: "text", content: message.substring(lastIndex, match.index).trim() });
    }
    const language = match[1] || "";
    const code = match[2].trim();
    blocks.push({ type: "code", content: code, language });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < message.length) {
    blocks.push({ type: "text", content: message.substring(lastIndex).trim() });
  }

  return blocks;
}

function formatResponse(text: string): string {
  return text.split('\n').map(line => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (line.trim().startsWith('*')) {
      return `<li>${line.trim().substring(1).trim()}</li>`;
    }
    return `<p>${line.trim()}</p>`;
  }).join('');
}

interface ChatItemProps {
  content: string;
  role: "user" | "model";
  loading?: boolean;
  generating?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ content, role, loading, generating }) => {
  const messageBlocks = extractCodeBlocks(content);
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // State for feedback
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Handle listen button (Text-to-Speech)
  const handleListen = () => {
    if (!("speechSynthesis" in window)) {
      toast.error("Text-to-speech not supported in this browser!");
      return;
    }

    if (isSpeaking) {
      // Stop speaking
      speechSynthesis.cancel();
      setIsSpeaking(false);
      toast("🛑 Reading stopped");
    } else {
      // Start speaking
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.onend = () => setIsSpeaking(false); // Reset state when done
      speechUtteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      toast("🎵 Playing response...");
    }
  };

  // Handle report button
  const handleReport = () => {
    toast("Report sent for review!", { icon: "⚠️" });
  };

  // Handle like button
  const handleLike = () => {
    setLiked(true);
    setDisliked(false); // Reset dislike
    toast.success("You liked the response!");
  };

  // Handle dislike button
  const handleDislike = () => {
    setDisliked(true);
    setLiked(false); // Reset like
    toast.error("You disliked the response!");
  };

  // Handle copy button
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };


  const userStyles = {
    MaxWidth: isMobile ? "250px" : "500px",
    bgcolor: "white",
    color: "blue",
    px: 2,
    borderRadius: "12px",
    borderTopRightRadius: "2px",
  };

  const modelStyles = {
    width: "100%",
    paddingBottom: '30px',
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: role === "model" ? "flex-start" : "flex-end",
        justifyContent: "flex-start",
        borderRadius: 2,
        maxWidth: "100%",
        wordBreak: "break-word", // Ensures long words wrap properly
      }}
    >
      {role === "model" && <img src="/logow.svg" alt="ai" width={isMobile ? 120 : 140} />}
      <Box sx={role === "user" ? userStyles : modelStyles}>


        {role === "model" && loading ? (
          <AnimatedThinkingText />
        ) : (
          messageBlocks.map((block, index) => (
            <React.Fragment key={index}>
              {block.type === "text" ? (
                <Typography component="div" sx={{
                  fontSize: '16px',
                  color: role === "model" ? "white" : "black",
                  fontWeight: role === "model" ? "400" : "700",
                  marginX: '0',
                }}>
                  <div dangerouslySetInnerHTML={{ __html: formatResponse(block.content) }} />
                </Typography>
              ) : (
                <CodeBlock content={block.content} language={block.language || "javascript"} />
              )}

            </React.Fragment>

          ))
        )}

        {role === "model" && !generating && (
          <Box
            sx={{
              display: "flex",
              marginTop: "15px",
            }}
          >
            {/* Like Button */}
            <button
              onClick={handleLike}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                fontSize: "18px",
              }}
            >
              {liked ? <AiFillLike /> : <AiOutlineLike />}
            </button>

            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                fontSize: "18px",
              }}
            >
              {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                fontSize: "18px",
              }}
            >
              <AiOutlineCopy />
            </button>

            {/* Listen Button */}
            <button
              onClick={handleListen}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isSpeaking ? "#fff" : "#aaa",
                fontSize: "18px",
              }}
            >
              <AiOutlineSound />
            </button>

            {/* Report Button */}
            <button
              onClick={handleReport}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#aaa",
                fontSize: "18px",
              }}
            >
              <AiOutlineExclamationCircle />
            </button>
          </Box>
        )}

      </Box>

    </Box>
  );
};


export default ChatItem;