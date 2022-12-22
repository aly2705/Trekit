import classes from "./Login.module.css";
import Button from "../UI/Button";
import { NavLink, useLocation } from "react-router-dom";
// import { useState } from "react";

const Login = () => {
  //   const [isSignup, setIsSignup] = useState(false);
  let isSignup = false;
  const location = useLocation();
  if (location.search.includes("signup")) isSignup = true;

  return (
    <form className={classes.login}>
      <h2>{isSignup ? "Welcome!" : "Welcome back!"}</h2>
      <p>
        {isSignup ? "Sign up to get started" : "Please enter your credentials!"}
      </p>
      {isSignup && (
        <div className={classes.login__group}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
      )}
      <div className={classes.login__group}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div className={classes.login__group}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      {isSignup && (
        <div className={classes.login__group}>
          <label htmlFor="password-confirm">Password Confirm</label>
          <input type="password" id="password-confirm" />
        </div>
      )}
      {isSignup && (
        <div className={classes.login__radio}>
          <div>
            <input type="radio" id="male" name="gender" value="Male" />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" name="gender" value="Female" />
            <label htmlFor="male">Female</label>
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
    </form>
  );
};

export default Login;
