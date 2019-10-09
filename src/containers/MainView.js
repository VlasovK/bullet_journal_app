import React from 'react';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';
import SpinnerContainer from './SpinnerContainer';
import HeaderContainer from './HeaderContainer';
import ProjectsContainer from './projects/ProjectsContainer';
import LogsContainer from './logs/LogsContainer';
import NotesContainer from './notes/NotesContainer';
import LifestyleContainer from './lifestyle/LifestyleContainer';

export default class MainView extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="bg-img">
          <SpinnerContainer />
          <HeaderContainer />
          <Switch>
            <Redirect exact path="/" to="/logs" />
            <Route path="/projects" component={ProjectsContainer} />
            <Route path="/logs" component={LogsContainer} />
            <Route path="/notes" component={NotesContainer} />
            <Route path="/lifestyle" component={LifestyleContainer} />
          </Switch>
          <div className="footer">
            designed by iKoss 2019
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
