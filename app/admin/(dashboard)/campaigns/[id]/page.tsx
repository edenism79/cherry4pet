import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CampaignForm } from '@/components/admin/CampaignForm'

export default async function EditCampaignPage({
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

  // Fetch campaign
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !campaign) {
    redirect('/admin/campaigns')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">캠페인 수정</h1>
        <p className="text-muted-foreground mt-2">
          캠페인 정보를 수정합니다.
        </p>
      </div>

      <CampaignForm campaign={campaign} userRole={profile.role} />
    </div>
  )
}
