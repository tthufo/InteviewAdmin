import React, { Fragment } from 'react';

import {
  InputGroup, InputGroupAddon, Input,
} from 'reactstrap';

import {
  faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';
import moment from 'moment';

class FormDateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    const end = moment(start).add(1, 'days').subtract(1, 'seconds');
    this.state = {
      start,
      end,
    };

    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    this.setState({
      start: startDate,
      end: endDate,
    });
  }

  render() {
    const now = new Date();
    const start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
    const end = moment(start).add(1, 'days').subtract(1, 'seconds');
    const ranges = {
      'Today Only': [moment(start), moment(end)],
      'Yesterday Only': [moment(start).subtract(1, 'days'), moment(end).subtract(1, 'days')],
      '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
    };
    const local = {
      format: 'DD-MM-YYYY HH:mm',
      sundayFirst: false,
    };
    const maxDate = moment(start).add(24, 'hour');
    return (
      <Fragment>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
        >
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <div className="input-group-text">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
            </InputGroupAddon>

            <Input placeholder="Enter text" />
          </InputGroup>
        </DateTimeRangeContainer>
      </Fragment>
    );
  }
}

export default FormDateRangePicker;
