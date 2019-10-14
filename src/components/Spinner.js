import React from 'react';

export default function Spinner(props) {
  return (
    <>
      {!!props.logsState.pendingRequests && (
        <div className="fullscreen-mask">
          <div className="spinner-border text-info" role="status" />
        </div>
      )}
    </>
  );
}
