import React, { Component, Fragment } from 'react';
import {
  Row, Col,
  Button,
  Container,
  CardHeader,
  Card,
  CardBody,
  Progress,
  ButtonGroup,
  ListGroup,
  ListGroupItem, CardFooter,
  CustomInput, Input,
  Dropdown, DropdownItem, DropdownToggle, DropdownMenu,
  UncontrolledButtonDropdown,
} from 'reactstrap';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import CountUp from 'react-countup';

import ReactTable from 'react-table';


import Ionicon from 'react-ionicons';

import PerfectScrollbar from 'react-perfect-scrollbar';


import {
  AreaChart, Area, LineChart, Line,
  ResponsiveContainer,
} from 'recharts';

import {
  faAngleDown,
  faCalendarAlt,
  faEllipsisH,
  faCheck,
  faTrashAlt,

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeData } from '../../../Tables/DataTables/Examples/utils';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';

const data123 = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page C', uv: 2000, pv: 6800, amt: 2290,
  },
  {
    name: 'Page D', uv: 4780, pv: 7908, amt: 2000,
  },
  {
    name: 'Page E', uv: 2890, pv: 9800, amt: 2181,
  },
  {
    name: 'Page F', uv: 1390, pv: 3800, amt: 1500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


const data2 = [
  {
    name: 'Page A', uv: 5400, pv: 5240, amt: 1240,
  },
  {
    name: 'Page B', uv: 7300, pv: 4139, amt: 3221,
  },
  {
    name: 'Page C', uv: 8200, pv: 7980, amt: 5229,
  },
  {
    name: 'Page D', uv: 6278, pv: 4390, amt: 3200,
  },
  {
    name: 'Page E', uv: 3189, pv: 7480, amt: 6218,
  },
  {
    name: 'Page D', uv: 9478, pv: 6790, amt: 2200,
  },
  {
    name: 'Page E', uv: 1289, pv: 1980, amt: 7218,
  },
  {
    name: 'Page F', uv: 3139, pv: 2380, amt: 5150,
  },
  {
    name: 'Page G', uv: 5349, pv: 3430, amt: 3210,
  },
];


export default class AnalyticsDashboard2 extends Component {
  constructor() {
    super();

    this.state = {
      data: makeData(),
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

    state = {
      selectedOption: null,
    }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
    }

    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen,
      }));
    }

    render() {
      const { data } = this.state;

      return (
        <Fragment>
          <Container fluid>
            <Row>
              <Col sm="12" md="6" xl="4">
                <div className="card mb-3 widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded">
                      <div className="icon-wrapper-bg bg-warning" />
                      <i className="lnr-laptop-phone text-warning" />
                    </div>
                    <div className="widget-numbers">
                      <CountUp
                        start={0}
                        end={2.5}
                        separator=""
                        decimals={0}
                        decimal="."
                        prefix=""
                        useEasing={false}
                        suffix="M"
                        duration="10"
                      />
                    </div>
                    <div
                      className="widget-subheading fsize-1 pt-2 opacity-10 text-warning font-weight-bold"
                    >
                                        Cash Deposits
                    </div>
                    <div className="widget-description opacity-8">
                      <span className="text-danger pr-1">
                        <FontAwesomeIcon icon={faAngleDown} />
                        <span className="pl-1">54.1%</span>
                      </span>
                                        down last 30 days
                    </div>
                  </div>
                  <div className="widget-chart-wrapper">
                    <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                      <LineChart
                        data={data123}
                        margin={{
                            top: 0, right: 25, left: 25, bottom: 0,
                          }}
                      >
                        <Line type="monotone" dataKey="pv" stroke="var(--warning)" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>
              <Col sm="12" md="6" xl="4">
                <div className="card mb-3 widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded">
                      <div className="icon-wrapper-bg bg-danger" />
                      <i className="lnr-graduation-hat text-danger" />
                    </div>
                    <div className="widget-numbers">
                      <CountUp
                        start={0}
                        end={1.23}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix=""
                        useEasing={false}
                        suffix="M"
                        duration="10"
                      />
                    </div>
                    <div
                      className="widget-subheading fsize-1 pt-2 opacity-10 text-danger font-weight-bold"
                    >
                                        Invested Dividents
                    </div>
                    <div className="widget-description opacity-8">
                                        Compared to YoY:
                      <span className="text-info pl-1">
                        <FontAwesomeIcon icon={faAngleDown} />
                        <span className="pl-1">14.1%</span>
                      </span>
                    </div>
                  </div>
                  <div className="widget-chart-wrapper">
                    <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                      <AreaChart
                        data={data2}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                          }}
                      >
                        <Area
                            type="monotoneX" dataKey="uv" strokeWidth="2" stroke="var(--danger)"
                            fill="var(--danger)" fillOpacity=".3"
                          />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>
              <Col sm="12" md="12" xl="4">
                <div className="card mb-3 widget-chart">
                  <div className="widget-chart-content">
                    <div className="icon-wrapper rounded">
                      <div className="icon-wrapper-bg bg-info" />
                      <i className="lnr-diamond text-info" />
                    </div>
                    <div className="widget-numbers text-danger">
                      <CountUp
                        start={0}
                        end={294}
                        separator=""
                        decimals={0}
                        decimal=","
                        prefix="$"
                        useEasing={false}
                        suffix=""
                        duration="10"
                      />
                    </div>
                    <div
                      className="widget-subheading fsize-1 pt-2 opacity-10 text-info font-weight-bold"
                    >
                                        Withdrawals
                    </div>
                    <div className="widget-description opacity-8">
                                        Down by
                      <span className="text-success pl-1">
                        <FontAwesomeIcon icon={faAngleDown} />
                        <span className="pl-1">21.8%</span>
                      </span>
                    </div>
                  </div>
                  <div className="widget-chart-wrapper">
                    <ResponsiveContainer width="100%" aspect={3.0 / 1.0}>
                      <AreaChart
                        data={data123}
                        margin={{
                            top: 0, right: 0, left: 0, bottom: 0,
                          }}
                      >
                        <Area
                            type="stepAfter" dataKey="uv" strokeWidth="2" stroke="var(--info)"
                            fill="var(--info)" fillOpacity=".4"
                          />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="text-center mbg-3">
              <Button color="focus" className="btn-wide btn-pill btn-shadow fsize-1" size="lg">
                <span className="mr-2 opacity-7">
                  <Ionicon color="#ffffff" icon="ios-analytics-outline" beat />
                </span>
                            View Complete Report
              </Button>
            </div>

            <Row>
              <Col sm="12" md="5" xl="4">
                <Card className="card-hover-shadow-2x mb-3">
                  <CardHeader>
                    <div>
                                        Timeline Example
                    </div>
                    <div className="btn-actions-pane-right actions-icon-btn">
                      <UncontrolledButtonDropdown>
                        <DropdownToggle className="btn-icon btn-icon-only" color="link">
                            <div className="btn-icon-wrapper">
                                <Ionicon icon="ios-apps-outline" />
                              </div>
                          </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-shadow dropdown-menu-hover-link">
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-inbox"> </i>
                                <span>Menus</span>
                              </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-file-empty"> </i>
                                <span>Settings</span>
                              </DropdownItem>
                            <DropdownItem>
                                <i className="dropdown-icon lnr-book"> </i>
                                <span>Actions</span>
                              </DropdownItem>
                            <DropdownItem divider />
                            <div className="p-3 text-right">
                                <Button className="mr-2 btn-shadow btn-sm" color="link">
