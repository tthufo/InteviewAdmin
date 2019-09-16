// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { translateWrapper } from 'ter-localization';
// import {
//   Card, CardBody, FormGroup, Col,
// } from 'reactstrap';
// import { connect } from 'react-redux';
// import moment from 'moment';
// import SweetAlert from 'sweetalert-react';
// import Section from './Section';
// import Text from './Text';
// import Heading from './Heading';
// import Row from './Row';
// import Box from './Box';
// import Image from './Image';
// import { Button } from './Button';
// import PageTitle from '../../../../Layout/AppMain/PageTitle';
// import { setCompany as setCompanyAction, setSimulation } from '../../../../actions/Company/index';
// import PL from '../../Simulation/VisualizedFS/PL';
// import service from '../../../../service';
// import apis from '../../../../apis/viewSimulation/projected-FS-by-table';

// const img1 = require('../../../../assets/utils/images/dashboard/Empty-Sales-Design.png');
// const img2 = require('../../../../assets/utils/images/dashboard/Empty-Expense-Design.png');
// const img3 = require('../../../../assets/utils/images/dashboard/Empty-Investment-Design.png');
// const img4 = require('../../../../assets/utils/images/dashboard/Empty-Finance-Design.png');

// class Demo extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       alert: false,
//     };
//   }

//   async getChart() {
//     const { history, simulationInfo: { id } } = this.props;
//     try {
//       await Promise.all([
//         await apis.BS(id),
//         await apis.PL(id),
//         await apis.CF(id),
//       ]).then(() => {
//         // history.push('/users/simulation');
//         // service.setActions('changeRoute');
//       });
//     } catch (error) {
//       console.log(error);
//       // this.setState({ alert: true });
//     }
//   }

//   render() {
//     const {
//       t,
//       history,
//       companyInfo,
//       simulationInfo,
//     } = this.props;
//     const { alert } = this.state;
//     const simulation = simulationInfo && simulationInfo.businessName;
//     return (
//       <div>
//         <PageTitle
//           heading={t('Company Dashboard')}
//           subheading={t('description Company Dashboard')}
//           icon="pe-7s-display1"
//           t={t}
//         />
//         <Card>
//           <CardBody>
//             {!simulation
//               ? (
//                 <Fragment>
//                   <Section center>
//                     <Heading h="1">{t('no simulator!')}</Heading>
//                   </Section>
//                   <Section>
//                     <Row>
//                       <Box center width="100%">
//                         <Heading
//                           data-tut="reactour__style"
//                           h="4"
//                           color="black"
//                           style={{ width: '50%', margin: '0 auto 2em' }}
//                         >
//                           {t('ProfinanSS enables you to design your numerical business plan (projected balance sheet, profit & loss, and cash flow) easily!')}
//                         </Heading>
//                       </Box>
//                     </Row>
//                     <Row style={{ justifyContent: 'center' }}>
//                       <Button
//                         style={{
//                           height: 50, width: 150, marginBottom: 20, backgroundColor: '#f49100', border: '0px transparent',
//                         }}
//                         onClick={() => history.push('/users/simulation-setting')}
//                       >
//                         {t('Create Simulation')}
//                       </Button>

//                     </Row>
//                     <Row>
//                       <Box data-tut="reactour__goTo">
//                         <Image src={img1} />
//                       </Box>
//                       <Box>
//                         <Heading h="2" data-tut="reactour__position">
//                           {t('Sales Design')}
//                         </Heading>
//                         <Text>
//                           {t(`Please design your sales model. Here, consider your business model.
//               How will you raise your sales? How is the rate of cost? When will you get the cash from the revenue? (Mostly, the cash will be transferred after the sales!!!) This is quite critical.`)}
//                         </Text>
//                       </Box>
//                     </Row>

//                     <Row>
//                       <Box align="right">
//                         <Heading h="2">
//                           {t('Expense Design')}
//                         </Heading>
//                         <Text>
//                           {t('Please design your expense model. Basically, you will hire geniuous members. How many? How much will you pay for them? As you expand your business, you need more members. At the same time, if you want to hire more, you need more office space for them!! (Unless you admit perfect remote work!)              ')}
//                         </Text>
//                       </Box>
//                       <Box>
//                         <Image src={img2} />
//                       </Box>
//                     </Row>

