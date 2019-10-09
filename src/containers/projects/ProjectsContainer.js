import React from 'react';
import {connect} from 'react-redux';
import Projects from '../../components/projects/Projects';

class ProjectsContainer extends React.Component {
  render() {
    return (
      <Projects />
    );
  }
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
