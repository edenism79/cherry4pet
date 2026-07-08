import { createClient } from "@/lib/supabase/server"
import { SiteHeader } from "@/components/landing/SiteHeader"
import HeroSection from "@/components/landing/HeroSection"
import { RabiesCampaignSection } from "@/components/landing/RabiesCampaignSection"
import WhyPetSection from "@/components/landing/WhyPetSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import FeaturedCampaigns from "@/components/landing/FeaturedCampaigns"
import { TransparencySection } from "@/components/landing/TransparencySection"
import { CherryPhotoSection } from "@/components/landing/CherryPhotoSection"
import { ImpactMetricsSection } from "@/components/landing/ImpactMetricsSection"
import PartnersSection from "@/components/landing/PartnersSection"
import { StoriesSection } from "@/components/landing/StoriesSection"
import { FinalCTASection } from "@/components/landing/FinalCTASection"
import SiteFooter from "@/components/landing/SiteFooter"

export const revalidate = 60

export default async function Home() {
  const supabase = await createClient()

  const [sectionsResult, campaignsResult, partnersResult, storiesResult, settingsResult] = await Promise.all([
    supabase
      .from('landing_sections')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('campaigns')
      .select('*')
      .eq('is_visible', true)
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(6),
    supabase
      .from('partners')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('stories')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true })
      .limit(3),
    supabase
      .from('site_settings')
      .select('*')
      .single()
  ])

  const sections = sectionsResult.data || []
  const campaigns = campaignsResult.data || []
  const partners = partnersResult.data || []
  const stories = storiesResult.data || []
  const settings = settingsResult.data

  const heroSection = sections.find(s => s.section_key === 'hero')
  const rabiesCampaignSection = sections.find(s => s.section_key === 'rabies_campaign')
  const whyPetSection = sections.find(s => s.section_key === 'why_pet')

  return (
    <>
      <SiteHeader logoUrl={settings?.logo_url} siteName={settings?.site_name} />
      <main className="min-h-screen pt-16 md:pt-20">
        {heroSection && <HeroSection data={heroSection} />}
        {rabiesCampaignSection && <RabiesCampaignSection data={rabiesCampaignSection} />}
        {whyPetSection && <WhyPetSection data={whyPetSection} />}
        <HowItWorksSection />
        <div id="campaigns">
          <FeaturedCampaigns campaigns={campaigns} />
        </div>
        <div id="transparency">
          <TransparencySection />
        </div>
        <CherryPhotoSection />
        <ImpactMetricsSection />
        <div id="partners">
          <PartnersSection partners={partners} />
        </div>
        <div id="stories">
          <StoriesSection stories={stories} />
        </div>
        <div id="contact">
          <FinalCTASection />
        </div>
        <SiteFooter settings={settings} />
      </main>
    </>
  )
}