//                     <Row>
//                       <Box>
//                         <Image src={img3} />
//                       </Box>
//                       <Box>
//                         <Heading h="2">
//                           {t('Investment Design')}
//                         </Heading>
//                         <Text>
//                           {t('To develop your business, you sometimes make investment in assets such as property, machine, software etc. Please consider such investments here.')}
//                         </Text>
//                       </Box>
//                     </Row>
//                   </Section>
//                   <Section
//                     data-tut="reactour__state--observe"
//                     style={{ paddingBottom: '3em' }}
//                   >
//                     <Row>
//                       <Box align="right">
//                         <Heading h="2">
//                           {t('Investment Design')}
//                         </Heading>
//                         <Text>
//                           {t('If you are rich enough, you start your business by yourself totally. Not enough? OK you should consider how to get the money! We call it "finance". Finance - Not sure if you well understand or not - can be categorized into "Debt Finance" and "Equity Finance".')}
//                         </Text>
//                         <Text>
//                           {t('Debt Finance is "loan lending" from banks etc. Of course, you should repay it with interests. Equity Finance is "investment from investors - Angels, Venture Capitals, business partners etc. Then they will be your shareholders. You should make return to them, such as capital gain or dividends.')}
//                         </Text>
//                       </Box>
//                       <Box>
//                         <Image src={img4} />
//                       </Box>
//                     </Row>
//                     <Box center width="100%">
//                       <Button
//                         style={{
//                           height: 50, width: 150, marginBottom: 20, backgroundColor: '#f49100', border: '0px transparent',
//                         }}
//                         onClick={() => { history.push('/users/simulation-setting'); service.setActions('changeRoute'); }}
//                       >
//                         {t('Create Simulation')}
//                       </Button>
//                     </Box>
//                   </Section>
//                 </Fragment>
//               ) : (
//                 <div>
//                   <h5 style={{ color: '#1D3B6C' }}>
//                     {simulation}
//                   </h5>
//                   <PL
//                     duration={simulationInfo.duration}
//                     company={companyInfo}
//                   />
//                   <FormGroup row>
//                     <div
//                       style={{ textAlign: 'center', width: '100%' }}
//                     >
//                       {`${t('Last Update:')} ${simulationInfo && moment.unix(simulationInfo.realLastUpdate).format('YYYY/MM/DD')}`}
//                     </div>
//                   </FormGroup>
//                   <Row className="divider" />
//                   <Col style={{ textAlign: 'center' }}>
//                     <Button
//                       style={{
//                         height: 50,
//                         width: 150,
//                         margin: 20,
//                         backgroundColor: '#f49100',
//                         border: '0px transparent',
//                       }}
//                       onClick={() => this.getChart()}
//                     >
//                       {t('View Simulation')}
//                     </Button>
//                   </Col>
//                 </div>
//               ) }
//           </CardBody>
//         </Card>
//         {!simulation
//           && (
//           <Button
//             style={{
//               position: 'absolute',
//               right: 30,
//               height: 50,
//               width: 150,
//               marginBottom: 20,
//               top: 100,
//               backgroundColor: '#f49100',
//               border: '0px transparent',
//             }}
//             onClick={() => {
//               history.push('/users/simulation-setting'); service.setActions('changeRoute');
//             }}
//           >
//             {t('Create Simulation')}
//           </Button>
//           )}
//         <SweetAlert
//           title={t('Simulation is not completed yet!')}
//           confirmButtonColor="#f49100"
//           confirmButtonText={t('Confirmation alert')}
//           show={alert}
//           text={t('Please fill in the necessary inputs in order to generate your financial statements.')}
//           type="warning"
//           onOutsideClick={() => this.setState({ alert: false })}
//           onConfirm={() => this.setState({ alert: false }, () => { history.push(`/users/simulation-setting/${simulationInfo && simulationInfo.id}/edit/6`); service.setActions('changeRoute'); })}
//         />
//       </div>
//     );
//   }
// }

// Demo.propTypes = {
//   t: PropTypes.func.isRequired,
//   history: PropTypes.object.isRequired,
//   companyInfo: PropTypes.func.isRequired,
//   simulationInfo: PropTypes.func.isRequired,
// };

// function mapStateToProps(state) {
//   return {
//     simulationInfo: state.companyInfo.get('simulation').toJS(),
//     companyInfo: state.companyInfo.get('company').toJS(),
//   };
// }

// const mapDispatchToProps = dispatch => ({
//   dispatchSetCompany: value => dispatch(setCompanyAction(value)),
//   dispatchSetSimulation: value => dispatch(setSimulation(value)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(translateWrapper('company-dasboard')(Demo));
