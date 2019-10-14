import DatePicker, {registerLocale} from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import moment from 'moment';
import React from 'react';
registerLocale('en-GB', enGB);

export default function MigrateDatepicker(props) {
  let {newLogType, taskToMigrate: task} = props.logsState.migrateData;
  let stopPropagation = event=>{
    event.stopPropagation();
  };
  let migrateTask = date=>{
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
  let closeDatepicker = ()=>{
    props.toggleMigrateDatepicker(false);
  };
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
