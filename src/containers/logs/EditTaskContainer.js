import React from 'react';
import {connect} from 'react-redux';
import {toggleMigrateDatepicker} from '../../store/workspace/actions';
import {
  setCurrentTask,
  setTaskToMigrate,
  migrateTask
} from '../../store/logs/actions';
import EditTask from '../../components/logs/EditTask';

class EditTaskContainer extends React.Component {
  render() {
    return (
      <EditTask
        logsState={this.props.logsState}
        logType={this.props.logType}
        toggleMigrateDatepicker={this.props.toggleMigrateDatepicker}
        setCurrentTask={this.props.setCurrentTask}
        editTask={this.props.editTask}
        deleteTask={this.props.deleteTask}
        setTaskToMigrate={this.props.setTaskToMigrate}
        migrateTask={this.props.migrateTask}
      />
    );
  }
}

let mapStateToProps = (state) => ({logsState: state.logsState});
let mapDispatchToProps = {
  toggleMigrateDatepicker,
  setCurrentTask,
  setTaskToMigrate,
  migrateTask
};
export default connect(mapStateToProps, mapDispatchToProps)(EditTaskContainer);
