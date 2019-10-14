import React from 'react';
import {connect} from 'react-redux';
import MigrateDatepicker from '../components/MigrateDatepicker';
import {toggleMigrateDatepicker} from '../store/workspace/actions';
import {editTask, setCurrentTask} from '../store/logs/actions';

function MigrateDatepickerContainer(props) {
  return (
    <MigrateDatepicker
      workspaceState={props.workspaceState}
      logsState={props.logsState}
      toggleMigrateDatepicker={props.toggleMigrateDatepicker}
      setCurrentTask={props.setCurrentTask}
      editTask={props.editTask}
    />
  );
}

let mapStateToProps = state=>({
  workspaceState: state.workspaceState,
  logsState: state.logsState
});
let mapDispatchToProps = {
  toggleMigrateDatepicker,
  editTask,
  setCurrentTask
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MigrateDatepickerContainer);
