import React from 'react';
import {connect} from 'react-redux';
import {setCurrentTime} from '../store/common/actions';
import Header from '../components/Header';

class HeaderContainer extends React.Component {
  render() {
    return (
      <Header commonState={this.props.commonState}
        workspaceState={this.props.workspaceState}
        setCurrentTime={this.props.setCurrentTime}
      />
    );
  }
}

let mapStateToProps = state=>{
  return {
    commonState: state.commonState,
    workspaceState: state.workspaceState
  };
};
let mapDispatchToProps = {setCurrentTime};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
