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
} from "reactstrap";

// core components
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";

const PaymentOutDetail = ({ match }) => {
  const cookies = new Cookies();

  const [data, setData] = useState({});

  useEffect(async () => {
    console.log(match.params);
    const { idPaymentOut } = match.params;
    const result = await axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/withdraw/" + idPaymentOut,
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
      {console.log(data.payment)}
      {data.payment ? (
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
                                Value={data.payment.message}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <TranStatus data={data.payment} id={data.payment.id}/>
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
      "https://web-be-2-idkrb.ondigitalocean.app/api/user/" + idUser + "/info",
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
      {data.user ? (
        <>
          <h6 className="heading-small text-muted mb-4">User information</h6>
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
  const [addrtype, setAddrtype] = useState([
    "Processing",
    "Successful transaction",
    "Transaction faile"]);
  const [status, setStatus] = useState();
  const Add = addrtype.map((Add) => Add);
  const handleAddrTypeChange = (e) => {{
    
    if((addrtype[e.target.value]) === "7000"){
      setStatus("Processing");
      console.log((addrtype[e.target.value]))
    }
    else if((addrtype[e.target.value]) === "0"){
      setStatus("Successful transaction");
      console.log((addrtype[e.target.value]))
    }
    else{
      setStatus("Transaction faile");
      console.log((addrtype[e.target.value]))
    }

    // if((addrtype[e.target.value]) == "Processing"){
    //   setResultTran = "7000";
      
    // }else if((addrtype[e.target.value])=="Successful transaction"){
    //   setResultTran = "0";
    //   axios.get("https://web-be-2-idkrb.ondigitalocean.app/api/withdraw/"+id+"?success=true"
    //   )
    // }else{
    //   setResultTran = "1003";  
    //   axios.get("https://web-be-2-idkrb.ondigitalocean.app/api/withdraw/"+id+"?success=false")
    // }
    }
  };
  
  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <select
              name="Payment status"
              defaultValue={status}
              onChange={e => handleAddrTypeChange(e)}
            >
              {Add.map((index, key) => (
                <option key={key} value={data.resultCode}>
                  {index}
                </option>
              ))}
            </select>
          </FormGroup>
        </Col>
      </Row>
    </>
  );
}
export default PaymentOutDetail;
