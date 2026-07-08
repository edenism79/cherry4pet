import { Database } from './database'

export type AdminProfile = Database['public']['Tables']['admin_profiles']['Row']
export type SiteSettings = Database['public']['Tables']['site_settings']['Row']
export type LandingSection = Database['public']['Tables']['landing_sections']['Row']
export type Campaign = Database['public']['Tables']['campaigns']['Row']
export type Partner = Database['public']['Tables']['partners']['Row']
export type Story = Database['public']['Tables']['stories']['Row']
export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type MediaAsset = Database['public']['Tables']['media_assets']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']

export type AdminRole = 'super_admin' | 'content_admin' | 'viewer'
export type InquiryStatus = 'new' | 'in_progress' | 'done'

export interface SnsLinks {
  instagram?: string
  facebook?: string
  twitter?: string
  youtube?: string
  blog?: string
}

export interface SectionExtra {
  [key: string]: unknown
}
