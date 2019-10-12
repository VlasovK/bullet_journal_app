import React from 'react';
import {connect} from 'react-redux';
import MigrateDatepicker from '../components/MigrateDatepicker';
import {toggleMigrateDatepicker} from '../store/workspace/actions';
import {editTask, setCurrentTask} from '../store/logs/actions';

class MigrateDatepickerContainer extends React.Component {
  render() {
    return (
      <MigrateDatepicker
        workspaceState={this.props.workspaceState}
        logsState={this.props.logsState}
        toggleMigrateDatepicker={this.props.toggleMigrateDatepicker}
        setCurrentTask={this.props.setCurrentTask}
        editTask={this.props.editTask}
      />
    );
  }
}

let mapStateToProps = (state) => ({
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
