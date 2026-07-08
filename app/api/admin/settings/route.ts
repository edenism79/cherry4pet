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

    // Check role - only super_admin can modify settings
    const { data: profile } = await supabase
      .from('admin_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse request body
    const body = await request.json()
    const {
      site_name,
      logo_url,
      favicon_url,
      primary_cta_label,
      primary_cta_url,
      footer_company_name,
      footer_business_info,
      privacy_url,
      terms_url,
      sns_links,
      is_published,
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
          site_name,
          logo_url,
          favicon_url,
          primary_cta_label,
          primary_cta_url,
          footer_company_name,
          footer_business_info,
          privacy_url,
          terms_url,
          sns_links,
          is_published,
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
          site_name,
          logo_url,
          favicon_url,
          primary_cta_label,
          primary_cta_url,
          footer_company_name,
          footer_business_info,
          privacy_url,
          terms_url,
          sns_links,
          is_published,
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
      console.error('Error updating site settings:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PATCH /api/admin/settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
