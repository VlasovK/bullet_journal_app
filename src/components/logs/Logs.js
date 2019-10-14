import React from 'react';
import MigrateDatepickerContainer
  from '../../containers/MigrateDatepickerContainer';
import FutureLogContainer from '../../containers/logs/FutureLogContainer';
import MonthlyLogContainer from '../../containers/logs/MonthlyLogContainer';
import WeeklyLogContainer from '../../containers/logs/WeeklyLogContainer';
import DailyLogContainer from '../../containers/logs/DailyLogContainer';

export default class Logs extends React.Component {
  componentDidMount() {
    this.props.getTasks();
  }
  render() {
    return (
      <div className="table">
        {this.props.workspaceState.isMigrateDatepickerShown && (
          <MigrateDatepickerContainer />
        )}
        <div className="logs-wrapper">
          <FutureLogContainer logType={'future'} />
          <MonthlyLogContainer logType={'monthly'} />
          <WeeklyLogContainer logType={'weekly'} />
          <DailyLogContainer logType={'daily'} />
        </div>
      </div>
    );
  }
}
