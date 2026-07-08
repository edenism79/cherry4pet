import { createClient } from '@/lib/supabase/server'
import { createAuditLog } from '@/lib/audit'
import { NextResponse } from 'next/server'

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

    // Fetch current media asset
    const { data: currentAsset } = await supabase
      .from('media_assets')
      .select('*')
      .eq('id', id)
      .single()

    if (!currentAsset) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    // Soft delete in database
    const { error: dbError } = await supabase
      .from('media_assets')
      .update({ is_deleted: true, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (dbError) {
      console.error('Error soft deleting media:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    // Optional: Delete from storage (commented out for safety - soft delete only)
    // Extract file path from URL
    // const urlParts = currentAsset.file_url.split('/public-assets/')
    // if (urlParts.length === 2) {
    //   const filePath = urlParts[1]
    //   await supabase.storage.from('public-assets').remove([filePath])
    // }

    // Log audit
    await createAuditLog({
      
      action: 'delete',
      targetTable: 'media_assets',
      targetId: id,
      beforeData: currentAsset,
      afterData: { ...currentAsset, is_deleted: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/media/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
