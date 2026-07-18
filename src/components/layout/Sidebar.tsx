/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ChevronDown, 
  Home,
  UserCog,
  ClipboardList,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarIconProps {
  label: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ label }) => {
  // Normalize key to handle any subtle differences
  const normalizedLabel = label.trim().toLowerCase()
    .replace('&', 'and')
    .replace('accounts', 'account')
    .replace('pricings', 'pricing');

  const config = React.useMemo(() => {
    switch (normalizedLabel) {
      case 'switch organization':
        return { src: '/assets/icons/briefcase 1.png', width: 16, height: 16, alt: 'Switch Organization' };
      case 'dashboard':
        return { icon: Home, width: 16, height: 14.22, alt: 'Dashboard' };
      case 'users':
        return { src: '/assets/icons/user-friends 1.png', width: 16, height: 12.8, alt: 'Users' };
      case 'guarantors':
        return { src: '/assets/icons/users 1.png', width: 16, height: 12.8, alt: 'Guarantors' };
      case 'loans':
        return { src: '/assets/icons/sack 1.png', width: 16, height: 16, alt: 'Loans' };
      case 'decision models':
        return { src: '/assets/icons/handshake-regular 1.png', width: 19, height: 15.2, alt: 'Decision Models' };
      case 'savings':
        return { src: '/assets/icons/piggy-bank 1.png', width: 16, height: 14.22, alt: 'Savings' };
      case 'loan requests':
        return { src: '/assets/icons/Group 104.png', width: 18, height: 22, alt: 'Loan Requests' };
      case 'whitelist':
        return { src: '/assets/icons/user-check 1.png', width: 16, height: 12.8, alt: 'Whitelist' };
      case 'karma':
        return { src: '/assets/icons/user-times 1.png', width: 16, height: 12.8, alt: 'Karma' };
      case 'organization':
        return { src: '/assets/icons/briefcase 1.png', width: 16, height: 16, alt: 'Organization' };
      case 'loan products':
        return { src: '/assets/icons/Group 104.png', width: 18, height: 22, alt: 'Loan Products' };
      case 'savings products':
        return { src: '/assets/icons/np_bank_148501_000000 1.png', width: 16, height: 16, alt: 'Savings Products' };
      case 'fees and charges':
      case 'fees & charges':
        return { src: '/assets/icons/coins-solid 1.png', width: 16, height: 16, alt: 'Fees & Charges' };
      case 'transactions':
        return { src: '/assets/icons/icon.png', width: 16, height: 18, alt: 'Transactions' };
      case 'services':
        return { src: '/assets/icons/galaxy 1.png', width: 16, height: 16, alt: 'Services' };
      case 'service account':
      case 'service accounts':
        return { icon: UserCog, width: 16, height: 12.8, alt: 'Service Accounts' };
      case 'settlements':
        return { src: '/assets/icons/scroll 1.png', width: 16, height: 12.8, alt: 'Settlements' };
      case 'reports':
        return { src: '/assets/icons/chart-bar 2.png', width: 16, height: 16, alt: 'Reports' };
      case 'preferences':
        return { src: '/assets/icons/sliders-h 1.png', width: 16, height: 16, alt: 'Preferences' };
      case 'fees and pricing':
      case 'fees & pricing':
        return { src: '/assets/icons/badge-percent 1.png', width: 16, height: 16, alt: 'Fees & Pricing' };
      case 'audit logs':
        return { icon: ClipboardList, width: 16, height: 21.33, alt: 'Audit Logs' };
      default:
        return null;
    }
  }, [normalizedLabel]);

  if (!config) return null;

  if (config.src) {
    return (
      <img
        src={config.src}
        alt={config.alt}
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          objectFit: 'contain',
          display: 'block'
        }}
      />
    );
  }

  if (config.icon) {
    const IconComponent = config.icon;
    return <IconComponent size={config.width} style={{ width: `${config.width}px`, height: `${config.height}px` }} />;
  }

  return null;
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  
  return (
    <Link href={to} className={`nav-item ${isActive ? 'active' : ''}`}>
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
    </Link>
  );
};

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <X size={24} onClick={closeSidebar} />
        </div>
        
        <div className="switch-org">
          <SidebarIcon label="Switch Organization" />
          <span>Switch Organization</span>
          <ChevronDown size={14} />
        </div>

        <div className="nav-section">
          <NavItem icon={<SidebarIcon label="Dashboard" />} label="Dashboard" to="/dashboard/home" />
        </div>

        <div className="nav-group">
          <h3 className="group-title">CUSTOMERS</h3>
          <NavItem icon={<SidebarIcon label="Users" />} label="Users" to="/dashboard" />
          <NavItem icon={<SidebarIcon label="Guarantors" />} label="Guarantors" to="/dashboard/guarantors" />
          <NavItem icon={<SidebarIcon label="Loans" />} label="Loans" to="/dashboard/loans" />
          <NavItem icon={<SidebarIcon label="Decision Models" />} label="Decision Models" to="/dashboard/models" />
          <NavItem icon={<SidebarIcon label="Savings" />} label="Savings" to="/dashboard/savings" />
          <NavItem icon={<SidebarIcon label="Loan Requests" />} label="Loan Requests" to="/dashboard/requests" />
          <NavItem icon={<SidebarIcon label="Whitelist" />} label="Whitelist" to="/dashboard/whitelist" />
          <NavItem icon={<SidebarIcon label="Karma" />} label="Karma" to="/dashboard/karma" />
        </div>

        <div className="nav-group">
          <h3 className="group-title">BUSINESSES</h3>
          <NavItem icon={<SidebarIcon label="Organization" />} label="Organization" to="/dashboard/org" />
          <NavItem icon={<SidebarIcon label="Loan Products" />} label="Loan Products" to="/dashboard/loan-products" />
          <NavItem icon={<SidebarIcon label="Savings Products" />} label="Savings Products" to="/dashboard/savings-products" />
          <NavItem icon={<SidebarIcon label="Fees and Charges" />} label="Fees and Charges" to="/dashboard/fees" />
          <NavItem icon={<SidebarIcon label="Transactions" />} label="Transactions" to="/dashboard/transactions" />
          <NavItem icon={<SidebarIcon label="Services" />} label="Services" to="/dashboard/services" />
          <NavItem icon={<SidebarIcon label="Service Account" />} label="Service Account" to="/dashboard/service-account" />
          <NavItem icon={<SidebarIcon label="Settlements" />} label="Settlements" to="/dashboard/settlements" />
          <NavItem icon={<SidebarIcon label="Reports" />} label="Reports" to="/dashboard/reports" />
        </div>

        <div className="nav-group">
          <h3 className="group-title">SETTINGS</h3>
          <NavItem icon={<SidebarIcon label="Preferences" />} label="Preferences" to="/dashboard/preferences" />
          <NavItem icon={<SidebarIcon label="Fees and Pricing" />} label="Fees and Pricing" to="/dashboard/pricing" />
          <NavItem icon={<SidebarIcon label="Audit Logs" />} label="Audit Logs" to="/dashboard/audit" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
