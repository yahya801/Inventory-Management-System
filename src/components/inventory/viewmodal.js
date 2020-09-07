import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./itemstop.module.css";
import { Redirect } from "react-router-dom";
import moment from 'moment'
const { ipcRenderer } = window.require("electron");

function Viewmodal(props) {
    const totalexpense = props.passitem.totalexpense
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
      Inventory View
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>
         Itemname: {props.passitem.itemname} <br />
         Origin: {props.passitem.origin}<br />
         Description: {props.passitem.description}<br />
         LotNo: {props.passitem.lotno}<br />
         Date:{moment(props.passitem.date).format("DD-MM-YYYY")}<br />
         Price/Kg: {props.passitem.priceperkg}<br />
         No of Bags: {props.passitem.noofbags}<br />
         Bags Remaining: {props.passitem.leftbags}<br />
         Total Weight: {props.passitem.totalweight}<br />
         Total Expense: {totalexpense}<br />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        </div>
    )
}

export default Viewmodal
