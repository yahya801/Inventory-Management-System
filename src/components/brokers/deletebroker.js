import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./broker.module.css";
const { ipcRenderer } = window.require("electron");

function Deletebroker(props) {
  const Handledeleteclick = () => {
    ipcRenderer.send("DeleteBroker", props.passitem.brokerID);
    props.onHide();
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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Do you want to delete the broker with the name{" "}
          <b>{props.passitem.brokername}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => Handledeleteclick()}>Yes</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Deletebroker;
