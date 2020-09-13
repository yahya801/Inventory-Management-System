import React, { useState, useEffect } from "react";
import styles from "./client.module.css";
import Client from "./client";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Addclient from "./addclient";
import Deleteclient from './deleteclient'
const { ipcRenderer } = window.require("electron");

function Clienttable() {
  let addModalClose = () => {
    SetaddModal(false);
  };
  let deleteModalClose = () => {
    SetdeleteModal(false)
  }
  const [addModal, SetaddModal] = useState("");
  const [clients, Setclients] = useState([]);
  const [listener, Setlistener] = useState(false);
  const [deleteModal,SetdeleteModal] = useState(false)
  const [deleteclient,Setdeleteclient] = useState("")

  useEffect(() => {
    ipcRenderer.send("ClientView");
    if (!listener) {
      console.log(listener);
      Setlistener(true);
      ipcRenderer.on("ClientViewResult", async (err, result) => {
        Setclients(result);
      });
    }
  });
  const handledeleteClick =(clientID)=> {
    var clientindex = clients
    .map(function (client) {
      return client.clientID;
    })
    .indexOf(clientID);
    Setdeleteclient(clients[clientindex])
    SetdeleteModal(true)
  }

  return (
    <div>
      <Client />
      <div style={{ paddingLeft: "10px" }}>
        <div className={styles.itembox}>
          <div className="row">
            <h5>Manage Client</h5>
            <input
              // className={styles.inputtext}
              type="text"
              //   value={search}
              required
              //   onChange={(e) => Setsearch(e.target.value)}
              placeholder="Search"
            />
            {/* <button onClick={() => searchclick()}>Search</button> */}
            {/* {searchredirect ? (
            <Redirect to={`/itemsearch?itemname=${search}`} />
          ) : null} */}
            <ButtonToolbar>
              <Button variant="primary" onClick={() => SetaddModal(true)}>
                Add Client
              </Button>
              <Addclient show={addModal} onHide={addModalClose} />
            </ButtonToolbar>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Clientname</th>
                    <th>Shop Address</th>
                    <th>Contact Info</th>
                    <th>Edit / Delete</th>
                  </tr>
                </thead>
                <tbody>
                    
                {clients.map((client,index) => (
                  <tr Key={client.clientID}>
                    <td>{client.ID}</td>
                    <td
                    //   onClick={() => inventorynameclick(invent.inventID)}
                      className={styles.itemname}
                    >
                      {client.clientname}
                    </td>
                

                    <td>{client.shopaddress}</td>
                    <td>{client.contact}</td>
                     
                    <td>
                      <Button
                        // style={{ height: "40px"  }}
                        // variant="primary"
                        // onClick={() => handleeditClick(invent.inventID)}
                      >
                        Edit
                      </Button>
                      <Button
                        // style={{ height: "40px"  }}
                        variant="danger"
                        onClick={() => handledeleteClick(client.clientID)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </Table>
            </Container>
          </div>
          {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={inventory.length}
          paginate={paginate}
        /> */}
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
         {/* <Editmodal
          passitem={editinvent}
          show={editModal}
          onHide={editModalClose}
        /> */}
        </div>
      </div>
    </div>
  );
}

export default Clienttable;
