import React from "react";
import { useSelector } from "react-redux";

function Alerts() {
  const alerts = useSelector((state) => state.alerts);
  return (
    <div>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <i className="fas fa-info-circle" /> {alert.msg}
          </div>
        ))}
    </div>
  );
}

export default Alerts;
