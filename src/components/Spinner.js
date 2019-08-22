import React from 'react';

export default class Spinner extends React.Component {
  render() {
    if (!this.props.logsState.futureLog.isPending
      || !this.props.logsState.monthlyLog.isPending
      || !this.props.logsState.weeklyLog.isPending
      || !this.props.logsState.dailyLog.isPending)
      return null;

    return null; // loader temporarily disabled
    return (
      <div className="spiner-fullscreen-mask">
        <div class="spinner-border text-info" role="status" />
      </div>
    );
  }
}
