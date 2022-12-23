import Button from "../UI/Button";
import classes from "./AccSettings.module.css";

const DetailsForm = () => {
  return (
    <form>
      <h3>Manage Account Details</h3>
      <div className={classes.settings__group}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" value={`Alexandra Simion`} />
      </div>
      <div className={classes.settings__group}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" value={`alexandra@test.com`} />
      </div>
      <div className={classes.settings__radio}>
        <div>
          <input type="radio" id="male" name="gender" value="Male" />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input type="radio" id="female" name="gender" value="Female" />
          <label htmlFor="male">Female</label>
        </div>
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default DetailsForm;
