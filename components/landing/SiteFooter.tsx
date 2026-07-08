import { SiteSettings } from "@/types/cms"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

interface SiteFooterProps {
  settings: SiteSettings | null
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  const snsLinks = settings?.sns_links as Record<string, string> || {}

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{settings?.site_name || 'CHERRY for PET'}</h3>
            <p className="text-gray-400">
              반려동물을 위한 투명한 기부 플랫폼
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/campaigns" className="hover:text-cherry-red transition-colors">캠페인</a></li>
              <li><a href="/partners" className="hover:text-cherry-red transition-colors">파트너</a></li>
              <li><a href="/stories" className="hover:text-cherry-red transition-colors">소식</a></li>
              <li><a href="/contact" className="hover:text-cherry-red transition-colors">문의하기</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">SNS</h4>
            <div className="flex gap-4">
              {snsLinks.instagram && (
                <a
                  href={snsLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cherry-red flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {snsLinks.facebook && (
                <a
                  href={snsLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cherry-red flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {snsLinks.twitter && (
                <a
                  href={snsLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cherry-red flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {snsLinks.youtube && (
                <a
                  href={snsLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cherry-red flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>{settings?.footer_business_info}</p>
            <div className="flex gap-4">
              {settings?.privacy_url && (
                <a href={settings.privacy_url} className="hover:text-white transition-colors">
                  개인정보처리방침
                </a>
              )}
              {settings?.terms_url && (
                <a href={settings.terms_url} className="hover:text-white transition-colors">
                  이용약관
                </a>
              )}
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} {settings?.footer_company_name || 'CHERRY for PET'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
