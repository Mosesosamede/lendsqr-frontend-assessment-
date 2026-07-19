/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

const logo = 'https://jrwptnalqevxqenwipvn.supabase.co/storage/v1/object/public/lendsqr-assesement/logo/logo.png';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="dashboard-header">
      <div className="mobile-menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </div>
      
      <div className="logo-container">
        <img src={logo} alt="Lendsqr" className="logo" />
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search for anything" />
        <button className="search-btn">
          <Search size={14} />
        </button>
      </div>

      <div className="header-actions">
        <a href="#docs" className="docs-link">Docs</a>
        <button className="notification-btn">
          <Bell size={20} />
        </button>
        <div className="user-profile">
          <div className="avatar-placeholder">
            <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
          </div>
          <span className="user-name">Adedeji</span>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  );
};

export default Header;
