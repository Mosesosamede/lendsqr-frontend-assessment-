import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const organization = searchParams.get('organization') || '';
    const username = searchParams.get('username') || '';
    const email = searchParams.get('email') || '';
    const phone_number = searchParams.get('phone_number') || '';
    const date_joined = searchParams.get('date_joined') || '';
    const sortField = searchParams.get('sortField') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const from = (Number(page) - 1) * Number(limit);
    const to = from + Number(limit) - 1;

    let query = supabase
      .from('users')
      .select('*', { count: 'exact' });

    // Apply filters
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone_number.ilike.%${search}%,username.ilike.%${search}%`);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (organization) {
      query = query.eq('organization', organization);
    }

    if (username) {
      query = query.ilike('username', `%${username}%`);
    }

    if (email) {
      query = query.ilike('email', `%${email}%`);
    }

    if (phone_number) {
      query = query.ilike('phone_number', `%${phone_number}%`);
    }

    if (date_joined) {
      query = query.gte('date_joined', `${date_joined}T00:00:00`).lte('date_joined', `${date_joined}T23:59:59.999Z`);
    }

    // Apply sorting
    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    // Apply pagination
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) throw error;

    return NextResponse.json({
      data,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil((count || 0) / Number(limit))
      }
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch users' }, { status: 500 });
  }
}
