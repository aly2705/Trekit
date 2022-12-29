import { useContext, useRef } from "react";
import { API_URL } from "../../helpers/config";
import useAJAX from "../../hooks/useAJAX";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import classes from "./AccSettings.module.css";

const NewPasswordForm = () => {
  const oldPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const newPasswordConfirmInputRef = useRef();
  const { sendRequest, isLoading, error, setError } = useAJAX();
  const { token } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredNewPasswordConfirm = newPasswordConfirmInputRef.current.value;

    if (enteredNewPassword !== enteredNewPasswordConfirm) {
      setError(new Error("Password confirm must be the same as password!"));
      return;
    }

    const reqConfig = {
      url: `${API_URL}/users/updatePassword`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: {
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
        newPasswordConfirm: enteredNewPasswordConfirm,
      },
    };
    const clearFields = () => {
      oldPasswordInputRef.current.value = "";
      newPasswordInputRef.current.value = "";
      newPasswordConfirmInputRef.current.value = "";
    };
    sendRequest(reqConfig, clearFields);
  };
  return (
    <form onSubmit={submitHandler}>
      <h3>Change your password</h3>
      <div className={classes.settings__group}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          ref={oldPasswordInputRef}
          required
        />
      </div>
      <div className={classes.settings__group}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          required
        />
      </div>
      <div className={classes.settings__group}>
        <label htmlFor="password-confirm">Password Confirm</label>
        <input
          type="password"
          id="password-confirm"
          ref={newPasswordConfirmInputRef}
          required
        />
      </div>
      <Button type="submit">Update Password</Button>
      {error && <p className="error">{error.message}</p>}
      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </form>
  );
};

export default NewPasswordForm;
