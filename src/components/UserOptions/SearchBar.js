import classes from "./SearchBar.module.css";
import icons from "../../assets/icons.svg";

const SearchBar = () => {
  return (
    <div className={classes.search}>
      <svg>
        <use href={`${icons}#icon-search`}></use>
      </svg>
      <input type="text" placeholder="Search for a trip..." />
    </div>
  );
};

export default SearchBar;
