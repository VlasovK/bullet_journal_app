import React from 'react';
import {connect} from 'react-redux';
import MigrateDatepicker from '../components/MigrateDatepicker';
import {toggleMigrateDatepicker} from '../store/workspace/actions';

class MigrateDatepickerContainer extends React.Component {
  render() {
    return (
      <MigrateDatepicker
        workspaceState={this.props.workspaceState}
        logsState={this.props.logsState}
        toggleMigrateDatepicker={this.props.toggleMigrateDatepicker} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    workspaceState: state.workspaceState,
    logsState: state.logsState
  };
};
let mapDispatchToProps = {toggleMigrateDatepicker};
export default connect(mapStateToProps, mapDispatchToProps)(MigrateDatepickerContainer);
