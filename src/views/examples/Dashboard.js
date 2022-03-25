import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Doughnut } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";
// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  // if (window.Chart) {
  //   parseOptions(Chart, chartOptions());
  // }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const cookies = new Cookies();
  const [Data, setData] = useState({ groups: [] });
  const data = {
    labels: Data.groups.map((o) => o.group_name),

    datasets: [
      {
        label: "Users",
        fill: false,
        lineTension: 0.0,
        backgroundColor: "#c45850",
        borderColor: "rgb(41, 33, 116,0.5)",
        pointHitRadius: 20,
        data: Data.groups.map((o) => parseFloat(o.user_id.length)),
      },
    ],
  };
  const data1 = {
    labels: Data.groups.map((o) => o.group_name),

    datasets: [
      {
        label: "Users",
        fill: false,
        lineTension: 0.0,
        backgroundColor: [  
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
          "#F473B9",
          "#F4FCD9",
          "#C5D8A4",
          "#BB9981",
          "#534340",
          "#3e95cd"
        ],
        borderColor: "rgb(41, 33, 116,0.5)",
        pointHitRadius: 20,
        
        data: Data.groups.map((o) => parseFloat(o.posts.length)),
      },
    ],
  };
  // const data1 = {
  //   labels: Data.groups.map((o) => o.group_name),

  //   datasets: [
  //     {
  //       label: "users",
  //       fill: false,
  //       lineTension: 0.0,
  //       backgroundColor: "rgb(41, 33, 116,0.5)",
  //       borderColor: "rgb(41, 33, 116,0.5)",
  //       pointHitRadius: 20,
  //       data: Data.groups.map((o) => parseFloat(o.posts.length)),
  //     },
  //   ],
  // };
  useEffect(async () => {
    const result = await axios.get(
      "https://web-be-2-idkrb.ondigitalocean.app/api/groups",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData(result.data);
    console.log(data.groups);
  }, []);
  // if(!Data)
  // {
  //   return <Loading/>;
  // }

  return (
    <>
      <Header />
      {/* Page content */}
      {console.log(Data)}
      {!Data ? (
        <div>Loading</div>
      ) : (
        <>
          <Container className="mt--7" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                        <h2 className="text-white mb-0">Number of users in subjects</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Bar
                     	height={10}
                       options={{
                         maintainAspectRatio: false
                       }}
                    data={data}
                    // options={chartExample1.options}
                    // getDatasetAtEvent={(e) => console.log(e)}
                  />
                      {/* <Bar data={data} /> */}
                      {/* <Line data={data1}/> */}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Performance
                        </h6>
                        <h2 className="mb-0">Number of posts in subjects</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Doughnut
                       	height={1}
                         options={{
                           maintainAspectRatio: false
                         }}
                    data={data1}
               
                  />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {/* <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Page visits</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Social traffic</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
            </Row> */}
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
