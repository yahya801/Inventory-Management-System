import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../clients/client.module.css";
import Sidebar from "../sidebar";
const { ipcRenderer } = window.require("electron");
function Addbill() {
    const [billID,SetbillID] = useState("")


    useEffect(() => {

    },[])
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <div className={styles.itembox}>
          <Container>
            <div >
              Client Added
            </div>
            <h2>Generate Bill</h2>
            <Form>
              <Form.Group controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  Bill Id
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="name"
                    // value={clientname}
                    placeholder="BillID"
                    // onChange={(e) => Setclientname(e.target.value)}
                  />
                </Col>
                <Form.Label column sm={2}>
                  Shop Address
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="name"
                    // value={shopaddress}
                    placeholder="Shop Address"
                    // onChange={(e) => Setshopaddress(e.target.value)}
                  />
                </Col>
                <Form.Label column sm={2}>
                  Phone No
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="number"
                    placeholder="Phone No"
                    // value={contact}
                    // onChange={(e) => Setcontact(e.target.value)}
                  />
                </Col>
                {/* {error} */}

                <Button
                //   onClick={() => addclient()}
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

export default Addbill;
