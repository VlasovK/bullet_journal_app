import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../components/Spinner';

class SpinnerContainer extends React.Component {
  render() {
    return (
      <Spinner logsState={this.props.logsState} />
    );
  }
}

let mapStateToProps = state=>({logsState: state.logsState});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SpinnerContainer);
