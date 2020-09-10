import React from "react";
import styles from "./broker.module.css";

function Broker() {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div className={styles.topbox}>
        <h3>Manage Brokers </h3>
        {/* <button className={styles.addbutton}  >Add Item</button> */}
      </div>
    </div>
  );
}

export default Broker;