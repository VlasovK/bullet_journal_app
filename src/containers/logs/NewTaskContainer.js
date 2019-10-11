import React from 'react';
import {connect} from 'react-redux';
import NewTask from '../../components/logs/NewTask';

class NewTaskContainer extends React.Component {
  render() {
    return (
      <NewTask
        closeNewTask={this.props.closeNewTask}
        saveNewTask={this.props.saveNewTask}
        logType={this.props.logType}
      />
    );
  }
}

let mapStateToProps = (state) => ({});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NewTaskContainer);
