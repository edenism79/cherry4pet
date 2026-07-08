import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SiteSettingsEditor } from '@/components/admin/SiteSettingsEditor'

export default async function SettingsPage() {
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

  // Only super_admin can access settings
  if (profile.role !== 'super_admin') {
    redirect('/admin')
  }

  // Fetch site settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">사이트 설정</h1>
        <p className="text-muted-foreground mt-2">
          사이트의 기본 정보와 설정을 관리합니다.
        </p>
      </div>

      <SiteSettingsEditor settings={settings} userRole={profile.role} />
    </div>
  )
}
