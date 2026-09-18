'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertCircle, ArrowRight, Camera, CheckCircle2, Clock3, Globe2,
  Heart, HeartHandshake, Menu, PawPrint, ShieldCheck, Stethoscope,
  TrendingUp, Users, X,
} from 'lucide-react'
import { LanguageToggle } from '@/components/common/LanguageToggle'
import { useComingSoon } from '@/components/common/ComingSoonDialog'
import { Button } from '@/components/ui/button'
import {
  AlertDialog, AlertDialogContent, AlertDialogDescription,
  AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { Campaign, LandingSection, Partner, SiteSettings } from '@/types/cms'

type Props = {
  page: 'home' | 'campaigns' | 'contact'
  sections?: LandingSection[]
  campaigns?: Campaign[]
  partners?: Partner[]
  settings: SiteSettings | null
}

const nav = [
  { label: 'About', id: 'about' },
  { label: 'Rabies', id: 'rabies-campaign' },
  { label: 'Campaigns', id: 'campaigns' },
  { label: 'Transparency', id: 'transparency' },
  { label: 'CHERRY Photo', id: 'cherry-photo' },
  { label: 'Impact', id: 'impact' },
  { label: 'Partners', id: 'partners' },
  { label: 'Contact', id: 'contact' },
]

const supportAreas = [
  ['Rescue', 'Help animals in urgent need get to safety.', Heart],
  ['Medical care', 'Fund emergency treatment and life-saving surgery.', Stethoscope],
  ['Shelter support', 'Provide food, supplies, and care to temporary shelters.', PawPrint],
  ['Adoption', 'Help rescued animals find loving families.', Users],
  ['Global action', 'Join regional campaigns, including rabies prevention.', Globe2],
  ['Corporate partnership', 'Make animal welfare part of meaningful CSR and ESG work.', HeartHandshake],
] as const

const transparencyItems = [
  ['Follow every donation', 'See how funds move through each campaign.'],
  ['Campaign spending', 'Review how donations are used for each cause.'],
  ['Reliable records', 'Connect with the CHERRY platform for accountable records.'],
  ['Shared responsibility', 'Shelters, veterinary teams, and companies work together.'],
  ['Outcome reports', 'See what each campaign accomplished.'],
  ['Verified partners', 'Work with organizations reviewed before joining.'],
] as const

const partnerNames: Record<string, string> = {
  '텍스트마인드': 'TextMind',
  '설랩': 'SeolLab',
  '대한수의사회': 'Korean Veterinary Medical Association',
  '잠실베스트동물메디컬센터': 'Jamsil Best Animal Medical Center',
}

const partnerTypes: Record<string, string> = {
  veterinary_hospital: 'Veterinary hospital', veterinary_clinic: 'Veterinary clinic',
  animal_shelter: 'Animal shelter', rescue_organization: 'Rescue organization',
  welfare_organization: 'Animal welfare organization', corporation: 'Company',
  pet_company: 'Pet company', veterinary_association: 'Veterinary association',
  animal_association: 'Animal organization', international_ngo: 'International NGO',
  international_organization: 'International organization', government: 'Government',
  research_institute: 'Research institute', brand_sponsor: 'Brand partner',
  media_partner: 'Media partner', education: 'Education', hospital: 'Veterinary hospital',
  shelter: 'Shelter', company: 'Company', association: 'Association',
  international: 'International organization', brand: 'Brand',
}

function extraOf(section?: LandingSection): Record<string, unknown> {
  const extra = section?.extra
  return extra && typeof extra === 'object' && !Array.isArray(extra)
    ? extra as Record<string, unknown>
    : {}
}

function extraText(extra: Record<string, unknown>, key: string): string {
  return typeof extra[key] === 'string' ? extra[key] as string : ''
}

function SectionHeading({ eyebrow, title, description }: {
  eyebrow?: string; title: string; description?: string
}) {
  return (
    <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
      {eyebrow && <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-cherry-red sm:text-sm">{eyebrow}</p>}
      <h2 className="text-[clamp(1.8rem,4.5vw,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-gray-900">{title}</h2>
      {description && <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-lg sm:leading-8">{description}</p>}
    </div>
  )
}

export function EnglishSite({ page, sections = [], campaigns = [], partners = [], settings }: Props) {
  const [bannerVisible, setBannerVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [impactVisible, setImpactVisible] = useState(false)
  const { showComingSoon, setShowComingSoon, handleLinkClick } = useComingSoon()

  useEffect(() => {
    document.documentElement.lang = 'en'
    return () => { document.documentElement.lang = 'ko' }
  }, [])

  const section = (key: string) => sections.find(item => item.section_key === key && item.is_visible)
  const hero = section('hero')
  const rabies = section('rabies_campaign')
  const photo = section('cherry_photo')
  const impact = section('impact')
  const rabiesExtra = extraOf(rabies)
  const impactExtra = extraOf(impact)
  const visibleCampaigns = campaigns.filter(item => item.is_visible && item.is_featured)
  const campaignGridClass = visibleCampaigns.length === 1
    ? 'mx-auto flex max-w-6xl justify-center'
    : visibleCampaigns.length === 2
      ? 'mx-auto grid max-w-4xl gap-5 sm:grid-cols-2'
      : 'mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3'
  const visiblePartners = partners.filter(item => item.is_visible)
  const metrics = Array.isArray(impactExtra.metrics) ? impactExtra.metrics : []
  const photoImage = photo?.image_url

  const openComingSoon = (event: React.MouseEvent) => handleLinkClick(event, null)
  const donate = (event: React.MouseEvent, url?: string | null) => handleLinkClick(event, url)

  return (
    <div className="english-site min-h-screen bg-white text-gray-900">
      <AlertDialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <AlertDialogContent className="mx-4 max-w-[calc(100vw-2rem)] rounded-2xl sm:max-w-md">
          <AlertDialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl">🐾</div>
            <AlertDialogTitle className="text-2xl font-bold">Coming soon</AlertDialogTitle>
            <AlertDialogDescription className="text-base leading-relaxed">
              We are preparing this service. Thank you for your interest in CHERRY for PET.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button onClick={() => setShowComingSoon(false)} className="mt-4 min-h-11 w-full rounded-full bg-cherry-red text-white hover:bg-cherry-deep">Got it</Button>
        </AlertDialogContent>
      </AlertDialog>

      {bannerVisible && (
        <div className="fixed inset-x-0 top-0 z-[60] h-[52px] bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <div className="mx-auto flex h-full max-w-7xl items-center gap-2 px-3 sm:px-6">
            <AlertCircle className="hidden h-5 w-5 shrink-0 sm:block" />
            <a href={page === 'home' ? '#rabies-campaign' : '/en#rabies-campaign'} className="min-w-0 flex-1 text-center text-xs font-semibold leading-tight hover:underline sm:text-left sm:text-sm">
              One Asia, One Health, Zero Rabies — Explore our campaign
            </a>
            <button type="button" onClick={() => setBannerVisible(false)} aria-label="Close announcement" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-white/20"><X className="h-5 w-5" /></button>
          </div>
        </div>
      )}

      <header className="fixed inset-x-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md" style={{ top: bannerVisible ? 52 : 0 }}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 xl:h-20 xl:px-8" aria-label="Main navigation">
          <Link href="/en" className="min-w-0 shrink flex items-center" aria-label="CHERRY for PET home">
            {settings?.logo_url ? <Image src={settings.logo_url} alt="CHERRY for PET" width={200} height={40} priority className="h-7 w-auto max-w-[136px] object-contain sm:h-9 sm:max-w-[180px]" /> : <span className="text-sm font-extrabold tracking-tight text-cherry-red sm:text-xl">CHERRY <span className="text-gray-900">for PET</span></span>}
          </Link>
          <div className="hidden items-center gap-3 xl:flex 2xl:gap-5">
            {nav.map(item => <a key={item.id} href={page === 'home' ? `#${item.id}` : `/en#${item.id}`} className="whitespace-nowrap text-xs font-semibold text-gray-700 hover:text-cherry-red 2xl:text-sm">{item.label}</a>)}
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageToggle locale="en" />
            <Button onClick={openComingSoon} className="hidden min-h-10 rounded-full bg-cherry-red px-4 text-sm font-bold text-white hover:bg-cherry-deep xl:inline-flex">Donate</Button>
            <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-gray-100 xl:hidden">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        {mobileMenuOpen && <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto border-t border-gray-100 bg-white px-4 py-3 xl:hidden">
          {nav.map(item => <a key={item.id} href={page === 'home' ? `#${item.id}` : `/en#${item.id}`} onClick={() => setMobileMenuOpen(false)} className="block min-h-11 rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-rose-50">{item.label}</a>)}
          <Button onClick={openComingSoon} className="mt-2 min-h-11 w-full rounded-full bg-cherry-red text-white hover:bg-cherry-deep">Donate now</Button>
        </div>}
      </header>

      <main style={{ paddingTop: bannerVisible ? 116 : 64 }}>
        {page === 'home' ? <>
          {hero && <section className="bg-gradient-to-b from-rose-50 to-white py-12 sm:py-16 lg:py-24">
            <div className="container-responsive grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="order-2 max-w-xl lg:order-1">
                <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-cherry-red sm:text-sm">A kinder future for animals</p>
                <h1 className="text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[1.02] tracking-[-0.045em] text-cherry-red">CHERRY<br className="hidden sm:block" /> for PET</h1>
                <p className="mt-5 max-w-lg text-lg font-semibold leading-snug text-gray-800 sm:text-2xl">A donation platform for companion animals and animal welfare</p>
                <p className="mt-4 max-w-lg text-sm leading-7 text-gray-600 sm:text-lg sm:leading-8">One photo, one small act, and one transparent donation can help save an animal’s life.</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button onClick={event => donate(event, hero.cta_url)} className="min-h-12 rounded-full bg-cherry-red px-7 text-base font-bold text-white hover:bg-cherry-deep">Donate now <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <a href="#about" className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-cherry-red px-7 text-base font-bold text-cherry-red hover:bg-rose-50">Learn more</a>
                </div>
              </div>
              <div className="relative order-1 h-[300px] overflow-hidden rounded-3xl bg-rose-100 shadow-xl sm:h-[420px] lg:order-2 lg:h-[560px]">
                {hero.image_url ? <Image src={hero.image_url} alt="CHERRY for PET campaign" fill priority className="object-contain p-4 sm:p-6" sizes="(max-width: 1024px) 100vw, 50vw" /> : <div className="flex h-full items-center justify-center text-3xl font-bold text-cherry-red">CHERRY for PET</div>}
              </div>
            </div>
          </section>}

          {section('why_pet') && <section id="about" className="scroll-mt-36 bg-white py-14 sm:py-20">
            <div className="container-responsive">
              <SectionHeading eyebrow="Why it matters" title="Why a donation platform for companion animals?" description="Every year, countless animals need rescue, treatment, shelter, and a chance to find a home. Together, we can make their future brighter." />
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {supportAreas.map(([title, description, Icon]) => <div key={title} className="rounded-2xl border-2 border-gray-100 bg-white p-6 transition-shadow hover:border-rose-200 hover:shadow-lg sm:p-7"><Icon className="mb-5 h-9 w-9 text-cherry-red" /><h3 className="text-lg font-bold sm:text-xl">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">{description}</p></div>)}
              </div>
            </div>
          </section>}

          {rabies && <section id="rabies-campaign" className="scroll-mt-36 bg-gradient-to-br from-blue-50 via-white to-orange-50 py-14 sm:py-20">
            <div className="container-responsive">
              <SectionHeading eyebrow="Our launch campaign" title="One Asia, One Health, Zero Rabies" description="With the FAVA Asia Rabies Committee, CHERRY for PET is working toward a safer future for people, animals, and communities." />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['Annual rabies deaths', 'About 60,000 people'],
                  ['Children affected', 'About 50% of deaths'],
                  ['Children harmed by conflict', 'About 15,000'],
                  ['Animal deaths reported', 'About 3 million'],
                ].map(([label, value]) => <div key={label} className="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm sm:p-6"><p className="text-sm font-medium leading-6 text-gray-600">{label}</p><p className="mt-2 text-lg font-extrabold leading-tight text-cherry-red sm:text-xl">{value}</p></div>)}
              </div>
              {extraText(rabiesExtra, 'quote') && <blockquote className="mx-auto my-9 max-w-4xl border-l-4 border-cherry-red px-5 text-base font-medium italic leading-8 text-gray-700 sm:my-12 sm:px-8 sm:text-lg">“War is a tragedy the world can see. Hunger is a tragedy the world cannot ignore. Rabies is a tragedy we already know how to prevent, yet have not ended.”</blockquote>}
              {extraText(rabiesExtra, 'mou_image') && <div className="grid items-center gap-6 rounded-3xl bg-gradient-to-r from-cherry-red to-cherry-deep p-5 text-white shadow-lg sm:p-8 md:grid-cols-[1fr_240px]">
                <div><h3 className="text-xl font-bold sm:text-2xl">Memorandum of Understanding</h3><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 sm:text-base"><div><dt className="font-bold">Date</dt><dd>July 14, 2026, 2:00 PM</dd></div><div><dt className="font-bold">Venue</dt><dd>Royal Animal Medical Center, Seoul</dd></div><div><dt className="font-bold">Organized by</dt><dd>FAVA Asia Rabies Committee</dd></div><div><dt className="font-bold">Hosted by</dt><dd>CHERRY for PET · CHERRY · EasyPet</dd></div></dl></div>
                <div className="flex min-h-44 items-center justify-center rounded-2xl bg-white/10 p-3"><Image src={extraText(rabiesExtra, 'mou_image')} alt="Memorandum of Understanding" width={260} height={220} unoptimized className="max-h-52 w-auto max-w-full object-contain" /></div>
              </div>}
              <div className="mt-9 text-center"><Button onClick={event => donate(event, rabies.cta_url)} className="min-h-12 rounded-full bg-cherry-red px-8 text-base font-bold text-white hover:bg-cherry-deep">Join the campaign <ArrowRight className="ml-2 h-4 w-4" /></Button><p className="mt-4 text-sm font-medium text-gray-600">Together for a rabies-free Asia 🌏</p></div>
            </div>
          </section>}

          {visibleCampaigns.length > 0 && <section id="campaigns" className="scroll-mt-36 bg-gray-50 py-14 sm:py-20"><div className="container-responsive"><SectionHeading eyebrow="Get involved" title="Current campaigns" description="Meet the causes working to protect animals and communities." /><div className={campaignGridClass}>{visibleCampaigns.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} onAction={donate} />)}</div></div></section>}

          <section id="transparency" className="scroll-mt-36 bg-white py-14 sm:py-20"><div className="container-responsive"><SectionHeading eyebrow="Our promise" title="Transparency is at the heart of everything we do" description="We want every donor to see where their support goes and what it achieves." /><div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">{transparencyItems.map(([title, description]) => <div key={title} className="rounded-2xl bg-rose-50/60 p-6 sm:p-7"><ShieldCheck className="mb-4 h-8 w-8 text-cherry-red" /><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-gray-600 sm:text-base">{description}</p></div>)}</div></div></section>

          <section id="cherry-photo" className="scroll-mt-36 bg-gradient-to-br from-rose-50 to-pink-50 py-14 sm:py-20"><div className="container-responsive grid items-center gap-9 lg:grid-cols-2 lg:gap-14"><div><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-cherry-red sm:text-sm">CHERRY Photo</p><h2 className="text-[clamp(1.9rem,5vw,3.5rem)] font-extrabold leading-[1.12] tracking-tight">A photo that gives back</h2><p className="mt-5 text-sm leading-7 text-gray-600 sm:text-lg sm:leading-8">Make a memory with your pet at a CHERRY Photo booth. Part of the cost supports rescue, treatment, and animal care.</p><ul className="mt-6 space-y-3">{['Take a photo with your pet', 'Support an animal welfare campaign', 'Receive a photo and a donation certificate', 'Join us at offline events'].map(item => <li key={item} className="flex items-start gap-3 text-sm font-medium leading-6 sm:text-base"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cherry-red" />{item}</li>)}</ul><div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button onClick={openComingSoon} className="min-h-12 rounded-full bg-cherry-red px-6 text-white hover:bg-cherry-deep">See events</Button><Button onClick={openComingSoon} variant="outline" className="min-h-12 rounded-full px-6">Learn more</Button></div></div><div className="relative aspect-square overflow-hidden rounded-3xl bg-rose-200 shadow-xl">{photoImage ? <Image src={photoImage} alt="Pet and guardian at a photo booth" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /> : <div className="flex h-full items-center justify-center"><Camera className="h-24 w-24 text-rose-400" /></div>}</div></div></section>

          <section id="impact" className="scroll-mt-36 bg-cherry-red py-14 text-white sm:py-20"><div className="container-responsive"><div className="mx-auto max-w-3xl text-center"><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white/80">Our impact</p><h2 className="text-[clamp(1.9rem,5vw,3.5rem)] font-extrabold leading-tight">The change we can make together</h2><p className="mt-4 text-sm leading-7 text-white/90 sm:text-lg">These are the goals we can reach with your support.</p><Button onClick={() => setImpactVisible(true)} className="mt-7 min-h-12 rounded-full bg-white px-7 font-bold text-cherry-red hover:bg-rose-50">{impactVisible ? 'Our goals' : 'See our goals'}</Button></div><div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">{metrics.map((metric, index) => {const item = metric && typeof metric === 'object' ? metric as Record<string, unknown> : {}; const labels = ['Donations', 'Participants', 'Campaigns', 'Animals helped', 'Partners']; const value = typeof item.value === 'number' ? item.value : Number(item.value || 0); return <div key={index} className="min-w-0 rounded-2xl bg-white/10 p-4 text-center sm:p-5"><p className="break-words text-lg font-extrabold tabular-nums sm:text-2xl">{impactVisible ? `${value.toLocaleString('en-US')}${index === 0 ? ' KRW' : ''}` : '—'}</p><p className="mt-3 text-xs font-semibold leading-5 text-white/85 sm:text-sm">{labels[index] || 'Goal'}</p></div>})}</div></div></section>

          {visiblePartners.length > 0 && <section id="partners" className="scroll-mt-36 bg-white py-14 sm:py-20"><div className="container-responsive"><SectionHeading eyebrow="Stronger together" title="Our partners" description="We work with trusted partners who share our commitment to animals." /><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">{visiblePartners.map(partner => <div key={partner.id} className="min-w-0 rounded-2xl border-2 border-gray-100 p-4 text-center transition-shadow hover:border-rose-200 hover:shadow-md sm:p-5"><div className="relative mx-auto mb-3 h-20 w-full">{partner.logo_url ? <Image src={partner.logo_url} alt={partnerNames[partner.name] || partner.name} fill className="object-contain" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw" /> : <div className="flex h-full items-center justify-center text-sm font-bold text-gray-500">CHERRY for PET</div>}</div><h3 className="break-words text-xs font-bold leading-5 sm:text-sm">{partnerNames[partner.name] || partner.name}</h3>{partner.type && partner.type !== 'none' && <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs">{partnerTypes[partner.type] || 'Partner'}</p>}</div>)}</div></div></section>}

          <section id="contact" className="scroll-mt-36 bg-gradient-to-r from-cherry-red to-cherry-deep py-16 text-center text-white sm:py-24"><div className="container-responsive"><h2 className="mx-auto max-w-3xl text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight">A small act can save a life</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/90 sm:text-xl">Join CHERRY for PET in making animal welfare more transparent and accessible.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button onClick={openComingSoon} className="min-h-12 rounded-full bg-white px-8 font-bold text-cherry-red hover:bg-rose-50">Donate now</Button><Button onClick={openComingSoon} className="min-h-12 rounded-full border border-white bg-transparent px-8 font-bold text-white hover:bg-white/10">Become a partner</Button></div><div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3"><div><p className="text-2xl font-extrabold">Transparent</p><p className="mt-1 text-sm text-white/80">Donation management</p></div><div><p className="text-2xl font-extrabold">Verified</p><p className="mt-1 text-sm text-white/80">Partners and campaigns</p></div><div><p className="text-2xl font-extrabold">Open</p><p className="mt-1 text-sm text-white/80">Progress updates</p></div></div></div></section>
        </> : page === 'campaigns' ? <section className="min-h-[55vh] bg-gray-50 py-14 sm:py-20"><div className="container-responsive"><SectionHeading eyebrow="Get involved" title="All campaigns" description="Meet the causes working to protect animals and communities." /><div className={campaignGridClass}>{visibleCampaigns.map(campaign => <CampaignCard key={campaign.id} campaign={campaign} onAction={donate} />)}</div></div></section> : <section className="min-h-[55vh] bg-gray-50 py-14 sm:py-20"><div className="container-responsive mx-auto max-w-3xl"><SectionHeading eyebrow="Contact" title="Get in touch" description="Have a question? We would love to hear from you." /><div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8"><h3 className="text-xl font-bold">Contact form</h3><p className="mt-3 leading-7 text-gray-600">Our contact form is coming soon. Email <a className="font-semibold text-cherry-red underline" href="mailto:cherry4pet@gmail.com">cherry4pet@gmail.com</a> or call <a className="font-semibold text-cherry-red underline" href="tel:+821071229411">82-10-7122-9411</a>.</p></div></div></section>}
      </main>

      <footer className="bg-gray-900 py-10 text-white sm:py-12"><div className="container-responsive"><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"><div><h2 className="text-xl font-bold">CHERRY for PET</h2><p className="mt-3 text-sm leading-6 text-gray-400">A transparent donation platform for companion animals and animal welfare.</p></div><div><h3 className="font-bold">Explore</h3><div className="mt-3 flex flex-col gap-2 text-sm text-gray-400"><Link href="/en/campaigns" className="hover:text-white">Campaigns</Link><a href="/en#partners" className="hover:text-white">Partners</a><Link href="/en/contact" className="hover:text-white">Contact</Link></div></div><div><h3 className="font-bold">Connect</h3><a className="mt-3 block text-sm text-gray-400 hover:text-white" href="mailto:cherry4pet@gmail.com">cherry4pet@gmail.com</a><a className="mt-2 block text-sm text-gray-400 hover:text-white" href="tel:+821071229411">82-10-7122-9411</a></div></div><div className="mt-9 border-t border-gray-700 pt-6 text-xs leading-6 text-gray-400 sm:text-sm"><p>Co-CEOs: Sang-yee Nam and Su-jeong Lee · 15F, 21 Teheran-ro 87-gil, Gangnam-gu, Seoul</p><p className="mt-2">© {new Date().getFullYear()} CHERRY for PET. All rights reserved.</p></div></div></footer>
    </div>
  )
}

