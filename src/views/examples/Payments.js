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
import Header from "components/Headers/Header.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NumberFormat from 'react-number-format';

const Payments = () => {
  const [data, setData] = useState({ payments: [] });
  const cookies = new Cookies();
  useEffect(async () => {
    const result = await axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/payments",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData(result.data);
    console.log(result.data.payments);
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Payments</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Order Id
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Amount
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Message
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      User Name
                    </th>
                    <th scope="col" style={{ fontSize: "13px"}}>
                      <i className="ni ni-settings-gear-65"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map((item) => (
                    <tr>
                      <th scope="row">
                        {item.orderId}
                      </th>
                      <td>
                      <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true}/> VND</td>
                      <td>{item.message}</td>
                      <td>{item.username}</td>
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
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Link
                                to={"/admin/payment/" + item.id}
                                className="edit-link"
                              >
                                <i className="fas fa-eye" /> View detail
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Payments;
