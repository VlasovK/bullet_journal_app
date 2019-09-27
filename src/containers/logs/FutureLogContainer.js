import React from 'react';
import {connect} from 'react-redux';
import {setCurrentLogTask, getFutureLog, addFutureLogTask, editFutureLogTask,
  deleteFutureLogTask} from '../../store/logs/actions';
import FutureLog from '../../components/logs/FutureLog';

class FutureLogContainer extends React.Component {
  render() {
    return (
      <FutureLog
        logsState={this.props.logsState}
        logType={this.props.logType}
        setCurrentLogTask={this.props.setCurrentLogTask}
        getFutureLog={this.props.getFutureLog}
        addFutureLogTask={this.props.addFutureLogTask}
        editFutureLogTask={this.props.editFutureLogTask}
        deleteFutureLogTask={this.props.deleteFutureLogTask}
      />
    );
  }
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {setCurrentLogTask, getFutureLog, addFutureLogTask,
  editFutureLogTask, deleteFutureLogTask};
export default connect(mapStateToProps, mapDispatchToProps)(FutureLogContainer);
