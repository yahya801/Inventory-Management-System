import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./itemstop.module.css";
const { ipcRenderer } = window.require("electron");

export function NewItemModal(props) {
  const [itemname, Setitemname] = useState("");
  const [description, Setdescription] = useState("");
  const [category, SetCategory] = useState("Select");
  const [origin, Setorigin] = useState("");
  const [error, Seterror] = useState("");
  const handleClick = (evt) => {
    evt.preventDefault();
    // console.log("heloo");
    const array = {
      itemname,
      description,
      category,
      origin,
    };
    // console.log(array)
    // console.log(category)
    if (!itemname || !description || !origin || category == "Select") {
      Seterror("Fields input wrong");
    } else {
      ipcRenderer.send("AddItems", array);
      Setitemname("");
      Setdescription("");
      SetCategory("Select");
      Setorigin("");
      Seterror("");
      window.location = "/items";
    }
  };
  useEffect(() => {}, []);

  return (
    <div>
      <Modal
        className={styles.modal}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <div className={styles.form}>
            <form>
              <input
                className={styles.inputtext}
                type="text"
                value={itemname}
                required
                onChange={(e) => Setitemname(e.target.value)}
                placeholder="itemname"
              />
              <br />
              <input
                className={styles.inputtext}
                type="text"
                value={description}
                required
                onChange={(e) => Setdescription(e.target.value)}
                placeholder="description"
              />
              <br />
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
              <br />
              <input
                className={styles.inputtext}
                type="text"
                value={origin}
                required
                onChange={(e) => Setorigin(e.target.value)}
                placeholder="description"
              />
              {error}
              <button onClick={(e) => handleClick(e)}>Submit</button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
