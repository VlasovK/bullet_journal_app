import React from 'react';
import {connect} from 'react-redux';
import {addTaskToLog} from '../../store/logs/actions';
import NewTask from '../../components/logs/NewTask';

class NewTaskContainer extends React.Component {
  render() {
    return (
      <NewTask
        closeNewTask={this.props.closeNewTask}
        saveNewTask={this.props.saveNewTask} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    // reducers
  };
};
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskContainer);
