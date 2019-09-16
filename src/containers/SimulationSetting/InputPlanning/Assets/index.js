import React from 'react';
import PropTypes from 'prop-types';
import { translateWrapper } from 'ter-localization';
import {
  Card, CardBody, Row, Col, FormGroup, Label, Button,
  Modal, ModalBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { toast, ToastContainer } from 'react-toastify';
import * as _ from 'lodash';
import GroupInput from './GroupInput';
import Table from './Table';
import TextArea from '../../../../components/TextArea';
import API from '../../../../apis';
import CompanyWrapper from '../../../../components/CompanyWrapper';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    height: '100%',
    width: '100px',
    backgroundColor: '#f49100',
    border: '0px transparent',
  },
};

const MAX_DURATION = 5;

class Assets extends React.PureComponent {
  constructor(props) {
    super(props);

    this.columns1 = [
      {
        Header: '',
        accessor: 'header',
        eidtable: false,
        sortable: false,
        resizable: true,
        getProps: (state, rowInfo) => ({
          style: {
            'border-bottom': '1px solid #E9ECEF',
          },
        }),
      },
    ];

    this.columns2 = [
      {
        Header: '',
        accessor: 'header',
        eidtable: false,
        sortable: false,
        resizable: true,
        getProps: (state, rowInfo) => ({
          style: {
            'border-bottom': '1px solid #E9ECEF',
          },
        }),
      },
    ];

    this.columns3 = [
      {
        Header: '',
        accessor: 'header',
        eidtable: false,
        sortable: false,
        resizable: true,
        getProps: (state, rowInfo) => ({
          style: {
            'border-bottom': '1px solid #E9ECEF',
          },
        }),
      },
    ];

    this.state = {
      note: '',
      isOpen: false,
      duration: '',
      startYear: '',
      data1: [],
      data2: [],
      data3: [],
      registerData: {
        category: '',
        year: '',
        value: '',
        type: '',
        code: '',
      },
      editData: {
      },
      types: [],
      forceValidate: false,
      forceValidatePop: false,
    };
    this.tangible = [];
    this.inTangible = [];

    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.createAssets = this.createAssets.bind(this);
    this.createAssetsDebounce = _.debounce(this.createAssets, 500);
    this.reqister = this.reqister.bind(this);
    this.toggle = this.toggle.bind(this);
    this.editData = this.editData.bind(this);
    this.handleTableInputChange = this.handleTableInputChange.bind(this);
  }

  componentDidMount() {
    this.getCategory();
  }

  async getCategory() {
    try {
      const result = await API.assets.getCategory();
      const category = result && result.data;
      this.setState({ types: category }, () => this.preState(this.state.types));
    } catch (error) {
      console.log(error);
    }
  }

  async getAssets(id) {
    try {
      const { types } = this.state;
      const result = await API.assets.getAssets(id || '');
      const assetData = result.data && result.data.inputValue[0];

      types.map((obj) => {
        if (obj.type === 'tangible') {
          this.tangible.push(obj);
        } else {
          this.inTangible.push(obj);
        }
        return null;
      });

      this.setState({ note: assetData.note }, () => {
        this.dataTableRender(this.tangible, this.inTangible, assetData);
      });
    } catch (error) {
      console.log(error);
    }
  }

  preState(types) {
    const { companyInfo: { startYear } } = this.props;
    const duration = localStorage.getItem('duration');
    this.setState({
      duration,
      startYear,
    }, () => this.modifyingColumn());
    const inputData = { ...this.state.registerData };
    inputData.year = startYear;
    inputData.category = types[0].name;
    inputData.type = types[0].type;
    inputData.code = types[0].code;
    this.setState({ registerData: inputData });
  }

