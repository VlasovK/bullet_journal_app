import React from 'react';
import {connect} from 'react-redux';
import {setCurrentLogTask} from '../../store/logs/actions';
import Task from '../../components/logs/Task';

class TaskContainer extends React.Component {
  render() {
    return (
      <Task
        task={this.props.task}
        setCurrentLogTask={this.props.setCurrentLogTask}
      />
    );
  }
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {setCurrentLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
