import React, { PureComponent } from 'react';
import { translateWrapper } from 'ter-localization';
import { withRouter } from 'react-router';
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './table.css';

const styles = {
  rowStyle: { lineHeight: '25px' },
};

class TableRow extends PureComponent {
  render() {
    const {
      item,
      t,
      resetPassword,
      active,
      deActive,
    } = this.props;
    return (
      <React.Fragment>
        {
          item !== '' && item ? (
            <tr style={{ lineHeight: '40px' }}>
              <td width="25%" className="break" style={styles.rowStyle}>{item.firstName && `${item.lastName || ''} ${item.firstName} (${item.id || ''})`}</td>
              <td width="20%" className="break" style={styles.rowStyle}>{item.email}</td>
              <td width="37%" className="break" style={styles.rowStyle}>{item.company && item.company.name ? `${(item.company && item.company.name) || ''}(${item.id || ''})` : ''}</td>
              <td width="10%" style={styles.rowStyle}>{t(item.status)}</td>
              <td width="8%" style={styles.rowStyle}>
                {
            item.status !== 'unverified' && (
            <UncontrolledButtonDropdown>
              <DropdownToggle
                style={{
                  backgroundColor: '#f49100',
                  border: '0px transparent',
                }}
                className="mb-2 mr-2 btn-icon btn-icon-only dropdown-toggle"
                color="primary"
              >
                <i
                  style={{
                  }}
                  className="pe-7s-tools btn-icon-wrapper"
                />
              </DropdownToggle>
              <DropdownMenu
                right
              >
                <DropdownItem>
                  <div
                    style={{ width: '100%', color: '#1D3B6C' }}
                    onClick={() => resetPassword(item.id)}
                    role="presentation"
                  >
                    <i
                      style={{ width: 15 }}
                      className="pe-7s-key btn-icon-wrapper"
                    />
                    <span>  </span>
                    {' '}
                    {t('Reset Password')}
                  </div>
                </DropdownItem>
                {item.company !== null && (
                <DropdownItem>
                  <Link style={{ width: '100%' }} to={`/admin/user-company-setting/${item.id}`}>
                    <i className="pe-7s-home btn-icon-wrapper"> </i>
                    <span>  </span>
                    {' '}
                    {t('Edit Company Info')}
                  </Link>
                </DropdownItem>
                )}
                <DropdownItem>
                  <Link
                    style={{ width: '100%' }}
                    to={`/admin/user-profile/${item.id}`}
                  >
                    <i className="pe-7s-pen btn-icon-wrapper"> </i>
                    <span>  </span>
                    {' '}
                    {t('Edit User Information')}
                  </Link>
                </DropdownItem>
                {item.status !== 'disabled' && (
                <DropdownItem>
                  <div
                    style={{ width: '100%' }}
                    role="presentation"
                    onClick={() => deActive(item.id)}
                  >
                    <i style={{ width: 15 }} className="pe-7s-delete-user btn-icon-wrapper"> </i>
                    <span>  </span>
                    {' '}
                    {t('Disable account')}
                  </div>
                </DropdownItem>
                )}
                {item.status !== 'active' && (
                <DropdownItem>
                  <div
                    style={{ width: '100%' }}
                    role="presentation"
                    onClick={() => active(item.id)}
                  >
                    <i style={{ width: 20 }} className="pe-7s-user btn-icon-wrapper"> </i>
                    <span>  </span>
                    {' '}
                    {t('Enable account')}
                  </div>
                </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            )
          }
              </td>
            </tr>
          ) : (
            <tr
              style={{
                border: 'none', height: 40,
              }}
            >
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          )
      }
      </React.Fragment>
    );
  }
}

export default withRouter(translateWrapper('row')(TableRow));

TableRow.propTypes = {
  item: PropTypes.object,
  t: PropTypes.func,
  resetPassword: PropTypes.func,
  active: PropTypes.func,
  deActive: PropTypes.func,
};

TableRow.defaultProps = {
  item: null,
  t: null,
  resetPassword: null,
  active: null,
  deActive: null,
};
