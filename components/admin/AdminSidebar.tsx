"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { AdminRole } from "@/types/cms"
import {
  LayoutDashboard,
  FileText,
  Heart,
  Users,
  Image as ImageIcon,
  Mail,
  Search,
  Settings,
} from "lucide-react"

interface AdminSidebarProps {
  role: AdminRole
}

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "대시보드" },
  { href: "/admin/sections", icon: FileText, label: "섹션 관리" },
  { href: "/admin/campaigns", icon: Heart, label: "캠페인 관리" },
  { href: "/admin/partners", icon: Users, label: "파트너 관리" },
  { href: "/admin/media", icon: ImageIcon, label: "미디어 관리" },
  { href: "/admin/inquiries", icon: Mail, label: "문의 관리" },
  { href: "/admin/seo", icon: Search, label: "SEO 관리" },
  { href: "/admin/settings", icon: Settings, label: "사이트 설정" },
]

export default function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-cherry-red">CHERRY for PET</h1>
        <p className="text-sm text-gray-600 mt-1">관리자 페이지</p>
      </div>
      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-cherry-cream text-cherry-red"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 mt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">역할: {role === 'super_admin' ? '최고 관리자' : role === 'content_admin' ? '콘텐츠 관리자' : '뷰어'}</p>
      </div>
    </aside>
  )
}
