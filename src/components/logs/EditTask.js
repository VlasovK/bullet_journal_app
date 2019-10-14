import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon
} from 'mdbreact';
import React from 'react';

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaskChanged: false,
      style: '',
      task: {}
    };
  }
  componentDidMount() {
    this.setState({task: this.props.logsState.currentTask});
    document.getElementById('edit-task').scrollIntoView({block: 'nearest'});
  }
  handleTextArea = event=>{
    this.setState({
      task: {...this.state.task, text: event.target.value},
      isTaskChanged: true
    });
  };
  markTask = mark=>()=>{
    this.setState({
      task: {...this.state.task, mark},
      isTaskChanged: true
    });
  };
  onSave = ()=>{
    this.props.editTask(this.state.task);
    this.props.setCurrentTask({});
  };
  setStatus = status=>()=>{
    let {task} = this.state;
    switch (status) {
      case 'done':
        task.status = 3;
        task.inProgress = false;
        break;
      case 'notDone':
        task.status = 1;
        task.inProgress = false;
        break;
      case 'inProgress':
        task.status = 1;
        task.inProgress = true;
    }
    this.props.editTask(task);
    this.props.setCurrentTask({});
  };
  onDelete = id=>()=>{
    this.props.deleteTask(id);
    this.props.setCurrentTask({});
  };
  migrateToFutureLog = ()=>{
    let {task} = this.state;
    task.logType = 'future';
    task.date = null;
    this.props.editTask(task);
    this.props.setCurrentTask({});
  };
  setMigrateData = newLogType=>()=>{
    this.props.setMigrateData(this.state.task, newLogType);
    this.props.toggleMigrateDatepicker(newLogType);
  };
  onCancel = ()=>{
    this.props.setCurrentTask({});
  };
  render() {
    let {
      isTaskChanged,
      task: {id, inProgress, mark, status, text}
    } = this.state;
    let isDone = status === 3;
    return (
      <MDBContainer id="edit-task">
        <MDBCard className="mb-2">
          <MDBCardBody>
            <MDBIcon
              icon="times"
              className="edit-task-close-icon"
              onClick={this.onCancel}
            />
            <div className={`status-line status-line-top mark-${mark}`} />
            <div className="form-group mb-12">
              <textarea
                className="form-control"
                autoFocus
                rows="5"
                value={text}
                onChange={this.handleTextArea}
              />
            </div>
            <MDBBtnGroup className="btn-group-width-100">
              {!isDone && (
                <MDBBtn
                  outline color="blue-grey"
                  size="sm"
                  className="edit-task-btn"
                  onClick={this.setStatus('done')}
                >
                  done
                </MDBBtn>
              )}
              {isDone && (
                <MDBBtn
                  outline color="blue-grey"
                  size="sm"
                  className="edit-task-btn"
                  onClick={this.setStatus('notDone')}
                >
                  not done
                </MDBBtn>
              )}
              {!inProgress && (
                <MDBBtn
                  outline color="blue-grey"
                  size="sm"
                  className="edit-task-btn"
                  onClick={this.setStatus('inProgress')}
                >
                in progress
                </MDBBtn>
              )}
              {inProgress && (
                <MDBBtn
                  outline color="blue-grey"
                  size="sm"
                  className="edit-task-btn"
                  onClick={this.setStatus('notDone')}
                >
                  not in progress
                </MDBBtn>
              )}
              <MDBBtn
                outline color="blue-grey"
                size="sm"
                className="edit-task-btn"
                onClick={this.onDelete(id)}
              >
                <span className="red-text">delete</span>
              </MDBBtn>
            </MDBBtnGroup>
            <MDBBtnGroup className="btn-group-width-100">
              <MDBDropdown dropup>
                <MDBDropdownToggle
                  caret
                  outline color="blue-grey"
                  size="sm"
                  className="width-141"
                >
                  mark
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem onClick={this.markTask(1)}>
                    <MDBIcon
                      far
                      size="xs"
                      icon="circle"
                      className="mr-2 icon-red"
                     />
                    High priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(2)}>
                    <MDBIcon
                      far
                      size="xs"
                      icon="circle"
                      className="mr-2 icon-orange"
                    />
                    Medium priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(3)}>
                    <MDBIcon
                      far
                      size="xs"
                      icon="circle"
                      className="mr-2 icon-grey"
                    />
                    Low priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(4)}>
                    <MDBIcon
                      far
                      size="xs"
                      icon="circle"
                      className="mr-2 icon-transparent"
                    />
                    No mark
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              <MDBDropdown dropup>
                <MDBDropdownToggle
                  caret
                  outline
                  color="blue-grey"
                  size="sm"
                  className="width-141"
                >
                  migrate to
                </MDBDropdownToggle>
                <MDBDropdownMenu basic className="dropdown-left-30">
                  {this.props.logType !== 'future' && (
                    <MDBDropdownItem onClick={this.migrateToFutureLog}>
                      Future Log
                    </MDBDropdownItem>
                  )}
                  <MDBDropdownItem onClick={this.setMigrateData('monthly')}>
                    Monthly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setMigrateData('weekly')}>
                    Weekly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setMigrateData('daily')}>
                    Daily Log
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBBtnGroup>
            <MDBBtnGroup className="btn-group-width-100">
              <MDBBtn
                outline color="blue-grey"
                size="sm"
                disabled={!isTaskChanged || !text.trim()}
                className="edit-task-btn"
                onClick={this.onSave}
              >
                save
              </MDBBtn>
            </MDBBtnGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
