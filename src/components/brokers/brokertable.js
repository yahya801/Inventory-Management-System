import React, { useState, useEffect } from "react";
import Broker from "./broker";
import styles from "./broker.module.css";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Addbroker from "./addbroker";
import Deletebroker from "./deletebroker";
import Pagination from "./pagination";
import Editbroker from "./editbroker";

const { ipcRenderer } = window.require("electron");
function Brokertable() {
  const [addModal, SetaddModal] = useState(false);
  const [Deletemodal, SetDeleteModal] = useState(false);
  const [Editmodal, SetEditmodal] = useState(false);
  const [brokers, Setbroker] = useState([]);
  const [deletebroker, Setdeletebroker] = useState("");
  const [editbroker, Seteditbroker] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  useEffect(() => {
    ipcRenderer.send("ViewBroker");
    ipcRenderer.on("BrokerViewResult", async (err, result) => {
      Setbroker(result);
    });
  });

  const Handledeleteclick = (brokerID) => {
    var brokerindex = brokers
      .map(function (broker) {
        return broker.brokerID;
      })
      .indexOf(brokerID);

    Setdeletebroker(brokers[brokerindex]);

    SetDeleteModal(true);
  };
  const Handleeditclick = (brokerID) => {
    var brokerindex = brokers
      .map(function (broker) {
        return broker.brokerID;
      })
      .indexOf(brokerID);
    Seteditbroker(brokers[brokerindex]);

    SetEditmodal(true);
  };

  let addModalClose = () => {
    SetaddModal(false);
  };
  let deleteModalClose = () => {
    SetDeleteModal(false);
  };
  let editModalClose = () => {
    SetEditmodal(false);
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentbrokers = brokers.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                {currentbrokers.map((broker) => (
                  <tr Key={broker.brokerID}>
                    <td>{broker.ID}</td>
                    <td>{broker.brokername}</td>
                    <td>{broker.brokerinfo}</td>
                    <td>{broker.contact}</td>
                    <td>
                      <Button onClick={() => Handleeditclick(broker.brokerID)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => Handledeleteclick(broker.brokerID)}
                      >
                        Delete
                      </Button>
                      <Editbroker
                        passitem={editbroker}
                        show={Editmodal}
                        onHide={editModalClose}
                      />
                      <Deletebroker
                        passitem={deletebroker}
                        show={Deletemodal}
                        onHide={deleteModalClose}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={brokers.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default Brokertable;
