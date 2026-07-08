import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PartnerForm } from '@/components/admin/PartnerForm'

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
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

  // Fetch partner
  const { data: partner, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !partner) {
    redirect('/admin/partners')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">파트너 수정</h1>
        <p className="text-muted-foreground mt-2">
          파트너 정보를 수정합니다.
        </p>
      </div>

      <PartnerForm partner={partner} userRole={profile.role} />
    </div>
  )
}
