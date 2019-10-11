import React from 'react';
import {connect} from 'react-redux';
import {
  setCurrentTask,
  addTask,
  editTask,
  removeTask
} from '../../store/logs/actions';
import FutureLog from '../../components/logs/FutureLog';

class FutureLogContainer extends React.Component {
  render() {
    return (
      <FutureLog
        logsState={this.props.logsState}
        setCurrentTask={this.props.setCurrentTask}
        addTask={this.props.addTask}
        editTask={this.props.editTask}
        removeTask={this.props.removeTask}
      />
    );
  }
}

let mapStateToProps = (state) => ({logsState: state.logsState});
let mapDispatchToProps = {
  setCurrentTask,
  addTask,
  editTask,
  removeTask
};
export default connect(mapStateToProps, mapDispatchToProps)(FutureLogContainer);
