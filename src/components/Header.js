import React from 'react';
import ReactDOM from 'react-dom';
import {MDBBtn} from 'mdbreact';
import * as moment from 'moment';

export default class MainView extends React.Component {
  componentDidMount() {
    this.timerId = setInterval(()=> this.props.setCurrentTime(moment()), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    let {isProjectsShown, isMyLogsShown, isNotesShown, isLifestyleShown}
      = this.props.workspaceState;
    let currentTime = moment(this.props.commonState.currentTime)
      .format('MMMM Do YYYY dddd, h:mm:ss a');
    return (
      <div className="header animated fadeInDown">
        <h3 className="app-name"><b>J</b>b</h3>
        <MDBBtn
          outline
          color={isProjectsShown ? 'white' : 'grey'}
          onClick={this.props.toggleProjectsDisplay}>
          projects
        </MDBBtn>
        <MDBBtn
          outline
          color={isMyLogsShown ? 'white' : 'grey'}
          onClick={this.props.toggleMyLogsDisplay}>
          my logs
        </MDBBtn>
        <MDBBtn
          outline
          color={isNotesShown ? 'white' : 'grey'}
          onClick={this.props.toggleNotesDisplay}>
          notes
        </MDBBtn>
        <MDBBtn
          outline
          color={isLifestyleShown ? 'white' : 'grey'}
          onClick={this.props.toggleLifestyleDisplay}>
          lifestyle
        </MDBBtn>
        <h5 className="the-time">{currentTime}</h5>
      </div>
    );
  }
}