View
                                                        Details
                                  </Button>
                                <Button
                                    className="mr-2 btn-shadow btn-sm"
                                    color="primary"
                                  >Action
                                  </Button>
                              </div>
                          </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                  </CardHeader>
                  <div className="scroll-area-lg">
                    <PerfectScrollbar>
                      <div className="p-4">
                        <VerticalTimeline
                            layout="1-column"
                            className="vertical-time-simple vertical-without-time"
                          >
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">All Hands Meeting</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <p>
                                                        Yet another one, at
                                    {' '}
                                    <span
                                        className="text-success"
                                      >15:00 PM
                                      </span>
                                  </p>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">Build the production release</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title text-success">
Something not
                                                        important
                                  </h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">All Hands Meeting</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <p>
                                                        Yet another one, at
                                    {' '}
                                    <span
                                        className="text-success"
                                      >15:00 PM
                                      </span>
                                  </p>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">Build the production release</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title text-success">
Something not
                                                        important
                                  </h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">All Hands Meeting</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <p>
                                                        Yet another one, at
                                    {' '}
                                    <span
                                        className="text-success"
                                      >15:00 PM
                                      </span>
                                  </p>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">Build the production release</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title text-success">
Something not
                                                        important
                                  </h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">Build the production release</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title text-success">
Something not
                                                        important
                                  </h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">All Hands Meeting</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <p>
                                                        Yet another one, at
                                    {' '}
                                    <span
                                        className="text-success"
                                      >15:00 PM
                                      </span>
                                  </p>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title">Build the production release</h4>
                              </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-item"
                              >
                                <h4 className="timeline-title text-success">
