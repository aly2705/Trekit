import classes from "./Sidebar.module.css";
import Profile from "../User/Profile";
import SidebarList from "./SidebarList";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/auth");
  };
  const sidebarClasses = isOpen
    ? `${classes.sidebar} ${classes.sidebar__open}`
    : classes.sidebar;

  return (
    <aside className={sidebarClasses}>
      <Profile />
      <SidebarList />
      <Button onClick={logoutHandler}>Logout</Button>
    </aside>
  );
};

export default Sidebar;
