import React from "react";
import styles from "./itemstop.module.css";
import Table from "react-bootstrap/Table";
import { Container, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
function itemtableview() {
  return (
    <div style={{ paddingLeft: "10px" }}>
      <div className={styles.itembox}>
        <h2>Manage Items</h2>
        <div>
          <Container>
            <Table className={styles.table} stripped bordered hover>
              <thead>
                <tr>
                  <th>Item No</th>
                  <th>ItemName</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Origin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>
                    <Link
                      variant="info"
                      className="btn"
                      // to={`/edit-event/${Event._id}`}
                      //   onClick={() => this.editevent(Event._id)}
                    >
                      Edit
                    </Link>
                    <Button
                      variant="danger"
                      //   onClick={() => this.deleteevent(Event._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
                
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default itemtableview;
