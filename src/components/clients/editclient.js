import React, { useState, useEffect } from "react";
import { Modal, Container, Button, Row, Col, Form } from "react-bootstrap";
// import styles from "./broker.module.css";
const { ipcRenderer } = window.require("electron");

function Editbroker(props) {
  const [clientname, Setclientname] = useState("");
  const [companyname, Setcompanyname] = useState("");
  const [shopaddress, Setshopaddress] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");
  const [update, Setupdate] = useState(false);
  const clientID = props.passitem.clientID;
  useEffect(() => {
    Setclientname(props.passitem.clientname);
    Setcompanyname(props.passitem.companyname);
    Setshopaddress(props.passitem.shopaddress);
    Setcontact(props.passitem.contact);
  }, [clientID]);
  const handleedit = () => {
    if (!clientname || !companyname || !shopaddress || !contact) {
      Seterror("All Fields are not filled");
    } else {
      if (
        clientname !== props.passitem.clientname ||
        companyname !== props.passitem.companyname ||
        shopaddress !== props.passitem.shopaddress ||
        contact !== props.passitem.contact
      ) {
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
          Setupdate(true);
          Setclientname("");
          Setcompanyname("");
          Setshopaddress("");
          Setcontact("");
          setTimeout(() => {
            Setupdate(false);
            props.onHide()
          }, 2000);
        
        });
      } else {
        Seterror("No fields Changed");
      }
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Client
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {update ? <div>Client Updated</div> : null}
        <Container>
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
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleedit()}>Edit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Editbroker;
