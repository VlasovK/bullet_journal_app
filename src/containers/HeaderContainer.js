import React from 'react';
import {connect} from 'react-redux';
import {setCurrentTime} from '../store/common/actions';
import Header from '../components/Header';

function HeaderContainer(props) {
  return (
    <Header
      commonState={props.commonState}
      workspaceState={props.workspaceState}
      setCurrentTime={props.setCurrentTime}
    />
  );
}

let mapStateToProps = state=>({
    commonState: state.commonState,
    workspaceState: state.workspaceState
});
let mapDispatchToProps = {setCurrentTime};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
