import classes from "./Profile.module.css";
import femaleAvatar from "../../assets/female.svg";

const Profile = (name) => {
  return (
    <figure className={classes.profile}>
      {/* <span className={classes.profile__pic}>AS</span> */}
      <img src={femaleAvatar} alt="female-profile" />
      <figcaption>Alexandra Simion</figcaption>
    </figure>
  );
};

export default Profile;
