
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import ToggleButton from "react-toggle-button";

const Groups = () => {
  const cookies = new Cookies();
  const [data, setData] = useState({ groups: [] });

  useEffect(async () => {
    const result = await axios(
      "https://web-be-brmc9.ondigitalocean.app/api/groups"
    );
    setData(result.data);
    console.log(data.groups);
  }, []);

  const onToggle = (id) => {
    console.log(id);
    return axios.post(
      "https://web-be-brmc9.ondigitalocean.app/api/group/" + id + "/block",
      null,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  };

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
                <h3 className="text-white mb-0">Groups</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Visible</th>
                    <th scope="col">Avatar</th>
                    <th scope="col">Group Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Subject</th>
                    <th scope="col">
                      <i className="ni ni-settings-gear-65"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.groups.map((item) => (
                    <Render item={item} key={item.id} onToggle={onToggle} />
                  ))}
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
      <th>
        <ToggleButton
          value={toggle}
          onClick={() => {
            onToggle(item.id);
            setToggle(!toggle);
          }}
          // onToggle={(item.id) => {
          //   setState({
          //     value: !value,
          //   });
          // }}
        />
        {toggle == false ? <span>Active</span> : <span>Block</span>}
      </th>
      <td>
        <a
          className="avatar rounded-circle mr-3"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          <img alt="..." src={item.avatar} />
        </a>
      </td>
      <th scope="row" key={item}>
        <span className="mb-0 text-sm">{item.group_name}</span>
      </th>
      <td>
        {item.private == false ? <span>Public</span> : <span>Private</span>}
      </td>
      <td>{item.subject}</td>
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
              Delete
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Another action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
}

export default Groups;
