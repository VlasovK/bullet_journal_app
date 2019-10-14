import {connect} from 'react-redux';
import React from 'react';
import Spinner from '../components/Spinner';

function SpinnerContainer(props) {
  return <Spinner logsState={props.logsState} />;
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SpinnerContainer);
