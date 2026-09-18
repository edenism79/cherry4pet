import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { EnglishSite } from '@/components/english/EnglishSite'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'CHERRY for PET | Transparent giving for companion animals',
  description: 'One photo, one small act, and transparent giving can help save an animal’s life.',
  alternates: { canonical: '/en', languages: { ko: '/', en: '/en' } },
  openGraph: { locale: 'en_US', title: 'CHERRY for PET | Transparent giving for companion animals' },
}

export default async function EnglishHomePage() {
  const supabase = await createClient()
  const [sectionsResult, campaignsResult, partnersResult, settingsResult] = await Promise.all([
    supabase.from('landing_sections').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
    supabase.from('campaigns').select('*').eq('is_visible', true).eq('is_featured', true).order('sort_order', { ascending: true }).limit(6),
    supabase.from('partners').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
    supabase.from('site_settings').select('*').single(),
  ])

  return <EnglishSite
    page="home"
    sections={sectionsResult.data || []}
    campaigns={campaignsResult.data || []}
    partners={partnersResult.data || []}
    settings={settingsResult.data}
  />
}
