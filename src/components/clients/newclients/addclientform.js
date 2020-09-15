
import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import styles from "../client.module.css";




function Addclientform() {

    const [clientname, Setclientname] = useState("");
    const [shopaddress, Setshopaddress] = useState("");
    const [contact, Setcontact] = useState("");
    const [error, Seterror] = useState("");
    return (
        <Container>
            <Form>

                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Name
</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="name" placeholder="Name" onChange={(e) => Setclientname(e.target.value)} />
                    </Col>
                </Form.Group>


            </Form>
        </Container>
    )
}

export default Addclientform


