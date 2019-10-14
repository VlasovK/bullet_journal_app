import React from 'react';
import moment from 'moment';
import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGB);

export default function MigrateDatepicker(props) {
  let stopPropagation = (event) => {
    event.stopPropagation();
  };
  let migrateTask = (date) => {
    let {taskToMigrate: task, newLogType} = props.logsState.migrateData;
    task.logType = newLogType;
    if (newLogType === 'weekly') {
      task.date = moment(date).startOf('isoWeek').format('L');
    } else {
      task.date = moment(date).format('L');
    }
    props.editTask(task);
    props.setCurrentTask({});
    props.toggleMigrateDatepicker(false);
  };
  let closeDatepicker = () => {
    props.toggleMigrateDatepicker(false);
  };
  let {newLogType} = props.logsState.migrateData;
  return (
    <div
      className="fullscreen-mask migrate-datepicker-mask"
      onClick={closeDatepicker}
    >
      <div
        onClick={stopPropagation}
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
          onChange={migrateTask}
        />
      </div>
    </div>
  );
}
