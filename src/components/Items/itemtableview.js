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
import "./style.css";
const { ipcRenderer } = window.require("electron");
function Itemtableview() {
  const [addModalshow, SetaddModalShow] = useState(false);
  const [editModalshow, SeteditModalShow] = useState(false);
  const [deleteModalshow, Setdeletemodalshow] = useState(false);
  const [editItems, SeteditItems] = useState({});
  const [items, SetItems] = useState([]);
  const [updateitems, Setupdateitems] = useState();
  const [listener, Setlistener] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [Deleteitem, SetDeleteitem] = useState("");
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
    // let a;

    SeteditItems(items[removeindex]);
    // console.log(items[removeindex]);
    // console.log(items[removeindex].ItemID)
    // ipcRenderer.send("EditItemQuery",items[removeindex].ItemID)

    // ipcRenderer.on("ItemsEditQuerySuccessful", (err, result) => {

    //    console.log(result)
    //   })
    // console.log(editItems);
    SeteditModalShow(true);
  };

  useEffect(() => {
    // let listener = false;
    ipcRenderer.send("ItemsQuery");

    if (!listener) {
      console.log(listener);
      Setlistener(true);
      ipcRenderer.on("ItemsQuerySuccessful", async (err, result) => {
        // console.log(result);
        // Setlistener(true)
        // console.log(listener);
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
    console.log(removeindex);
    console.log(itemname);
    SetDeleteitem(items[removeindex]);

    // console.log(itemid)
    // const r = window.confirm(
    // `Do you really want to Delete ${itemname}?`
    // );
    // if (r == true) {
    Setdeletemodalshow(true);
    // var removeindex = items
    //   .map(function (Item) {
    //     return Item.ItemID;
    //   })
    //   .indexOf(itemid);

    // console.log(removeindex);
    // Setupdateitems([items])

    // const r = window.confirm(
    //   `Do you really want to Delete ${items[removeindex].itemname}?`
    // );
    // if (r == true) {
    // items.splice(removeindex, 1);
    // console.log(items)
    //  const newitem = items
    //   console.log(newitem)
    //     newitem.splice(removeindex,1)
    //     console.log(newitem)
    //     const deleteitem = items[removeindex];
    //     console.log(deleteitem);
    //     SetItems(newitem)
    // ipcRenderer.send("DeleteItem", deleteitem);
    // this.setState({ items: newitem })
    // ipcRenderer.on("DeletedSuccessfully",(err) =>{
    //   window.location = "/items/delete";
    // })

    // }
    // }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentitems = items.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    //   <div><Items /></div>
    //   <Items />
    <div>
      <Items />
      <div style={{ paddingLeft: "10px" }}>
        <div className={styles.itembox}>
          <h2>Manage Items</h2>
          <div>
            <ButtonToolbar>
              <Button variant="primary" onClick={() => SetaddModalShow(true)}>
                Add Item
              </Button>
              <ItemModal show={addModalshow} onHide={addModalClose} />
            </ButtonToolbar>
            <Container>
              {addModalshow}
              <Table bordered stripped hover>
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
                      <td>{Item.ItemID}</td>
                      <td className={styles.itemname}>{Item.itemname}</td>

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
        </div>
      </div>
    </div>
  );
}

export default Itemtableview;
