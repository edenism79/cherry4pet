import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SectionEditor } from '@/components/admin/SectionEditor'

export default async function SectionsPage() {
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

  // Fetch all landing sections
  const { data: sections, error } = await supabase
    .from('landing_sections')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching sections:', error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">섹션 관리</h1>
        <p className="text-muted-foreground mt-2">
          랜딩페이지의 섹션 콘텐츠를 수정합니다.
        </p>
      </div>

      <div className="grid gap-6">
        {sections?.map((section) => (
          <SectionEditor
            key={section.id}
            section={section}
            userRole={profile.role}
          />
        ))}

        {!sections || sections.length === 0 && (
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground">등록된 섹션이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
