import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarIconProps {
  label: string;
}

const ChevronDownSvg: React.FC<{ size?: number; className?: string }> = ({ size = 14, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '0.5rem', opacity: 0.7 }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const XSvg: React.FC<{ size?: number; onClick?: () => void }> = ({ size = 24, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
    style={{ cursor: 'pointer', display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const SidebarIcon: React.FC<SidebarIconProps> = ({ label }) => {
  // Normalize key to handle any subtle differences
  const normalizedLabel = label.trim().toLowerCase()
    .replace('&', 'and')
    .replace('accounts', 'account')
    .replace('pricings', 'pricing');

  const filename = React.useMemo(() => {
    switch (normalizedLabel) {
      case 'switch organization':
        return 'briefcase 1.png';
      case 'dashboard':
        return 'home 1.png';
      case 'users':
        return 'user-friends 1.png';
      case 'guarantors':
        return 'users 1.png';
      case 'loans':
        return 'sack 1.png';
      case 'decision models':
        return 'handshake-regular 1.png';
      case 'savings':
        return 'piggy-bank 1.png';
      case 'loan requests':
        return 'Group 104.png';
      case 'whitelist':
        return 'user-check 1.png';
      case 'karma':
        return 'user-times 1.png';
      case 'organization':
        return 'briefcase 1.png';
      case 'loan products':
        return 'Group 104.png';
      case 'savings products':
        return 'np_bank_148501_000000 1.png';
      case 'fees and charges':
      case 'fees & charges':
        return 'coins-solid 1.png';
      case 'transactions':
        return 'icon.png';
      case 'services':
        return 'galaxy 1.png';
      case 'service account':
      case 'service accounts':
        return 'users 1.png';
      case 'settlements':
        return 'scroll 1.png';
      case 'reports':
        return 'chart-bar 2.png';
      case 'preferences':
        return 'sliders-h 1.png';
      case 'fees and pricing':
      case 'fees & pricing':
        return 'badge-percent 1.png';
      case 'audit logs':
        return 'filter-results-button.png';
      default:
        return null;
    }
  }, [normalizedLabel]);

  if (!filename) return null;

  const url = `https://jrwptnalqevxqenwipvn.supabase.co/storage/v1/object/public/lendsqr-assesement/icon/${encodeURIComponent(filename)}`;

  // Determine standard dimension to preserve exact aspect ratios from original design
  let width = 16;
  let height = 16;

  switch (normalizedLabel) {
    case 'dashboard':
      width = 16;
      height = 14.22;
      break;
    case 'users':
    case 'guarantors':
    case 'whitelist':
    case 'karma':
    case 'service account':
    case 'service accounts':
    case 'settlements':
      width = 16;
      height = 12.8;
      break;
    case 'decision models':
      width = 19;
      height = 15.2;
      break;
    case 'savings':
      width = 16;
      height = 14.22;
      break;
    case 'loan requests':
    case 'loan products':
      width = 18;
      height = 22;
      break;
    case 'transactions':
      width = 16;
      height = 18;
      break;
    case 'audit logs':
      width = 16;
      height = 16;
      break;
  }

  return (
    <img
      src={url}
      alt={label}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
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
          <XSvg size={24} onClick={closeSidebar} />
        </div>
        
        <div className="switch-org">
          <SidebarIcon label="Switch Organization" />
          <span>Switch Organization</span>
          <ChevronDownSvg size={14} />
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
