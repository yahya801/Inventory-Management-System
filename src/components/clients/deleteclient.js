import React,{useState} from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./client.module.css";
const { ipcRenderer } = window.require("electron");

function Deleteclient(props) {
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
        <Modal.Body>
          
          <p>
         Do you want to delete {props.passitem.clientname}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Deleteclient
