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

interface Partner {
  id: string
  name: string
  type: string | null
  logo_url: string | null
  website_url: string | null
  description: string | null
  is_visible: boolean
  sort_order: number
}

interface PartnerFormProps {
  partner?: Partner
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

const PARTNER_TYPES = [
  { value: 'hospital', label: '동물병원' },
  { value: 'shelter', label: '보호단체' },
  { value: 'company', label: '기업' },
  { value: 'association', label: '협회' },
  { value: 'international', label: '국제기관' },
  { value: 'brand', label: '브랜드' },
]

export function PartnerForm({ partner, userRole }: PartnerFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    type: partner?.type || '',
    logo_url: partner?.logo_url || '',
    website_url: partner?.website_url || '',
    description: partner?.description || '',
    is_visible: partner?.is_visible !== false,
    sort_order: partner?.sort_order || 0,
  })

  const isReadOnly = userRole === 'viewer'
  const isEdit = !!partner

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    if (!formData.name) {
      toast.error('파트너 이름을 입력해주세요')
      return
    }

    setIsLoading(true)

    try {
      const url = isEdit
        ? `/api/admin/partners/${partner.id}`
        : '/api/admin/partners'

      const response = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('파트너 저장 실패')
      }

      toast.success(isEdit ? '파트너가 수정되었습니다' : '파트너가 추가되었습니다')
      router.push('/admin/partners')
      router.refresh()
    } catch (error) {
      console.error('Error saving partner:', error)
      toast.error('파트너 저장 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>파트너 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                파트너 이름 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="예: CHERRY"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">파트너 유형</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
                disabled={isReadOnly}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {PARTNER_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="파트너에 대한 간단한 설명을 입력하세요"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">로고 URL</Label>
            <Input
              id="logo_url"
              value={formData.logo_url}
              onChange={(e) =>
                setFormData({ ...formData, logo_url: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://..."
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              투명 배경의 PNG 또는 SVG 파일을 권장합니다
            </p>
            {formData.logo_url && (
              <div className="mt-2 flex items-center justify-center h-32 bg-muted rounded-lg overflow-hidden">
                <img
                  src={formData.logo_url}
                  alt="Logo preview"
                  className="max-h-full max-w-full object-contain p-4"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder/partner-placeholder.svg'
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">웹사이트 URL</Label>
            <Input
              id="website_url"
              value={formData.website_url}
              onChange={(e) =>
                setFormData({ ...formData, website_url: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://..."
              type="url"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
          </div>

          {!isReadOnly && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/partners')}
                disabled={isLoading}
              >
                취소
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '저장 중...' : isEdit ? '수정' : '추가'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  )
}
