import React from 'react';
import {connect} from 'react-redux';
import {setCurrentTask} from '../../store/logs/actions';
import Task from '../../components/logs/Task';

function TaskContainer(props) {
  return (
    <Task
      task={props.task}
      setCurrentTask={props.setCurrentTask}
    />
  );
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {setCurrentTask};
export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
