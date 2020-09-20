import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./broker.module.css";
const { ipcRenderer } = window.require("electron");

function Deletebroker(props) {
  const [deletesuccess, Setdeletesucces] = useState(false);
  const handledeleteclick = () => {
    ipcRenderer.send("DeleteBroker", props.passitem.brokerID);

    ipcRenderer.on("BrokerDeleted", async (err) => {
      console.log("deleted")
      Setdeletesucces(true);
      console.log(deletesuccess)
      setTimeout(() => {
        // Setdeletesucces(false);
        props.onHide();
      }, 3000);
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
         Delete Broker
        </Modal.Title>
      </Modal.Header>
      {/* {deletesuccess ?  : null} */}
      <Modal.Body>
      <div className={deletesuccess ?  null : styles.display}>Broker Deleted</div>
        <p>
          Do you want to delete the broker with the name{" "}
          <b>{props.passitem.brokername}</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handledeleteclick()}>Yes</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Deletebroker;