  modifyingColumn() {
    const { duration, types } = this.state;
    const { match, simulationInfo: { id }, companyInfo: { startYear } } = this.props;
    for (let i = 0; i < duration; i += 1) {
      this.columns1.push(
        {
          Header: startYear + i,
          accessor: `${startYear + i}`,
          eidtable: false,
          sortable: false,
          resizable: true,
          getProps: (state, rowInfo) => ({
            style: {
              backgroundColor: rowInfo.original.color,
              'border-bottom': '1px solid #E9ECEF',
            },
          }),
        },
      );
    }
    for (let i = 0; i < duration; i += 1) {
      this.columns2.push(
        {
          Header: startYear + i,
          accessor: `${startYear + i}`,
          eidtable: true,
          sortable: false,
          resizable: true,
          getProps: (state, rowInfo) => ({
            style: {
              backgroundColor: rowInfo.original.color,
              'border-bottom': '1px solid #E9ECEF',
            },
          }),
        },
      );
    }
    for (let i = 0; i < duration; i += 1) {
      this.columns3.push(
        {
          Header: startYear + i,
          accessor: `${startYear + i}`,
          eidtable: true,
          sortable: false,
          resizable: true,
          getProps: (state, rowInfo) => ({
            style: {
              backgroundColor: rowInfo.original.color,
              'border-bottom': '1px solid #E9ECEF',
            },
          }),
        },
      );
    }

    if (match.params && match.params.id) {
      this.getAssets(match.params.id);
    } else if (id) {
      this.getAssets(id);
    } else {
      types.map((obj) => {
        if (obj.type === 'tangible') {
          this.tangible.push(obj);
        } else {
          this.inTangible.push(obj);
        }
        return null;
      });
      this.dataTableRender(this.tangible, this.inTangible);
    }
  }

  dataTableRender(tangible, inTangible, assetData) {
    const { t, companyInfo: { startYear } } = this.props;
    const data1 = [];
    const header1 = [];
    tangible.map((obj) => {
      header1.push(t(`${_.upperFirst(obj.code)}`));
      return header1;
    });

    header1.push(t('Total tangible Assets'));
    const assetsData = assetData && assetData.assets;

    header1.map((h, index) => {
      const obj = {};
      obj.header = h;
      obj.type = (tangible[index] && tangible[index].type) || '';
      obj.code = (tangible[index] && tangible[index].code) || '';
      if (assetsData && assetsData.length !== 0) {
        const ass = assetsData.filter(as => _.toLower(as.asset.code) === _.toLower((tangible[index] && tangible[index].code)));
        for (let k = 0; k < (ass && ass.length) || 0; k += 1) {
          obj[`${startYear + k}`] = (ass && ass[k] && ass[k].price) || '';
        }
      } else {
        for (let i = 0; i < MAX_DURATION; i += 1) {
          obj[`${startYear + i}`] = '';
        }
      }

      if (index === header1.length - 1) {
        obj.disableClick = true;
        obj.color = '#cfe2f3ff';
        for (let i = 0; i < MAX_DURATION; i += 1) {
          obj[`${startYear + i}`] = this.counting(data1, startYear + i, 0);
        }
      } else {
        obj.color = '#DEE7ED';
      }

      data1.push(obj);
      return null;
    });
    this.setState({ data1 });

    const data2 = [];
    const header2 = [];
    inTangible.map((obj) => {
      header2.push(t(`${_.upperFirst(obj.code)}`));
      return header2;
    });
    header2.push(t('Total Intangible Assets'));

    header2.map((h, index) => {
      const obj = {};
      obj.header = h;
      obj.type = (inTangible[index] && inTangible[index].type) || '';
      obj.code = (inTangible[index] && inTangible[index].code) || '';
      if (assetsData && assetsData.length !== 0) {
        const ass = assetsData.filter(as => _.toLower(as.asset.code) === _.toLower((inTangible[index] && inTangible[index].code)));
        for (let k = 0; k < (ass && ass.length) || 0; k += 1) {
          obj[`${startYear + k}`] = (ass && ass[k] && ass[k].price) || '';
        }
      } else {
        for (let i = 0; i < MAX_DURATION; i += 1) {
          obj[`${startYear + i}`] = '';
        }
      }

      if (index === header2.length - 1) {
        obj.disableClick = true;
        obj.color = '#cfe2f3ff';
        for (let i = 0; i < MAX_DURATION; i += 1) {
          obj[`${startYear + i}`] = this.counting(data2, startYear + i, 0);
        }
      } else {
        obj.color = '#DEE7ED';
      }
      data2.push(obj);
      return null;
    });

    this.setState({ data2 });

    const data3 = [];
    const header3 = [t('Other Current Assets'), t('Other Assets'), t('Other Current Liabilities')];
    header3.map((h, index) => {
      const obj = {};
      // eslint-disable-next-line no-nested-ternary
      const data = index === 0
        ? assetData && assetData.otherCurrentAssets : index === 1
          ? assetData && assetData.otherAssets : assetData && assetData.otherCurrentLiabilities;

      obj.header = h;
      for (let i = 0; i < MAX_DURATION; i += 1) {
        obj[`${startYear + i}`] = (data && data[i] && data[i].value) || '';
      }
      obj.color = '#DEE7ED';
      data3.push(obj);
      return null;
    });

    this.setState({ data3 });
  }

