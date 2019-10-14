import React from 'react';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';
import HeaderContainer from './HeaderContainer';
import SpinnerContainer from './SpinnerContainer';
import ServerErrorContainer from './ServerErrorContainer';
import ProjectsContainer from './projects/ProjectsContainer';
import LogsContainer from './logs/LogsContainer';
import NotesContainer from './notes/NotesContainer';
import LifestyleContainer from './lifestyle/LifestyleContainer';

export default function MainView() {
  return (
    <BrowserRouter>
      <div className="bg-img">
        <HeaderContainer />
        <SpinnerContainer />
        <ServerErrorContainer />
        <Switch>
          <Redirect exact path="/" to="/logs" />
          <Route path="/projects" component={ProjectsContainer} />
          <Route path="/logs" component={LogsContainer} />
          <Route path="/notes" component={NotesContainer} />
          <Route path="/lifestyle" component={LifestyleContainer} />
        </Switch>
        <div className="footer">2019</div>
      </div>
    </BrowserRouter>
  );
}
