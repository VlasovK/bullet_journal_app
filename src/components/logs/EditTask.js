import React from 'react';
import ReactDOM from 'react-dom';
import {MDBContainer, MDBCard, MDBCardBody, MDBIcon, MDBBtnGroup, MDBBtn,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdbreact';

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
    this.setState({task: this.props.logsState.currentLogTask});
    document.getElementById('edit-task').scrollIntoView({block: "nearest"});
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
    this.props.setCurrentLogTask({});
  };
  onDone = ()=>{
    let task = {...this.state.task, status: 3};
    this.props.editTask(task);
    this.props.setCurrentLogTask({});
  };
  onNotDone = ()=>{
    let task = {...this.state.task, status: 1};
    this.props.editTask(task);
    this.props.setCurrentLogTask({});
  };
  onDelete = id=>()=>{
    this.props.deleteTask(id);
    this.props.setCurrentLogTask({});
  };
  // set task, current migrateDate and current logType for migrate
  setTaskToMigrate = newMigrateLogType=>()=>{
    let {logType} = this.props;
    let {task} = this.state;
    this.props.setTaskToMigrate({logType, task}, newMigrateLogType);
    if (newMigrateLogType === 'futureLog')
      this.props.migrateTask();
    else
      this.props.toggleMigrateDatepicker(newMigrateLogType);
  };
  onCancel = ()=>{
    this.props.setCurrentLogTask({});
  };
  render() {
    let isDone = this.state.task.status === 3;
    return (
      <MDBContainer id="edit-task">
        <MDBCard className="mb-2">
          <MDBCardBody>
            <MDBIcon
              icon="times"
              className="edit-task-close-icon"
              onClick={this.onCancel} />
            <div className={`status-line status-line-top mark-${this.state.task.mark}`} />
            <div className="form-group mb-12">
              <textarea
                className="form-control"
                autoFocus rows="5"
                value={this.state.task.text}
                onChange={this.handleTextArea} />
            </div>
            <MDBBtnGroup className="btn-group-width-100">
              {!isDone &&
                <MDBBtn
                  outline color="blue-grey" size="sm"
                  className="edit-task-btn"
                  onClick={this.onDone}>
                  done
                </MDBBtn>}
              {isDone &&
                <MDBBtn
                  outline color="blue-grey" size="sm"
                  className="edit-task-btn"
                  onClick={this.onNotDone}>
                  not done
                </MDBBtn>}
              <MDBDropdown dropup>
                <MDBDropdownToggle caret outline color="blue-grey" size="sm">
                  mark
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem onClick={this.markTask(1)}>
                    <MDBIcon far size="xs" icon="circle" className="mr-2 icon-red" />
                    High priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(2)}>
                    <MDBIcon far size="xs" icon="circle" className="mr-2 icon-orange" />
                    Medium priority
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.markTask(3)}>
                    <MDBIcon far size="xs" icon="circle" className="mr-2 icon-grey" />
                    Low priority
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              <MDBBtn
                outline color="blue-grey" size="sm"
                className="edit-task-btn"
                onClick={this.onDelete(this.state.task.id)}>
                <span className="red-text">delete</span>
              </MDBBtn>
            </MDBBtnGroup>
            <MDBBtnGroup className="btn-group-width-100">
              <MDBBtn
                outline color="blue-grey" size="sm"
                disabled={!this.state.isTaskChanged || !this.state.task.text.trim()}
                className="edit-task-btn"
                onClick={this.onSave}>
                save
              </MDBBtn>
              <MDBDropdown dropup>
                <MDBDropdownToggle
                  caret outline
                  color="blue-grey"
                  size="sm">
                  migrate to
                </MDBDropdownToggle>
                <MDBDropdownMenu basic className="dropdown-left-50">
                  <MDBDropdownItem onClick={this.setTaskToMigrate('futureLog')}>
                    Future Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setTaskToMigrate('monthlyLog')}>
                    Monthly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setTaskToMigrate('weeklyLog')}>
                    Weekly Log
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={this.setTaskToMigrate('dailyLog')}>
                    Daily Log
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBBtnGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
