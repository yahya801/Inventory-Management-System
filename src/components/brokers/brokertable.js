import React, { useState, useEffect } from "react";
import Broker from "./broker";
import styles from "./broker.module.css";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Addbroker from "./addbroker";
const { ipcRenderer } = window.require("electron");
function Brokertable() {
  const [addModal, SetaddModal] = useState(false);
  const [brokers, Setbroker] = useState([]);

  useEffect(() => {
    ipcRenderer.send("ViewBroker");
    ipcRenderer.on("BrokerViewResult", async (err, result) => {
      Setbroker(result);
    });
  });

  let addModalClose = () => {
    SetaddModal(false);
  };
  return (
    <div>
      <Broker />
      <div style={{ paddingLeft: "10px" }}>
        <div className={styles.itembox}>
          <div className="row"></div>
          <h5>Manage Brokers</h5>
          <ButtonToolbar>
            <Button variant="primary" onClick={() => SetaddModal(true)}>
              Add Broker
            </Button>
            <Addbroker show={addModal} onHide={addModalClose} />
          </ButtonToolbar>
          <Container>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Broker ID</th>
                  <th>BrokerName</th>
                  <th>Info</th>
                  <th>Contact Info</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((broker) => (
                  <tr Key={broker.brokerID}>
                    <td>{broker.ID}</td>
                    <td>{broker.brokername}</td>
                    <td>{broker.brokerinfo}</td>
                    <td>{broker.contact}</td>
                    <td>
                      <Button>Edit</Button>
                      <Button variant="danger">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Brokertable;
