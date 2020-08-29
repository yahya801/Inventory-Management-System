import React, { useState, useEffect } from "react";
import styles from "./itemstop.module.css";
function Items() {
  const [edit, Setedit] = useState(false);
  const [add, Setadd] = useState(false);
  const [deleteitem, Setdeleteitem] = useState(false);

  useEffect(() => {
    // console.log(window.location.pathname)
    if (window.location.pathname == "/items/edit") {
      Setedit(true);
    }
    if (window.location.pathname == "/items/add") {
      Setadd(true);
    }
    if (window.location.pathname == "/items/delete") {
      Setdeleteitem(true);
    }
    if (edit || add || deleteitem) {
      setTimeout(() => {
        Setadd(false);
        Setdeleteitem(false);
        Setedit(false);
        window.location = "/items";
      }, 1000);
    }
  });
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div className={styles.topbox}>
        <h3>Manage Items </h3>
        <div className={edit ? styles.editbox : styles.editbox2}>
          Edit Successfull
        </div>
        <div className={add ? styles.addbox : styles.addbox2}>
          Added Successfull
        </div>
        <div className={deleteitem ? styles.deletebox : styles.deletebox2}>
          Deleted Successfull
        </div>
      </div>
      
    </div>
  );
}

export default Items;
