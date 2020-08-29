import React, { useState,useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

function Itemview(props) {
  const [itemname, Setitemname] = useState("");
  const [description, Setdescription] = useState("");
  const [category, SetCategory] = useState("Select");
  const [origin, Setorigin] = useState("");
  const id = props.passitem.ItemID;

  const Setarray = () => {
    // setTimeout(() => {
      Setitemname(props.passitem.itemname);
      Setdescription(props.passitem.description);
      SetCategory(props.passitem.category);
      Setorigin(props.passitem.origin);
    // }, 500);
  };
  useEffect(() => {
    // console.log(id);
    Setarray();
  }, [id]);
  return (
      <div>
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           View Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
        ItemName : {itemname} <br />
            Description : {description} <br />
            Category : {category} <br />
            Origin : {origin} <br />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>  );
}

export default Itemview;
