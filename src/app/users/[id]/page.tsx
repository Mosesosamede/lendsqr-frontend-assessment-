'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User as UserIcon, Star } from 'lucide-react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { User } from '../../../types/user';
import { api } from '../../../lib/api';
import { useAuth } from '../../../features/auth/AuthContext';

const UserDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const STORAGE_KEY = `user_cache_${id}`;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id || !isAuthenticated) return;

      // 1. Check localStorage first for immediate UI
      const cachedData = localStorage.getItem(STORAGE_KEY);
      if (cachedData) {
        try {
          setUser(JSON.parse(cachedData));
          setLoading(false); 
        } catch (e) {
          console.error('Failed to parse cached user data');
        }
      }

      try {
        // 2. Fetch fresh data from API
        const freshUser = await api.getUserById(id);
        setUser(freshUser);
        // 3. Update localStorage cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(freshUser));
        setError(null);
      } catch (err: any) {
        if (!user) {
          setError(err.message || 'Failed to fetch user details');
        }
        console.error('API Sync Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, isAuthenticated]);

  if (authLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!isAuthenticated) return null;

  if (loading && !user) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">Loading user details...</div>
      </DashboardLayout>
    );
  }

  if (error && !user) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="user-details-page">
        <button className="back-link" onClick={() => router.back()}>
          <ArrowLeft size={16} />
          <span>Back to Users</span>
        </button>

        <div className="header-actions">
          <h2 className="page-title">User Details</h2>
          <div className="action-btns">
            <button className="blacklist-btn">BLACKLIST USER</button>
            <button className="activate-btn">ACTIVATE USER</button>
          </div>
        </div>

        <div className="user-summary-card">
          <div className="main-info">
            <div className="avatar-section">
              <div className="avatar-circle">
                <UserIcon size={40} color="#213F7D" />
              </div>
              <div className="name-id">
                <h3>{user.full_name}</h3>
                <p>{user.id}</p>
              </div>
            </div>
            
            <div className="divider" />
            
            <div className="user-tier">
              <p>User's Tier</p>
              <div className="stars">
                <Star size={14} fill={true ? "#E9B200" : "none"} color="#E9B200" />
                <Star size={14} fill={true ? "#E9B200" : "none"} color="#E9B200" />
                <Star size={14} fill={false ? "#E9B200" : "none"} color="#E9B200" />
              </div>
            </div>
            
            <div className="divider" />
            
            <div className="user-balance">
              <h3>₦{Number(user.account_balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
              <p>{user.account_number || 'N/A'}/Providus Bank</p>
            </div>
          </div>
          
          <div className="tabs">
            <button className="tab active">General Details</button>
            <button className="tab">Documents</button>
            <button className="tab">Bank Details</button>
            <button className="tab">Loans</button>
            <button className="tab">Savings</button>
            <button className="tab">App and System</button>
          </div>
        </div>

        <div className="details-container">
          <section className="details-section">
            <h4>Personal Information</h4>
            <div className="info-grid">
              <div className="info-item">
                <p className="label">FULL NAME</p>
                <p className="value">{user.full_name}</p>
              </div>
              <div className="info-item">
                <p className="label">PHONE NUMBER</p>
                <p className="value">{user.phone_number}</p>
              </div>
              <div className="info-item">
                <p className="label">EMAIL ADDRESS</p>
                <p className="value">{user.email}</p>
              </div>
              <div className="info-item">
                <p className="label">BVN</p>
                <p className="value">{user.bvn || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">GENDER</p>
                <p className="value">{user.gender || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">MARITAL STATUS</p>
                <p className="value">{user.marital_status || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">CHILDREN</p>
                <p className="value">None</p>
              </div>
              <div className="info-item">
                <p className="label">TYPE OF RESIDENCE</p>
                <p className="value">{user.residential_address || 'N/A'}</p>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h4>Education and Employment</h4>
            <div className="info-grid">
              <div className="info-item">
                <p className="label">LEVEL OF EDUCATION</p>
                <p className="value">{user.education_level || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">EMPLOYMENT STATUS</p>
                <p className="value">{user.employment_status || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">SECTOR OF EMPLOYMENT</p>
                <p className="value">FinTech</p>
              </div>
              <div className="info-item">
                <p className="label">DURATION OF EMPLOYMENT</p>
                <p className="value">2 years</p>
              </div>
              <div className="info-item">
                <p className="label">OFFICE EMAIL</p>
                <p className="value">{user.email}</p>
              </div>
              <div className="info-item">
                <p className="label">MONTHLY INCOME</p>
                <p className="value">₦200,000.00- ₦400,000.00</p>
              </div>
              <div className="info-item">
                <p className="label">LOAN REPAYMENT</p>
                <p className="value">{user.loan_repayment?.toLocaleString()}</p>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h4>Socials</h4>
            <div className="info-grid">
              <div className="info-item">
                <p className="label">TWITTER</p>
                <p className="value">{user.social_twitter || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">FACEBOOK</p>
                <p className="value">{user.social_facebook || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">INSTAGRAM</p>
                <p className="value">{user.social_instagram || 'N/A'}</p>
              </div>
            </div>
          </section>

          <section className="details-section">
            <h4>Guarantor</h4>
            <div className="info-grid">
              <div className="info-item">
                <p className="label">FULL NAME</p>
                <p className="value">{user.guarantor_name || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">PHONE NUMBER</p>
                <p className="value">{user.guarantor_phone || 'N/A'}</p>
              </div>
              <div className="info-item">
                <p className="label">EMAIL ADDRESS</p>
                <p className="value">N/A</p>
              </div>
              <div className="info-item">
                <p className="label">RELATIONSHIP</p>
                <p className="value">{user.guarantor_relationship || 'N/A'}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetailPage;
