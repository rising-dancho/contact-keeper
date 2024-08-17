import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => {
      const { type, msg } = alert;
      return (
        <div key={alert.id} className={`alert alert-${type}`}>
          <i className="fas fa-info-circle" />
          &nbsp;&nbsp;{msg}
        </div>
      );
    })
  );
};

export default Alerts;
