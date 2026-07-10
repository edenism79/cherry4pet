import { createClient } from "@/lib/supabase/server"
import { AnnouncementBanner } from "@/components/common/AnnouncementBanner"
import { MainWrapper } from "@/components/common/MainWrapper"
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
import { FinalCTASection } from "@/components/landing/FinalCTASection"
import SiteFooter from "@/components/landing/SiteFooter"

export const revalidate = 0 // Disable cache for development

export default async function Home() {
  const supabase = await createClient()

  const [sectionsResult, campaignsResult, partnersResult, settingsResult] = await Promise.all([
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
      .from('site_settings')
      .select('*')
      .single()
  ])

  const sections = sectionsResult.data || []
  const campaigns = campaignsResult.data || []
  const partners = partnersResult.data || []
  const settings = settingsResult.data

  const heroSection = sections.find(s => s.section_key === 'hero')
  const rabiesCampaignSection = sections.find(s => s.section_key === 'rabies_campaign')
  const whyPetSection = sections.find(s => s.section_key === 'why_pet')
  const cherryPhotoSection = sections.find(s => s.section_key === 'cherry_photo')
  const impactSection = sections.find(s => s.section_key === 'impact')

  // Debug: Log section data
  console.log('Rabies Campaign Section Data:', JSON.stringify(rabiesCampaignSection, null, 2))
  console.log('Cherry Photo Section Data:', JSON.stringify(cherryPhotoSection, null, 2))

  return (
    <>
      <AnnouncementBanner />
      <SiteHeader logoUrl={settings?.logo_url} siteName={settings?.site_name} />
      <MainWrapper>
        {/* 1. Hero Section */}
        {heroSection && <HeroSection data={heroSection} />}

        {/* 2. Why PET Section */}
        <div id="about">
          {whyPetSection && <WhyPetSection data={whyPetSection} />}
        </div>

        {/* 3. Rabies Campaign Section */}
        <div id="rabies-campaign">
          {rabiesCampaignSection && <RabiesCampaignSection data={rabiesCampaignSection} />}
        </div>

        {/* 4. Featured Campaigns */}
        <div id="campaigns">
          <FeaturedCampaigns campaigns={campaigns} />
        </div>

        {/* 5. Transparency Section */}
        <div id="transparency">
          <TransparencySection />
        </div>

        {/* 6. Cherry Photo Section */}
        <div id="cherry-photo">
          <CherryPhotoSection data={cherryPhotoSection} />
        </div>

        {/* 7. Impact Metrics Section */}
        <div id="impact">
          <ImpactMetricsSection section={impactSection} />
        </div>

        {/* 8. Partners Section */}
        <div id="partners">
          <PartnersSection partners={partners} />
        </div>

        {/* 9. Final CTA Section */}
        <div id="contact">
          <FinalCTASection />
        </div>

        <SiteFooter settings={settings} />
      </MainWrapper>
    </>
  )
}
