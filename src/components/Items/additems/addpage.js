import React, { useState } from "react";
import styles from "../itemstop.module.css";
const { ipcRenderer } = window.require("electron");

function Addpage() {
  const [productname, Setproductname] = useState("");
  const [description, Setdescription] = useState("");
  const [category, SetCategory] = useState("Select");
  const [origin, Setorigin] = useState("");
  const handleClick = (evt) => {
    evt.preventDefault();
    console.log("Form Submit");
    const array = {
      productname,
      description,
      category,
      origin,
    };
    if (!productname || !description || !origin || category == "Select") {
    //   Seterror("Fields input wrong");
    } else {
      ipcRenderer.send("AddItems", array);
      Setproductname("");
      Setdescription("");
      SetCategory("Select");
      Setorigin("");
    //   Seterror("");
      
    }
  };
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div className={styles.itembox}>
        <div>
          <h3>Products</h3>
        </div>
        <div className={styles.borderbox}>
          <h4>New Products</h4>
          <form>
            <div>
              <label>Product Name</label>
              <input
                className={styles.inputtext}
                type="text"
                value={productname}
                onChange={(e) => Setproductname(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div>
              <label>Description</label>

              <input
                className={styles.inputtext}
                type="text"
                value={description}
                required
                onChange={(e) => Setdescription(e.target.value)}
                placeholder="description"
              />
            </div>
            <div>
              <label required>
                Pick your Category:
                <select
                  value={category}
                  onChange={(e) => SetCategory(e.target.value)}
                >
                  <option value="Select" default>
                    Select
                  </option>
                  <option value="Dry-Fruit">Dry-Fruit</option>
                  <option value="Spices">Spices</option>
                </select>
              </label>
            </div>
            <div>
              <label>Origin</label>
              <input
                className={styles.inputtext}
                type="text"
                value={origin}
                required
                onChange={(e) => Setorigin(e.target.value)}
                placeholder="Origin"
              />
            </div>

            <button type="submit" onClick={(e) => handleClick(e)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addpage;
