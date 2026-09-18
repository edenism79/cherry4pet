'use client'

import { usePathname } from 'next/navigation'

type LanguageToggleProps = {
  locale?: 'ko' | 'en'
}

export function LanguageToggle({ locale = 'ko' }: LanguageToggleProps) {
  const pathname = usePathname()
  const basePath = pathname?.startsWith('/en')
    ? pathname.slice(3) || '/'
    : pathname || '/'
  const koreanPath = basePath
  const englishPath = basePath === '/' ? '/en' : `/en${basePath}`

  const preserveHash = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = window.location.hash
    if (hash) event.currentTarget.href += hash
  }

  return (
    <div
      role="group"
      aria-label={locale === 'en' ? 'Choose language' : '언어 선택'}
      className="inline-flex shrink-0 items-center rounded-full border border-gray-200 bg-white p-0.5 shadow-md"
    >
      <a
        href={koreanPath}
        hrefLang="ko"
        lang="ko"
        aria-current={locale === 'ko' ? 'page' : undefined}
        onClick={preserveHash}
        className={`flex min-h-9 min-w-8 items-center justify-center rounded-full px-1 text-[11px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry-red sm:px-2 sm:text-xs ${locale === 'ko' ? 'bg-cherry-red text-white' : 'text-gray-700 hover:bg-rose-50'}`}
      >
        한국어
      </a>
      <a
        href={englishPath}
        hrefLang="en"
        lang="en"
        aria-current={locale === 'en' ? 'page' : undefined}
        onClick={preserveHash}
        className={`flex min-h-9 min-w-8 items-center justify-center rounded-full px-1 text-[11px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cherry-red sm:px-2 sm:text-xs ${locale === 'en' ? 'bg-cherry-red text-white' : 'text-gray-700 hover:bg-rose-50'}`}
      >
        EN
      </a>
    </div>
  )
}
