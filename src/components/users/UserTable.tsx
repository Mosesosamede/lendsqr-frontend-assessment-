/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { User, UserStatus } from '../../types/user';
import FilterPopup from './FilterPopup';
import UserActionMenu from './UserActionMenu';

const FilterIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px', flexShrink: 0 }}>
    <path d="M0 1H14" stroke="#545F7D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2.33331 6H11.6666" stroke="#545F7D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5.83331 11H8.16665" stroke="#545F7D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

interface UserTableProps {
  users: User[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onFilter: (filters: any) => void;
  isLoading?: boolean;
  currentFilters?: any;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  pagination, 
  onPageChange, 
  onLimitChange,
  onFilter,
  isLoading,
  currentFilters
}) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleFilter = (column: string) => {
    setActiveFilter(activeFilter === column ? null : column);
  };

  const toggleMenu = (userId: string) => {
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const getStatusClass = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ACTIVE: return 'status-active';
      case UserStatus.INACTIVE: return 'status-inactive';
      case UserStatus.PENDING: return 'status-pending';
      case UserStatus.BLACKLISTED: return 'status-blacklisted';
      default: return '';
    }
  };

  const renderPaginationButtons = () => {
    if (!pagination) return null;

    const { page, totalPages } = pagination;
    const buttons = [];

    // Simple pagination logic
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button 
            key={i} 
            className={`page-btn ${page === i ? 'active' : ''}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // More complex pagination with dots
      buttons.push(
        <button key={1} className={`page-btn ${page === 1 ? 'active' : ''}`} onClick={() => onPageChange(1)}>1</button>
      );

      if (page > 3) buttons.push(<span key="dots1" className="dots">...</span>);

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <button key={i} className={`page-btn ${page === i ? 'active' : ''}`} onClick={() => onPageChange(i)}>{i}</button>
        );
      }

      if (page < totalPages - 2) buttons.push(<span key="dots2" className="dots">...</span>);

      buttons.push(
        <button key={totalPages} className={`page-btn ${page === totalPages ? 'active' : ''}`} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
      );
    }

    return buttons;
  };

  return (
    <div className={`table-container ${isLoading ? 'opacity-50' : ''}`}>
      <table className="user-table">
        <thead>
          <tr>
            <th>
              <div className="header-cell" onClick={() => toggleFilter('organization')}>
                <span>ORGANIZATION</span>
                <FilterIcon />
              </div>
              {activeFilter === 'organization' && (
                <FilterPopup 
                  currentFilters={currentFilters}
                  align="left"
                  onClose={() => setActiveFilter(null)} 
                  onFilter={(f) => { onFilter(f); setActiveFilter(null); }} 
                />
              )}
            </th>
            <th>
              <div className="header-cell" onClick={() => toggleFilter('username')}>
                <span>USERNAME</span>
                <FilterIcon />
              </div>
              {activeFilter === 'username' && (
                <FilterPopup 
                  currentFilters={currentFilters}
                  align="left"
                  onClose={() => setActiveFilter(null)} 
                  onFilter={(f) => { onFilter(f); setActiveFilter(null); }} 
                />
              )}
            </th>
            <th>
              <div className="header-cell" onClick={() => toggleFilter('email')}>
                <span>EMAIL</span>
                <FilterIcon />
              </div>
              {activeFilter === 'email' && (
                <FilterPopup 
                  currentFilters={currentFilters}
                  align="left"
                  onClose={() => setActiveFilter(null)} 
                  onFilter={(f) => { onFilter(f); setActiveFilter(null); }} 
                />
              )}
            </th>
            <th>
              <div className="header-cell" onClick={() => toggleFilter('phone')}>
                <span>PHONE NUMBER</span>
                <FilterIcon />
              </div>
              {activeFilter === 'phone' && (
                <FilterPopup 
                  currentFilters={currentFilters}
                  align="left"
                  onClose={() => setActiveFilter(null)} 
                  onFilter={(f) => { onFilter(f); setActiveFilter(null); }} 
                />
              )}
            </th>
            <th>
              <div className="header-cell" onClick={() => toggleFilter('date')}>
                <span>DATE JOINED</span>
                <FilterIcon />
              </div>
              {activeFilter === 'date' && (
                <FilterPopup 
                  currentFilters={currentFilters}
                  align="right"
                  onClose={() => setActiveFilter(null)} 
                  onFilter={(f) => { onFilter(f); setActiveFilter(null); }} 
                />
              )}
            </th>
            <th>
              <div className="header-cell" onClick={() => toggleFilter('status')}>
                <span>STATUS</span>
                <FilterIcon />
              </div>
              {activeFilter === 'status' && (
                <FilterPopup 
                  currentFilters={currentFilters}
                  align="right"
                  onClose={() => setActiveFilter(null)} 
                  onFilter={(f) => { onFilter(f); setActiveFilter(null); }} 
                />
              )}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-8">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{new Date(user.date_joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                <td>
                  <span className={`status-pill ${getStatusClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn" onClick={() => toggleMenu(user.id)}>
                    <MoreVertical size={16} />
                  </button>
                  {activeMenu === user.id && (
                    <UserActionMenu userId={user.id} onClose={() => setActiveMenu(null)} />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && (
        <div className="pagination-container">
          <div className="showing-info">
            Showing 
            <select 
              value={pagination.limit} 
              onChange={(e) => onLimitChange(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            out of {pagination.total}
          </div>
          
          <div className="pagination-controls">
            <button 
              className="page-btn prev" 
              disabled={pagination.page === 1}
              onClick={() => onPageChange(pagination.page - 1)}
            >
              &lt;
            </button>
            {renderPaginationButtons()}
            <button 
              className="page-btn next"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
