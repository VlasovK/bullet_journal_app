import React from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB);
import * as moment from 'moment';

export default class MigrateDatepicker extends React.Component {
  stopPropagation = event=>{
    event.stopPropagation();
  };
  handleDatePicker = date=>{
    this.props.migrateTask(moment(date));
    this.props.toggleMigrateDatepicker(false);
  };
  closeDatepicker = ()=>{
    this.props.toggleMigrateDatepicker(false);
  };
  render() {
    let {newMigrateLogType} = this.props.logsState.migrateTaskDates;
    if (!this.props.workspaceState.isMigrateDatepickerShown)
      return null;
    return (
      <div className="fullscreen-mask migrate-datepicker-mask" onClick={this.closeDatepicker}>
        <div
          onClick={this.stopPropagation}
          className={`datepicker-container${newMigrateLogType === 'monthlyLog' ? '-small' : ''}`}>
          <DatePicker
            inline
            showMonthYearPicker={newMigrateLogType === 'monthlyLog'}
            showWeekNumbers={newMigrateLogType === 'weeklyLog'}
            locale="en-GB"
            className="date-picker"
            onChange={this.handleDatePicker} />
          </div>
      </div>
    );
  }
}
