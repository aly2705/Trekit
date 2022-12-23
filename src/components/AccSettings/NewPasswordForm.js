import Button from "../UI/Button";
import classes from "./AccSettings.module.css";

const NewPasswordForm = () => {
  return (
    <form>
      <h3>Change your password</h3>
      <div className={classes.settings__group}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" />
      </div>
      <div className={classes.settings__group}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" />
      </div>
      <div className={classes.settings__group}>
        <label htmlFor="password-confirm">Password Confirm</label>
        <input type="password" id="password-confirm" />
      </div>
      <Button type="submit">Update Password</Button>
    </form>
  );
};

export default NewPasswordForm;
