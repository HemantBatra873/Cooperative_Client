import TextField from "@mui/material/TextField";
import {
  useMediaQuery,
  useTheme,
  Theme,
} from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: isMobile? "250px" : "400px",
          borderRadius: 10,
          fontSize: isMobile? 15 : 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;