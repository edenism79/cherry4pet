import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { InquiryList } from '@/components/admin/InquiryList'

export default async function InquiriesPage() {
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

  // Fetch all inquiries
  const { data: inquiries, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching inquiries:', error)
  }

  // Count by status
  const newCount = inquiries?.filter((i) => i.status === 'new').length || 0
  const inProgressCount = inquiries?.filter((i) => i.status === 'in_progress').length || 0
  const doneCount = inquiries?.filter((i) => i.status === 'done').length || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">문의 관리</h1>
        <p className="text-muted-foreground mt-2">
          사용자 문의를 확인하고 관리합니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">새 문의</div>
          <div className="text-2xl font-bold">{newCount}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">처리 중</div>
          <div className="text-2xl font-bold">{inProgressCount}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm font-medium text-muted-foreground">완료</div>
          <div className="text-2xl font-bold">{doneCount}</div>
        </div>
      </div>

      <InquiryList inquiries={inquiries || []} userRole={profile.role} />
    </div>
  )
}
