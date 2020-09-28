import React, { useState } from "react";
import styles from "../itemstop.module.css";
import Sidebar from "../../sidebar";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

const { ipcRenderer } = window.require("electron");

function Addpage() {
  const [productname, Setproductname] = useState("");
  const [description, Setdescription] = useState("");
  const [category, SetCategory] = useState("Select");
  const [origin, Setorigin] = useState("");
  const [error,Seterror] = useState("")
  const [addproduct,Setaddproduct] = useState(false)
  const handleClick = (evt) => {
    evt.preventDefault();
    console.log("Form Submit");
    const array = {
      productname,
      description,
      category,
      origin,
    };
    if (!productname || !description || !origin || category == "Select") {
        Seterror("Fields input empty");
    } else {
      console.log(category)
      ipcRenderer.send("AddItems", array);
      ipcRenderer.on("ItemAdded",async (err)=> {
        Setaddproduct(true)
        Setproductname("");
        Setdescription("");
        SetCategory("Select");
        Setorigin("");
          Seterror("");
          setTimeout(() => {
            Setaddproduct(false)
          }, 3000);
      })
      
    }
  };
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
               
                <h2>Add Products</h2>
                <hr />
                <div className={addproduct ? null : styles.addproductbox}>
                  Product Added
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
                            <Form.Control as="select" onChange={(e)=>SetCategory(e.target.value)}>
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
          </div>
      </div>
    </div>
    
  );
}

export default Addpage;
