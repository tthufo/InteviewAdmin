import React from 'react';
import {
  Row, Col, Card, CardBody, CardHeader,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import Table1 from './table1';
import Table3 from './table3';

class WorkingCapital extends React.PureComponent {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      data1: [
        {
          header: t('Buildings'),
          key: 'building',
        },
        {
          header: t('Equipment'),
          key: 'equipment',
        },
      ],
      data2: [
        {
          header: t('Software'),
          key: 'software',
        },
      ],
    };
  }

  parseDataAPI(item, type) {
    const { simulation } = this.props;
    const newData = [];
    const newDataAPI = {};
    const data = item.filter(el => el.asset.type === type);
    data.map((obj) => {
      newData.push({
        header: obj.asset.name,
        key: obj.asset.code,
      });
      newDataAPI[obj.asset.code] = obj.periods;
      return null;
    });
    return {
      newData,
      newDataAPI,
    };
  }

  render() {
    const {
      t, startYear, simulation, dataAPI, company,
    } = this.props;
    const { data1, data2 } = this.state;
    const inputData = dataAPI && dataAPI.assets && dataAPI.assets.tangibleAndInTangibleAssets;
    return (
      <Card style={{ marginTop: 30 }}>
        <CardHeader>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {t('Assets')}
            </div>
            <div>
              <a style={{ textDecoration: 'underline' }} href={`#/users/simulation-setting/${simulation.id}/edit/4`}>{t('Edit')}</a>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <Table1
                company={company}
                startYear={startYear}
                simulation={simulation}
                dataAPI={dataAPI ? this.parseDataAPI(inputData, 'tangible').newDataAPI : dataAPI && dataAPI.assets}
                data={dataAPI ? this.parseDataAPI(inputData, 'tangible').newData : data1}
              />
              <Table1
                company={company}
                startYear={startYear}
                simulation={simulation}
                dataAPI={dataAPI ? this.parseDataAPI(inputData, 'intangible').newDataAPI : dataAPI && dataAPI.assets}
                data={dataAPI ? this.parseDataAPI(inputData, 'intangible').newData : data2}
              />
              <Table3
                company={company}
                startYear={startYear}
                simulation={simulation}
                dataAPI={dataAPI && dataAPI.assets}
              />
            </Col>
          </Row>
          <Card>
            <CardBody>
              <p>{dataAPI && dataAPI.assets && dataAPI.assets.note}</p>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    );
  }
}

export default translateWrapper('input-past-data')(WorkingCapital);

WorkingCapital.propTypes = {
  t: PropTypes.func,
  startYear: PropTypes.number,
};

WorkingCapital.defaultProps = {
  t: null,
  startYear: null,
};
