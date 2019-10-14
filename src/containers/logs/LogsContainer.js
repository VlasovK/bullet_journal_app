import React from 'react';
import {connect} from 'react-redux';
import {getTasks} from '../../store/logs/actions';
import Logs from '../../components/logs/Logs';

function LogsContainer(props) {
  return (
    <Logs
      workspaceState={props.workspaceState}
      logsState={props.logsState}
      getTasks={props.getTasks}
    />
  );
}

let mapStateToProps = (state) => ({
  workspaceState: state.workspaceState,
  logsState: state.logsState
});
let mapDispatchToProps = {getTasks};
export default connect(mapStateToProps, mapDispatchToProps)(LogsContainer);
