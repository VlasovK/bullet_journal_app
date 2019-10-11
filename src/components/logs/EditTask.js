import React from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtnGroup,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact';

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {},
      isTaskChanged: false,
      style: ''
    };
  }
  componentDidMount() {
    this.setState({task: this.props.logsState.currentTask});
    document.getElementById('edit-task').scrollIntoView({block: 'nearest'});
  }
  handleTextArea = (event) => {
    this.setState({
      task: {...this.state.task, text: event.target.value},
      isTaskChanged: true
    });
  };
  markTask = (mark) => () => {
    this.setState({
      task: {...this.state.task, mark},
      isTaskChanged: true
    });
  };
  onSave = () => {
    this.props.editTask(this.state.task);
    this.props.setCurrentTask({});
  };
  onDone = () => {
    let task = {
      ...this.state.task,
      status: 3,
      inProgress: false
    };
    this.props.editTask(task);
    this.props.setCurrentTask({});
  };
  onNotDone = () => {
    let task = {
      ...this.state.task,
      status: 1,
      inProgress: false
    };
    this.props.editTask(task);
    this.props.setCurrentTask({});
  };
  onInProgress = () => {
    let task = {
      ...this.state.task,
      status: 1,
      inProgress: true
    };
    this.props.editTask(task);
    this.props.setCurrentTask({});
  };
  onNotInProgress = () => {
    this.onNotDone();
  };
  onDelete = (id) => () => {
    this.props.deleteTask(id);
    this.props.setCurrentTask({});
  };
  setTaskToMigrate = (newMigrateLogType) => () => {
    let {logType} = this.props;
    let {task} = this.state;
    this.props.setTaskToMigrate({logType, task}, newMigrateLogType);
    if (newMigrateLogType === 'future') {
      this.props.migrateTask();
    } else {
      this.props.toggleMigrateDatepicker(newMigrateLogType);
    }
  };
  onCancel = () => {
    this.props.setCurrentTask({});
  };
  render() {
    let {
      isTaskChanged,
      task: {
        mark,
        status,
        text,
        inProgress,
        id
      }
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
                  onClick={this.onDone}
                >
                  done
                </MDBBtn>
              )}
              {isDone && (
                <MDBBtn
                  outline color="blue-grey"
                  size="sm"
                  className="edit-task-btn"
                  onClick={this.onNotDone}
                >
                  not done
                </MDBBtn>
              )}
              {!inProgress && (
                <MDBBtn
                  outline color="blue-grey"
                  size="sm"
                  className="edit-task-btn"
                  onClick={this.onInProgress}
                >
                in progress
                </MDBBtn>
              )}
              {inProgress && (
                <MDBBtn
                  outline color="blue-grey"
                  size="sm"
                  className="edit-task-btn"
                  onClick={this.onNotInProgress}
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
                    <MDBDropdownItem onClick={this.setTaskToMigrate('future')}>
                      Future Log
                    </MDBDropdownItem>
                  )}
                  <MDBDropdownItem onClick={this.setTaskToMigrate('monthly')}>
                    Monthly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setTaskToMigrate('weekly')}>
                    Weekly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setTaskToMigrate('daily')}>
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
