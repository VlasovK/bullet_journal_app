import React from 'react';
import {connect} from 'react-redux';
import {setCurrentTask} from '../../store/logs/actions';
import Task from '../../components/logs/Task';

class TaskContainer extends React.Component {
  render() {
    return (
      <Task
        task={this.props.task}
        setCurrentTask={this.props.setCurrentTask} />
    );
  }
}

let mapStateToProps = state=>{
  return {};
};
let mapDispatchToProps = {setCurrentTask};
export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
