import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { PartnerList } from '@/components/admin/PartnerList'

export default async function PartnersPage() {
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

  // Fetch all partners
  const { data: partners, error } = await supabase
    .from('partners')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching partners:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">파트너 관리</h1>
          <p className="text-muted-foreground mt-2">
            파트너를 추가하고 관리합니다.
          </p>
        </div>
        {profile.role !== 'viewer' && (
          <Link href="/admin/partners/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              새 파트너
            </Button>
          </Link>
        )}
      </div>

      <PartnerList partners={partners || []} userRole={profile.role} />
    </div>
  )
}
