import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../inventory.module.css";
import Sidebar from "../../sidebar";
import Select from "react-select";
import Navbar from "../../navbar";
import { Redirect } from "react-router-dom";
const { ipcRenderer } = window.require("electron");
function Addinventory() {
  const [inventID, SetinventID] = useState("");
  const [IDtag, SetIDtag] = useState("");
  let optionindex = 0;
  // const [selectedoption, Setselectedoption] = useState([]);
  const [Items, SetItems] = useState([]);

  const [date, Setdate] = useState("");
  const [lotno, Setlotno] = useState("");
  const [category, Setcategory] = useState("");
  const [origin, Setorigin] = useState("");
  const [noofbags, Setnoofbags] = useState("");
  const [priceperkg, Setpriceperkg] = useState("");
  const [totalweight, Settotalweight] = useState("");
  const [labourexpense, Setlabourexpense] = useState("");
  const [transportexpense, Settransportexpense] = useState("");
  const [cartonexpense, Setcartonexpense] = useState("");
  const [otherexpense, Setotherexpense] = useState("");
  const [error, Seterror] = useState("");
const [ItemID,SetItemID] = useState("")
  var option = [];
  let items = [];
  let ID = "";
  
  let itemsdetails = false;

  useEffect(() => {
    inventoryIdget();
    itemsget();
  });
  const inventoryIdget = () => {
    console.log(option);
    ipcRenderer.send("InventoryIDGet");
    ipcRenderer.on("InventID", async (err, result) => {
      if (result[0].ID === null) {
        // SetinventID(1)
        ID = 1;
        SetinventID(ID)
        SetIDtag(`IT0001`);
      } else {
        ID = result[0].ID + 1;
        var LpadID = ("0000" + (result[0].ID + 1)).slice(-4);
        // console.log(result[0].ID);
        SetIDtag(`IT${LpadID}`);
        SetinventID(ID)
        console.log(ID);
      }
    });
  };

  const itemsget = () => {
    ipcRenderer.send("ItemsQuery");

    ipcRenderer.on("ItemsQuerySuccessful", async (err, result) => {
      items = result;
      if (option.length === 0) {
        result.forEach((element) => {
          option.push({
            value: `${element.ItemID}`,
            label: `${element.itemname}/PT${element.ItemID}`,
          });
          console.log(option);
        });
      } else {
        console.log("ppppp");
      }
    });

    // ipcRenderer.send("ItemQuery2");

    // ipcRenderer.on("ItemQuerySuccessful2", async (err, result) => {
    // SetItems(result);
  };
  const handleChange = (selectedOption) => {
    optionindex = selectedOption.value;
    SetItemID(parseInt(optionindex, 10))
    // console.log(optionindex)
    // if (!itemsdetails) {
    // ipcRenderer.send("ItemQuery2");

    // ipcRenderer.on("ItemQuerySuccessful2", async (err, result) => {
    //   // SetItems(result);
    //   items = result;
    //   // console.log(result)
    //   itemsdetails = true;
    // });
    // setTimeout(() => {
    // console.log(items);
    var itemnameindex = items
      .map(function (Item) {
        return Item.ItemID;
      })
      .indexOf(parseInt(optionindex, 10));
    // console.log(itemnameindex);
    // Setlotno(items[itemnameindex].lotno)
    Setorigin(items[itemnameindex].origin);
    Setcategory(items[itemnameindex].category);

    // }, 500);
    // }
    console.log(selectedOption.value);
  };
  let totalexpense =
    Number(priceperkg) * Number(totalweight) +
    Number(labourexpense) +
    Number(transportexpense) +
    Number(cartonexpense) +
    Number(otherexpense);
  const handleClick = (e) => {
    e.preventDefault();
    const array = {
      inventID,
      lotno,
      date,
      noofbags,
      totalweight,
      priceperkg,
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
      !priceperkg ||
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
      Setpriceperkg("");
      Setlotno("");
      Settotalweight("");
      Setlabourexpense("");
      Settransportexpense("");
      Setcartonexpense("");
      Setotherexpense("");
      totalexpense = "";
      ipcRenderer.on("Lotnoerror", async (err, msg) => {
        // Setlotnoerror(msg);
      });
    }
  };
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <div className={styles.itembox}>
          <div>
            <h3>Inventory </h3>
          </div>
          <Container>
            <div className={styles.box}>
              <div className={styles.addbox}>
                <h2>Add Inventory</h2>
                <hr />
                {/* <div className={clientbox ? null : styles.addclientbox}>
                  Client Added
                </div> */}
                <div className={styles.box2}>
                  <div>
                    <Form>
                      <Form.Group controlId="formHorizontalName">
                        <Row>
                          <Form.Label column sm={1}>
                            InvenroryID
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Control
                              type="name"
                              value={IDtag}
                              placeholder="____"
                              disabled
                            />
                          </Col>
                          <Form.Label column sm={2}>
                            Itemname/ItemID
                          </Form.Label>
                          <Col sm={3}>
                            <Select
                              //   value={selectedoption}
                              name="color"
                              defaultValue={option[0]}
                              onChange={(e) => handleChange(e)}
                              options={option}

                              // isSearchable={true}
                              // onChange={([selected]) => {
                              //   return selected;}}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Date
                          </Form.Label>
                          <Col sm={3}>
                            <Form.Control
                              type="date"
                              value={date}
                              onChange={(e) => Setdate(e.target.value)}
                            />
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Form.Label column sm={1}>
                            LotNo
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Control
                              type="name"
                              placeholder="PTxxxx"
                              value={lotno}
                              onChange={(e) => Setlotno(e.target.value)}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Origin
                          </Form.Label>
                          <Col sm={2}>
                            <Form.Control
                              type="name"
                              placeholder="Origin"
                              value={origin}
                              disabled
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Category
                          </Form.Label>
                          <Col sm={3}>
                            <Form.Control
                              type="name"
                              placeholder="Category"
                              value={category}
                              disabled
                            />
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Form.Label column sm={1}>
                            No of Bags
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="xxxx"
                              value={noofbags}
                              onChange={(e) => Setnoofbags(e.target.value)}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Left Bags
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="xxxx"
                              value={noofbags}
                              disabled
                              // onChange={(e)=>Setnoofbags(e.target.value)}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Price/KG(RS)
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="Rs xxxx"
                              value={priceperkg}
                              onChange={(e) => Setpriceperkg(e.target.value)}
                              // onChange={(e)=>Setnoofbags(e.target.value)}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Weight(KG)
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="xxxx"
                              value={totalweight}
                              onChange={(e) => Settotalweight(e.target.value)}
                              // onChange={(e)=>Setnoofbags(e.target.value)}
                            />
                          </Col>
                        </Row>
                        <br />
                        Expenses:
                        <br />
                        <Row>
                          <Form.Label column sm={1}>
                            Labour
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="xxxx"
                              value={labourexpense}
                              onChange={(e) => Setlabourexpense(e.target.value)}
                              // onChange={(e)=>Setnoofbags(e.target.value)}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Transport
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="xxxx"
                              value={transportexpense}
                              onChange={(e) =>
                                Settransportexpense(e.target.value)
                              }
                              // onChange={(e)=>Setnoofbags(e.target.value)}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Carton
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="xxxx"
                              value={cartonexpense}
                              onChange={(e) => Setcartonexpense(e.target.value)}
                              // onChange={(e)=>Setnoofbags(e.target.value)}
                            />
                          </Col>
                          <Form.Label column sm={1}>
                            Other
                          </Form.Label>
                          <Col xs={2}>
                            <Form.Control
                              type="number"
                              placeholder="xxxx"
                              value={otherexpense}
                              onChange={(e) => Setotherexpense(e.target.value)}
                              // onChange={(e)=>Setnoofbags(e.target.value)}
                            />
                          </Col>
                        </Row>
                        {error}
                      </Form.Group>
                    </Form>
                    <p>Total Expense : {totalexpense.toLocaleString()}</p>
                    <Button onClick={(e) => handleClick(e)}>Submit</Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Addinventory;
