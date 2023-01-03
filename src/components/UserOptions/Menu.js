import ReactDOM from "react-dom";
import classes from "./Menu.module.css";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Overlay from "../UI/Overlay";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const clickHandler = () => {
    setIsOpen((prev) => !prev);
  };

  const buttonClasses = isOpen
    ? `${classes.menu} ${classes.menu__open}`
    : classes.menu;
  return (
    <>
      <button onClick={clickHandler} className={buttonClasses}>
        <span className={classes.bar}></span>
      </button>
      <Sidebar isOpen={isOpen} onClose={clickHandler} />
      {ReactDOM.createPortal(
        <Overlay visible={isOpen} onClose={clickHandler} />,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Menu;
