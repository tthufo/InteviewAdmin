import React from 'react';
import {
  Input,
  FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { translateWrapper } from 'ter-localization';
import { INPUT_MAX_LENGTH } from '../../constants';

const styles = {
  characterCounter: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  textarea: {
    height: 110,
    resize: 'none',
  },
};

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { note } = this.props;
    if (note === nextProps.note) {
      return false;
    }
    return true;
  }

  onChange(e) {
    const { handleChangeNote } = this.props;
    if (e.target && e.target.value !== undefined) {
      const newValue = e.target.value.slice(0, 999);
      handleChangeNote(newValue);
    }
  }

  render() {
    const { note, t } = this.props;
    return (
      <div>
        <FormGroup>
          <Input style={styles.textarea} value={note} type="textarea" name="text" id="exampleText" onChange={this.onChange} />
        </FormGroup>
        <div style={styles.characterCounter}>
          <span>
            {(note && note !== null && note.length) || 0}
            {' '}
              /
            {' '}
            {INPUT_MAX_LENGTH}
            {' '}
            {t && t('characters')}
          </span>
        </div>
      </div>
    );
  }
}

export default translateWrapper('textarea')(TextArea);
TextArea.propTypes = {
  handleChangeNote: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
