/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
} from "reactstrap";

import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const EditUser = ({match}) => {
  const [data, setData] = useState({ user: [] });

  useEffect(async () => {
    console.log(match.params)
    const  {idUser}  = match.params;
    const result = await axios.get(
      'https://web-be-brmc9.ondigitalocean.app/api/user/' + idUser + '/info',
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      },
  
    );
    console.log(result.data.user)
    setData(result.data);
  }, []);

  return (
    <div>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">View detail</h3>
              </CardHeader>
              <Table
                className="align-items-center table-light table-flush " style={{margin:"20px",  width: "95%"}}
                responsive
              >
                <div style={{margin:"20px", padding: "100px", width: "500px", display:"center"}}>
                <div className="form-group">
                  <label htmlFor="time" className="text-body">
                    Name :
                  </label>
                  <input
                    type="text"
                    className="form-control text-body"
                    name="_time"
                    value={data.user.username }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title" className="text-body">
                    Email :{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control text-body"
                    name="title"
                    value={data.user.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title" className="text-body">
                    Role :{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control text-body"
                    name="title"
                    value={data.user.role}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title" className="text-body">
                    Update at :{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control text-body"
                    name="title"
                    value={data.user.updatedAt}
                  />
                </div>
                </div>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default EditUser;
