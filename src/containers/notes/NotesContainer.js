import {connect} from 'react-redux';
import Notes from '../../components/notes/Notes';
import React from 'react';

function NotesContainer(props) {
  return <Notes />;
}

let mapStateToProps = state=>({});
let mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
