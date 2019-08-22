import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import SpinnerContainer from './SpinnerContainer';
import HeaderContainer from './HeaderContainer';
import WorkspaceContainer from './WorkspaceContainer';

export default class MainView extends React.Component {
  render() {
    return (
      <div className="bg-img">
        <SpinnerContainer />
        <HeaderContainer />
        <WorkspaceContainer />
        <div className="footer">
          designed by iKoss 2019
        </div>
      </div>
    );
  }
}
