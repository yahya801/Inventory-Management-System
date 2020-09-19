import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../clients/client.module.css";
import Sidebar from "../sidebar";
import moment from "moment";
import Navbar from '../navbar'
const { ipcRenderer } = window.require("electron");
function Addbill() {
  const [billID, SetbillID] = useState("");
  const [billdate, Setbilldate] = useState(moment().format("DD-MM-YYYY"));
  const [totalamount, Settotalamount] = useState("");
  const [fields, Setfields] = useState([{value: null,lotno: null,itemname: null }]);
  const [items, Setitems] = useState([]);
  const [index, Setindex] = useState("");
  const [lotno, Setlotno] = useState("");
  const [itemname,Setitemname] = useState([])

  const HandleChange = (e, index) => {
    const values = [...fields];
    values[index].value = e.target.value;
    Setfields(values);
  };

  const handleadd = () => {
    const values = [...fields];
    values.push({ value: null });
    Setfields(values);
  };
  const handledelete = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    Setfields(values);
  };
  const handleitem = (e) => {
      const values = [...fields]
      values[e.target.value] = items[e.target.value].lotno;
    // Setindex(i);

    // console.log(items[e.target.value].lotno)
    // Setlotno(items[e.target.value].lotno)
    // Setitemname(items[e.target.value].itemname) 
    // console.log(items[i].itemname);
  };
  useEffect(() => {
    ipcRenderer.send("BillInventory");

    ipcRenderer.on("InventoryOptions", async (err, result) => {
      console.log(result);
      Setitems(result);
    });
  }, []);
  return (
    <div>
      <div>
        <Sidebar />
        <Navbar />
      </div>
      <div>
        <div className={styles.itembox}>
          <Container>
            <div>Client Added</div>
            <h2>Generate Bill</h2>
            <Form>
              <Form.Group controlId="formHorizontalName">
                <Form.Label column sm={2}>
                  Bill Id
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="name"
                    // value={clientname}
                    placeholder="BillID"
                    // onChange={(e) => Setclientname(e.target.value)}
                  />
                </Col>
                <Form.Label column sm={2}>
                  Date
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="name"
                    value={billdate}
                    placeholder="Shop Address"
                    // onChange={(e) => Setshopaddress(e.target.value)}
                  />
                </Col>
                <Form.Label column sm={2}>
                  Phone No
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    type="number"
                    placeholder="Phone No"

                    // onChange={(e) => Setcontact(e.target.value)}
                  />
                </Col>
                {/* {error} */}

                {fields.map((field, index) => {
                  return (
                    <div key={index}>
                      <Form.Label column sm={2}>
                        Phone No
                      </Form.Label>
                      <Row>
                        <Col sm={5}>
                          <Form.Control
                            as="select"
                           
                            onChange={(e) => handleitem(e)}
                          >
                            
                            <option>Select</option>
                            {items.map((item, index) => (
                              <option
                                key={index}
                                value={index}
                               
                              >
                                {item.lotno}
                              </option>
                            ))}
                            {/* </select> */}
                          </Form.Control>
                        </Col>
                        <Col sm={5}>
                          <Form.Control
                            type="text"
                            value={itemname}
                            placeholder="Phone No"
                            // value={contact}
                            // onChange={(ei) => Setcontact(e.target.value)}
                          />
                        </Col>
                      </Row>

                      {fields.length === 1 ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() => handledelete(index)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  );
                })}
                <button type="button" onClick={() => handleadd()}>
                  Add
                </button>
                <Button
                  //   onClick={() => addclient()}
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Addbill;
