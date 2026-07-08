'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
}

interface CampaignFormProps {
  campaign?: Campaign
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

const CATEGORIES = [
  '구조',
  '치료',
  '보호소',
  '입양',
  '광견병예방',
  '기타',
]

export function CampaignForm({ campaign, userRole }: CampaignFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: campaign?.title || '',
    organization: campaign?.organization || '',
    summary: campaign?.summary || '',
    image_url: campaign?.image_url || '',
    goal_amount: campaign?.goal_amount || 0,
    raised_amount: campaign?.raised_amount || 0,
    start_date: campaign?.start_date || '',
    end_date: campaign?.end_date || '',
    external_url: campaign?.external_url || '',
    category: campaign?.category || '',
    is_featured: campaign?.is_featured || false,
    is_visible: campaign?.is_visible !== false,
    sort_order: campaign?.sort_order || 0,
  })

  const isReadOnly = userRole === 'viewer'
  const isEdit = !!campaign

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    if (!formData.title) {
      toast.error('캠페인 제목을 입력해주세요')
      return
    }

    if (formData.goal_amount < 0 || formData.raised_amount < 0) {
      toast.error('금액은 0 이상이어야 합니다')
      return
    }

    setIsLoading(true)

    try {
      const url = isEdit
        ? `/api/admin/campaigns/${campaign.id}`
        : '/api/admin/campaigns'

      const response = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('캠페인 저장 실패')
      }

      toast.success(isEdit ? '캠페인이 수정되었습니다' : '캠페인이 생성되었습니다')
      router.push('/admin/campaigns')
      router.refresh()
    } catch (error) {
      console.error('Error saving campaign:', error)
      toast.error('캠페인 저장 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>캠페인 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">
                캠페인 제목 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="예: 구조견 치료비 지원"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">단체명</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) =>
                  setFormData({ ...formData, organization: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="예: 동물사랑실천협회"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">요약</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="캠페인 내용을 간단히 요약해주세요"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">이미지 URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://..."
              type="url"
            />
            {formData.image_url && (
              <div className="mt-2">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="max-w-xs rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder/campaign-placeholder.jpg'
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="goal_amount">목표 금액 (원)</Label>
              <Input
                id="goal_amount"
                type="number"
                value={formData.goal_amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    goal_amount: Number(e.target.value),
                  })
                }
                disabled={isReadOnly}
                min="0"
                step="1000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="raised_amount">현재 모금액 (원)</Label>
              <Input
                id="raised_amount"
                type="number"
                value={formData.raised_amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    raised_amount: Number(e.target.value),
                  })
                }
                disabled={isReadOnly}
                min="0"
                step="1000"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start_date">시작일</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                disabled={isReadOnly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date">종료일</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="external_url">외부 URL (기부 링크)</Label>
            <Input
              id="external_url"
              value={formData.external_url}
              onChange={(e) =>
                setFormData({ ...formData, external_url: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://..."
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              사용자가 "기부하기" 버튼을 클릭했을 때 이동할 URL을 입력하세요.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                disabled={isReadOnly}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order">정렬 순서</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: Number(e.target.value),
                  })
                }
                disabled={isReadOnly}
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                작은 숫자일수록 먼저 표시됩니다
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="is_featured">대표 캠페인</Label>
              <Select
                value={formData.is_featured ? 'yes' : 'no'}
                onValueChange={(value) =>
                  setFormData({ ...formData, is_featured: value === 'yes' })
                }
                disabled={isReadOnly}
              >
                <SelectTrigger id="is_featured">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">예</SelectItem>
                  <SelectItem value="no">아니오</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="is_visible">노출 여부</Label>
            <Select
              value={formData.is_visible ? 'visible' : 'hidden'}
              onValueChange={(value) =>
                setFormData({ ...formData, is_visible: value === 'visible' })
              }
              disabled={isReadOnly}
            >
              <SelectTrigger id="is_visible">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visible">노출</SelectItem>
                <SelectItem value="hidden">숨김</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!isReadOnly && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/campaigns')}
                disabled={isLoading}
              >
                취소
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '저장 중...' : isEdit ? '수정' : '생성'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}
