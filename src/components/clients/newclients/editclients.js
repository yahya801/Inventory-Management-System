import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../client.module.css";
import Sidebar from "../../sidebar";
import Navbar from "../../navbar";
import { Redirect } from "react-router-dom";

const { ipcRenderer } = window.require("electron");
function Editclient() {
  const [clientname, Setclientname] = useState("");
  const [companyname, Setcompanyname] = useState("");
  const [shopaddress, Setshopaddress] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");
  const [clientID,SetclientID] = useState("")
  const [clientbox, Setclientbox] = useState(false);
  const [update, Setupdate] = useState(false);

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
        clientID,
      };
      console.log(array);
      ipcRenderer.send("EditClient", array);

      ipcRenderer.on("ClientUpdated", async (err) => {
        
        Setclientname("");
        Setcompanyname("");
        Setshopaddress("");
        Setcontact("");
        Setupdate(true);
      });
    }
  };
  useEffect(() => {
    var ClientID = window.location.hash.split("clientID=")[1];
    SetclientID(ClientID);
    console.log(ClientID)

    ipcRenderer.send("EditClientView",ClientID);

    ipcRenderer.on("viewEditClient",async(err,result)=>{
        console.log(result)
        Setclientname(result[0].clientname)
        Setcompanyname(result[0].companyname)
        Setshopaddress(result[0].shopaddress)
        Setcontact(result[0].contact)
        
    })
  },[]);

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
                <h2>Edit Clients</h2>
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
          {update ? <Redirect to={`/clients`}/> : null}
        </div>
      </div>
    </div>
  );
}

export default Editclient;
