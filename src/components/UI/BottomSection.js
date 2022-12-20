import classes from "./BottomSection.module.css";

const BottomSection = (props) => {
  const CSSClasses = props.isVisible
    ? `${classes["bottom-section"]} ${classes["bottom-section__active"]}`
    : classes["bottom-section"];

  return <section className={CSSClasses}>{props.children}</section>;
};

export default BottomSection;
