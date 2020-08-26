import React, { useState, useEffect } from "react";
import {Link,Redirect } from 'react-router-dom'
import styles from "./signin.module.css";
const { ipcRenderer } = window.require("electron");

export function Signin() {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [error, Seterror] = useState("");
  const [useradded, SetUseradded] = useState("");
  const [redirect2,Setredirect] = useState("");

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
   
    ipcRenderer.on("Userloggedin", (event, messages) => {
      Setredirect("/dashboard")
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
              Already registered?  <Link to="/signup">Sign Up</Link> 
            </p>
          </form>
        </div>
      </div>
      {redirect2 ? <Redirect to="/dashboard" /> : null}
    </div>
  );
}
