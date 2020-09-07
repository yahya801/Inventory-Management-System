import React, { useState, useEffect } from "react";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import styles from "./itemstop.module.css";
import Inventorytop from "./inventorytop";
import Table from "react-bootstrap/Table";
import Addinventory from "./addinventory";
import moment from "moment";
import Viewmodal from "./viewmodal";
import Deletemodal from "./deletemodal";
import Editmodal from './editmodal'
import Pagination from "./pagination";
const { ipcRenderer } = window.require("electron");

function Inventorytableview() {

  const [addModal, SetaddModal] = useState(false);
  const [listener, Setlistener] = useState(false);
  const [inventory, Setinventory] = useState([]);
  const [deleteinvent, Setdeleteinvent] = useState("");
  const [editinvent,Seteditinvent] = useState("")
  const [inventoryModal, SetinventoryModal] = useState(false);
  const [deleteModal, SetdeleteModal] = useState(false);
  const [editModal, SeteditModal] = useState(false);
  const [inventoryview, Setinventoryview] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);

  let addModalClose = () => {
    SetaddModal(false);
  };
  let viewModalClose = () => {
    SetinventoryModal(false);
  };
  let deleteModalClose = () => {
    SetdeleteModal(false);
  };
  let editModalClose = () => {
    SeteditModal(false);
  };
  useEffect(() => {
    ipcRenderer.send("InventoryQuery");

    if (!listener) {
      console.log(listener);
      Setlistener(true);
      ipcRenderer.on("InventoryQuerySuccessful", async (err, result) => {
        Setinventory(result);
        // console.log(result)
      });
    }
  });
  const inventorynameclick = (inventID) => {
    var inventoryindex = inventory
      .map(function (invent) {
        return invent.inventID;
      })
      .indexOf(inventID);
    SetinventoryModal(true);

    Setinventoryview(inventory[inventoryindex]);
  };
  const handledeleteClick = (inventID) => {
    var inventoryindex = inventory
      .map(function (invent) {
        return invent.inventID;
      })
      .indexOf(inventID);
    Setdeleteinvent(inventory[inventoryindex]);
    SetdeleteModal(true);
  };
  const handleeditClick = (inventID) => {
    var inventoryindex = inventory
      .map(function (invent) {
        return invent.inventID;
      })
      .indexOf(inventID);
   Seteditinvent(inventory[inventoryindex])
   SeteditModal(true)
    };
  

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentinventory = inventory.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Inventorytop />
      <div style={{ paddingLeft: "10px" }}>
        <div className={styles.itembox}>
          <div className="row">
            <h5>Manage Inventory</h5>
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
                Add Inventory
              </Button>
              <Addinventory show={addModal} onHide={addModalClose} />
            </ButtonToolbar>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      {/* <button onClick={() => sort()}> */}
                      Lotno
                      {/* </button> */}
                    </th>
                    <th>Itemname</th>
                    <th>Date</th>
                    <th>Price/KG</th>
                    <th>No of Bags</th>
                    <th>Total Weight(kg) </th>
                    <th>Total Expense(RS)</th>
                    <th>Edit / Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentinventory.map((invent) => (
                    <tr Key={invent.inventID}>
                      <td>{invent.lotno}</td>
                      <td
                        onClick={() => inventorynameclick(invent.inventID)}
                        className={styles.itemname}
                      >
                        {invent.itemname}
                      </td>
                      <td>{moment(invent.date).format("DD-MM-YYYY")}</td>

                      <td>{invent.priceperkg}</td>
                      <td>{invent.noofbags}</td>
                      <td>{invent.totalweight}</td>
                      <td>{invent.totalexpense.toLocaleString()}</td>
                      <td>
                        <Button
                          // style={{ height: "40px"  }}
                          // variant="primary"
                          onClick={() => handleeditClick(invent.inventID)}
                        >
                          Edit
                        </Button>
                        <Button
                          // style={{ height: "40px"  }}
                          variant="danger"
                          onClick={() => handledeleteClick(invent.inventID)}
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
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={inventory.length}
            paginate={paginate}
          />
          <Viewmodal
            passitem={inventoryview}
            show={inventoryModal}
            onHide={viewModalClose}
          />
          <Deletemodal
            passitem={deleteinvent}
            show={deleteModal}
            onHide={deleteModalClose}
          />
           <Editmodal
            passitem={editinvent}
            show={editModal}
            onHide={editModalClose}
          />
        </div>
      </div>
    </div>
  );
}

export default Inventorytableview;
