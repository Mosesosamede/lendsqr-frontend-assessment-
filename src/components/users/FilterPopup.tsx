/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface FilterPopupProps {
  onClose: () => void;
  onFilter: (filters: any) => void;
  currentFilters?: any;
  align?: 'left' | 'right';
}

const ORGANIZATIONS = [
  'Lendsqr',
  'Irorun',
  'Lendstar',
  'PiggyVest',
  'Kuda',
  'Flutterwave',
  'Interswitch',
  'Moniepoint'
];

const STATUSES = [
  'Active',
  'Inactive',
  'Pending',
  'Blacklisted'
];

const FilterPopup: React.FC<FilterPopupProps> = ({ onClose, onFilter, currentFilters, align }) => {
  const [organization, setOrganization] = useState(currentFilters?.organization || '');
  const [username, setUsername] = useState(currentFilters?.username || '');
  const [email, setEmail] = useState(currentFilters?.email || '');
  const [dateJoined, setDateJoined] = useState(currentFilters?.date_joined || '');
  const [phoneNumber, setPhoneNumber] = useState(currentFilters?.phone_number || '');
  const [status, setStatus] = useState(currentFilters?.status || '');
  const [dateType, setDateType] = useState(currentFilters?.date_joined ? 'date' : 'text');

  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (target.closest('.header-cell')) {
          return;
        }
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      organization,
      username,
      email,
      date_joined: dateJoined,
      phone_number: phoneNumber,
      status
    });
  };

  const handleReset = () => {
    setOrganization('');
    setUsername('');
    setEmail('');
    setDateJoined('');
    setPhoneNumber('');
    setStatus('');
    setDateType('text');
    onFilter({
      organization: '',
      username: '',
      email: '',
      date_joined: '',
      phone_number: '',
      status: ''
    });
  };

  return (
    <motion.div
      className={`filter-popup ${align === 'right' ? 'align-right' : ''}`}
      ref={popupRef}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="filter-group">
          <label htmlFor="organization">Organization</label>
          <div className="select-container">
            <select
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className={!organization ? 'placeholder-style' : ''}
            >
              <option value="">Select</option>
              {ORGANIZATIONS.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="select-chevron" />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="User"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="date">Date</label>
          <div className="date-container">
            <input
              type={dateType}
              id="date"
              placeholder="Date"
              value={dateJoined}
              onChange={(e) => setDateJoined(e.target.value)}
              onFocus={() => setDateType('date')}
              onBlur={(e) => {
                if (!e.target.value) {
                  setDateType('text');
                }
              }}
              className={!dateJoined ? 'placeholder-style' : ''}
            />
            <Calendar size={16} className="date-icon" />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <div className="select-container">
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={!status ? 'placeholder-style' : ''}
            >
              <option value="">Select</option>
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="select-chevron" />
          </div>
        </div>

        <div className="filter-actions">
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="submit-btn">
            Filter
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FilterPopup;
