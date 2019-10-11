import React from 'react';
import {
  MDBIcon,
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        text: '',
        mark: 4, // priority: 1=high, 2=middle, 3=low, 4=none
        status: 1, // 1=active, 3=done
      },
      isTaskChanged: false
    };
  }
  componentDidMount() {
    let {logType, logsState: {dates}} = this.props;
    let currentLogDate = dates[logType].format('L');
    document.getElementById('new-task').scrollIntoView({block: 'nearest'});
    this.setState({
      task: {
        ...this.state.task,
        date: currentLogDate,
        logType,
      }
    });
  }
  handleTextArea = (event) => {
    this.setState({
      task: {...this.state.task, text: event.target.value},
      isTaskChanged: true
    });
  };
  markTask = (mark) => () => {
    this.setState({task: {...this.state.task, mark}});
  };
  onSave = () => {
    this.props.saveNewTask(this.state.task);
    this.props.closeNewTask();
  };
  onCancel = () => {
    this.props.closeNewTask();
  };
  render() {
    let {
      isTaskChanged,
      task: {mark, text}
    } = this.state;
    return (
      <MDBContainer id="new-task">
        <MDBCard>
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
              <MDBBtn
                outline
                color="blue-grey"
                size="sm"
                disabled={!isTaskChanged || !text.trim()}
                className="edit-task-btn"
                onClick={this.onSave}
              >
                save
              </MDBBtn>
              <MDBDropdown dropup>
                <MDBDropdownToggle caret outline color="blue-grey" size="sm">
                  mark
                </MDBDropdownToggle>
                <MDBDropdownMenu basic className="dropdown-left-100">
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
            </MDBBtnGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
