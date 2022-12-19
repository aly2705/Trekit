import classes from "./SidebarList.module.css";

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
        <button>Account settings</button>
      </li>
    </ul>
  );
};

export default SidebarList;
