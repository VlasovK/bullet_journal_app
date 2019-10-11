import React from 'react';
import Error from '../Error';
import MigrateDatepickerContainer from '../../containers/MigrateDatepickerContainer';
import FutureLogContainer from '../../containers/logs/FutureLogContainer';
import MonthlyLogContainer from '../../containers/logs/MonthlyLogContainer';
import WeeklyLogContainer from '../../containers/logs/WeeklyLogContainer';
import DailyLogContainer from '../../containers/logs/DailyLogContainer';

export default class Logs extends React.Component {
  componentDidMount() {
    this.props.getTasks();
  }
  render() {
    if (this.props.logsState.error) {
      return <Error error={this.props.logsState.error} />;
    }
    return (
      <div className="table">
        <MigrateDatepickerContainer />
        <div className="logs-wrapper">
          <FutureLogContainer />
          <MonthlyLogContainer />
          <WeeklyLogContainer />
          <DailyLogContainer />
        </div>
      </div>
    );
  }
}
