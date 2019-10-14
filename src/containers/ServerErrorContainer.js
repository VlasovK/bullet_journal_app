import {connect} from 'react-redux';
import React from 'react';
import ServerError from '../components/ServerError';

function ServerErrorContainer(props) {
  return <ServerError logsState={props.logsState} />;
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {};
export default connect(
  mapStateToProps, mapDispatchToProps
)(ServerErrorContainer);
