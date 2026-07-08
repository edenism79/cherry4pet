import { createClient } from '@/lib/supabase/server'
import { AdminRole } from '@/types/cms'

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getAdminProfile() {
  const supabase = await createClient()
  const user = await getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

export async function requireAdmin(allowedRoles?: AdminRole[]) {
  const profile = await getAdminProfile()

  if (!profile) {
    throw new Error('Unauthorized')
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    throw new Error('Forbidden')
  }

  return profile
}

export function canEdit(role: AdminRole): boolean {
  return role === 'super_admin' || role === 'content_admin'
}

export function canDelete(role: AdminRole): boolean {
  return role === 'super_admin'
}
