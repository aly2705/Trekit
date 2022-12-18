import classes from "./Options.module.css";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

const Options = () => {
  return (
    <div className={classes.options}>
      <SearchBar />
      <Menu />
    </div>
  );
};
export default Options;
