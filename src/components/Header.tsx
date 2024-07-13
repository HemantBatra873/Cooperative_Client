import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../contexts/AuthContext'
import NavigationLink from './shared/NavigationLink'


const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{bgcolor:"transparent" , position:"static" , boxShadow:"none"}}>
      <Toolbar sx = {{display:"flex"}}>
        <Logo/>
        <div>
          {auth?.isLoggedIn ? <>
          <NavigationLink to="/chat" text="Chat"/>
          <NavigationLink to="/" text="Logout" onClick={auth?.logout}>
          </NavigationLink>
          </> : <>
          <NavigationLink   to="/login"  text="Login" >
          </NavigationLink>
          <NavigationLink   to="/signup"  text="Signup" >
          </NavigationLink>
          </>}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header