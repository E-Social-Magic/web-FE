import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Col,
  Row,
  Button,
} from "reactstrap";

// core components
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const PaymentOutDetail = ({ match }) => {
  const [data, setData] = useState({})
  const [Mess, setMess] = useState("");

  useEffect(async () => {
    const { idPaymentOut } = match.params
    const result = await axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/withdraw/" + idPaymentOut,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    )
    setData(result.data);
    console.log(result.data);
    console.log(result.data.payment);
    console.log(result.data.payment.resultCode);
    if (result.data.payment.resultCode === "0") {
      setMess("Successful transaction.");
    } 
    if (result.data.payment.resultCode === "7000") {
      setMess("The transaction is in progress.");
    } 
    if (result.data.payment.resultCode === "1003") {
      setMess("The transaction has been cancelled.");
    }
  }, []);

  

  return (
    <>{
      
    }
      {data.payment ? (
        <>
          <div
            className="header d-flex align-items-center"
            style={{
              minHeight: "80px",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <span className="mask bg-gradient-default opacity-8" />
          <Container
            className="mt-10 align-center"
            style={{ marginLeft: "17%", width: "92%" }}
            fluid
          >
            <Row>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Payment out detail</h3>
                  </Col>
                </Row>
              </CardHeader>
                  <CardBody>
                    <Form>
                      <UserInfo
                        idUser={data.payment.user_id}
                        // key = {data.payment.id}
                      />
                      {/* {console.log(data.data.extraData)} */}
                      <h6 className="heading-small text-muted mb-4">
                        Payment information
                      </h6>

                      <hr className="my-4" />
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                Order Id
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.payment.orderId}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Amount
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.payment.amount}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Display Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.payment.displayName}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Message
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={Mess}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <TranStatus data={data.payment} id={data.payment.id} />
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

function UserInfo({ idUser }) {
  console.log(idUser);
  const [data, setData] = useState({ user: [] });

  useEffect(async () => {
    const result = await axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/user/" + idUser + "/info",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    )
    setData(result.data);
  }, []);
  return (
    <>
      {data.user ? (
        <>
          <h6 className="heading-small text-muted mb-4">User information </h6>
          <hr className="my-4" />
          <div className="pl-lg-4">
            {/* <Row className="order-lg-2" lg="3">
              <div className="card-profile-image">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="rounded-circle"
                    src={data.user.avatar}
                  />
                </a>
              </div>
            </Row> */}
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    Email
                  </label>
                  <Input
                    className="form-control-alternative"
                    Value={data.user.email}
                    id="input-first-name"
                    placeholder="First name"
                    type="text"
                  />
                  {console.log(data)}
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-last-name"
                  >
                    User name
                  </label>
                  <Input
                    className="form-control-alternative"
                    Value={data.user.username}
                    id="input-last-name"
                    placeholder="Last name"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-city">
                    Role
                  </label>
                  <Input
                    className="form-control-alternative"
                    Value={data.user.role}
                    id="input-city"
                    placeholder="City"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-country">
                    Coins
                  </label>
                  <Input
                    className="form-control-alternative"
                    Value={data.user.coins}
                    id="input-country"
                    placeholder="Country"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

function TranStatus({ data, id }) {
  const [resultTran, setResultTran] = useState(data.resultCode);
  console.log(id);
  const Cancel = (id) => {
    return axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/withdraw/" +
        id +
        "?success=false",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  };

  const Confirm = (id) => {
    return axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/withdraw/" +
        id +
        "?fail=true",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  };

  return (
    <>
      {resultTran === "7000" ? (
        <>
          <hr className="my-4" />
          <Row>
            <Col>
              <FormGroup>
                <div>
                  <Button
                    className="bg-danger "
                    style={{ color: "white" }}
                    disabled
                    onClick={Cancel(id)}
                  >
                    CANCEL TRANSACTION <i className="ni ni-fat-remove"></i>
                  </Button>
                </div>
              </FormGroup>
            </Col>
            <Col lg="4">
              <FormGroup>
                <div>
                  <Button
                    className="bg-success"
                    style={{ color: "white" }}
                    disabled
                    onClick={Confirm(id)}
                  >
                    CONFIRM TRANSACTION <i className="ni ni-check-bold"></i>
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </>
  );
}
export default PaymentOutDetail;
