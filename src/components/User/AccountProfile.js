import classes from "./AccountProfile.module.css";
import Profile from "./Profile";
import Button from "../UI/Button";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { API_URL } from "../../helpers/config";
import useAJAX from "../../hooks/useAJAX";
import ConfirmModal from "../UI/ConfirmModal";

const AccountProfile = () => {
  const authContext = useContext(AuthContext);
  const { sendRequest: deleteAccRequest, error, isLoading } = useAJAX();
  const [isConfirming, setIsConfirming] = useState(false);
  const logoutHandler = () => {
    authContext.onLogout();
  };

  const abortActionHandler = () => {
    setIsConfirming(false);
  };
  const confirmDeleteHandler = () => {
    setIsConfirming(true);
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
        <Button secondary={true} onClick={confirmDeleteHandler}>
          Delete Account
        </Button>
      </div>
      {error && <p className="error">{error.message}</p>}

      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {isConfirming && (
        <ConfirmModal
          message="Your account will be permanently deleted. This action cannot be undone."
          onConfirm={deleteAccountHandler}
          onClose={abortActionHandler}
        />
      )}
    </div>
  );
};

export default AccountProfile;
