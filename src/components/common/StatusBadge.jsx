import React from 'react';

const StatusBadge = ({ status }) => {
  const colors = {
    approved: 'badge-success',
    active: 'badge-success',
    pending: 'badge-warning',
    rejected: 'badge-danger',
    inactive: 'badge-neutral',
    frozen: 'badge-neutral',
  };

  const colorClass = colors[status] || 'badge-neutral';

  return <span className={`badge ${colorClass}`}>{status}</span>;
};

export default StatusBadge;