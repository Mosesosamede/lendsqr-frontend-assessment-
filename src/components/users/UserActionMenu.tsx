/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, UserX, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserActionMenuProps {
  userId: string;
  onClose: () => void;
}

const UserActionMenu: React.FC<UserActionMenuProps> = ({ userId, onClose }) => {
  const router = useRouter();

  return (
    <div className="action-menu">
      <button className="menu-item" onClick={() => { router.push(`/users/${userId}`); onClose(); }}>
        <Eye size={16} />
        <span>View Details</span>
      </button>
      <button className="menu-item" onClick={() => { console.log('Blacklist', userId); onClose(); }}>
        <UserX size={16} />
        <span>Blacklist User</span>
      </button>
      <button className="menu-item" onClick={() => { console.log('Activate', userId); onClose(); }}>
        <UserCheck size={16} />
        <span>Activate User</span>
      </button>
    </div>
  );
};

export default UserActionMenu;
