import React from 'react';
import {connect} from 'react-redux';
import Projects from '../../components/projects/Projects';

function ProjectsContainer(props) {
  return <Projects />;
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
