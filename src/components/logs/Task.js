import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBIcon
} from 'mdbreact';

export default function Task(props) {
  let selectTask = task=>()=>{
    props.setCurrentTask(task);
  };
  let isDone = props.task.status === 3;
  return (
    <MDBContainer onClick={selectTask(props.task)}>
      <MDBCard className="mb-2 task-card">
        <MDBCardBody>
          <div className={`status-line mark-${props.task.mark}`} />
          <MDBCardText
            className={`task-text${isDone ? ' line-through' : ''}`}>
            {isDone && (
              <MDBIcon size="lg" icon="check-circle mr-1" />
            )}
            {props.task.inProgress && (
              <MDBIcon size="lg" icon="hourglass-half mr-1" />
            )}
            {props.task.text}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
