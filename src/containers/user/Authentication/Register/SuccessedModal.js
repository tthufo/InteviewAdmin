import React from 'react';
import {
  Modal, ModalBody,
} from 'reactstrap';
import { translateWrapper } from 'ter-localization';
import { withRouter } from 'react-router-dom';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      messages: props.messages,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { modal, messages } = this.props;
    if (modal !== newProps.modal || messages !== newProps.messages) {
      this.setState({ modal: newProps.modal, messages: newProps.messages });
    }
  }

  toggle() {
    const { history } = this.props;
    this.setState({
      modal: !this.state.modal,
    });
    history.push('/users/login');
  }

  render() {
    const { modal } = this.state;
    const { className, t } = this.props;
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className={className}
        >
          <ModalBody>
            <div>{t('successed')}</div>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default withRouter(translateWrapper('modal')(ModalExample));