Something not
                                                        important
                                  </h4>
                              </VerticalTimelineElement>

                          </VerticalTimeline>
                      </div>
                    </PerfectScrollbar>
                  </div>
                  <CardFooter className="d-block text-center">
                    <Button className="btn-shadow btn-wide btn-pill" color="focus">
                      <div className="badge badge-dot badge-dot-lg badge-warning badge-pulse">
Badge
                      </div>
                                        View All Messages
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col sm="12" md="7" xl="8">
                <Card className="mb-3">
                  <CardHeader className="card-header-tab">
                    <div>
                                        Dynamic Tables
                    </div>
                    <div className="btn-actions-pane-right">
                      <ButtonGroup size="sm">
                        <Button
                            caret="true" color="dark"
                            className="btn-shadow "
                          >
Refresh
                          </Button>
                        <Button
                            color="dark"
                            className="btn-shadow "
                            onClick={() => {
                                this.toggle('3');
                              }}
                          >
Remove
                          </Button>
                      </ButtonGroup>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <ReactTable
                      data={data}
                      columns={[
                        {
                          Header: 'Name',
                          columns: [
                            {
                              Header: 'First Name',
                              accessor: 'firstName',
                            },
                            {
                              Header: 'Last Name',
                              id: 'lastName',
                              accessor: d => d.lastName,
                            },
                          ],
                        },
                        {
                          Header: 'Info',
                          columns: [
                            {
                              Header: 'Age',
                              accessor: 'age',
                            },
                          ],
                        },
                      ]}
                      defaultPageSize={15}
                      style={{
                        height: '418px', // This will force the table body to overflow and scroll, since there is not enough room
                      }}
                      className="-striped -highlight -fixed"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="12" lg="6" xl="6">
                <Card className="card-hover-shadow-2x mb-3">
                  <CardHeader>Chat Box</CardHeader>
                  <div className="scroll-area-sm">
                    <PerfectScrollbar>
                      <div className="p-2">
                        <div className="chat-wrapper p-1">
                            <div className="chat-box-wrapper">
                                <div>
                                    <div className="avatar-icon-wrapper mr-1">
                                        <div
                                            className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"
                                          />
                                        <div className="avatar-icon avatar-icon-lg rounded">
                                            <img src={avatar1} alt="" />
                                          </div>
                                      </div>
                                  </div>
                                <div>
                                    <div className="chat-box">
                                                            But I must explain to you how all this mistaken idea of
                                                            denouncing pleasure and praising pain was born and I will
                                                            give
                                                            you a complete account of the system.
                                      </div>
                                    <small className="opacity-6">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                            11:01 AM | Yesterday
                                      </small>
                                  </div>
                              </div>
                            <div className="float-right">
                                <div className="chat-box-wrapper chat-box-wrapper-right">
                                    <div>
                                        <div className="chat-box">
                                                                Expound the actual teachings of the great explorer of
                                                                the
                                                                truth, the master-builder of human happiness.
                                          </div>
                                        <small className="opacity-6">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                                11:01 AM | Yesterday
                                          </small>
                                      </div>
                                    <div>
                                        <div className="avatar-icon-wrapper ml-1">
                                            <div
                                                className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"
                                              />
                                            <div className="avatar-icon avatar-icon-lg rounded">
                                                <img src={avatar1} alt="" />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                            <div className="chat-box-wrapper">
                                <div>
                                    <div className="avatar-icon-wrapper mr-1">
                                        <div
                                            className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"
                                          />
                                        <div className="avatar-icon avatar-icon-lg rounded">
                                            <img src={avatar1} alt="" />
                                          </div>
                                      </div>
                                  </div>
                                <div>
                                    <div className="chat-box">
                                                            But I must explain to you how all this mistaken idea of
                                                            denouncing pleasure and praising pain was born and I will
                                                            give
                                                            you a complete account of the system.
                                      </div>
                                    <small className="opacity-6">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                            11:01 AM | Yesterday
                                      </small>
                                  </div>
                              </div>
                            <div className="float-right">
                                <div className="chat-box-wrapper chat-box-wrapper-right">
                                    <div>
                                        <div className="chat-box">
                                                                Denouncing pleasure and praising pain was born and I
                                                                will
                                                                give you a complete account.
                                          </div>
                                        <small className="opacity-6">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                                11:01 AM | Yesterday
                                          </small>
                                      </div>
                                    <div>
                                        <div className="avatar-icon-wrapper ml-1">
                                            <div
                                                className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"
                                              />
                                            <div className="avatar-icon avatar-icon-lg rounded">
                                                <img src={avatar2} alt="" />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                            <div className="float-right">
                                <div className="chat-box-wrapper chat-box-wrapper-right">
                                    <div>
                                        <div className="chat-box">
                                                                The master-builder of human happiness.
                                          </div>
                                        <small className="opacity-6">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                                                11:01 AM | Yesterday
                                          </small>
                                      </div>
                                    <div>
                                        <div className="avatar-icon-wrapper ml-1">
                                            <div
                                                className="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"
                                              />
                                            <div className="avatar-icon avatar-icon-lg rounded">
                                                <img src={avatar2} alt="" />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </PerfectScrollbar>
                  </div>
                  <CardFooter>
                    <Input bsSize="sm" type="text" placeholder="Write here and hit enter to send..." />
                  </CardFooter>
                </Card>
              </Col>
              <Col md="12" lg="6" xl="6">
                <Card className="card-hover-shadow-2x mb-3">
                  <CardHeader>Tasks List</CardHeader>
                  <div className="scroll-area-sm">
                    <PerfectScrollbar>
                      <div className="p-2">
                        <ListGroup className="todo-list-wrapper" flush>
                            <ListGroupItem>
                                <div className="todo-indicator bg-warning" />
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-2">
                                            <CustomInput
                                                type="checkbox"
                                                id="exampleCustomCheckbox12"
                                                label="&nbsp;"
                                              />
                                          </div>
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                                    Wash the car
                                                <div
                                                    className="badge badge-danger ml-2"
                                                  >Rejected
                                                  </div>
                                              </div>
                                            <div className="widget-subheading">
                                                <i>Written by Bob</i>
                                              </div>
                                          </div>
                                        <div
                                            className="widget-content-right widget-content-actions"
                                          >
                                            <Button
                                                className="border-0 btn-transition" outline
                                                color="success"
                                              >
                                                <FontAwesomeIcon icon={faCheck} />
                                              </Button>
                                            <Button
                                                className="border-0 btn-transition" outline
                                                color="danger"
                                              >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                              </Button>
                                          </div>
                                      </div>
                                  </div>
                              </ListGroupItem>
                            <ListGroupItem>
                                <div className="todo-indicator bg-focus" />
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-2">
                                            <CustomInput
                                                type="checkbox" id="exampleCustomCheckbox1"
                                                label="&nbsp;"
                                              />
                                          </div>
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                                    Task with hover dropdown menu
                                              </div>
                                            <div className="widget-subheading">
                                                <div>
                                                                        By Johnny
                                                    <div
                                                        className="badge badge-pill badge-info ml-2"
                                                      >NEW
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                        <div
                                            className="widget-content-right widget-content-actions"
                                          >
                                            <Dropdown
                                                className="d-inline-block rm-pointers"
                                                onMouseOver={this.onMouseEnter}
                                                onMouseLeave={this.onMouseLeave}
                                                isOpen={this.state.dropdownOpen}
                                                toggle={this.toggle}
                                              >
                                                <DropdownToggle
                                                    color="link"
                                                    className="border-0 btn-transition"
                                                  >
                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                  </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem disabled>Action</DropdownItem>
                                                    <DropdownItem>Another Action</DropdownItem>
                                                  </DropdownMenu>
                                              </Dropdown>
                                          </div>
                                      </div>
                                  </div>
                              </ListGroupItem>
                            <ListGroupItem>
                                <div className="todo-indicator bg-primary" />
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-2">
                                            <CustomInput
                                                type="checkbox" id="exampleCustomCheckbox4"
                                                label="&nbsp;"
                                              />
                                          </div>
                                        <div className="widget-content-left flex2">
                                            <div className="widget-heading">
                                                                    Badge on the right task
                                              </div>
                                            <div className="widget-subheading">
                                                                    This task has show on hover actions!
                                              </div>
                                          </div>
                                        <div
                                            className="widget-content-right widget-content-actions"
                                          >
                                            <Button
                                                className="border-0 btn-transition" outline
                                                color="success"
                                              >
                                                <FontAwesomeIcon icon={faCheck} />
                                              </Button>
                                          </div>
                                        <div className="widget-content-right ml-3">
                                            <div className="badge badge-pill badge-success">
