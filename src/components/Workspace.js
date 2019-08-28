import React from 'react';
import Error from './Error';
import MigrateDatepickerContainer from '../containers/MigrateDatepickerContainer';
import FutureLogContainer from '../containers/logs/FutureLogContainer';
import MonthlyLogContainer from '../containers/logs/MonthlyLogContainer';
import WeeklyLogContainer from '../containers/logs/WeeklyLogContainer';
import DailyLogContainer from '../containers/logs/DailyLogContainer';

export default class Workspace extends React.Component {
  render() {
    let {isMyLogsShown} = this.props.workspaceState;
    if (this.props.logsState.error) {
      return (
        <Error error={this.props.logsState.error} />
      );
    }
    return (
      <div className="table">
        <MigrateDatepickerContainer />
        {isMyLogsShown &&
          <>
            <FutureLogContainer />
            <MonthlyLogContainer />
            <WeeklyLogContainer />
            <DailyLogContainer />
          </>}
      </div>
    );
  }
}
