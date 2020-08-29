import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./itemstop.module.css";
import { Redirect } from "react-router-dom";
const { ipcRenderer } = window.require("electron");
function ItemModal(props) {
  const [itemname, Setitemname] = useState("");
  const [description, Setdescription] = useState("");
  const [category, SetCategory] = useState("Select");
  const [origin, Setorigin] = useState("");
  const [error, Seterror] = useState("");
  const [redirect, Setredirect] = useState("");
  const handleClick = (evt) => {
    evt.preventDefault();
    console.log("Form Submit");
    const array = {
      itemname,
      description,
      category,
      origin,
    };
    if (!itemname || !description || !origin || category == "Select") {
      Seterror("Fields input wrong");
    } else {
      ipcRenderer.send("AddItems", array);
      Setitemname("");
      Setdescription("");
      SetCategory("Select");
      Setorigin("");
      Seterror("");
      props.onHide();
    }
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-backdrop="false"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Add New Item Form</h4>
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
              <input
                className={styles.inputtext}
                type="text"
                value={description}
                required
                onChange={(e) => Setdescription(e.target.value)}
                placeholder="description"
              />
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
              <input
                className={styles.inputtext}
                type="text"
                value={origin}
                required
                onChange={(e) => Setorigin(e.target.value)}
                placeholder="Origin"
              />
              {error}
              <Button onClick={(e) => handleClick(e)}>Submit</Button>
            </form>
            {redirect ? <Redirect to="/items" /> : null}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ItemModal;
