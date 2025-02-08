import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const AnimatedThinkingText = () => {
    return (
        <motion.div
            animate={{ opacity: [1, 0.5, 1] }} // Pulsing effect
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
            <Typography
                sx={{
                    fontSize: "18px",
                    paddingY: "13px",
                    fontWeight: "600",
                    color: "white", // Text remains white
                    textShadow: "0 0 10px rgba(128, 128, 128, 0.5)", // Grey glow effect
                }}
            >
                Thinking...
            </Typography>
        </motion.div>
    );
};

export default AnimatedThinkingText;
