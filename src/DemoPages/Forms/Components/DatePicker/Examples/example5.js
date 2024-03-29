import React, { Fragment } from 'react';

import DatePicker from 'react-datepicker';
import addDays from 'date-fns/add_days';

class FormDatePicker5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    const { startDate } = this.state;
    return (
      <Fragment>
        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
          className="form-control"
          minDate={new Date()}
          maxDate={addDays(new Date(), 5)}
          placeholderText="Select a date between today and 5 days in the future"
        />
      </Fragment>
    );
  }
}

export default FormDatePicker5;
