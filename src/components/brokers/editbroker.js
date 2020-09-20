import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./broker.module.css";
const { ipcRenderer } = window.require("electron");

function Editbroker(props) {
  const [brokername, Setbrokername] = useState("");
  const [brokerinfo, Setbrokerinfo] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");
  const [update, Setupdate] = useState("");
  const brokerID = props.passitem.brokerID;

  useEffect(() => {
    Setbrokername(props.passitem.brokername);
    Setbrokerinfo(props.passitem.brokerinfo);
    Setcontact(props.passitem.contact);
  }, [brokerID]);

  const HandleClick = () => {
    if (!brokername || !brokerinfo || !contact) {
      Seterror("Fields not filled");
    } else {
      if (
        brokername !== props.passitem.brokername ||
        brokerinfo !== props.passitem.brokerinfo ||
        contact !== props.passitem.contact
      ) {
        const array = {
          brokername,
          brokerinfo,
          contact,
          brokerID,
        };

        ipcRenderer.send("EditBroker", array);

        ipcRenderer.on("BrokerEdited", async (err) => {
          Setupdate(true)
          Setbrokername("")
          Setbrokerinfo("")
          Setcontact("")
          setTimeout(() => {
            Setupdate(false)
            props.onHide()
          }, 2000);
        });
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
          Broker Edit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {update ? <div>Broker Updated</div> : null}
        <Form>
          <Form.Group>
            <div class="row justify-content-md-center">
              <Form.Label column sm={2}>
                Broker Name
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="name"
                  value={brokername}
                  placeholder="Name"
                  onChange={(e) => Setbrokername(e.target.value)}
                />
              </Col>
            </div>
            <br />

            <div class="row justify-content-md-center">
              <Form.Label column sm={2}>
                Broker Info
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="name"
                  value={brokerinfo}
                  placeholder="Info"
                  onChange={(e) => Setbrokerinfo(e.target.value)}
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
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => HandleClick()}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Editbroker;
