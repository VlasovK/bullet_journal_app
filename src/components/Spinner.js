import React from 'react';

export default class Spinner extends React.Component {
  render() {
    let {futureLog, monthlyLog, weeklyLog, dailyLog, migrateTaskInPending}
      = this.props.logsState;
    if (!futureLog.isPending && !monthlyLog.isPending && !weeklyLog.isPending
      && !dailyLog.isPending && !migrateTaskInPending)
        return null;
    return (
      <div className="fullscreen-mask">
        <div className="spinner-border text-info" role="status" />
      </div>
    );
  }
}
