import { useState } from "react";
import { Avatar, Box, Button, ClickAwayListener, Paper, Popper, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const auth = useAuth();
    const userName = auth?.user?.name || "User";
    const userEmail = auth?.user?.email || "user@example.com";

    // Generate initials from the user's name
    const getInitials = (name: string) => {
        const nameParts = name.trim().split(" ");
        return nameParts.map((part) => part[0].toUpperCase()).join("").slice(0, 2); // First two initials
    };

    // State for dropdown visibility
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(open ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            {/* Clickable Avatar */}
            <Avatar
                sx={{
                    bgcolor: "white",
                    color: "black",
                    width: 40,
                    height: 40,
                    fontSize: 20,
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={handleClick}
            >
                {getInitials(userName)}
            </Avatar>

            {/* Popper for the dropdown menu */}
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                sx={{ zIndex: 1200, marginLeft: '20px' }}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Paper
                        sx={{
                            mt: 1,
                            p: 2,
                            minWidth: 200,
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                            backgroundColor: "white",
                            background: "rgba(255, 255, 255, 0.05)", // Transparent white background
                            backdropFilter: "blur(7px) saturate(180%)", // Blur + color enhancement
                            WebkitBackdropFilter: "blur(7px) saturate(180%)", // Safari support
                            borderRadius: "16px", // Soft rounded edges
                            border: "1px solid rgba(255, 255, 255, 0.2)", // Light border for depth
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h6" textAlign="center" fontWeight='700'>Welcome {userName}</Typography>
                        <Typography variant="body2" textAlign="center" fontWeight='700'>
                            {userEmail}
                        </Typography>
                        <Button
                            component={Link}
                            to="/"
                            onClick={auth?.logout}
                            sx={{
                                backgroundColor: "transparent", // Black background
                                color: "#FFF", // White text
                                fontWeight: "bold",
                                marginTop: "10px",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                textTransform: "none", // Avoid uppercase
                                border: "2px solid #FFF",
                                transition: "all 0.3s ease-in-out",
                                // Black border
                                "&:hover": {
                                    backgroundColor: "#FFF", // White background
                                    color: "#000", // Black text

                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </Box>
    );
};

export default Profile;
