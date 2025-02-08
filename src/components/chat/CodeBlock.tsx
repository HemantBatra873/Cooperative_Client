import { Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AiOutlineCopy } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";

const CodeBlock = ({ content, language = "javascript" }: { content: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            toast.success("Copied to clipboard!");
            setTimeout(() => setCopied(false), 2000); // Reset copied state
        } catch (error) {
            toast.error("Failed to copy!");
        }
    };

    return (
        <Box
            sx={{
                overflowX: "auto",
                fontFamily: "PT Sans , Roboto Slab , serif",
                borderRadius: "10px",
                border: "1px solid #333",
                background: "#1e1e1e",
                position: "relative",
                paddingTop: "30px",
                marginTop: "30px",
            }}
        >
            {/* Header with Language and Copy Button */}
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    background: "#222",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    boxSizing: "border-box",
                }}
            >
                <Typography sx={{ color: "#aaa", fontSize: "14px" }}>{language}</Typography>
                <button
                    onClick={handleCopy}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: copied ? "#fff" : "#aaa",
                        fontSize: "16px",
                    }}
                >
                    <AiOutlineCopy />
                </button>
            </Box>

            {/* Code Block */}
            <SyntaxHighlighter
                style={coldarkDark}
                language={language}
                className="syntax-highlighter"
                customStyle={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    overflowX: "auto",
                    padding: "10px",
                    borderRadius: "0 0 10px 10px",
                }}
            >
                {content}
            </SyntaxHighlighter>

        </Box>
    );
};

export default CodeBlock;
