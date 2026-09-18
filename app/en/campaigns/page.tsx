import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { EnglishSite } from '@/components/english/EnglishSite'

export const revalidate = 0
export const metadata: Metadata = {
  title: 'Campaigns | CHERRY for PET',
  alternates: { canonical: '/en/campaigns', languages: { ko: '/campaigns', en: '/en/campaigns' } },
}

export default async function EnglishCampaignsPage() {
  const supabase = await createClient()
  const [campaignsResult, settingsResult] = await Promise.all([
    supabase.from('campaigns').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
    supabase.from('site_settings').select('*').single(),
  ])
  return <EnglishSite page="campaigns" campaigns={campaignsResult.data || []} settings={settingsResult.data} />
}
