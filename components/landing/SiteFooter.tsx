'use client'

import { SiteSettings } from "@/types/cms"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { useComingSoon, ComingSoonDialog } from "@/components/common/ComingSoonDialog"

interface SiteFooterProps {
  settings: SiteSettings | null
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  const { showComingSoon, setShowComingSoon, handleLinkClick } = useComingSoon()
  const snsLinks = settings?.sns_links as Record<string, string> || {}

  return (
    <>
      <ComingSoonDialog open={showComingSoon} onOpenChange={setShowComingSoon} />
      <footer className="bg-gray-900 text-white py-10 sm:py-12 safe-bottom">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{settings?.site_name || 'CHERRY for PET'}</h3>
              <p className="text-sm sm:text-base text-gray-400">
                반려동물을 위한 투명한 기부 플랫폼
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">바로가기</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><a href="#" onClick={(e) => handleLinkClick(e, '/campaigns')} className="hover:text-cherry-red active:text-cherry-red transition-colors cursor-pointer inline-block py-1 touch-target">캠페인</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, '/partners')} className="hover:text-cherry-red active:text-cherry-red transition-colors cursor-pointer inline-block py-1 touch-target">파트너</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, '/stories')} className="hover:text-cherry-red active:text-cherry-red transition-colors cursor-pointer inline-block py-1 touch-target">소식</a></li>
                <li><a href="#" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-cherry-red active:text-cherry-red transition-colors cursor-pointer inline-block py-1 touch-target">문의하기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">SNS</h4>
              <div className="flex gap-3 sm:gap-4">
                {snsLinks.instagram && (
                  <a
                    href={snsLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-800 hover:bg-cherry-red active:scale-95 flex items-center justify-center transition-all touch-target"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                )}
                {snsLinks.facebook && (
                  <a
                    href={snsLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-800 hover:bg-cherry-red active:scale-95 flex items-center justify-center transition-all touch-target"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                )}
                {snsLinks.twitter && (
                  <a
                    href={snsLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-800 hover:bg-cherry-red active:scale-95 flex items-center justify-center transition-all touch-target"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                )}
                {snsLinks.youtube && (
                  <a
                    href={snsLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gray-800 hover:bg-cherry-red active:scale-95 flex items-center justify-center transition-all touch-target"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <p className="text-center sm:text-left">{settings?.footer_business_info}</p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {settings?.privacy_url && (
                  <a href={settings.privacy_url} className="hover:text-white active:text-white transition-colors touch-target">
                    개인정보처리방침
                  </a>
                )}
                {settings?.terms_url && (
                  <a href={settings.terms_url} className="hover:text-white active:text-white transition-colors touch-target">
                    이용약관
                  </a>
                )}
              </div>
            </div>
            <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
              © {new Date().getFullYear()} {settings?.footer_company_name || 'CHERRY for PET'}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
