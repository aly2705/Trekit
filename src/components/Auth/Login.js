import classes from "./Login.module.css";
import Button from "../UI/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import useAJAX from "../../hooks/useAJAX";
import { API_URL } from "../../helpers/config";
import AuthContext from "../../store/auth-context";
// import { useState } from "react";

const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  let isSignup = false;
  if (location.search.includes("signup")) isSignup = true;

  const nameRef = useRef();
  const emailRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    sendRequest: sendAuthRequest,
    isLoading,
    error,
    setError,
  } = useAJAX();

  useEffect(() => {
    setError(null);
  }, [location, setError]);

  const loginHandler = (APIdata) => {
    console.log(APIdata);
    authContext.onLogin(APIdata.token, APIdata.expiresIn, APIdata.user);
    navigate("/map");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let name;
    let gender;
    let passwordConfirm;
    const reqConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (isSignup) {
      name = nameRef.current.value;
      passwordConfirm = passwordConfirmRef.current.value;
      gender = femaleRef.current.checked
        ? femaleRef.current.value.toLowerCase()
        : maleRef.current.value.toLowerCase();
    }

    reqConfig.body = {
      email,
      password,
      name: name || undefined,
      passwordConfirm: passwordConfirm || undefined,
      gender: gender || undefined,
    };
    reqConfig.url = `${API_URL}/users${isSignup ? "/signup" : "/login"}`;

    // Responses are the same
    sendAuthRequest(reqConfig, loginHandler);
  };

  return (
    <form className={classes.login} onSubmit={submitHandler}>
      <h2>{isSignup ? "Welcome!" : "Welcome back!"}</h2>
      <p>
        {isSignup ? "Sign up to get started" : "Please enter your credentials!"}
      </p>
      {isSignup && (
        <div className={classes.login__group}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef} />
        </div>
      )}
      <div className={classes.login__group}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div className={classes.login__group}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
      </div>
      {isSignup && (
        <div className={classes.login__group}>
          <label htmlFor="password-confirm">Password Confirm</label>
          <input
            type="password"
            id="password-confirm"
            ref={passwordConfirmRef}
          />
        </div>
      )}
      {isSignup && (
        <div className={classes.login__radio}>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              ref={maleRef}
              defaultChecked
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              ref={femaleRef}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      )}
      <Button type="submit">{isSignup ? "Sign up" : "Log in"}</Button>
      <div className={classes.login__change}>
        <span>
          {isSignup ? "Already have an account? " : "Don't have an account? "}
        </span>
        <NavLink to={isSignup ? "?form=login" : "?form=signup"}>
          {isSignup ? "Log in" : "Sign up"}
        </NavLink>
      </div>

      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && (
        <p className={`error ${classes.login__error}`}>{error.message}</p>
      )}
    </form>
  );
};

export default Login;
