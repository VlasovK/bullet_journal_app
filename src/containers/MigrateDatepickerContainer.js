import React from 'react';
import {connect} from 'react-redux';
import MigrateDatepicker from '../components/MigrateDatepicker';
import {toggleMigrateDatepicker} from '../store/workspace/actions';
import {migrateTask} from '../store/logs/actions';

class MigrateDatepickerContainer extends React.Component {
  render() {
    return (
      <MigrateDatepicker
        workspaceState={this.props.workspaceState}
        logsState={this.props.logsState}
        toggleMigrateDatepicker={this.props.toggleMigrateDatepicker}
        migrateTask={this.props.migrateTask}
      />
    );
  }
}

let mapStateToProps = state=>({
  workspaceState: state.workspaceState,
  logsState: state.logsState
});
let mapDispatchToProps = {toggleMigrateDatepicker, migrateTask};
export default connect(
  mapStateToProps, mapDispatchToProps
)(MigrateDatepickerContainer);
