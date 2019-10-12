import React from 'react';
import {connect} from 'react-redux';
import ServerError from '../components/ServerError';

class ServerErrorContainer extends React.Component {
  render() {
    return <ServerError logsState={this.props.logsState} />;
  }
}

let mapStateToProps = (state) => ({logsState: state.logsState});
let mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerErrorContainer);
