import {connect} from 'react-redux';
import EditTask from '../../components/logs/EditTask';
import React from 'react';
import {setCurrentTask, setMigrateData} from '../../store/logs/actions';
import {toggleMigrateDatepicker} from '../../store/workspace/actions';

function EditTaskContainer(props) {
  return (
    <EditTask
      deleteTask={props.deleteTask}
      editTask={props.editTask}
      logsState={props.logsState}
      logType={props.logType}
      setCurrentTask={props.setCurrentTask}
      setMigrateData={props.setMigrateData}
      toggleMigrateDatepicker={props.toggleMigrateDatepicker}
    />
  );
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {
  setCurrentTask,
  setMigrateData,
  toggleMigrateDatepicker
};
export default connect(mapStateToProps, mapDispatchToProps)(EditTaskContainer);
