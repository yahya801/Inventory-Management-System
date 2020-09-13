import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./broker.module.css";
const { ipcRenderer } = window.require("electron");

function Editbroker(props) {
  const [brokername, Setbrokername] = useState("");
  const [brokerinfo, Setbrokerinfo] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");
  const brokerID = props.passitem.brokerID;

  useEffect(() => {
    Setbrokername(props.passitem.brokername);
    Setbrokerinfo(props.passitem.brokerinfo);
    Setcontact(props.passitem.contact);
  }, [brokerID]);

  const HandleClick = () => {
    if (!brokername || !brokerinfo || !contact) {
      Seterror("Fields not filled");
    } else {
      const array = {
        brokername,
        brokerinfo,
        contact,
        brokerID
      };

      ipcRenderer.send("EditBroker",array)
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
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
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
            placeholder="Broker Info"
            onChange={(e) => Setbrokerinfo(e.target.value)}
          />
          <label>Contact Info</label>
          <input
            value={contact}
            className={styles.inputtext}
            type="text"
            placeholder="Contact No"
            onChange={(e) => Setcontact(e.target.value)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => HandleClick()}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Editbroker;
