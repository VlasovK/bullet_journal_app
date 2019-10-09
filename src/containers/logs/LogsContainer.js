import React from 'react';
import {connect} from 'react-redux';
import Logs from '../../components/logs/Logs';

class LogsContainer extends React.Component {
  render() {
    return (
      <Logs
        workspaceState={this.props.workspaceState}
        logsState={this.props.logsState} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    workspaceState: state.workspaceState,
    logsState: state.logsState
  };
};
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LogsContainer);
