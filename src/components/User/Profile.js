import classes from "./Profile.module.css";
import femaleAvatar from "../../assets/female.svg";
import maleAvatar from "../../assets/male.svg";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Profile = () => {
  const user = useContext(AuthContext).user;
  return (
    <figure className={classes.profile}>
      <img
        src={user.gender === "female" ? femaleAvatar : maleAvatar}
        alt="profile-avatar"
      />
      <figcaption>{user.name}</figcaption>
    </figure>
  );
};

export default Profile;
