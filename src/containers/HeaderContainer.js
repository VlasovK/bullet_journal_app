import {connect} from 'react-redux';
import Header from '../components/Header';
import React from 'react';
import {setCurrentTime} from '../store/common/actions';

function HeaderContainer(props) {
  return (
    <Header
      commonState={props.commonState}
      setCurrentTime={props.setCurrentTime}
      workspaceState={props.workspaceState}
    />
  );
}

let mapStateToProps = state=>({
    commonState: state.commonState, workspaceState: state.workspaceState
});
let mapDispatchToProps = {setCurrentTime};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
