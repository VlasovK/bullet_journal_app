import {connect} from 'react-redux';
import {editTask, setCurrentTask} from '../store/logs/actions';
import MigrateDatepicker from '../components/MigrateDatepicker';
import React from 'react';
import {toggleMigrateDatepicker} from '../store/workspace/actions';

function MigrateDatepickerContainer(props) {
  return (
    <MigrateDatepicker
      editTask={props.editTask}
      logsState={props.logsState}
      setCurrentTask={props.setCurrentTask}
      toggleMigrateDatepicker={props.toggleMigrateDatepicker}
      workspaceState={props.workspaceState}
    />
  );
}

let mapStateToProps = state=>({
  logsState: state.logsState, workspaceState: state.workspaceState
});
let mapDispatchToProps = {toggleMigrateDatepicker, editTask, setCurrentTask};
export default connect(
  mapStateToProps, mapDispatchToProps
)(MigrateDatepickerContainer);
