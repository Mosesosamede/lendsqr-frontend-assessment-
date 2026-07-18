/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Users, UserRoundCheck, HandCoins, PiggyBank } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import UserTable from '../../components/users/UserTable';
import { User, UserStats } from '../../types/user';
import { api, UsersResponse } from '../../lib/api';

const DashboardPage: React.FC = () => {
  const [usersData, setUsersData] = useState<UsersResponse | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    organization: '',
    username: '',
    email: '',
    phone_number: '',
    date_joined: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, statsRes] = await Promise.all([
          api.getUsers(filters),
          api.getStats()
        ]);
        setUsersData(usersRes);
        setStats(statsRes);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (newLimit: number) => {
    setFilters(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleFilter = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="error-container p-8 text-center">
          <h2 className="text-red-500 text-xl font-bold">Error</h2>
          <p className="mt-2">{error}</p>
          <button 
            onClick={() => setFilters({ ...filters })}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <h2 className="page-title">Users</h2>

        <div className="stat-cards-grid">
          <StatCard 
            icon={<Users color="#DF18FF" />} 
            label="Users" 
            value={stats?.totalUsers.toLocaleString() || '...'} 
            iconBg="rgba(223, 24, 255, 0.1)" 
          />
          <StatCard 
            icon={<UserRoundCheck color="#5718FF" />} 
            label="Active Users" 
            value={stats?.activeUsers.toLocaleString() || '...'} 
            iconBg="rgba(87, 24, 255, 0.1)" 
          />
          <StatCard 
            icon={<HandCoins color="#F55F44" />} 
            label="Users with Loans" 
            value={stats?.usersWithLoans.toLocaleString() || '...'} 
            iconBg="rgba(245, 95, 68, 0.1)" 
          />
          <StatCard 
            icon={<PiggyBank color="#FF3366" />} 
            label="Users with Savings" 
            value={stats?.usersWithSavings.toLocaleString() || '...'} 
            iconBg="rgba(255, 51, 102, 0.1)" 
          />
        </div>

        {loading && !usersData ? (
          <div className="loading-container p-8 text-center">Loading users...</div>
        ) : (
          <UserTable 
            users={usersData?.data || []} 
            pagination={usersData?.pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
            onFilter={handleFilter}
            isLoading={loading}
            currentFilters={filters}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
