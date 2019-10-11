import React from 'react';

export default class Spinner extends React.Component {
  render() {
    if (!this.props.logsState.pendingRequests) {
      return null;
    }
    return (
      <div className="fullscreen-mask">
        <div className="spinner-border text-info" role="status" />
      </div>
    );
  }
}
