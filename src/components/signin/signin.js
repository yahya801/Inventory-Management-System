import React, { useState, useEffect } from "react";
import styles from "./signin.module.css";
const { ipcRenderer } = window.require("electron");

export function Signin() {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [error, Seterror] = useState("");
  const [useradded, SetUseradded] = useState("");

  const handleClick = (evt) => {
    evt.preventDefault();
    console.log("heloo");
    if (!username || !password) {
      Seterror("Username or Password not entered");
    } else {
      Seterror("");
      const array = {
        username,
        password,
      };

      ipcRenderer.send("Userlogin", array);
    }
  };
  useEffect(() => {
    // var myListener = function (event, args) {}
    // Update the document title using the browser API
    // window.addEventListener("Userloggedin",  messages => {
    //   console.log(messages);
    //   window.location = "/dashboard";
    // });
    ipcRenderer.on("Userloggedin", (event, messages) => {
      console.log(messages);
      window.location = "/dashboard";
    });

    ipcRenderer.on("Userexists", (event, messages) => {
      console.log(messages);
      setuserexists();
    });
    ipcRenderer.on("Userloggedinfailed", (event, messages) => {
      Seterror1(messages);
    });
  });

  const Seterror1 = (arg) => {
    Seterror(arg);
  };

  const setuserexists = () => {
    Seterror("User Already Exists");
  };

  return (
    <div>
      <div className={styles.heading}>
        <h2>Popular Traders</h2>
      </div>
      <div className={styles.login_page}>
      <div><h3>Login</h3></div>
        <div className={styles.form}>
         
          <form >
            <input
              type="text"
              value={username}
              required
              onChange={(e) => Setusername(e.target.value)}
              placeholder="name"
            />
            <input
              type="password"
              value={password}
              required
              onChange={(e) => Setpassword(e.target.value)}
              placeholder="password"
            />

            {error}
            {useradded}

            <button onClick={(e) => handleClick(e)}>Create</button>
            <p className={styles.message}>
              Already registered? <a href="/signup">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
      ;
    </div>
  );
}
