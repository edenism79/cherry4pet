'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Edit, Eye, EyeOff, Trash2, ExternalLink } from 'lucide-react'

interface Partner {
  id: string
  name: string
  type: string | null
  logo_url: string | null
  website_url: string | null
  description: string | null
  is_visible: boolean
  sort_order: number
  created_at: string
}

interface PartnerListProps {
  partners: Partner[]
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

const PARTNER_TYPES: Record<string, string> = {
  hospital: '동물병원',
  shelter: '보호단체',
  company: '기업',
  association: '협회',
  international: '국제기관',
  brand: '브랜드',
}

export function PartnerList({ partners, userRole }: PartnerListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const isReadOnly = userRole === 'viewer'

  const handleDelete = async (id: string) => {
    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    if (!confirm('정말 이 파트너를 삭제하시겠습니까?')) {
      return
    }

    setDeletingId(id)

    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('파트너 삭제 실패')
      }

      toast.success('파트너가 삭제되었습니다')
      router.refresh()
    } catch (error) {
      console.error('Error deleting partner:', error)
      toast.error('파트너 삭제 중 오류가 발생했습니다')
    } finally {
      setDeletingId(null)
    }
  }

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    try {
      const response = await fetch(`/api/admin/partners/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_visible: !currentVisibility,
        }),
      })

      if (!response.ok) {
        throw new Error('노출 상태 변경 실패')
      }

      toast.success(
        currentVisibility ? '파트너가 숨김 처리되었습니다' : '파트너가 공개되었습니다'
      )
      router.refresh()
    } catch (error) {
      console.error('Error toggling visibility:', error)
      toast.error('노출 상태 변경 중 오류가 발생했습니다')
    }
  }

  if (!partners || partners.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">등록된 파트너가 없습니다.</p>
          {!isReadOnly && (
            <Link href="/admin/partners/new">
              <Button className="mt-4">첫 파트너 추가하기</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {partners.map((partner) => (
        <Card key={partner.id}>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg">{partner.name}</CardTitle>
                <CardDescription>
                  {partner.type && PARTNER_TYPES[partner.type]}
                </CardDescription>
              </div>
              {!partner.is_visible && (
                <Badge variant="secondary">숨김</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partner.logo_url && (
                <div className="flex items-center justify-center h-24 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain p-2"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder/partner-placeholder.svg'
                    }}
                  />
                </div>
              )}

              {partner.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {partner.description}
                </p>
              )}

              {partner.website_url && (
                <a
                  href={partner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  웹사이트 방문
                </a>
              )}

              <div className="text-xs text-muted-foreground">
                정렬 순서: {partner.sort_order}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                {!isReadOnly && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleToggleVisibility(partner.id, partner.is_visible)
                      }
                      title={partner.is_visible ? '숨기기' : '공개'}
                    >
                      {partner.is_visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Link href={`/admin/partners/${partner.id}`}>
                      <Button size="sm" variant="ghost" title="편집">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(partner.id)}
                      disabled={deletingId === partner.id}
                      title="삭제"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </>
                )}
                {isReadOnly && (
                  <Link href={`/admin/partners/${partner.id}`}>
                    <Button size="sm" variant="ghost" title="보기">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
