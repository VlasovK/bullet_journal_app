import React from 'react';
import {connect} from 'react-redux';
import {setCurrentLogTask} from '../../store/logs/actions';
import EditTask from '../../components/logs/EditTask';

class EditTaskContainer extends React.Component {
  render() {
    return (
      <EditTask
        logsState={this.props.logsState}
        setCurrentLogTask={this.props.setCurrentLogTask}
        editTask={this.props.editTask}
        deleteTask={this.props.deleteTask} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    logsState: state.logsState
  };
};
let mapDispatchToProps = {setCurrentLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(EditTaskContainer);
