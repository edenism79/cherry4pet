import { createClient } from '@/lib/supabase/server'
import { createAuditLog } from '@/lib/audit'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check role
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse request body
    const body = await request.json()
    const {
      name,
      type,
      logo_url,
      website_url,
      description,
      is_visible,
      sort_order,
    } = body

    if (!name) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 })
    }

    // Create partner
    const { data, error } = await supabase
      .from('partners')
      .insert({
        name,
        type,
        logo_url,
        website_url,
        description,
        is_visible: is_visible !== false,
        sort_order: sort_order || 0,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating partner:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log audit
    await createAuditLog({
      
      action: 'create',
      targetTable: 'partners',
      targetId: data.id,
      beforeData: null,
      afterData: data,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in POST /api/admin/partners:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
