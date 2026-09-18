import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { EnglishSite } from '@/components/english/EnglishSite'

export const revalidate = 0
export const metadata: Metadata = {
  title: 'Contact | CHERRY for PET',
  alternates: { canonical: '/en/contact', languages: { ko: '/contact', en: '/en/contact' } },
}

export default async function EnglishContactPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('site_settings').select('*').single()
  return <EnglishSite page="contact" settings={settings} />
}
