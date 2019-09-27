import React from 'react';
import Error from './Error';
import MigrateDatepickerContainer
  from '../containers/MigrateDatepickerContainer';
import FutureLogContainer from '../containers/logs/FutureLogContainer';
import MonthlyLogContainer from '../containers/logs/MonthlyLogContainer';
import WeeklyLogContainer from '../containers/logs/WeeklyLogContainer';
import DailyLogContainer from '../containers/logs/DailyLogContainer';
import NotesContainer from '../containers/notes/NotesContainer';

export default class Workspace extends React.Component {
  render() {
    let {workspaceState: {isMyLogsShown, isNotesShown}, logsState: {error}}
      = this.props;
    if (error)
      return <Error error={error} />;
    return (
      <div className="table">
        <MigrateDatepickerContainer />
        {isMyLogsShown &&
          <div className="logs-wrapper">
            <FutureLogContainer />
            <MonthlyLogContainer />
            <WeeklyLogContainer />
            <DailyLogContainer />
          </div>
        }
        {isNotesShown && <NotesContainer />}
      </div>
    );
  }
}
