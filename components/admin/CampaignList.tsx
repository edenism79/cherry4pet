'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
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
import { Edit, Eye, EyeOff, Trash2, Star } from 'lucide-react'

interface Campaign {
  id: string
  title: string
  organization: string | null
  summary: string | null
  image_url: string | null
  goal_amount: number
  raised_amount: number
  start_date: string | null
  end_date: string | null
  external_url: string | null
  category: string | null
  is_featured: boolean
  is_visible: boolean
  sort_order: number
  created_at: string
}

interface CampaignListProps {
  campaigns: Campaign[]
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

export function CampaignList({ campaigns, userRole }: CampaignListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const isReadOnly = userRole === 'viewer'

  const handleDelete = async (id: string) => {
    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    if (!confirm('정말 이 캠페인을 삭제하시겠습니까?')) {
      return
    }

    setDeletingId(id)

    try {
      const response = await fetch(`/api/admin/campaigns/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('캠페인 삭제 실패')
      }

      toast.success('캠페인이 삭제되었습니다')
      router.refresh()
    } catch (error) {
      console.error('Error deleting campaign:', error)
      toast.error('캠페인 삭제 중 오류가 발생했습니다')
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
      const response = await fetch(`/api/admin/campaigns/${id}`, {
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
        currentVisibility ? '캠페인이 숨김 처리되었습니다' : '캠페인이 공개되었습니다'
      )
      router.refresh()
    } catch (error) {
      console.error('Error toggling visibility:', error)
      toast.error('노출 상태 변경 중 오류가 발생했습니다')
    }
  }

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    try {
      const response = await fetch(`/api/admin/campaigns/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_featured: !currentFeatured,
        }),
      })

      if (!response.ok) {
        throw new Error('대표 캠페인 설정 실패')
      }

      toast.success(
        currentFeatured
          ? '대표 캠페인에서 제외되었습니다'
          : '대표 캠페인으로 설정되었습니다'
      )
      router.refresh()
    } catch (error) {
      console.error('Error toggling featured:', error)
      toast.error('대표 캠페인 설정 중 오류가 발생했습니다')
    }
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    if (goal === 0) return 0
    return Math.min(Math.round((raised / goal) * 100), 100)
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">등록된 캠페인이 없습니다.</p>
          {!isReadOnly && (
            <Link href="/admin/campaigns/new">
              <Button className="mt-4">첫 캠페인 만들기</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {campaigns.map((campaign) => {
        const progress = getProgressPercentage(campaign.raised_amount, campaign.goal_amount)

        return (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{campaign.title}</CardTitle>
                    {campaign.is_featured && (
                      <Badge variant="default">
                        <Star className="h-3 w-3 mr-1" />
                        대표
                      </Badge>
                    )}
                    {!campaign.is_visible && (
                      <Badge variant="secondary">숨김</Badge>
                    )}
                    {campaign.category && (
                      <Badge variant="outline">{campaign.category}</Badge>
                    )}
                  </div>
                  <CardDescription>
                    {campaign.organization && `${campaign.organization} • `}
                    {formatDistanceToNow(new Date(campaign.created_at), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {!isReadOnly && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleToggleFeatured(campaign.id, campaign.is_featured)
                        }
                        title={campaign.is_featured ? '대표 해제' : '대표 설정'}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            campaign.is_featured ? 'fill-current' : ''
                          }`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleToggleVisibility(campaign.id, campaign.is_visible)
                        }
                        title={campaign.is_visible ? '숨기기' : '공개'}
                      >
                        {campaign.is_visible ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Link href={`/admin/campaigns/${campaign.id}`}>
                        <Button size="sm" variant="ghost" title="편집">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(campaign.id)}
                        disabled={deletingId === campaign.id}
                        title="삭제"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </>
                  )}
                  {isReadOnly && (
                    <Link href={`/admin/campaigns/${campaign.id}`}>
                      <Button size="sm" variant="ghost" title="보기">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                {campaign.image_url && (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={campaign.image_url}
                      alt={campaign.title}
                      className="h-32 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder/campaign-placeholder.jpg'
                      }}
                    />
                  </div>
                )}
                <div className="space-y-3">
                  {campaign.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {campaign.summary}
                    </p>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">달성률</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {campaign.raised_amount.toLocaleString()}원
                      </span>
                      <span className="text-muted-foreground">
                        목표: {campaign.goal_amount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  {campaign.external_url && (
                    <div className="text-xs text-muted-foreground truncate">
                      연결 URL: {campaign.external_url}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
