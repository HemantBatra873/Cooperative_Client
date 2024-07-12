import { Typography } from '@mui/material'


const Logo = () => {
  return (
    <div style={{display:"flex" , marginRight:"auto" , alignItems:"center" , gap:"4px"}}>
        <img src='/logo.svg' alt='logo' width={40}  style={{marginTop: "5px"}}/>
        <Typography sx={{display : {md : "block" , sm : "block" , xs : "none"},
           mr:"auto" ,fontWeight:"400" , textShadow:"2px 2px 20px #000" , }}>
            <span style={{fontSize:"35px"}}>Agraser</span>
        </Typography>
    </div>
  )
}

export default Logo