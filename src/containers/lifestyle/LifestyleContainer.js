import React from 'react';
import {connect} from 'react-redux';
import Lifestyle from '../../components/lifestyle/Lifestyle';

class LifestyleContainer extends React.Component {
  render() {
    return (
      <Lifestyle />
    );
  }
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LifestyleContainer);
