import React from 'react';

export default class Spinner extends React.Component {
  render() {
    if (!this.props.logsState.futureLog.isPending
      || !this.props.logsState.monthlyLog.isPending
      || !this.props.logsState.weeklyLog.isPending
      || !this.props.logsState.dailyLog.isPending)
      return null;
    return (
      <div className="fullscreen-mask">
        <div className="spinner-border text-info" role="status" />
      </div>
    );
  }
}
