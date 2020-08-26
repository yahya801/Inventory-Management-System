import React, { useState, useEffect } from "react";
import styles from "./signup.module.css";
import {Link } from 'react-router-dom'
const { ipcRenderer } = window.require("electron");

export function Signup() {
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [password2, Setpassword2] = useState("");
  const [error, Seterror] = useState("");
  const [useradded, SetUseradded] = useState("");

  const handleClick = (evt) => {
    evt.preventDefault();

    //password validation
    if (!(password === password2)) {
      Seterror("Passwords donot match");
    } else {
      const array = {
        username,
        password,
      };

      ipcRenderer.send("Addusername", array);
    }
  };
  useEffect(() => {
    // var myListener = function (event, args) {} 
    // Update the document title using the browser API
    ipcRenderer.on("Useradded", (event, messages) => {
      console.log(messages);
      window.location= '/signin'
      
    });
   
  });

  return (
    <div>
      <h2 className={styles.heading}>Popular Traders</h2>
      <div className={styles.login_page}>
        <div className={styles.form}>
          <form className="register-form">
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
            <input
              type="password"
              value={password2}
              required
              onChange={(e) => Setpassword2(e.target.value)}
              placeholder="Retype-password"
            />
            {error}
            {useradded}

            <button onClick={(e) => handleClick(e)}>Create</button>
            <p className={styles.message}>
              Already registered?  <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
      ;
    </div>
  );
}
