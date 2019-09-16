import React, { Component } from 'react';
import { Table as RTable } from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import Loader from 'react-loaders';
import Pagination from 'react-js-pagination';
import { toast } from 'react-toastify';
import apis from '../../../apis/admin';
import Row from './table.row';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      page: 1,
      limit: 10,
    };
    this.get = debounce(this.get.bind(this), 300);
    this.resetPassword = this.resetPassword.bind(this);
    this.deActive = this.deActive.bind(this);
    this.active = this.active.bind(this);
  }

  async componentDidMount() {
    await this.get();
  }

  async resetPassword(id) {
    this.setState({ loading: true });
    const { t } = this.props;
    try {
      await apis.managerment.resetPassword(id);
      this.setState({ loading: false });
      toast.success(t('Reset password successfully!'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async active(id) {
    this.setState({ loading: true });
    const { t } = this.props;
    try {
      await apis.managerment.active(id);
      await this.get();
      toast.success(t('Active successfully!.'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deActive(id) {
    const { t } = this.props;
    this.setState({ loading: true });
    try {
      await apis.managerment.deActive(id);
      await this.get();
      toast.success(t('Deactive successfully!.'), {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async get() {
    this.setState({ loading: true });
    const {
      page,
      limit,
    } = this.state;
    try {
      const result = await apis.managerment.getUsers({
        offset: ((page - 1) * limit) < 0 ? 0 : ((page - 1) * limit) || 0,
        limit,
        direction: 'desc',
      });

      this.setState({
        data: result.data.items,
        loading: false,
        totalItemsCount: result.data.count,
      }, () => {
        if (result.data.items.length < 10) {
          for (let i = 0; i < 10; i += 1) {
            if (result.data.items.length === 10) break;
            result.data.items.push('');
          }
          console.log(result.data.items.length);
          this.setState({ data: result.data.items });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      loading,
      page,
      limit,
      totalItemsCount,
      data,
    } = this.state;

    const { t } = this.props;
    return (
      <div>
        <RTable
          hover
          bordered
          style={{ opacity: loading ? 0.5 : 1 }}
          responsive
          className="table-common"
        >
          <thead>
            <tr>
              <th>{t('User name(ID)')}</th>
              <th>{t('Login email address')}</th>
              <th>{t('Company Name(ID)')}</th>
              <th>{t('Status')}</th>
              <th>{t('Action')}</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item, index) => (
              <Row
                resetPassword={this.resetPassword}
                active={this.active}
                deActive={this.deActive}
                item={item}
                index={index}
              />
            ))}
          </tbody>
        </RTable>
        {loading && (
          <div style={{
            position: 'fixed', top: '50%', left: '50%', display: 'flex',
          }}
          >
            <div
              className="loader-wrapper d-flex justify-content-center align-items-center"
            >
              <Loader color="#1D3B6C" type="ball-pulse-rise" />
            </div>
          </div>
        )}

        <Pagination
          activePage={page}
          page={page || 1}
          totalItemsCount={totalItemsCount || 10}
          itemsCountPerPage={limit}
          onChange={async (_page) => {
            this.setState({ page: _page });
            await this.get();
          }}
        />
      </div>
    );
  }
}

export default translateWrapper('managerment')(Table);

Table.propTypes = {
  onRef: PropTypes.func,
  t: PropTypes.func,
};

Table.defaultProps = {
  onRef: null,
  t: null,
};
