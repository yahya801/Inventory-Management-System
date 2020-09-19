import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../client.module.css";
import Sidebar from "../../sidebar";
import Navbar from "../../navbar";
const { ipcRenderer } = window.require("electron");
function Addclientform() {
  const [clientname, Setclientname] = useState("");
  const [companyname, Setcompanyname] = useState("");
  const [shopaddress, Setshopaddress] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");
  const [clientbox, Setclientbox] = useState(false);

  const addclient = () => {
    if (!clientname || !companyname || !shopaddress || !contact) {
      Seterror("Check if any field is empty");
    } else {
      Seterror("");
      const array = {
        clientname,
        companyname,
        shopaddress,
        contact,
      };

      ipcRenderer.send("AddClient", array);

      ipcRenderer.on("ClientAdded", async () => {
        Setclientbox(true);
        Setclientname("");
        Setcompanyname("");
        Setshopaddress("");
        Setcontact("");
        setTimeout(() => {
          Setclientbox(false);
        }, 3000);   
      });
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
            <h3>Clients</h3>
          </div>
          <Container>
            <div className={styles.box}>
              <div className={styles.addbox}>
               
                <h2>Add Clients</h2>
                <hr />
                <div className={clientbox ? null : styles.addclientbox}>
                  Client Added
                </div>
                <div className={styles.box2}>
                  <div>
                    <Form>
                      <Form.Group controlId="formHorizontalName">
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Client Name
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              type="name"
                              value={clientname}
                              placeholder="Name"
                              onChange={(e) => Setclientname(e.target.value)}
                            />
                          </Col>
                        </div>
                        <br />
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Company Name
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              type="name"
                              value={companyname}
                              placeholder="Company Name"
                              onChange={(e) => Setcompanyname(e.target.value)}
                            />
                          </Col>
                        </div>
                        <br />
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Shop Address
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              type="name"
                              value={shopaddress}
                              placeholder="Shop Address"
                              onChange={(e) => Setshopaddress(e.target.value)}
                            />
                          </Col>
                        </div>
                        <br />
                        <div class="row justify-content-md-center">
                          <Form.Label column sm={2}>
                            Phone No
                          </Form.Label>
                          <Col sm={5}>
                            <Form.Control
                              type="number"
                              placeholder="Phone No"
                              value={contact}
                              onChange={(e) => Setcontact(e.target.value)}
                            />
                            {error}
                          </Col>
                        </div>
                        {/* {error} */}
                        <div class={styles.submitbutton}>
                          <Button
                            onClick={() => addclient()}
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

export default Addclientform;
