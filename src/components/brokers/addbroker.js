import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./broker.module.css";
const { ipcRenderer } = window.require("electron");
function Addbroker(props) {
  const [brokername, Setbrokername] = useState("");
  const [brokerinfo, Setbrokerinfo] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");

  const Handlesubmit = () => {
    if (!brokername || !brokerinfo || !contact) {
      Seterror("Fields not filled");
    } else {
      const array = {
        brokername,
        brokerinfo,
        contact,
      };
      ipcRenderer.send("AddBroker", array)
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
        <Modal.Title id="contained-modal-title-vcenter">Add Broker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label>Broker Name</label>
          <input
            value={brokername}
            className={styles.inputtext}
            type="text"
            placeholder="Client Name"
            onChange={(e) => Setbrokername(e.target.value)}
          />
          <label>Broker Info</label>
          <input
            value={brokerinfo}
            className={styles.inputtext}
            type="text"
            placeholder="Client Name"
            onChange={(e) => Setbrokerinfo(e.target.value)}
          />
          <label>Broker Name</label>
          <input
            value={contact}
            className={styles.inputtext}
            type="text"
            placeholder="Client Name"
            onChange={(e) => Setcontact(e.target.value)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => Handlesubmit()}>Close</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Addbroker;
