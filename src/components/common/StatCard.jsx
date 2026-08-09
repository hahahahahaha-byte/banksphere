import React from 'react';

const StatCard = ({ title, value, icon, color = 'primary' }) => {
  const iconClass = `metric-icon-${color}`;
  return (
    <div className="metric-card">
      <div className={`metric-icon-container ${iconClass}`}>{icon}</div>
      <div className="metric-content">
        <h6>{title}</h6>
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;