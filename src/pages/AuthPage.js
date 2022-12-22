import classes from "./AuthPage.module.css";
import Login from "../components/Auth/Login";
import authImg from "../assets/phone-pin.svg";
import Logo from "../components/Layout/Logo";

const AuthPage = () => {
  return (
    <div className={classes.auth}>
      <div className={classes.auth__logo}>
        <Logo />
      </div>
      <div className={classes.auth__form}>
        <Login />
      </div>
      <div className={classes.auth__illustration}>
        <img src={authImg} alt="illustration with a location pin on a phone" />
      </div>
    </div>
  );
};

export default AuthPage;
