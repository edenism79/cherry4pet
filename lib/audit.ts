import { createClient } from '@/lib/supabase/server'

interface AuditLogParams {
  action: string
  targetTable: string
  targetId?: string
  beforeData?: unknown
  afterData?: unknown
}

export async function createAuditLog({
  action,
  targetTable,
  targetId,
  beforeData,
  afterData,
}: AuditLogParams) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase
    .from('audit_logs')
    .insert({
      user_id: user.id,
      action,
      target_table: targetTable,
      target_id: targetId,
      before_data: beforeData as never,
      after_data: afterData as never,
    })
    .select()
    .single()

  if (error) {
    console.error('Audit log error:', error)
    return null
  }

  return data
}
