import { useContext, useRef } from "react";
import { API_URL } from "../../helpers/config";
import useAJAX from "../../hooks/useAJAX";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button";
import classes from "./AccSettings.module.css";

const DetailsForm = () => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const nameRef = useRef();
  const emailRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
  const { sendRequest, isLoading, error } = useAJAX();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredGender = maleRef.current.checked
      ? maleRef.current.value.toLowerCase()
      : femaleRef.current.value.toLowerCase();

    const reqConfig = {
      url: `${API_URL}/users`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.token}`,
      },
      body: {
        email: enteredEmail !== user.email ? enteredEmail : undefined,
        name: enteredName !== user.name ? enteredName : undefined,
        gender: enteredGender !== user.gender ? enteredGender : undefined,
      },
    };
    const updateContext = (APIData) => {
      authContext.onNewUserData(APIData.data.user);
    };
    sendRequest(reqConfig, updateContext);
  };

  return (
    <form onSubmit={submitHandler}>
      <h3>Manage Account Details</h3>
      <div className={classes.settings__group}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" defaultValue={user.name} ref={nameRef} />
      </div>
      <div className={classes.settings__group}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          defaultValue={user.email}
          ref={emailRef}
        />
      </div>
      <div className={classes.settings__radio}>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            defaultChecked={user.gender === "male"}
            ref={maleRef}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            defaultChecked={user.gender === "female"}
            ref={femaleRef}
          />
          <label htmlFor="male">Female</label>
        </div>
      </div>
      <Button type="submit">Save Changes</Button>
      {error && <p className="error">{error.message}</p>}
      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </form>
  );
};

export default DetailsForm;
