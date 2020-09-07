import React, { useState, useEffect } from "react";
import styles from "./itemstop.module.css";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router-dom";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import Items from "./itemstop";
import ItemModal from "./itemmodal";
import Editmodal from "./editmodal";
import Deletemodal from "./deletemodal";
import Itemview from "./itemview";
import Pagination from "./pagination";

const { ipcRenderer } = window.require("electron");

function Searchtable() {
  var url_string = window.location.href;
  const [itemview, Setitemview] = useState({});
  const [search, Setsearch] = useState("");
  const [searchitems, Setsearchitems] = useState([]);
  const [emptysearch, Setemptysearch] = useState(false);
  const [itemshowModal, SetitemshowModal] = useState(false);
  const [editModalshow, SeteditModalShow] = useState(false);
  const [deleteModalshow, Setdeletemodalshow] = useState(false);
  const answer_array = url_string.split("itemname=");
  const [editItems, SeteditItems] = useState({});
  const [Deleteitem, SetDeleteitem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [redirectsearch,Setredirectsearch] = useState(false)
const [nosearch,Setnosearch] = useState("")
  let itemModalClose = () => {
    SetitemshowModal(false);
  };
  let editModalClose = () => {
    SeteditModalShow(false);
  };
  let deleteModalClose = () => {
    Setdeletemodalshow(false);
  };
  const handleeditClick = (itemid) => {
    var removeindex = searchitems
      .map(function (Item) {
        return Item.ItemID;
      })
      .indexOf(itemid);
    SeteditItems(searchitems[removeindex]);
    SeteditModalShow(true);
  };
  const deleteitem = (itemid, itemname) => {
    var removeindex = searchitems
      .map(function (Item) {
        return Item.ItemID;
      })
      .indexOf(itemid);
    // console.log(removeindex);
    // console.log(itemname);
    SetDeleteitem(searchitems[removeindex]);
    Setdeletemodalshow(true);
  };
  const itemnameclick = (itemid) => {
    var itemnameindex = searchitems
      .map(function (Item) {
        return Item.ItemID;
      })
      .indexOf(itemid);
    // console.log(itemnameindex);
    // console.log(items[itemnameindex])
    SetitemshowModal(true);
    Setitemview(searchitems[itemnameindex]);
    // console.log(itemname);
    // SetDeleteitem(items[removeindex]);
    // Setdeletemodalshow(true);
  };
  const searchclick = () => {
    if (search == []) {
      Setemptysearch(true);
    } else {
      ipcRenderer.send("SearchItems", search);

      ipcRenderer.on("SearchItemResult", (err, result) => {
          if(result.length ===  0){
              Setnosearch("No Item Found")
              
          }
          else{
            //   console.log(result)
        Setsearchitems(result);
        // console.log(result);}
      }
        // Setredirectsearch(true)

})
    }
}
  
  useEffect(() => {
    Setsearch(answer_array[1]);
    const itemname = answer_array[1];

    ipcRenderer.send("SearchItems", itemname);

    ipcRenderer.on("SearchItemResult", (err, result) => {
        if(result === ""){
            Setnosearch("No Item Found")
            
        }
        else{
      Setsearchitems(result);
    //   console.log(result);
        }
    });
    // console.log(answer_array)
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentitems = searchitems.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Items />
      <div style={{ paddingLeft: "10px" }}>
        <div className={styles.itembox}>
          <input
            // className={styles.inputtext}
            type="text"
            value={search}
            required
            onChange={(e) => Setsearch(e.target.value)}
            placeholder="Search"
          />
          <button onClick={() => searchclick()}>Search</button>
          <Container>
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
                  {nosearch}
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
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={searchitems.length}
            paginate={paginate}
          />
          <Itemview
                      
                      passitem={itemview}
                        show={itemshowModal}
                        onHide={itemModalClose}
                      />
        </div>
        
      </div>
      {/* {redirectsearch ? 
        <Redirect to={`/itemsearch?itemname=${search}`} />
       : null} */}
      {emptysearch ? <Redirect to="/items" /> : null}
    </div>
  );
}

export default Searchtable;
