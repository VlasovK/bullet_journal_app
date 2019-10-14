import BaseLog from './BaseLog';
import EditTaskContainer from '../../containers/logs/EditTaskContainer';
import TaskContainer from '../../containers/logs/TaskContainer';
import React from 'react';

export default class FutureLog extends BaseLog {
  renderTasks = ()=>{
    let {currentTask, tasks} = this.props.logsState;
    tasks = tasks.filter(task=>task.logType === 'future');
    tasks = this.sortTasks(tasks);
    return tasks.map(task=>{
      if (typeof currentTask === 'string' || currentTask.id !== task.id) {
        return <TaskContainer key={task.id} task={task} />;
      }
      return (
        <EditTaskContainer
          key={task.id}
          logType={'future'}
          editTask={this.editTask}
          deleteTask={this.deleteTask}
        />
      );
    });
  };
}
