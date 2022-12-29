import classes from "./AccountProfile.module.css";
import Profile from "./Profile";
import Button from "../UI/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { API_URL } from "../../helpers/config";
import useAJAX from "../../hooks/useAJAX";

const AccountProfile = () => {
  const authContext = useContext(AuthContext);
  const { sendRequest: deleteAccRequest, error, isLoading } = useAJAX();
  const logoutHandler = () => {
    authContext.onLogout();
  };

  const deleteAccountHandler = () => {
    const reqConfig = {
      url: `${API_URL}/users`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authContext.token}`,
      },
    };
    deleteAccRequest(reqConfig, logoutHandler);
  };
  return (
    <div className={classes.account__profile}>
      <Profile />
      <div className={classes.account__buttons}>
        <Button onClick={logoutHandler}>Logout</Button>
        <Button secondary={true} onClick={deleteAccountHandler}>
          Delete Account
        </Button>
      </div>
      {error && <p className="error">{error.message}</p>}

      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default AccountProfile;