  async createAssets() {
    const {
      data1, data2,
      data3, note, startYear,
    } = this.state;

    const asset = {};

    const k = ['other_current_assets', 'other_assets', 'current_liabilities'];

    const data1Clone = data1.map(a => ({ ...a }));
    data1Clone.pop();

    const data2Clone = data2.map(a => ({ ...a }));
    data2Clone.pop();

    const ass = [...data1Clone, ...data2Clone];

    const as = ass.map((as, index) => {
      const tempArr = [];
      delete as.header;
      delete as.color;
      delete as.type;
      delete as.code;
      const tempObject = {};
      tempObject.asset_id = index + 1;
      for (let i = 0; i < MAX_DURATION; i += 1) {
        const tempObj = {};
        tempObj.year_different = i;
        tempObj.month_different = 0;
        tempObj.value = (as && as[`${startYear + i}`] === '' ? 0 : as[`${startYear + i}`]) || 0;
        tempArr.push(tempObj);
      }
      tempObject.periods = tempArr;
      return tempObject;
    });

    asset.assets = as;

    const data3Clone = data3.map(a => ({ ...a }));

    data3Clone.map((as, index) => {
      const tempArr = [];
      delete as.header;
      delete as.color;
      for (let i = 0; i < MAX_DURATION; i += 1) {
        const tempObj = {};
        tempObj.year_different = i;
        tempObj.month_different = 0;
        tempObj.value = (as && as[`${startYear + i}`] === '' ? 0 : as[`${startYear + i}`]) || 0;
        tempArr.push(tempObj);
      }
      asset[k[index]] = tempArr;
      return tempArr;
    });

    asset.note = note;

    const { simulationInfo: { id } } = this.props;
    try {
      await API.assets.createAssets(id, asset);
      const { nextTab, tabKey } = this.props;
      nextTab(tabKey);
    } catch (error) {
      toast.error(error.response.data.invalidParams.length !== 0 ? error.response.data.invalidParams.map(p => p.message).join('\n') : error.response.data.detail, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  reqister(isEdit) {
    let { registerData, editData } = this.state;
    registerData = fromJS(registerData);
    editData = fromJS(editData);
    registerData = registerData.toJS();
    editData = editData.toJS();
    if (!isEdit) {
      this.setState({ forceValidate: true });
    } else {
      this.setState({ forceValidatePop: editData.value === '' }, () => { if (!this.state.forceValidatePop) { this.toggle(); } });
    }
    const firstTable = isEdit ? (editData.type === 'tangible') : (registerData.type === 'tangible');
    let { data1, data2 } = this.state;
    data1 = fromJS(data1);
    data2 = fromJS(data2);
    data1 = data1.toJS();
    data2 = data2.toJS();
    const newItems = firstTable ? data1 : data2;

    if (isEdit && editData.value !== '') {
      (firstTable ? this.tangible : this.inTangible).map((obj, index) => {
        if (obj.code === editData.code) {
          newItems[index][editData.year] = Number(editData.value);
          newItems[firstTable ? this.tangible.length : this.inTangible.length][editData.year] = this.counting(newItems, editData.year);
        }
        return null;
      });
    }

    if (!isEdit && registerData.value !== '') {
      (firstTable ? this.tangible : this.inTangible).map((obj, index) => {
        if (obj.code === registerData.code) {
          newItems[index][registerData.year] = Number(registerData.value);
          newItems[firstTable ? this.tangible.length : this.inTangible.length][registerData.year] = this.counting(newItems, registerData.year);
        }
        return null;
      });
    }
    this.setState({ [firstTable ? 'data1' : 'data2']: newItems });
  }

  counting(data, year, length) {
    let count = 0;
    for (let i = 0; i < data.length - (length === undefined ? 1 : length); i += 1) {
      count += Number(data[i][year]);
    }
    return count;
  }

  editData(data, header) {
    (data.type === 'tangible' ? this.tangible : this.inTangible).map((obj) => {
      if (obj.code === data.code) {
        this.setState({
          editData: {
            category: obj.name,
            year: header,
            value: data[header],
            type: obj.type,
            code: obj.code,
          },
        }, () => this.toggle());
      }
      return null;
    });
  }

  handleChangeNote(value) {
    this.setState({
      note: value,
    });
  }

  handleTableInputChange(index, value, ...rest) {
    const id = rest[0][0];
    const { data3: numGoods } = this.state;
    let newState = fromJS(numGoods);
    newState = newState.toJS();
    newState[id][index] = value;
    this.setState({
      data3: newState,
    });
  }

  toggle() {
    this.setState(prev => ({
      isOpen: !prev.isOpen,
    }), () => { if (!this.state.isOpen) { this.setState({ forceValidatePop: false }); } });
  }

  render() {
    const {
      note, isOpen,
      duration, startYear,
      data1, data2, forceValidate, forceValidatePop,
      data3, registerData, editData, types,
    } = this.state;
    const {
      t, backTab, tabKey, companyInfo,
    } = this.props;
    return (
      <div className="form-wizard-content">
        <Card className="main-card mb-3">
          <CardBody>
            <h6>{t('Register Asset acquisition plan')}</h6>
            <GroupInput
              t={t}
              types={types}
              duration={duration}
              startYear={startYear}
              data={registerData}
              forceValidate={forceValidate}
              onChangeCategory={() => this.setState({ forceValidate: false })}
              onChangeData={dat => this.setState({ registerData: dat })}
            />
            <div style={styles.buttonContainer}>
              <Button onClick={() => this.reqister(false)} style={styles.button}>{t('Register')}</Button>
            </div>
          </CardBody>
        </Card>
        <Row>
          <Col xl={12}>
            <FormGroup>
              {data1.length !== 0
              && (
              <Table
                t={t}
                header={t('Property, Plant and Equipment or Tangible Assets')}
                year={duration}
                description={t('des 1')}
                columns={this.columns1}
                data={data1}
                handleOpenModal={(data, header) => this.editData(data, header)}
                company={companyInfo}
              />
              )
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <FormGroup>
              { data2.length !== 0
              && (
              <Table
                t={t}
                header={t('Intangible Assets')}
                year={duration}
                description={t('des 2')}
                columns={this.columns1}
                data={data2}
                handleOpenModal={(data, header) => this.editData(data, header)}
                company={companyInfo}
              />
              )
              }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <FormGroup>
              {data3.length !== 0
              && (
              <Table
                t={t}
                header={t('Other Assets and  Liabilities')}
                year={duration}
                description={t('des 3')}
                columns={this.columns3}
                data={data3}
                company={companyInfo}
                handleChange={this.handleTableInputChange}
              />
              )
            }
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <FormGroup>
              <Label>{t('Note')}</Label>
              <TextArea
                note={note}
                handleChangeNote={this.handleChangeNote}
              />
            </FormGroup>
          </Col>
        </Row>
        <Modal
          style={{
            boxShadow: 'none',
          }}
          centered
          size="lg"
          isOpen={isOpen}
          toggle={this.toggle}
        >
          <ModalBody>
            <h5><b>{t('Register Asset acquisition plan')}</b></h5>
            <GroupInput
              t={t}
              types={types}
              duration={duration}
              startYear={startYear}
              data={editData}
              forceValidatePop={forceValidatePop}
              edit=""
              onChangeData={dat => this.setState({ editData: dat })}
            />
            <Row>
              <Col xl={12}>
                <div style={styles.buttonContainer}>
                  <Button
                    color="primary"
                    style={styles.button}
                    onClick={() => { this.reqister(true); }}
                  >
                    {t('Update')}
                  </Button>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        <div className="clearfix">
          <div>
            <Button
              style={{ color: '#f49100', backgroundColor: '#ffffff', border: '1px #f49100' }}
              className="btn-shadow float-left btn-wide"
              onClick={() => {
                backTab(tabKey);
              }}
            >
              {t('Back')}
            </Button>
            <Button
              style={{ backgroundColor: '#f49100', border: '0px transparent' }}
              className="btn-shadow btn-wide float-right btn-hover-shine"
              onClick={this.createAssetsDebounce}
            >
              {t('Next')}
            </Button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    simulationInfo: state.companyInfo.get('simulation').toJS(),
    companyInfo: state.companyInfo.get('company').toJS(),
  };
}

export default translateWrapper('Assets')(CompanyWrapper(connect(mapStateToProps)(Assets)));
Assets.propTypes = {
  t: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  backTab: PropTypes.func.isRequired,
  tabKey: PropTypes.number.isRequired,
  nextTab: PropTypes.func.isRequired,
};
