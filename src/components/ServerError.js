import React from 'react';

export default class ServerError extends React.Component {
  render() {
    return (
      <>
        {this.props.logsState.serverError && (
          <div className="table server-error-wrapper animated fadeIn">
            <h1 className="server-error">
              <b className="tomato-error">server error:</b> Something went wrong
            </h1>
          </div>
        )}
      </>
    );
  }
}
