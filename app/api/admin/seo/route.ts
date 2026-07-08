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
    const {
      meta_title,
      meta_description,
      meta_keywords,
      og_title,
      og_description,
      og_image,
      canonical_url,
    } = body

    // Get first settings record (or create if doesn't exist)
    const { data: existingSettings } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .single()

    let data
    let error

    if (existingSettings) {
      // Update existing settings
      const updateResult = await supabase
        .from('site_settings')
        .update({
          meta_title,
          meta_description,
          meta_keywords,
          og_title,
          og_description,
          og_image,
          canonical_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSettings.id)
        .select()
        .single()

      data = updateResult.data
      error = updateResult.error

      // Log audit
      if (!error) {
        await createAuditLog({
          
          action: 'update',
          targetTable: 'site_settings',
          targetId: existingSettings.id,
          beforeData: existingSettings,
          afterData: data,
        })
      }
    } else {
      // Create new settings
      const insertResult = await supabase
        .from('site_settings')
        .insert({
          site_name: 'CHERRY for PET',
          meta_title,
          meta_description,
          meta_keywords,
          og_title,
          og_description,
          og_image,
          canonical_url,
        })
        .select()
        .single()

      data = insertResult.data
      error = insertResult.error

      // Log audit
      if (!error) {
        await createAuditLog({
          
          action: 'create',
          targetTable: 'site_settings',
          targetId: data.id,
          beforeData: null,
          afterData: data,
        })
      }
    }

    if (error) {
      console.error('Error updating SEO settings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PATCH /api/admin/seo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
