import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    const { count: totalCount, error: totalError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    const { count: activeCount, error: activeError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'Active');

    const { count: loanCount, error: loanError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gt('loan_repayment', 0);

    const { count: savingsCount, error: savingsError } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gt('account_balance', 0);

    if (totalError || activeError || loanError || savingsError) {
      throw new Error('Failed to fetch statistics');
    }

    return NextResponse.json({
      totalUsers: totalCount || 0,
      activeUsers: activeCount || 0,
      usersWithLoans: loanCount || 0,
      usersWithSavings: savingsCount || 0
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch statistics' }, { status: 500 });
  }
}
