import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme, Theme, AppBar, Toolbar, Typography, Drawer, Button, Link } from "@mui/material";
import ChatItem from "../components/chat/ChatItem";
import { IoMdMenu, IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import NavigationLink from "../components/shared/NavigationLink";
import Logo from "../components/shared/Logo";
import { FaImage } from "react-icons/fa";
type Message = {
  role: "user" | "model";
  content: string;
};
const Chat = () => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);


  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim() as string;
    if (!content) return; // Prevent empty messages

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  }, [chatMessages]); // Trigger effect when chatMessages updates

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 1,
        height: "100vh",
        width: "100vw",
      }}
    >
      <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", px: isMobile ? 1 : 3 }}>
          <Logo />
          <div>
            {auth?.isLoggedIn ? <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsDrawerOpen(true)}
              >
                <IoMdMenu />
              </IconButton>
              <NavigationLink to="/" text="Logout" onClick={auth?.logout}>
              </NavigationLink>
            </> : <>
              <NavigationLink to="/login" text="Login" >
              </NavigationLink>
              <NavigationLink to="/signup" text="Signup" >
              </NavigationLink>
            </>}
          </div>
        </Toolbar>
      </AppBar>

      {/* Sidebar Toolbar */}
      <Drawer
        sx={{ "& .MuiDrawer-paper": { bgcolor: "#171719" } }} // Dark but slightly lighter than black
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
            This is a chatbot project developed with Gemini Pro API
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              bgcolor: "#F7F7F7",
              color: "#1E1E1E",
              fontWeight: "700",
              borderRadius: 3,
              width: "100%",
              transition: "all 0.3s ease",
              ":hover": {
                bgcolor: "#3B3B3B",
                color: "#F7F7F7",
                border: "1px solid #F7F7F7",
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Drawer>

      {/* Chat box */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: isMobile ? 1 : 3,
        }}
      >
        {/* Chat Messages Container */}
        <Box
          ref={chatContainerRef}
          sx={{
            width: "100%", // Full width on mobile
            maxWidth: "750px", // Max width on larger screens
            height: "80vh",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {chatMessages.length === 0 ? (
            <Typography variant="h6" color="gray" textAlign="center" marginTop={25}>
              This is an AI chatbot website developed with MERN stack using Material-UI and Gemini 2.0 Flash API.
              The source code is available at{" "}
              <Link
                href="https://github.com/HemantBatra873/agraser_backend" // Replace with your actual GitHub link
                target="_blank"
                rel="noopener noreferrer"
                color="white"
                underline="hover"
              >
                GitHub
              </Link>.
              You can contact{" "}
              <Link
                href="https://www.linkedin.com/in/hemantbatra43/" // Replace with your email or contact page
                color="white"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                me
              </Link>{" "}
              for more information about the project.
            </Typography>
          ) : (
            chatMessages.map((chat, index) => (
              //@ts-ignore
              <ChatItem content={chat.content} role={chat.role} key={index} />
            ))
          )}
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            position: "fixed",  // Fix at the bottom of the screen
            bottom: 0,
            right: 0,
            left: 0,
            width: "90%",
            maxWidth: "750px", // Controls max width on larger screens
            mx: "auto", // Centers it horizontally
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: isMobile ? 1 : 2,
          }}
        >
          {/* Input and Buttons Container */}
          <Box
            sx={{
              width: "100%", // Full width on mobile
              maxWidth: "750px", // Max width for large screens
              borderRadius: 12,
              border: "1px solid grey",
              backgroundColor: "#171719",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton sx={{
              color: "grey", mx: 1, transition: "color 0.3s ease", // Smooth transition effect
              ":hover": {
                color: "white", // Change color to white on hover
              },
            }}>
              <FaImage />
            </IconButton>

            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Cooperative"
              style={{
                width: "100%",
                fontWeight: "400",
                backgroundColor: "#171719",
                padding: "18px",
                paddingLeft: "0px",
                paddingRight: "0px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: isMobile ? "16px" : "16px",
                borderRadius: "12px",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevents adding a new line in input
                  handleSubmit();
                }
              }}
            />
            <IconButton onClick={handleSubmit} sx={{
              color: "grey", mx: 1, transition: "color 0.3s ease", // Smooth transition effect
              ":hover": {
                color: "white", // Change color to white on hover
              },
            }}>
              <IoMdSend />
            </IconButton>
          </Box>

          {/* Warning Message */}
          <Typography
            variant="body2"
            color="gray"
            fontSize="13px"
            textAlign="center"
            sx={{ marginTop: 1 }}
          >
            Cooperative can make mistakes, so double-check it.
          </Typography>
        </Box>

      </Box>


    </Box>
  );
};

export default Chat;