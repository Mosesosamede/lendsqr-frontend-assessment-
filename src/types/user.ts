/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserStatus {
  INACTIVE = 'Inactive',
  PENDING = 'Pending',
  BLACKLISTED = 'Blacklisted',
  ACTIVE = 'Active',
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  username: string;
  organization: string;
  bvn?: string;
  account_number?: string;
  account_balance: number;
  loan_repayment: number;
  status: UserStatus;
  gender?: string;
  marital_status?: string;
  employment_status?: string;
  residential_address?: string;
  education_level?: string;
  guarantor_name?: string;
  guarantor_phone?: string;
  guarantor_relationship?: string;
  social_twitter?: string;
  social_facebook?: string;
  social_instagram?: string;
  date_joined: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}
