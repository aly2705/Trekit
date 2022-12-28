import AccSettings from "../components/AccSettings/AccSettings";
import classes from "./AccPage.module.css";
import Profile from "../components/User/Profile";
import Button from "../components/UI/Button";
import icons from "../assets/icons.svg";
import { NavLink } from "react-router-dom";

const AccPage = () => {
  return (
    <section className={classes.account}>
      <NavLink to="/map" className={classes.account__back}>
        <svg>
          <use href={`${icons}#icon-arrow-left`}></use>
        </svg>
      </NavLink>
      <div className={classes.account__profile}>
        <Profile />
        <div className={classes.account__buttons}>
          <Button>Logout</Button>
          <Button secondaryColor={true}>Delete Account</Button>
        </div>
      </div>
      <AccSettings />
    </section>
  );
};

export default AccPage;
