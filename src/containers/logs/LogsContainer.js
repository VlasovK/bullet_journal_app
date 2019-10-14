import {connect} from 'react-redux';
import {getTasks} from '../../store/logs/actions';
import Logs from '../../components/logs/Logs';
import React from 'react';

function LogsContainer(props) {
  return (
    <Logs
      getTasks={props.getTasks}
      logsState={props.logsState}
      workspaceState={props.workspaceState}
    />
  );
}

let mapStateToProps = state=>({
  logsState: state.logsState, workspaceState: state.workspaceState
});
let mapDispatchToProps = {getTasks};
export default connect(mapStateToProps, mapDispatchToProps)(LogsContainer);
