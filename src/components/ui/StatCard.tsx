/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, iconBg }) => {
  return (
    <div className="stat-card">
      <div className="icon-box" style={{ backgroundColor: iconBg }}>
        {icon}
      </div>
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
};

export default StatCard;
