import React, { useState, useEffect } from "react";
import styles from "./itemstop.module.css";
import Table from "react-bootstrap/Table";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Items from "./itemstop";
import ItemModal from "./itemmodal";
import Editmodal from "./editmodal";
import Deletemodal from "./deletemodal";
import Pagination from "./pagination";
import Itemview from "./itemview";
import "./style.css";
const { ipcRenderer } = window.require("electron");
function Itemtableview() {
  const [itemshowModal, SetitemshowModal] = useState(false);
  const [addModalshow, SetaddModalShow] = useState(false);
  const [editModalshow, SeteditModalShow] = useState(false);
  const [deleteModalshow, Setdeletemodalshow] = useState(false);
  const [itemview, Setitemview] = useState({});
  const [editItems, SeteditItems] = useState({});
  const [items, SetItems] = useState([]);
  const [listener, Setlistener] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [Deleteitem, SetDeleteitem] = useState("");
  const [search, Setsearch] = useState("");
  const [searchredirect, Setsearchredirect] = useState(false);
  const [itemnameclic,Setitemclick] = useState(false)
  let itemModalClose = () => {
    SetitemshowModal(false);
  };
  let addModalClose = () => {
    SetaddModalShow(false);
  };
  let editModalClose = () => {
    SeteditModalShow(false);
  };
  let deleteModalClose = () => {
    Setdeletemodalshow(false);
  };
  const sort = () => {
    const item = items;
    item.sort(function (a, b) {
      if (a.itemname > b.itemname) {
        return -1;
      }
      if (a.itemname < b.itemname) {
        return 1;
      }
      return 0;
    });
    SetItems(item);
    console.log(item);
    window.location = "/items/kkkk";
  };
  const handleeditClick = (itemid) => {
    var removeindex = items
      .map(function (Item) {
        return Item.ItemID;
      })
      .indexOf(itemid);
    SeteditItems(items[removeindex]);
    SeteditModalShow(true);
  };

  useEffect(() => {
    ipcRenderer.send("ItemsQuery");

    if (!listener) {
      console.log(listener);
      Setlistener(true);
      ipcRenderer.on("ItemsQuerySuccessful", async (err, result) => {
        SetItems(result);
      });
    }
  });
  const deleteitem = (itemid, itemname) => {
    var removeindex = items
      .map(function (Item) {
        return Item.ItemID;
      })
      .indexOf(itemid);
    // console.log(removeindex);
    // console.log(itemname);
    SetDeleteitem(items[removeindex]);
    Setdeletemodalshow(true);
  };
  const searchclick = () => {
    if (search == "") {
    } else {
      console.log(search);
      Setsearchredirect(true);
    }
  };
  const itemnameclick = (itemid) => {
    var itemnameindex = items
      .map(function (Item) {
        return Item.ItemID;
      })
      .indexOf(itemid);
    console.log(itemnameindex);
    // console.log(items[itemnameindex])
    // Setitemclick(true)
    SetitemshowModal(true);
    Setitemview(items[itemnameindex]);
    // console.log(itemname);
    // SetDeleteitem(items[removeindex]);
    // Setdeletemodalshow(true);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentitems = items.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Items />
      <div style={{ paddingLeft: "10px" }}>
        <div className={styles.itembox}>
          <div className="row">
            <h5>Manage Items</h5>
            <form>
            <input
              // className={styles.inputtext}
              type="text"
              value={search}
              required
              onChange={(e) => Setsearch(e.target.value)}
              placeholder="Search"
            />
            <button onClick={() => searchclick()}>Search</button>
            </form>
            {searchredirect ? (
              <Redirect to={`/itemsearch?itemname=${search}`} />
            ) : null}
          </div>
          <div>
            <ButtonToolbar>
              <Button variant="primary" onClick={() => SetaddModalShow(true)}>
                Add Item
              </Button>
              <ItemModal show={addModalshow} onHide={addModalClose} />
            </ButtonToolbar>
            <Container>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item No</th>
                    <th>
                      {/* <button onClick={() => sort()}> */}
                      ItemName
                      {/* </button> */}
                    </th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Origin</th>
                    <th>Edit / Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentitems.map((Item, index) => (
                    <tr Key={Item.ItemID}>
                      <td>{index + 1}</td>
                      
                      <td
                        onClick={() => itemnameclick(Item.ItemID)}
                        className={styles.itemname}
                      >
                        
                         {Item.itemname}
                       
                      </td>
                      <td>{Item.description}</td>
                      <td>{Item.category}</td>
                      <td>{Item.origin}</td>

                      <td>
                        <div className="row">
                          <ButtonToolbar>
                            <Button
                              style={{ height: "40px", margin: "5px" }}
                              variant="primary"
                              onClick={() => handleeditClick(Item.ItemID)}
                            >
                              Edit
                            </Button>
                            <Editmodal
                              passitem={editItems}
                              show={editModalshow}
                              onHide={editModalClose}
                            />
                          </ButtonToolbar>
                          <ButtonToolbar>
                            <Button
                              style={{ height: "40px", margin: "5px" }}
                              variant="danger"
                              onClick={() =>
                                deleteitem(Item.ItemID, Item.itemname)
                              }
                            >
                              Delete
                            </Button>
                            <Deletemodal
                              passitem={Deleteitem}
                              show={deleteModalshow}
                              onHide={deleteModalClose}
                            />
                          </ButtonToolbar>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={items.length}
            paginate={paginate}
          />
          <Itemview
                        
                        passitem={itemview}
                          show={itemshowModal}
                          onHide={itemModalClose}
                        />
        </div>
      </div>
    </div>
  );
}

export default Itemtableview;
