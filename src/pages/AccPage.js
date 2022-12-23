import AccSettings from "../components/AccSettings/AccSettings";
import classes from "./AccPage.module.css";
import Profile from "../components/User/Profile";
import Button from "../components/UI/Button";

const AccPage = () => {
  return (
    <section className={classes.account}>
      <div className={classes.account__profile}>
        <Profile />
        <div className={classes.account__buttons}>
          <Button>Logout</Button>
          <Button className={classes["account__btn-secondary"]}>
            Delete Account
          </Button>
        </div>
      </div>
      <AccSettings />
    </section>
  );
};

export default AccPage;
