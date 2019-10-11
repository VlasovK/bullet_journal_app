import React from 'react';
import {connect} from 'react-redux';
import {getTasks} from '../../store/logs/actions';
import Logs from '../../components/logs/Logs';

class LogsContainer extends React.Component {
  render() {
    return (
      <Logs
        workspaceState={this.props.workspaceState}
        logsState={this.props.logsState}
        getTasks={this.props.getTasks}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  workspaceState: state.workspaceState, logsState: state.logsState
});
let mapDispatchToProps = {getTasks};
export default connect(mapStateToProps, mapDispatchToProps)(LogsContainer);
