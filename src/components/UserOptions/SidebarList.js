import classes from "./SidebarList.module.css";
import { NavLink } from "react-router-dom";

const SidebarList = ({ isOpen }) => {
  return (
    <ul className={classes.sidebar__list}>
      <li>
        <button>Show All Trips</button>
      </li>
      <li>
        <button>Add New Trip</button>
      </li>
      <li>
        <NavLink to="/account">Account settings</NavLink>
      </li>
    </ul>
  );
};

export default SidebarList;
