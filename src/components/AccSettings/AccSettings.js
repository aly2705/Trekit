import classes from "./AccSettings.module.css";
import DetailsForm from "./DetailsForm";
import NewPasswordForm from "./NewPasswordForm";

const AccSettings = () => {
  return (
    <section className={classes.settings}>
      <h2>Account Settings</h2>

      <DetailsForm />
      <NewPasswordForm />
    </section>
  );
};

export default AccSettings;
