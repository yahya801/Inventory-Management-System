import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./inventory.module.css";
import { Redirect } from "react-router-dom";
const { ipcRenderer } = window.require("electron");
function Addinventory(props) {
  // itemname Lotno(eg PT900{name} noofbags totalweight origin )
  const [item, Setitem] = useState([]);
  const [itemname, Setitemname] = useState("");
  const [date, Setdate] = useState("");
  const [lotno, Setlotno] = useState("");
  const [category, Setcategory] = useState("");
  const [origin, Setorigin] = useState("");
  const [noofbags, Setnoofbags] = useState("");
  // const [leftbags, Setleftbags] = useState("");
  const [totalweight, Settotalweight] = useState("");
  const [price, Setprice] = useState("");
  const [labourexpense, Setlabourexpense] = useState("");
  const [transportexpense, Settransportexpense] = useState("");
  const [cartonexpense, Setcartonexpense] = useState("");
  const [otherexpense, Setotherexpense] = useState("");
  const [lotnoerror, Setlotnoerror] = useState("");
  // const [totalprice, Settotalprice] = useState(0);
  const [ItemID, SetItemId] = useState("");
  const [error, Seterror] = useState("");

  useEffect(() => {
    ipcRenderer.send("ItemsQuery");

    ipcRenderer.on("ItemsQuerySuccessful", async (err, result) => {
      Setitem(result);
    });
  }, [props.addModal]);
  const itemnamechange = (e) => {
    if (e.target.value === "Select") {
      Setorigin("");
      Setcategory("");
    } else {
      Setitemname(e.target.value);
      // console.log(item[e.target.value])
      SetItemId(item[e.target.value].ItemID);
      Setorigin(item[e.target.value].origin);
      Setcategory(item[e.target.value].category);
    }
  };
  // const
  let totalexpense =
    Number(price) * Number(totalweight) +
    Number(labourexpense) +
    Number(transportexpense) +
    Number(cartonexpense) +
    Number(otherexpense);
  const handleClick = (e) => {
    e.preventDefault();
    const array = {
      lotno,
      date,
      noofbags,
      totalweight,
      price,
      labourexpense,
      transportexpense,
      cartonexpense,
      otherexpense,
      totalexpense,
      ItemID,
    };
    if (
      !category ||
      !origin ||
      !lotno ||
      !date ||
      !noofbags ||
      !price ||
      !totalweight ||
      !labourexpense ||
      !transportexpense ||
      !cartonexpense ||
      totalexpense === 0
    ) {
      Seterror("Some Fields Missing");
    } else {
      Seterror("");
      console.log(array);
      ipcRenderer.send("AddInventory", array);
      Setdate("");
      Setnoofbags("");
      Setprice("");
      Setlotno("");
      Settotalweight("");
      Setlabourexpense("");
      Settransportexpense("");
      Setcartonexpense("");
      Setotherexpense("");
      totalexpense = "";
      ipcRenderer.on("Lotnoerror", async (err, msg) => {
        Setlotnoerror(msg);
      });
      props.onHide();
    }
  };

  const handleclick = () => {
    // Setitem("")
    Setdate("");
    Setnoofbags("");
    Setprice("");
    Setlotno("");
    Settotalweight("");
    Setlabourexpense("");
    Settransportexpense("");
    Setcartonexpense("");
    Setotherexpense("");
    totalexpense = "";
    props.onHide();
  };

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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          {/* <div className={styles.form}> */}
          <form>
            <div>
              <label>
                Select Itemname
                <select
                  className={styles.inputtext}
                  value={itemname}
                  onChange={(e) => itemnamechange(e)}
                >
                  <option value="Select">Select</option>
                  {item.map((item, index) => (
                    <option key={index} value={index}>
                      {item.itemname}
                    </option>
                  ))}
                </select>
              </label>
              <label>Date</label>
              <input
                className={styles.inputtext}
                type="date"
                value={date}
                required
                onChange={(e) => Setdate(e.target.value)}
                // placeholder="Date"
              />
            </div>
            <div>
              <label>LotNo</label>
              <input
                className={styles.inputtext}
                type="text"
                value={lotno}
                required
                onChange={(e) => Setlotno(e.target.value)}
                placeholder="LotNo"
              />
              <label> No of Bags</label>
              <input
                className={styles.inputtext}
                type="number"
                value={noofbags}
                required
                onChange={(e) => Setnoofbags(e.target.value)}
                placeholder="No of Bags"
              />
            </div>
            <div>
              <label>Total Weight(KG)</label>
              <input
                className={styles.inputtext}
                type="number"
                value={totalweight}
                required
                onChange={(e) => Settotalweight(e.target.value)}
                placeholder="Total Weight"
              />
              <label>Category</label>
              <input
                className={styles.inputtext}
                type="text"
                value={category}
                // required
                // onChange={(e) => Settotalweight(e.target.value)}
                placeholder="category"
              />
            </div>
            <div>
              <label>Origin</label>
            <input
              className={styles.inputtext}
              type="textr"
              value={origin}
              // required
              // onChange={(e) => Settotalweight(e.target.value)}
              placeholder="origin"
            />
            <label>Price/KG</label>
            <input
              className={styles.inputtext}
              type="number"
              value={price}
              required
              onChange={(e) => Setprice(e.target.value)}
              placeholder="Total Price"
            />
            </div>
            <div>
              <label>Labour Cost</label>
            <input
              className={styles.inputtext}
              type="number"
              value={labourexpense}
              required
              onChange={(e) => Setlabourexpense(e.target.value)}
              placeholder="Labour Expense"
            />
            <label>Transport Cost</label>
            <input
              className={styles.inputtext}
              type="number"
              value={transportexpense}
              required
              onChange={(e) => Settransportexpense(e.target.value)}
              placeholder="Transport Expense"
            />
            </div>
            <div>
              <label>Packaging Cost</label>
            <input
              className={styles.inputtext}
              type="number"
              value={cartonexpense}
              required
              onChange={(e) => Setcartonexpense(e.target.value)}
              placeholder="Packing Expense"
            />
            <label>Other Costs</label>
            <input
              className={styles.inputtext}
              type="number"
              value={otherexpense}
              required
              onChange={(e) => Setotherexpense(e.target.value)}
              placeholder="Other Expense"
            />
            </div>
          </form>
          <p>Total Expense : {totalexpense.toLocaleString()}</p>
          {error}
          <Button onClick={(e) => handleClick(e)}>Submit</Button>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleclick()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Addinventory;
