import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { useHistory } from "react-router-dom";

const NewPass = ({ email }) => {
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");
  const [errCode, setErrCode] = useState("");
  const [errPass, setErrPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const history = useHistory();

  async function newPassWord(credentials) {
    return axios.post(
      "https://web-be-brmc9.ondigitalocean.app/api/sendmailForget/confirm",
      credentials
    );
  }
  const handleSubmit = async () => {
    if (!code) {
      setErrCode("You must enter code");
    } else {
      setErrCode("");
    }
    if (!newPass) {
      setErrPass("You must enter new password");
    } else {
      setErrPass("");
    }
    try {
      const user = await newPassWord({ email, code, newPass, confirmPass });
      console.log(user.data.succes);
      if (
        user.data.success === true &&
        newPass === confirmPass &&
        newPass !== ""
      ) {
        console.log(user.data);
        alert("Logged in successfully!");
        history.push("/admin/index");
      } else {
        if (newPass !== confirmPass) {
          setError("New password and confirm password are not the same");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <img
                src="https://i.ibb.co/N9sDRwm/logo1.png"
                alt="E-Social"
                border="0"
                width={"200px"}
              ></img>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              {error != "" ? (
                <div
                  style={{ fontFamily: "roboto" }}
                  className="error text-danger text-center"
                >
                  {error}
                </div>
              ) : (
                ""
              )}
              <FormGroup className="mb-3">
                {errCode != "" ? (
                  <div
                    style={{ fontFamily: "roboto" }}
                    className="error text-danger text-center"
                  >
                    {errCode}
                  </div>
                ) : (
                  ""
                )}
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Code"
                    type="number"
                    onChange={(e) => setCode(e.target.value)}
                    label="Code"
                    autoComplete="new-code"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {errPass != "" ? (
                  <div
                    style={{ fontFamily: "roboto" }}
                    className="error text-danger text-center"
                  >
                    {errPass}
                  </div>
                ) : (
                  ""
                )}
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="New Password"
                    type="password"
                    onChange={(e) => setNewPass(e.target.value)}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    autoComplete="confirm-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  onClick={handleSubmit}
                  type="button"
                >
                  Change password
                </Button>
                <div mt={3} mb={1} textAlign="center"></div>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="/auth/login">
              <small>
                <i className="fas fa-arrow-left"></i> Back
              </small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default NewPass;
