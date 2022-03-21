import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Col,
  Row,
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";

import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import ToggleButton from "react-toggle-button";

const UserDetail = ({ match }) => {
  const cookies = new Cookies();

  const [data, setData] = useState({});

  useEffect(async () => {
    console.log(match.params);
    const { idPayment } = match.params;
    const result = await axios.get(
      "https://web-be-brmc9.ondigitalocean.app/api/payment/" + idPayment,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    console.log(result.data);
    setData(result.data);
  }, []);

  return (
    <>
      {data.data ? (
        <>
          <div
            className="header d-flex align-items-center"
            style={{
              minHeight: "100px",
              backgroundImage:
                "url(" +
                require("../../assets/img/theme/profile-cover.jpg").default +
                ")",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <span className="mask bg-gradient-default opacity-8" />
          <Container
            className="mt-10 align-center"
            style={{ marginLeft: "15%" }}
            fluid
          >
            <Row>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0"></CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <hr className="my-4" />

                      <UserInfo
                       idUser={data.data.extraData}
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
                                Value={data.data.orderId}
                                id="input-city"
                                placeholder="City"
                                type="text"
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
                                Value={data.data.amount}
                                id="input-country"
                                placeholder="Country"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Response Time
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.data.responseTime}
                                id="input-postal-code"
                                placeholder="Postal code"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                extraData
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.data.extraData}
                                id="input-city"
                                placeholder="City"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                message
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.data.message}
                                id="input-country"
                                placeholder="Country"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                payType
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.data.payType}
                                id="input-country"
                                placeholder="Country"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>

                      <hr className="my-4" />
                      {/* Description */}
                      <h6 className="heading-small text-muted mb-4">
                        About me
                      </h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="A few words about you ..."
                            rows="4"
                            defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                    Open Source."
                            type="textarea"
                          />
                        </FormGroup>
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
  const cookies = new Cookies();

  const [data, setData] = useState({ user: [] });

  useEffect(async () => {
    const result = await axios.get(
      "https://web-be-brmc9.ondigitalocean.app/api/user/" + idUser + "/info",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    console.log(result.data.user);
    setData(result.data);
  }, []);
  return (
    <>
    {data.user?(<>
      <div className="pl-lg-4">
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-first-name">
                Email
              </label>
              <Input
                className="form-control-alternative"
                // Value={data.user.email}
                id="input-first-name"
                placeholder="First name"
                type="text"
              />
              {console.log(data)}
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-last-name">
                User name
              </label>
              <Input
                className="form-control-alternative"
                // Value={data.user.username}
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
          <Col lg="4">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-city">
                Role
              </label>
              <Input
                className="form-control-alternative"
                // value={data.user.role}
                id="input-city"
                placeholder="City"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-country">
                Coins
              </label>
              <Input
                className="form-control-alternative"
                // value={data.user.coins}
                id="input-country"
                placeholder="Country"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-country">
                Postal code
              </label>
              <Input
                className="form-control-alternative"
                id="input-postal-code"
                placeholder="Postal code"
                type="number"
              />
            </FormGroup>
          </Col>
        </Row>
      </div></>):<div>Loading</div>}
      
    </>
  );
}
export default UserDetail;
