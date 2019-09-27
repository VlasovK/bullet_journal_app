import React from 'react';

export default class Error extends React.Component {
  render() {
    return (
      <div className="table animated fadeIn">
        <h1 className="server-error">
          <b className="tomato-error">server error: </b>{this.props.error}
        </h1>
      </div>
    );
  }
}
