import React, { useState, useEffect } from "react";
import styles from "../itemstop.module.css";
import Sidebar from "../../sidebar";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const { ipcRenderer } = window.require("electron");

function Edititem() {
  const [productname, Setproductname] = useState("");
  const [description, Setdescription] = useState("");
  const [category, SetCategory] = useState("Select");
  const [origin, Setorigin] = useState("");
  const [itemID, SetitemID] = useState("");
  const [error, Seterror] = useState("");
  const [redirect, Setredirect] = useState(false);
  const [addproduct, Setaddproduct] = useState(false);
  
  const handleClick = (evt) => {
    evt.preventDefault();
    const array = {
      productname,
      description,
      category,
      origin,
      itemID,
    };
    console.log(array);
    ipcRenderer.send("EditItem", array);

    ipcRenderer.on("EditedSuccussfully", async (err) => {
      Setproductname("");
      Setdescription("");
      SetCategory("Select");
      Setorigin("");
      Setredirect(true);
    });
  };

  useEffect(() => {
    var ItemID = window.location.hash.split("ItemID=")[1];
    SetitemID(ItemID);
    ipcRenderer.send("EditItemInfo", ItemID);
    ipcRenderer.on("EditItemView", async (err, result) => {
      console.log(result[0].category);
      Setproductname(result[0].itemname);
      Setdescription(result[0].description);
      SetCategory(result[0].category);
      Setorigin(result[0].origin);
    });
    console.log(ItemID);
  }, []);
  return (
    <div>
      <div>
        <Sidebar />
        {/* <Navbar /> */}
      </div>
      <div>
        <div className={styles.itembox}>
          <div>
            <h3>Products</h3>
          </div>
          <Container>
            <div className={styles.box}>
              <div className={styles.addbox}>
                <h2>Edit Products</h2>
                <hr />
                <div className={addproduct ? null : styles.addproductbox}>
                  Product Edited
                </div>
                <div className={styles.box2}>
                  <div>
                    <Form>
                      <Form.Group controlId="formHorizontalName">
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Product Name
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              type="name"
                              value={productname}
                              placeholder="Product Name"
                              onChange={(e) => Setproductname(e.target.value)}
                            />
                          </Col>
                        </div>
                        <br />
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Description
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              type="name"
                              value={description}
                              placeholder="Product description"
                              onChange={(e) => Setdescription(e.target.value)}
                            />
                          </Col>
                        </div>
                        <br />
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Category
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              as="select"
                              value={category}
                              onChange={(e) => SetCategory(e.target.value)}
                            >
                              <option value="Select">Select</option>
                              <option value="Dry-Fruit">Dry-Fruit</option>
                              <option value="Spices">Spices</option>
                            </Form.Control>
                          </Col>
                        </div>
                        <br />
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Origin
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              type="name"
                              value={origin}
                              placeholder="Product Origin"
                              onChange={(e) => Setorigin(e.target.value)}
                            />
                          </Col>
                        </div>
                        <div class={styles.submitbutton}>
                          <Button
                            onClick={(e) => handleClick(e)}
                            variant="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                        </div>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          {redirect ? <Redirect to="/items" /> : null}
        </div>
      </div>
    </div>
  );
}

export default Edititem;
