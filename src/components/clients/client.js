import React from "react";
import styles from "./client.module.css";

function Client() {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div className={styles.topbox}>
        <h3>Manage Clients </h3>
        {/* <button className={styles.addbutton}  >Add Item</button> */}
      </div>
    </div>
  );
}

export default Client;
