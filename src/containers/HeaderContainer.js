import React from 'react';
import {connect} from 'react-redux';
import {setCurrentTime} from '../store/common/actions';
import {toggleProjectsDisplay, toggleMyLogsDisplay, toggleNotesDisplay,
  toggleLifestyleDisplay} from '../store/workspace/actions';
import Header from '../components/Header';

class HeaderContainer extends React.Component {
  render() {
    return (
      <Header
        commonState={this.props.commonState}
        workspaceState={this.props.workspaceState}
        setCurrentTime={this.props.setCurrentTime}
        toggleProjectsDisplay={this.props.toggleProjectsDisplay}
        toggleMyLogsDisplay={this.props.toggleMyLogsDisplay}
        toggleNotesDisplay={this.props.toggleNotesDisplay}
        toggleLifestyleDisplay={this.props.toggleLifestyleDisplay} />
    );
  }
}

let mapStateToProps = state=>{
  return {
    commonState: state.commonState,
    workspaceState: state.workspaceState
  };
};
let mapDispatchToProps = {setCurrentTime, toggleProjectsDisplay,
  toggleMyLogsDisplay, toggleNotesDisplay, toggleLifestyleDisplay};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
