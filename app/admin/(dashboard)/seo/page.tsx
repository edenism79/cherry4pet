import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SeoEditor } from '@/components/admin/SeoEditor'

export default async function SeoPage() {
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

  // Fetch site settings (we'll store SEO info here)
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO 관리</h1>
        <p className="text-muted-foreground mt-2">
          사이트의 메타 태그와 SEO 정보를 관리합니다.
        </p>
      </div>

      <SeoEditor settings={settings} userRole={profile.role} />
    </div>
  )
}
