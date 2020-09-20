import React, { useState } from "react";
import Sidebar from "../../sidebar";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../broker.module.css";
const { ipcRenderer } = window.require("electron");
function Addbroker() {
  const [brokerbox, Setbrokerbox] = useState(false);
  const [brokername, Setbrokername] = useState("");
  const [brokerinfo, Setbrokerinfo] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");

  const addbroker = () => {
    if (!brokername || !brokerinfo || !contact) {
      Seterror("Fields not filled");
    } else {
      const array = {
        brokername,
        brokerinfo,
        contact,
      };
      ipcRenderer.send("AddBroker", array);

      ipcRenderer.on("BrokerAdded",async(err)=> {
          Setbrokerbox(true)
          Setbrokername("")
          Setbrokerinfo("")
          Setcontact("")
          setTimeout(() => {
              Setbrokerbox(false)
          }, 3000);
      })
    }
  };
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className={styles.itembox}>
        <div>
          <h3>Brokers</h3>
        </div>
        <Container>
          <div className={styles.box}>
            <div className={styles.addbox}>
              <h2>Add Brokers</h2>
              <hr />

              <div className={brokerbox ? null : styles.addbrokerbox}>
                Broker Added
              </div>
              <div className={styles.box2}>
                <div>
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
                      <div class={styles.submitbutton}>
                        <Button
                          onClick={() => addbroker()}
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
  );
}

export default Addbroker;
