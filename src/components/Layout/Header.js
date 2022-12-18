import classes from "./Header.module.css";
import Logo from "./Logo";
import Options from "../UserOptions/Options";

const Header = () => {
  return (
    <header className={classes.header}>
      <Logo />
      <Options />
    </header>
  );
};

export default Header;
