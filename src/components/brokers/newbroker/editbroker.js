import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../broker.module.css";
import { Redirect } from "react-router-dom";
const { ipcRenderer } = window.require("electron");
function Editbroker() {
  const [update, Setupdate] = useState(false);
  const [brokerID, SetbrokerID] = useState("");

  const [brokername, Setbrokername] = useState("");
  const [brokerinfo, Setbrokerinfo] = useState("");
  const [contact, Setcontact] = useState("");
  const [error, Seterror] = useState("");

  const HandleClick = () => {
    if (!brokername || !brokerinfo || !contact) {
      Seterror("Fields not filled");
    } else {
      const array = {
        brokername,
        brokerinfo,
        contact,
        brokerID,
      };

      ipcRenderer.send("EditBroker", array);
      console.log(array);
      ipcRenderer.on("BrokerEdited", async (err) => {
        // Setupdate(true)
        Setbrokername("");
        Setbrokerinfo("");
        Setcontact("");
        // setTimeout(() => {
        Setupdate(true);
        //   props.onHide()
        // }, 2000);
      });
    }
  };
  useEffect(() => {
    var BrokerID = window.location.hash.split("brokerID=")[1];
    SetbrokerID(BrokerID);

    ipcRenderer.send("EditBrokerView", BrokerID);

    ipcRenderer.on("ViewEditBroker", async (err, result) => {
      Setbrokername(result[0].brokername);
      Setbrokerinfo(result[0].brokerinfo);
      Setcontact(result[0].contact);
    });
  }, []);

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

              {/* <div className={brokerbox ? null : styles.addbrokerbox}>
                Broker Added
              </div> */}
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
                          onClick={() => HandleClick()}
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
        {update ? <Redirect to="/brokers" /> : null}
      </div>
    </div>
  );
}

export default Editbroker;
