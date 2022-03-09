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
import { Link } from "react-router-dom";
import axios from "axios";

import { useHistory } from "react-router-dom";

const NewPass = ({email}) => {
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const history = useHistory();

  async function newPassWord(credentials) {
    return axios.post(
      "https://web-be-brmc9.ondigitalocean.app/api/sendmail_forget/confirm",
      credentials
    );
  }
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const user = await newPassWord({email, code, newPass, confirmPass });
      console.log(user.data.succes);
      if (user.data.success === true) {
        console.log(user.data.message);
        alert("Logged in successfully!");
        history.push("/admin/index");
        //chuyen qua dashboard kem theo duw lieuu
      } else {
          if(newPass !== confirmPass){
            alert("new password and confirm password are not the same");
          }
        console.log("Incorrect code or password");
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
            <div className="text-center text-muted mb-4">
              <small>Enter your email to reset password!</small>
            </div>
            <Form role="form">
            <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Code"
                    type="password"
                    onChange={(e) => setCode(e.target.value)}
                    label="Code"
                    autoComplete="new-code"
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
