import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PartnerForm } from '@/components/admin/PartnerForm'

export default async function NewPartnerPage() {
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

  if (!profile || profile.role === 'viewer') {
    redirect('/admin/partners')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">새 파트너 추가</h1>
        <p className="text-muted-foreground mt-2">
          새로운 파트너를 등록합니다.
        </p>
      </div>

      <PartnerForm userRole={profile.role} />
    </div>
  )
}
