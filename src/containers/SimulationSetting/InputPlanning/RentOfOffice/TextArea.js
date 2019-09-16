import React from 'react';
import {
  Input,
  FormGroup,
} from 'reactstrap';
import PropTypes from 'prop-types';

const MAX_CHAR = 999;

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

class TextArea extends React.PureComponent {
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
            {note && note.length}
            {' '}
              /
            {' '}
            {MAX_CHAR}
            {' '}
            {t && t('characters')}
          </span>
        </div>
      </div>
    );
  }
}

export default TextArea;
TextArea.propTypes = {
  handleChangeNote: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
