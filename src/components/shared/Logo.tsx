import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';

const Logo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if it's a mobile screen

  const logoSrc = '/logow.svg'; // Choose the correct logo source
  const logoWidth = isMobile ? 150 : 200; // Adjust width for mobile if needed

  return (
    <Link to={'/'} style={{ display: "flex", marginRight: "auto", alignItems: "center", gap: "4px" }}>
      <img src={logoSrc} alt='logo' width={logoWidth} style={{ marginTop: "5px" }} />
    </Link>
  );
}

export default Logo;