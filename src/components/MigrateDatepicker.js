import React from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB);
import moment from 'moment';

export default class MigrateDatepicker extends React.Component {
  stopPropagation = (event) => {
    event.stopPropagation();
  };
  migrateTask = (date) => {
    let {taskToMigrate: task, newLogType} = this.props.logsState.migrateData;
    task.logType = newLogType;
    if (newLogType === 'weekly') {
      task.date = moment(date).startOf('isoWeek').format('L');
    } else {
      task.date = moment(date).format('L');
    }
    this.props.editTask(task);
    this.props.setCurrentTask({});
    this.props.toggleMigrateDatepicker(false);
  };
  closeDatepicker = () => {
    this.props.toggleMigrateDatepicker(false);
  };
  render() {
    let {newLogType} = this.props.logsState.migrateData;
    if (!this.props.workspaceState.isMigrateDatepickerShown) {
      return null;
    }
    return (
      <div
        className="fullscreen-mask migrate-datepicker-mask"
        onClick={this.closeDatepicker}
      >
        <div
          onClick={this.stopPropagation}
          className={
            `datepicker-container${newLogType === 'monthly' ? '-small' : ''}`
          }
        >
          <DatePicker
            inline
            showMonthYearPicker={newLogType === 'monthly'}
            showWeekNumbers={newLogType === 'weekly'}
            locale="en-GB"
            className="date-picker"
            onChange={this.migrateTask}
          />
        </div>
      </div>
    );
  }
}
