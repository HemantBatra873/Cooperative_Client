import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, useMediaQuery, useTheme, Theme } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import video from '/video.mp4';
const Signup = () => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%) brightness(0.6) contrast(1.9) saturate(1.9)",
          zIndex: 0, // Push it behind content
        }}
      />
      <Header />
      {/* Other Content on top of video */}
      <Box
        sx={{
          position: "relative",
          bgcolor: 'transparent',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={2}
          marginBottom={12}
          sx={{
            background: "rgba(255, 255, 255, 0.05)", // Transparent white background
            backdropFilter: "blur(7px) saturate(180%)", // Blur + color enhancement
            WebkitBackdropFilter: "blur(7px) saturate(180%)", // Safari support
            borderRadius: "16px", // Soft rounded edges
            border: "1px solid rgba(255, 255, 255, 0.2)", // Light border for depth
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              margin: "auto",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                padding={2}
                paddingTop={0}
                fontWeight={600}
              >
                Signup
              </Typography>
              <CustomizedInput type="text" name="name" label="Name" />
              <CustomizedInput type="email" name="email" label="Email" />
              <CustomizedInput type="password" name="password" label="Password" />
              <Button
                type="submit"
                sx={{
                  px: 2,
                  fontSize: 18,
                  fontWeight: "bold",
                  py: 1,
                  mt: 2,
                  width: isMobile ? "250px" : " 400px",
                  borderRadius: 2,
                  border: "1px solid transparent",
                  bgcolor: "#E1E1E1",
                  color: "#3B3B3B",
                  transition: "all 0.5s ease",
                  ":hover": {
                    bgcolor: "transparent",
                    color: "#E1E1E1",
                    border: "1px solid #F7F7F7"
                  },
                }}
                endIcon={<IoIosLogIn />}
              >
                Signup
              </Button>
              <Typography
                variant="body2"
                color="grey"
                mt={2}
                textAlign="center"
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: 'white',
                    textDecoration: 'none', // Remove default underline
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;

