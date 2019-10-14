import React from 'react';
import {connect} from 'react-redux';
import Notes from '../../components/notes/Notes';

function NotesContainer(props) {
  return <Notes />;
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
