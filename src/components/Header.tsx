import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useAuth } from '../contexts/AuthContext'
import NavigationLink from './shared/NavigationLink'
import Profile from './shared/profile'
import { Link } from 'react-router-dom'


const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ width: 40, height: 40 }}>
                <IconButton
                  component={Link}
                  to="/chat"
                  color="inherit"
                  aria-label="chat"
                  sx={{ width: "100%", height: "100%", padding: '0' }}
                >
                  <IoChatbubbleEllipsesOutline style={{ width: "100%", height: "100%" }} />
                </IconButton>
              </Box>
              <Profile />
            </Box>

          ) : (
            <>
              <NavigationLink to="/login" text="Login" />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header