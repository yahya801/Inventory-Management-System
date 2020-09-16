import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Sidebar(props) {
  const [productsdropdown, Setproductsdropdown] = useState(false);
  const [inventorydropdown, Setinventorydropdown] = useState(false);
  const [clientdropdown, Setclientdropdown] = useState(false);
  const [brokerdropdown, Setbrokerdropdown] = useState(false);
  const [billdropdown, Setbilldropdown] = useState(false);
  const productsdrop = () => {
    if (productsdropdown) {
      Setproductsdropdown(false);
    } else {
      Setclientdropdown(false);
      Setinventorydropdown(false);
      Setproductsdropdown(true);
      Setbrokerdropdown(false);
    }
  };
  const inventorydrop = () => {
    if (inventorydropdown) {
      Setinventorydropdown(false);
    } else {
      Setclientdropdown(false);
      Setproductsdropdown(false);
      Setinventorydropdown(true);
      Setbrokerdropdown(false);
    }
  };
  const clientdrop = () => {
    if (clientdropdown) {
      Setclientdropdown(false);
    } else {
      Setproductsdropdown(false);
      Setinventorydropdown(false);
      Setclientdropdown(true);
      Setbrokerdropdown(false);
    }
  };
  const brokerdrop = () => {
    if (brokerdropdown) {
      Setbrokerdropdown(false);
    } else {
      Setproductsdropdown(false);
      Setinventorydropdown(false);
      Setclientdropdown(false);
      Setbrokerdropdown(true);
    }
  };
  const billdrop = () => {
    if (billdropdown) {
      Setbilldropdown(false);
    } else {
      Setproductsdropdown(false);
      Setinventorydropdown(false);
      Setclientdropdown(false);
      Setbrokerdropdown(false);
      Setbilldropdown(true);
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
          <button
            onClick={() => billdrop()}
            className={" fa fa-users dropdown-btn "}
          >
            Bill<i class="fa fa-caret-down"></i>
          </button>
          <div className={billdropdown ? "active" : "dropdown-container"}>
            <Link to="/addbill">Generate Bill</Link>
            <Link to="/bill">Bill List</Link>
          </div>

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

          <button onClick={() => productsdrop()} class="dropdown-btn">
            Products
            <i class="fa fa-caret-down"></i>
          </button>
          <div className={productsdropdown ? "active" : "dropdown-container"}>
            <Link
              className={props.productsadd ? "active" : null}
              to="/itemsadd"
            >
              Add Products
            </Link>
            <Link className={props.products ? "active" : null} to="/items">
              Products List
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
