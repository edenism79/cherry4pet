'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

interface Section {
  id: string
  section_key: string
  title: string | null
  subtitle: string | null
  body: string | null
  image_url: string | null
  cta_label: string | null
  cta_url: string | null
  extra: any
  sort_order: number
  is_visible: boolean
}

interface SectionEditorProps {
  section: Section
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

const SECTION_NAMES: Record<string, string> = {
  hero: 'Hero 섹션',
  why_pet: 'Why PET 섹션',
  how_it_works: 'How It Works 섹션',
  transparency: '투명성 섹션',
  cherry_photo: 'CHERRY Photo 섹션',
  partners: '파트너 섹션',
  impact: 'Impact Metrics 섹션',
  final_cta: 'Final CTA 섹션',
}

export function SectionEditor({ section, userRole }: SectionEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: section.title || '',
    subtitle: section.subtitle || '',
    body: section.body || '',
    image_url: section.image_url || '',
    cta_label: section.cta_label || '',
    cta_url: section.cta_url || '',
    is_visible: section.is_visible,
  })

  const isReadOnly = userRole === 'viewer'
  const sectionName = SECTION_NAMES[section.section_key] || section.section_key

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/sections', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: section.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error('섹션 업데이트 실패')
      }

      toast.success('섹션이 업데이트되었습니다')
      router.refresh()
    } catch (error) {
      console.error('Error updating section:', error)
      toast.error('섹션 업데이트 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{sectionName}</CardTitle>
        <CardDescription>
          Section Key: {section.section_key}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`title-${section.id}`}>제목</Label>
              <Input
                id={`title-${section.id}`}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="섹션 제목을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`subtitle-${section.id}`}>부제목</Label>
              <Input
                id={`subtitle-${section.id}`}
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="부제목을 입력하세요"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`body-${section.id}`}>본문</Label>
            <Textarea
              id={`body-${section.id}`}
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="본문 내용을 입력하세요"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`image-${section.id}`}>이미지 URL</Label>
            <Input
              id={`image-${section.id}`}
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
                    e.currentTarget.src = '/placeholder/hero-pet.jpg'
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`cta-label-${section.id}`}>CTA 버튼 텍스트</Label>
              <Input
                id={`cta-label-${section.id}`}
                value={formData.cta_label}
                onChange={(e) =>
                  setFormData({ ...formData, cta_label: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="지금 기부하기"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`cta-url-${section.id}`}>CTA 버튼 URL</Label>
              <Input
                id={`cta-url-${section.id}`}
                value={formData.cta_url}
                onChange={(e) =>
                  setFormData({ ...formData, cta_url: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="https://..."
                type="url"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`visibility-${section.id}`}>노출 여부</Label>
            <Select
              value={formData.is_visible ? 'visible' : 'hidden'}
              onValueChange={(value) =>
                setFormData({ ...formData, is_visible: value === 'visible' })
              }
              disabled={isReadOnly}
            >
              <SelectTrigger id={`visibility-${section.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visible">노출</SelectItem>
                <SelectItem value="hidden">숨김</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!isReadOnly && (
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.refresh()}
                disabled={isLoading}
              >
                취소
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '저장 중...' : '저장'}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
