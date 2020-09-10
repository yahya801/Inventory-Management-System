import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./inventory.module.css";
import moment from "moment";
import { Redirect } from "react-router-dom";
const { ipcRenderer } = window.require("electron");

function Editmodal(props) {
  const [item, Setitem] = useState([]);
  const [itemname, Setitemname] = useState("");
  const [date, Setdate] = useState("");
  const [lotno, Setlotno] = useState("");
  const [category, Setcategory] = useState("");
  const [origin, Setorigin] = useState("");
  const [noofbags, Setnoofbags] = useState("");
  const [leftbags, Setleftbags] = useState("");
  const [totalweight, Settotalweight] = useState("");
  const [price, Setprice] = useState("");
  const [labourexpense, Setlabourexpense] = useState("");
  const [transportexpense, Settransportexpense] = useState("");
  const [cartonexpense, Setcartonexpense] = useState("");
  const [otherexpense, Setotherexpense] = useState("");
  const inventID = props.passitem.inventID;

  useEffect(() => {
    console.log(props.passitem);
    Setitemname(props.passitem.itemname);
    Setdate(props.passitem.date);
    Setlotno(props.passitem.lotno);
    Setnoofbags(props.passitem.noofbags);
    Setorigin(props.passitem.origin);
    Settotalweight(props.passitem.totalweight);
    Setprice(props.passitem.priceperkg);
    Setlabourexpense(props.passitem.labourexpense);
    Settransportexpense(props.passitem.transportexpense);
    Setcartonexpense(props.passitem.cartonexpense);
    Setotherexpense(props.passitem.otherexpense);
    Setcategory(props.passitem.category);
    Setleftbags(props.passitem.leftbags)
  }, [inventID]);
  let totalexpense =
    Number(price) * Number(totalweight) +
    Number(labourexpense) +
    Number(transportexpense) +
    Number(cartonexpense) +
    Number(otherexpense);
    const handleform = () => {
        const array = {
            inventID,
            lotno,
            date,
            noofbags,
            leftbags,
            totalweight,
            price,
            labourexpense,
            transportexpense,
            cartonexpense,
            otherexpense,
            totalexpense
        } 
        console.log(array)
        ipcRenderer.send("EditInventory",array)
        props.onHide()
    }
    const leftbagscheck = (e) => {
        if(e.target.value > noofbags){

        }
        else{
        Setleftbags(e.target.value)
        }    }
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
            Edit Inventory Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              className={styles.inputtext}
              type="text"
              value={itemname}
              placeholder="itemname"
            />
            <input
              className={styles.inputtext}
                type="date"
              value={moment(date).format("yyyy-MM-DD")}
              required
              onChange={(e) => Setdate(e.target.value)}
              // placeholder="Date"
            />
            <input
              className={styles.inputtext}
              type="text"
              value={lotno}
              required
              onChange={(e) => Setlotno(e.target.value)}
              placeholder="LotNo"
            />
            <input
              className={styles.inputtext}
              type="number"
              value={noofbags}
              required
              onChange={(e) => Setnoofbags(e.target.value)}
              placeholder="No of Bags"
            />
             <input
              className={styles.inputtext}
              type="number"
              step=".01"
              value={leftbags}
              required
              onChange={(e) => leftbagscheck(e)}
              placeholder="Left Bags"
            />
            <input
              className={styles.inputtext}
              type="number"
              value={totalweight}
              required
              onChange={(e) => Settotalweight(e.target.value)}
              placeholder="Total Weight"
            />
            <input
              className={styles.inputtext}
              type="text"
              value={category}
              // required
              // onChange={(e) => Settotalweight(e.target.value)}
              placeholder="category"
            />
            <input
              className={styles.inputtext}
              type="textr"
              value={origin}
              // required
              // onChange={(e) => Settotalweight(e.target.value)}
              placeholder="origin"
            />
            <input
              className={styles.inputtext}
              type="number"
              value={price}
              required
              onChange={(e) => Setprice(e.target.value)}
              placeholder="Total Price"
            />
            <input
              className={styles.inputtext}
              type="number"
              value={labourexpense}
              required
              onChange={(e) => Setlabourexpense(e.target.value)}
              placeholder="Labour Expense"
            />
            <input
              className={styles.inputtext}
              type="number"
              value={transportexpense}
              required
              onChange={(e) => Settransportexpense(e.target.value)}
              placeholder="Transport Expense"
            />
            <input
              className={styles.inputtext}
              type="number"
              value={cartonexpense}
              required
              onChange={(e) => Setcartonexpense(e.target.value)}
              placeholder="Packing Expense"
            />
            <input
              className={styles.inputtext}
              type="number"
              value={otherexpense}
              required
              onChange={(e) => Setotherexpense(e.target.value)}
              placeholder="Other Expense"
            />
            <p>Total expense: {totalexpense.toLocaleString()}</p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=> handleform()}>Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Editmodal;
