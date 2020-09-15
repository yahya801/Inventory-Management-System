import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Sidebar(props) {
  const [dropdown, Setdropdown] = useState(false);
  const [inventorydropdown, Setinventorydropdown] = useState(false);
  const [clientdropdown, Setclientdropdown] = useState(false);
  const [brokerdropdown, Setbrokerdropdown] = useState(false);
  const dropdownset = () => {
    if (dropdown) {
      Setdropdown(false);
    } else {
      Setdropdown(true);
    }
  };
  const inventorydrop = () => {
    if (inventorydropdown) {
      Setinventorydropdown(false);
    } else {
      Setinventorydropdown(true);
    }
  };
  const clientdrop = () => {
    if (clientdropdown) {
      Setclientdropdown(false);
    } else {
      Setclientdropdown(true);
    }
  };
  const brokerdrop = () => {
    if (brokerdropdown) {
      Setbrokerdropdown(false);
    } else {
      Setbrokerdropdown(true);
    }
  };
  return (
    <div>
      <div className="sidebar">
        <div>
          <Link to="/dashboard"> Popular Traders</Link>

          <Link
            className={props.home ? " fa fa-user active " : "fa fa-user"}
            to="/dashboard"
          >
            Home
          </Link>
          <Link
            className={props.bill ? "fa fa-users active" : "fa fa-users"}
            to="/bill"
          >
            Bill
          </Link>
          <button
            onClick={() => inventorydrop()}
            className="dropdown-btn fa fa-shopping-cart"
          >
            Inventory<i class="fa fa-caret-down"></i>
          </button>
          <div className={inventorydropdown ? "active" : "dropdown-container"}>
            <Link to="/inventory">Add Inventory</Link>
            <Link to="/inventory">Inventory List</Link>
          </div>
          <button
            onClick={() => clientdrop()}
            className="dropdown-btn fa fa-shopping-cart"
          >
            Client<i class="fa fa-caret-down"></i>
          </button>
          <div className={clientdropdown ? "active" : "dropdown-container"}>
            <Link to="/addclients">Add Client</Link>
            <Link to="/clients">Client List</Link>
          </div>

          <button onClick={() => dropdownset()} class="dropdown-btn">
            Products
            <i class="fa fa-caret-down"></i>
          </button>
          <div
            className={
              props.productsdropdown || dropdown
                ? "active"
                : "dropdown-container"
            }
          >
            <Link
              className={props.productsadd ? "active" : null}
              to="/itemsadd"
            >
              Add Items
            </Link>
            <Link className={props.products ? "active" : null} to="/items">
              Items List
            </Link>
          </div>
          <button
            onClick={() => brokerdrop()}
            className="dropdown-btn fa fa-shopping-cart"
          >
            Broker<i class="fa fa-caret-down"></i>
          </button>
          <div className={brokerdropdown ? "active" : "dropdown-container"}>
            <Link to="/brokers">Add Broker</Link>
            <Link to="/brokers">Broker List</Link>
          </div>

          <Link className={props.sales ? "active" : null} to="/sales">
            Sales
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