function CampaignCard({ campaign, onAction }: { campaign: Campaign; onAction: (event: React.MouseEvent, url?: string | null) => void }) {
  const progress = campaign.goal_amount > 0 ? Math.min(100, Math.max(0, Math.round(Number(campaign.raised_amount) / Number(campaign.goal_amount) * 100))) : 0
  return <article className="w-full max-w-md min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
    <div className="relative h-48 bg-gradient-to-br from-rose-200 to-cherry-red sm:h-56">{campaign.image_url ? <Image src={campaign.image_url} alt="Campaign image" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /> : <div className="flex h-full items-center justify-center text-white"><PawPrint className="h-20 w-20" /></div>}</div>
    <div className="p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-wider text-cherry-red">International cooperation</p><h3 className="mt-2 text-xl font-bold leading-snug">{campaign.title}</h3><p className="mt-2 text-sm text-gray-500">{campaign.organization}</p><p className="mt-4 text-sm leading-7 text-gray-600">If Asia is at the heart of the rabies challenge, leadership in ending it must begin here. Join our launch campaign.</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-cherry-red" style={{ width: `${progress}%` }} /></div><div className="mt-2 flex justify-between gap-2 text-xs text-gray-500"><span>{progress}% of goal</span><span>{Number(campaign.goal_amount).toLocaleString('en-US')} KRW goal</span></div><Button onClick={event => onAction(event, campaign.external_url)} className="mt-5 min-h-11 w-full rounded-full bg-cherry-red text-white hover:bg-cherry-deep">Donate</Button></div>
  </article>
}
