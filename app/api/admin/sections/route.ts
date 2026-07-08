import { createClient } from '@/lib/supabase/server'
import { createAuditLog } from '@/lib/audit'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
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
    const { id, title, subtitle, body: content, image_url, cta_label, cta_url, is_visible } = body

    if (!id) {
      return NextResponse.json({ error: 'Section ID required' }, { status: 400 })
    }

    // Fetch current section for audit log
    const { data: currentSection } = await supabase
      .from('landing_sections')
      .select('*')
      .eq('id', id)
      .single()

    // Update section
    const { data, error } = await supabase
      .from('landing_sections')
      .update({
        title,
        subtitle,
        body: content,
        image_url,
        cta_label,
        cta_url,
        is_visible,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating section:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log audit
    await createAuditLog({
      
      action: 'update',
      targetTable: 'landing_sections',
      targetId: id,
      beforeData: currentSection,
      afterData: data,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PATCH /api/admin/sections:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
