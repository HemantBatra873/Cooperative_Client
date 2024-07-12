import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
  onClick?: () => Promise<void>;
};
const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="navlink"
      to={props.to}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;