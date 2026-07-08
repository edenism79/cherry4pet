import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MediaLibrary } from '@/components/admin/MediaLibrary'

export default async function MediaPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Fetch admin profile to check role
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/admin/login')
  }

  // Fetch all media assets
  const { data: mediaAssets, error } = await supabase
    .from('media_assets')
    .select('*')
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching media assets:', error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">미디어 관리</h1>
        <p className="text-muted-foreground mt-2">
          이미지를 업로드하고 관리합니다.
        </p>
      </div>

      <MediaLibrary
        mediaAssets={mediaAssets || []}
        userRole={profile.role}
      />
    </div>
  )
}
