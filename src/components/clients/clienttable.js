import React, { useState, useEffect } from "react";
import styles from "./client.module.css";
import Client from "./client";
import {Redirect} from 'react-router-dom'
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Addclient from "./addclient";
import EditClient from "./editclient";
import Deleteclient from "./deleteclient";
import Pagination from "./pagination";
const { ipcRenderer } = window.require("electron");

function Clienttable() {
  let deleteModalClose = () => {
    SetdeleteModal(false);
  };
  let editModalClose = () => {
    Seteditmodal(false);
  };

  const [addModal, SetaddModal] = useState("");
  const [clients, Setclients] = useState([]);
  const [listener, Setlistener] = useState(false);
  const [deleteModal, SetdeleteModal] = useState(false);
  const [deleteclient, Setdeleteclient] = useState("");
  const [editmodal, Seteditmodal] = useState(false);
  const [editclient, Seteditclient] = useState("");
  const [editredirect, Seteditredirect] = useState(false);
  const [editID,SeteditId] = useState("")
  const [nodata, Setnodate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  useEffect(() => {
    ipcRenderer.send("ClientView");
    if (!listener) {
      console.log(listener);
      Setlistener(true);
      ipcRenderer.on("ClientViewResult", async (err, result) => {
        if (result.length > 0) {
          Setclients(result);
        } else {
          Setclients([])
          Setnodate(true);
        }
      });
    }
  },[deleteModal]);
  const handleeditClick = (clientID) => {
    var clientindex = clients
      .map(function (client) {
        return client.clientID;
      })
      .indexOf(clientID);
    Seteditredirect(true);
    SeteditId(clients[clientindex].clientID)
    Seteditclient(clients[clientindex]);
    // Seteditmodal(true);
  };
  const handledeleteClick = (clientID) => {
    var clientindex = clients
      .map(function (client) {
        return client.clientID;
      })
      .indexOf(clientID);
    Setdeleteclient(clients[clientindex]);
    SetdeleteModal(true);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentclients = clients.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {/* <Client /> */}
      <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
        <div className={styles.itembox2}>
          <div className="row">
            <h5>Manage Client</h5>

            <Container>
              <Table className={styles.table} bordered>
                <thead className={styles.heading}>
                  <tr>
                    <th style={{ width: "50px" }}>S.No</th>
                    <th style={{ width: "300px" }}>Details</th>
                    <th></th>

                    <th>Edit / Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {nodata ? `No Data Found` : null}

                  {currentclients.map((client, index) => (
                    <tr className={styles.tablebody} Key={client.clientID}>
                      <td>{client.ID}</td>
                      <td
                        //   onClick={() => inventorynameclick(invent.inventID)}
                        className={styles.itemname}
                      >
                        <b>Clientname: </b>
                        {client.clientname}
                        <br />
                        <b>Companyname: </b>
                        {client.companyname}
                        <br />
                        <b>Shop Address: </b>
                        {client.shopaddress}
                        <br />
                        <b>Contact: </b>
                        {client.contact}
                      </td>

                      <td></td>

                      <td>
                        <Button
                          // style={{ height: "30px",textAlign:"center" }}
                          variant="primary"
                          onClick={() => handleeditClick(client.clientID)}
                        >
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </Button>
                        <Button
                          // style={{ height: "40px"  }}
                          variant="danger"
                          onClick={() => handledeleteClick(client.clientID)}
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={clients.length}
            paginate={paginate}
          />
          {editredirect ? <Redirect to={`/editclients/clientID=${editID}`} /> : null}

          {/* <Viewmodal
          passitem={inventoryview}
          show={inventoryModal}
          onHide={viewModalClose}
        /> */}
          <Deleteclient
            passitem={deleteclient}
            show={deleteModal}
            onHide={deleteModalClose}
          />
          <EditClient
            passitem={editclient}
            show={editmodal}
            onHide={editModalClose}
          />
        </div>
      </div>
    </div>
  );
}

export default Clienttable;
