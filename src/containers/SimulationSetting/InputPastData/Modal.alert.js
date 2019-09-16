import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Modal, ModalBody, ModalFooter, Button,
} from 'reactstrap';

class Index extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef(this, this.openModal, this.closeModal);
    }
  }

  closeModal() {
    this.setState(prev => ({
      ...prev,
      open: false,
    }));
  }

  openModal(data) {
    this.setState(prev => ({
      ...prev,
      open: true,
      data,
    }));
  }

  render() {
    const { open, data } = this.state;
    const { onYes, t } = this.props;

    return (
      <Modal
        isOpen={open}
        toggle={this.closeModal}
        className="modal-sm modal-dialog-centered"
        style={{
          boxShadow: 'none',
        }}
      >
        <ModalBody>
          {data !== undefined ? data.message : t('alert')}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              if (onYes) onYes(data);
              this.closeModal();
            }}
          >
            {t('ok')}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default (Index);

Index.propTypes = {
  onRef: PropTypes.func,
  onYes: PropTypes.func,
  t: PropTypes.func,
};

Index.defaultProps = {
  onRef: null,
  onYes: null,
  t: null,
};
