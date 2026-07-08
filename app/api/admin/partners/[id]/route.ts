import { createClient } from '@/lib/supabase/server'
import { createAuditLog } from '@/lib/audit'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Fetch current partner for audit log
    const { data: currentPartner } = await supabase
      .from('partners')
      .select('*')
      .eq('id', id)
      .single()

    if (!currentPartner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
    }

    // Update partner
    const { data, error } = await supabase
      .from('partners')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating partner:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log audit
    await createAuditLog({
      
      action: 'update',
      targetTable: 'partners',
      targetId: id,
      beforeData: currentPartner,
      afterData: data,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PATCH /api/admin/partners/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Fetch current partner for audit log
    const { data: currentPartner } = await supabase
      .from('partners')
      .select('*')
      .eq('id', id)
      .single()

    if (!currentPartner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
    }

    // Delete partner
    const { error } = await supabase.from('partners').delete().eq('id', id)

    if (error) {
      console.error('Error deleting partner:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log audit
    await createAuditLog({
      
      action: 'delete',
      targetTable: 'partners',
      targetId: id,
      beforeData: currentPartner,
      afterData: null,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/partners/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
