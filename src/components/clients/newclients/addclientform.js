import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../client.module.css";
import Sidebar from "../../sidebar";
const { ipcRenderer } = window.require("electron");
function Addclientform() {
  const [clientname, Setclientname] = useState("");
  const [shopaddress, Setshopaddress] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");
  const [clientbox,Setclientbox] = useState(false)
  const addclient = () => {
    if (!clientname || !shopaddress || !contact) {
      Seterror("Check if any field is empty");
      

    } else {
        Seterror("")
      const array = {
        clientname,
        shopaddress,
        contact,
      };

      ipcRenderer.send("AddClient", array);
      setTimeout(() => {
        Setclientbox(false)
      }, 3000);
      Setclientbox(true)
      Setclientname("")
      Setshopaddress("")
      Setcontact("")
     

    }
  };

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <div className={styles.itembox}>
          <Container>
              <div className={clientbox ? null : styles.addclientbox}>
                  Client Added
              </div>
            <h2>Add Clients</h2>
            <Form>
              <Form.Group controlId="formHorizontalName">
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
                
                </Col>
                {error}

                <Button
                  onClick={() => addclient()}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Addclientform;
