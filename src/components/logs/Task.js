import React from 'react';
import ReactDOM from 'react-dom';
import {MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBIcon} from 'mdbreact';

export default class Task extends React.Component {
  selectTask = task=>()=>{
    this.props.setCurrentTask(task);
  };
  render() {
    let isDone = this.props.task.status === 3;
    return (
      <MDBContainer onClick={this.selectTask(this.props.task)}>
        <MDBCard className="mb-2 task-card">
          <MDBCardBody>
            <div className={`status-line mark-${this.props.task.mark}`} />
            <MDBCardText
              className={`task-text${isDone ? ' line-through' : ''}`}>
              {isDone &&
                <MDBIcon size="lg" icon="check-circle mr-1" />}
              {this.props.task.inProgress &&
                <MDBIcon size="lg" icon="hourglass-half mr-1" />}
              {this.props.task.text}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
