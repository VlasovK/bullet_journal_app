import React from 'react';

export default class Spinner extends React.Component {
  render() {
    return (
      <>
        {!!this.props.logsState.pendingRequests && (
          <div className="fullscreen-mask">
            <div className="spinner-border text-info" role="status" />
          </div>
        )}
      </>
    );
  }
}
