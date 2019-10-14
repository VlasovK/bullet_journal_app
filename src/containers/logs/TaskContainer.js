import {connect} from 'react-redux';
import React from 'react';
import {setCurrentTask} from '../../store/logs/actions';
import Task from '../../components/logs/Task';

function TaskContainer(props) {
  return <Task setCurrentTask={props.setCurrentTask} task={props.task} />;
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {setCurrentTask};
export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
