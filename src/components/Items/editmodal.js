import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./itemstop.module.css";
const { ipcRenderer } = window.require("electron");

function Editmodal(props) {
  const [itemID, SetItemId] = useState("");
  const [itemname, Setitemname] = useState("");
  const [description, Setdescription] = useState("");
  const [category, SetCategory] = useState("Select");
  const [origin, Setorigin] = useState("");
  const id = props.passitem.ItemID;

  const handleClick = (evt) => {
    evt.preventDefault();
    const array = {
      itemname,
      description,
      category,
      origin,
      itemID,
    };
    console.log(array);
    ipcRenderer.send("EditItem", array);
    props.onHide();
  };
  const Setarray = () => {
    // setTimeout(() => {
    Setitemname(props.passitem.itemname);
    SetItemId(props.passitem.ItemID);
    Setdescription(props.passitem.description);
    SetCategory(props.passitem.category);
    Setorigin(props.passitem.origin);
    // }, 1000);
  };
  useEffect(() => {
    // console.log(id);
    Setarray();
  }, [id]);
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.form}>
            <form>
              <div>
                <label>Itemname</label>
                <input
                  className={styles.inputtext}
                  type="text"
                  value={itemname}
                  required
                  onChange={(e) => Setitemname(e.target.value)}
                  placeholder="itemname"
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
              {/* {error} */}
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

export default Editmodal;
