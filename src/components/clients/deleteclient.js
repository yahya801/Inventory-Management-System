import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./client.module.css";
const { ipcRenderer } = window.require("electron");

function Deleteclient(props) {
  const [deletesuccess, Setdeletesucces] = useState(false);
  const handledelete = () => {
    ipcRenderer.send("DeleteClient", props.passitem.clientID);
    ipcRenderer.on("ClientDeleted", async (err) => {
      Setdeletesucces(true);
      setTimeout(() => {
        Setdeletesucces(false);
        props.onHide();
      }, 2000);
    });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Client
        </Modal.Title>
      </Modal.Header>
      {deletesuccess ? <div>Client Deleted</div> : null}
      <Modal.Body>
        <p>Do you want to delete {props.passitem.clientname}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => handledelete()}>
          Delete
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Deleteclient;
