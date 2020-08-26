import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
const { ipcRenderer } = window.require("electron");
function Deletemodal(props) {
    const handleclick =() => {
        console.log(props.passitem.ItemID)
        ipcRenderer.send("DeleteItem",props.passitem.ItemID)
        props.onHide()
    }
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
            Delete Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <p>Do you want to to delete {props.passitem.itemname}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleclick()}>Okay</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Deletemodal;
