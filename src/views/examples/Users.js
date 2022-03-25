import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Row,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

import { Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import ToggleButton from "react-toggle-button";
import Avatar from "@mui/material/Avatar";
import dateFormat from "dateformat";

const Users = () => {
  const [data, setData] = useState({ users: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const cookies = new Cookies();
  useEffect(async () => {
    const result = await axios(
      "https://web-be-2-idkrb.ondigitalocean.app/api/users",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    console.log(result.data.users);
    setData(result.data);
  }, []);

  const onToggle = (id) => {
    console.log(id);
    return axios.post(
      "https://web-be-2-idkrb.ondigitalocean.app/api/user/" + id + "/block",
      null,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  };

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
 React.useEffect(() => {
    const results = data.users.filter(({username}) =>
      username.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

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
              <Row>
                <Col lg="6">
                  <CardHeader className="bg-transparent border-0">
                    <h3 className="text-white mb-0">Users</h3>
                  </CardHeader>
                </Col>
                <Col lg="6">
                  <FormGroup className="mb-0">
                    <InputGroup
                      className="input-group-alternative"
                      style={{ width: "95%", marginTop: "10px" }}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Search"
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Visible
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Avatar
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Name
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Email
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Follower
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Followinng
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Coins
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Number of subjects
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Joined
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      <i className="ni ni-settings-gear-65"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchTerm?
                   searchResults.map((item,index) => (
                    <Render key={index} item={item} onToggle={onToggle} />
                    ))
                  :
                     data.users.map((item) => (
                      <Render item={item} key={item.id} onToggle={onToggle} />
                    ))
                  }
                 
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

function Render({ item, onToggle }) {
  const [toggle, setToggle] = useState(item.blocked);
  return (
    <tr>
      <th scope="row" key={item}>
        <ToggleButton
          value={toggle}
          onClick={() => {
            onToggle(item.id);
            setToggle(!toggle);
          }}
        />
        {toggle == false ? <span>Active</span> : <span>Block</span>}
      </th>
      <th scope="row">
        <Avatar alt="..." src={item.avatar} />
      </th>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.follower.length}</td>
      <td>{item.following.length}</td>
      <td>{item.subjects.length}</td>
      <td>{item.coins}</td>
      <td>{dateFormat(item.createdAt, "mmmm dS, yyyy")}</td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              <Link
                to={"/admin/user/" + item.id + "/info"}
                className="edit-link"
              >
                <i className="fas fa-eye" /> View detail
              </Link>
            </DropdownItem>
            {/* <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              <Link
                to={"/admin/user/" + item.id + "/info"}
                className="edit-link"
              >
                <i className="fas fa-edit" /> Edit
              </Link>
            </DropdownItem> */}
            {/* <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Something else here
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
}

export default Users;
