import React from 'react';

const Notification = ({ message, isSuccess }) => {
  const alertClass = isSuccess ? 'alert-success' : 'alert-danger';

  return (
    <div className={`alert ${alertClass}` } role="alert">
      {message}
    </div>
  );
};

export default Notification;

