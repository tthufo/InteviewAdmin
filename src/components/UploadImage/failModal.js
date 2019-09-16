import React from 'react';
import {
  Modal, ModalBody, ModalFooter, Button,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import { withRouter } from 'react-router-dom';


class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { modal } = this.props;
    if (modal !== newProps.modal) {
      this.setState({ modal: newProps.modal });
    }
  }


  render() {
    const { modal } = this.state;
    const { className, t, toggle } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal
          style={{ width: 'auto', justifyContent: 'center' }}
          isOpen={modal}
          toggle={toggle}
          className={className}
        >
          <ModalBody style={{ alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
            <img
              style={{ height: 50, width: 50 }}
              alt=""
              src={require('../../assets/utils/images/success/cancel.png')}
            />
            <div style={{ marginLeft: 20 }}>{t('fail')}</div>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default withRouter(translateWrapper('modal')(ModalExample));
