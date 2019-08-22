import React from 'react';
import {connect} from 'react-redux';
import Workspace from '../components/Workspace';

class WorkspaceContainer extends React.Component {
  render() {
    return (
      <Workspace
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
export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer);
