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
  Media,
} from "reactstrap";

import { Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import dateFormat from 'dateformat';
import i18next from '../../i18n'

const PaymentOuts = () => {
  const [data, setData] = useState({ payments: [] });
  const [Mess, setMess] = useState("");
  const cookies = new Cookies();
  useEffect(async () => {
    const result = await axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/paymentOuts",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData(result.data);
    console.log(Mess);
    // if (data.payment.resultCode === "0") {
    //   setMess("Successful transaction.");
    // } else if (data.payment.resultCode === "7000") {
    //   setMess("The transaction is in progress.");
    // } else if (data.payment.resultCode === "1003") {
    //   setMess("The transaction has been cancelled.");
    // } else {
    //   setMess(" ");
    // }
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
                <h3 className="text-white mb-0">Posts</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Amount
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Message
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Result Code
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Display Name
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      User Name
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Phone number
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Created At
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Updated At
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      <i className="ni ni-settings-gear-65"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.payments.map((item) =>(
                  <tr>
                    <th scope="row" key={item}>
                      {item.amount}
                    </th>
                    <td >{message(item.resultCode)}</td>
                    <td>{item.resultCode}</td>
                    <td>{item.displayName}</td>
                    <td>{item.username}</td>
                    <td>{item.phone}</td>
                    <td>{dateFormat(item.createdAt, "mmmm dS, yyyy")}</td>
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
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Link
                              to={"/admin/withdraw/" + item.id }
                              className="edit-link"
                            >
                  
                              <i className="fas fa-eye" /> View detail
                            </Link>
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>))}   
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

function message(item){

    if (item === "0") { return"Successful transaction."}
    if (item === "7000") {return"The transaction is in progress."}
    if (item === "1003") {return"The transaction has been cancelled."}
    }

export default PaymentOuts;
