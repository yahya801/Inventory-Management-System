import React from "react";
import styles from "./itemstop.module.css";
function items() {
  return (
    <div style={{paddingLeft:"10px"}}>
      <div className={styles.topbox}>
        <h3>Manage Items </h3>
        <button className={styles.addbutton}  >Add Item</button>
      </div>
    </div>
  );
}

export default items;
