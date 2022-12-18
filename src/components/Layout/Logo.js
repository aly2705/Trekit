import logo from "../../assets/logo-dark.png";
import classes from "./Logo.module.css";
const Logo = () => {
  return (
    <figure className={classes.logo}>
      <img src={logo} alt="app-logo" className={classes.logo__img} />
      <figcaption className={classes.logo__name}>Trekit</figcaption>
    </figure>
  );
};

export default Logo;
