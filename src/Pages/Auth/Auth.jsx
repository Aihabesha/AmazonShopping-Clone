import React, { useContext, useState } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  // console.log(password, email);

  return (
    <section className={classes.login}>
      {/* logo  */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
          alt="amazon-logo"
        />
      </Link>
      {/* form  */}
      <div className={classes.login_container}>
        <h1>Sign-in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />  
          </div>

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign in"}
          </button>
          {/* agreement */}
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* create account button */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
