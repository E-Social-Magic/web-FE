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
import axios from "axios";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
// import Notification from "./Notification";

// import Forgot from "./Forgot";
// import Admin from "layouts/Admin";
const cookies = new Cookies();
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errName, setErrName] = useState("");
  const [errPass, setErrPass] = useState("");
  const history = useHistory();

  async function loginUser(credentials) {
    return axios.post(
      "https://web-be-brmc9.ondigitalocean.app/api/login",
      credentials
    );
  }
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if (!username) {
        setErrName("You must enter username");
      } else {
        setErrName("");
      }

      if (!password) {
        setErrPass("You must enter password");
      } else {
        setErrPass("");
      }
      const user = await loginUser({ username, password });
 

      if (user.data.token && user.data.role === "admin") {
        cookies.set("token", user.data.token);
        history.push("/admin/index");
      } else {
        console.log(user.data);
        console.log(user.data.username);
        console.log(username);
        if (user.data.username !== username) {
          setErrName("Username incorrect!");
        } else{
          setErrPass("You must enter password!");
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
            {/* {error != "" ? (
              <div className="error text-danger text-center">{error}</div>
            ) : (
              ""
            )} */}

            <Form role="form">
              <FormGroup className="mb-3">
                {errName != "" ? (
                  <div className="error text-danger text-center">{errName}</div>
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
                    placeholder="Username"
                    type="username"
                    onChange={(e) => setUsername(e.target.value)}
                    label="Username"
                    autoComplete="new-email"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                {errPass != "" ? (
                  <div className="error text-danger text-center">{errPass}</div>
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
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  onClick={handleSubmit}
                  type="button"
                >
                  Sign in
                </Button>
                <div mt={3} mb={1} textAlign="center"></div>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="/auth/forgot">
              <small>Forgot password?</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
