import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import './menu-item.scss';

class MenuItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.isActive = this.isActive.bind(this);
  }

  isActive(path) {
    const { history: { location: { pathname } } } = this.props;
    return pathname === path;
  }

  render() {
    const { content } = this.props;
    return (
      <ul className="menu-container">
        {
          content && content.map(item => (
            <li>
              <Link className={`${this.isActive(item.path) ? 'menu-item menu-item__active' : 'menu-item'}`} to={item.path}>
                <i className={`${item.icon} menu-item__icon`} />
                {item.name}
              </Link>
            </li>
          ))
        }
      </ul>
    );
  }
}

export default withRouter(MenuItem);
MenuItem.propTypes = {
  history: PropTypes.object.isRequired,
  content: PropTypes.array.isRequired,
};
