import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./client.module.css";
const { ipcRenderer } = window.require("electron");
function Addclient(props) {
  const [clientname, Setclientname] = useState("");
  const [shopaddress, Setshopaddress] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");
  const addclient = () => {
    if (!clientname || !shopaddress || !contact) {
      Seterror("Check if any field is empty");
    } else {
      const array = {
        clientname,
        shopaddress,
        contact,
      };
      ipcRenderer.send("AddClient", array)
      props.onHide()

    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>Client Name</label>
            <input
              value={clientname}
              className={styles.inputtext}
              type="text"
              placeholder="Client Name"
              onChange={(e) => Setclientname(e.target.value)}
            />
            <label>Shop Address</label>
            <input
              value={shopaddress}
              className={styles.inputtext}
              type="text"
              placeholder="Shop Address"
              onChange={(e) => Setshopaddress(e.target.value)}
            />
          </div>
          <div>
            <label>Contact Info</label>
            <input
              value={contact}
              className={styles.inputtext}
              type="text"
              placeholder="Contact No"
              onChange={(e) => Setcontact(e.target.value)}
            />
          </div>
          <Button onClick={() => addclient()}>Submit</Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Addclient;
