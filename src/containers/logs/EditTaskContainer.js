import React from 'react';
import {connect} from 'react-redux';
import {toggleMigrateDatepicker} from '../../store/workspace/actions';
import {setCurrentTask, setMigrateData} from '../../store/logs/actions';
import EditTask from '../../components/logs/EditTask';

function EditTaskContainer(props) {
  return (
    <EditTask
      logsState={props.logsState}
      logType={props.logType}
      toggleMigrateDatepicker={props.toggleMigrateDatepicker}
      setCurrentTask={props.setCurrentTask}
      editTask={props.editTask}
      deleteTask={props.deleteTask}
      setMigrateData={props.setMigrateData}
    />
  );
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {
  toggleMigrateDatepicker,
  setCurrentTask,
  setMigrateData
};
export default connect(mapStateToProps, mapDispatchToProps)(EditTaskContainer);
