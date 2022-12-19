import classes from "./Sidebar.module.css";
import Profile from "../User/Profile";
import SidebarList from "./SidebarList";
import Button from "../UI/Button";

const Sidebar = ({ isOpen }) => {
  const sidebarClasses = isOpen
    ? `${classes.sidebar} ${classes.sidebar__open}`
    : classes.sidebar;
  return (
    <aside className={sidebarClasses}>
      <Profile />
      <SidebarList />
      <Button>Logout</Button>
    </aside>
  );
};

export default Sidebar;