Latest
                                                                    Task
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </ListGroupItem>
                            <ListGroupItem>
                                <div className="todo-indicator bg-info" />
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-2">
                                            <CustomInput
                                                type="checkbox" id="exampleCustomCheckbox2"
                                                label="&nbsp;"
                                              />
                                          </div>
                                        <div className="widget-content-left mr-3">
                                            <div className="widget-content-left">
                                                <img
                                                    width={42} className="rounded" src={avatar2}
                                                    alt=""
                                                  />
                                              </div>
                                          </div>
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                                    Go grocery shopping
                                              </div>
                                            <div className="widget-subheading">
                                                                    A short description for this todo item
                                              </div>
                                          </div>
                                        <div
                                            className="widget-content-right widget-content-actions"
                                          >
                                            <Button
                                                className="border-0 btn-transition" outline
                                                color="success"
                                              >
                                                <FontAwesomeIcon icon={faCheck} />
                                              </Button>
                                            <Button
                                                className="border-0 btn-transition" outline
                                                color="danger"
                                              >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                              </Button>
                                          </div>
                                      </div>
                                  </div>
                              </ListGroupItem>
                            <ListGroupItem>
                                <div className="todo-indicator bg-success" />
                                <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left mr-2">
                                            <CustomInput
                                                type="checkbox" id="exampleCustomCheckbox3"
                                                label="&nbsp;"
                                              />
                                          </div>
                                        <div className="widget-content-left flex2">
                                            <div className="widget-heading">
                                                                    Development Task
                                              </div>
                                            <div className="widget-subheading">
                                                                    Finish React ToDo List App
                                              </div>
                                          </div>
                                        <div className="widget-content-right">
                                            <div className="badge badge-warning mr-2">69</div>
                                          </div>
                                        <div className="widget-content-right">
                                            <Button
                                                className="border-0 btn-transition" outline
                                                color="success"
                                              >
                                                <FontAwesomeIcon icon={faCheck} />
                                              </Button>
                                            <Button
                                                className="border-0 btn-transition" outline
                                                color="danger"
                                              >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                              </Button>
                                          </div>
                                      </div>
                                  </div>
                              </ListGroupItem>
                          </ListGroup>
                      </div>
                    </PerfectScrollbar>
                  </div>
                  <CardFooter className="d-block text-right">
                    <Button size="sm" className="mr-2" color="link">Cancel</Button>
                    <Button color="primary">Add Task</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
            <div className="card no-shadow bg-transparent no-border rm-borders mb-3">
              <Card>
                <Row className="no-gutters">
                  <Col xl="3" lg="6" md="12">
                    <CardBody className="pt-0 pb-0">
                      <ListGroup flush>
                        <ListGroupItem>
                            <div className="widget-content p-0">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                                    Total Orders
                                              </div>
                                            <div className="widget-subheading">
                                                                    Last year expenses
                                              </div>
                                          </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-primary">
                                                                    1896
                                              </div>
                                          </div>
                                      </div>
                                    <div className="widget-progress-wrapper">
                                        <Progress
                                            className="progress-bar-sm progress-bar-animated-alt"
                                            color="primary"
                                            value="43"
                                          />
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">
                                                                    YoY Growth
                                              </div>
                                            <div className="sub-label-right">
                                                                    100%
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Col>
                  <Col xl="3" lg="6" md="12">
                    <CardBody className="pt-0 pb-0">
                      <ListGroup flush>
                        <ListGroupItem>
                            <div className="widget-content p-0">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                                    Followers
                                              </div>
                                            <div className="widget-subheading">
                                                                    People interested
                                              </div>
                                          </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-success">
                                                                    45,5%
                                              </div>
                                          </div>
                                      </div>
                                    <div className="widget-progress-wrapper">
                                        <Progress
                                            className="progress-bar-sm progress-bar-animated-alt"
                                            color="success"
                                            value="43"
                                          />
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">
                                                                    YoY Growth
                                              </div>
                                            <div className="sub-label-right">
                                                                    100%
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Col>
                  <Col xl="3" lg="6" md="12">
                    <CardBody className="pt-0 pb-0">
                      <ListGroup flush>
                        <ListGroupItem>
                            <div className="widget-content p-0">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                                    Clients
                                              </div>
                                            <div className="widget-subheading">
                                                                    Total Profit
                                              </div>
                                          </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-danger">
                                                <small>$</small>
                                                                    527
                                              </div>
                                          </div>
                                      </div>
                                    <div className="widget-progress-wrapper">
                                        <Progress
                                            className="progress-bar-sm progress-bar-animated-alt"
                                            color="danger"
                                            value="43"
                                          />
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">
                                                                    YoY Growth
                                              </div>
                                            <div className="sub-label-right">
                                                                    100%
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Col>
                  <Col xl="3" lg="6" md="12">
                    <CardBody className="pt-0 pb-0">
                      <ListGroup flush>
                        <ListGroupItem>
                            <div className="widget-content p-0">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">
                                                                    Products Sold
                                              </div>
                                            <div className="widget-subheading">
                                                                    Total revenue streams
                                              </div>
                                          </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-focus">
                                                                    682
                                              </div>
                                          </div>
                                      </div>
                                    <div className="widget-progress-wrapper">
                                        <Progress
                                            className="progress-bar-sm progress-bar-animated-alt"
                                            color="focus"
                                            value="43"
                                          />
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">
                                                                    YoY Growth
                                              </div>
                                            <div className="sub-label-right">
                                                                    100%
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Col>
                </Row>
              </Card>
            </div>
          </Container>
        </Fragment>
      );
    }
}
