import React, { Component } from 'react';
import {
  Row, Col, FormGroup, Card, CardBody,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import apis from '../../../../apis/viewSimulation/projected-FS-by-table';

class WorkingCapital extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    const { company: { simulation } } = this.props;
    try {
      const id = simulation.id;
      const result = await apis.getprerequisites(id);
      const { data } = result;
      this.setState({ data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { data } = this.state;
    const { t } = this.props;
    return (
      <Card>
        <CardBody>
          <Row>
            <Col xl={12}>
              <FormGroup>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">{t('Category')}</th>
                      <th scope="col">{t('Prerequisites')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t('Tax')}</td>
                      <td>{`${t('text1')}${data.tax}${t('text2')} `}</td>
                    </tr>
                    <tr>
                      <td>{t('Depreciation - Building')}</td>
                      <td>{`${t('text3')}${data.building}${t('text4')}`}</td>
                    </tr>
                    <tr>
                      <td>{t('Depreciation -  Equipment')}</td>
                      <td>{`${t('text5')}${data.equipment}${t('text6')}`}</td>
                    </tr>
                    <tr>
                      <td>{t('Depreciation -  Software')}</td>
                      <td>{`${t('text7')}${data.software}${t('text8')}`}</td>
                    </tr>
                    <tr>
                      <td>{t('Depreciation -  Office furniture')}</td>
                      <td>{`${t('text9')}${data.officeFurniture}${t('text10')}`}</td>
                    </tr>
                  </tbody>
                </table>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

    );
  }
}

export default translateWrapper('WorkingCapital')(WorkingCapital);

WorkingCapital.propTypes = {
  t: PropTypes.func,
};

WorkingCapital.defaultProps = {
  t: null,
};
