import AccSettings from "../components/AccSettings/AccSettings";
import classes from "./AccPage.module.css";
import icons from "../assets/icons.svg";
import { NavLink } from "react-router-dom";
import AccountProfile from "../components/User/AccountProfile";

const AccPage = () => {
  return (
    <section className={classes.account}>
      <NavLink to="/map" className={classes.account__back}>
        <svg>
          <use href={`${icons}#icon-arrow-left`}></use>
        </svg>
      </NavLink>
      <AccountProfile />
      <AccSettings />
    </section>
  );
};

export default AccPage;
