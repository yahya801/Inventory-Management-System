import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./itemstop.module.css";
import { Redirect } from "react-router-dom";
const { ipcRenderer } = window.require("electron");

function Deletemodal(props) {
    const deleteinvent = () => {
        ipcRenderer.send("DeleteInventory",props.passitem.inventID)
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
            Delete Inventory
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Do you want to delete the inventory of {props.passitem.itemname}, LotNo: {props.passitem.lotno}?
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={() => deleteinvent()}>Okay</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Deletemodal;
