'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Settings {
  id: string
  site_name: string
  [key: string]: any
}

interface SeoEditorProps {
  settings: Settings | null
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

export function SeoEditor({ settings, userRole }: SeoEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    meta_title: (settings as any)?.meta_title || settings?.site_name || '',
    meta_description: (settings as any)?.meta_description || '',
    meta_keywords: (settings as any)?.meta_keywords || '',
    og_title: (settings as any)?.og_title || settings?.site_name || '',
    og_description: (settings as any)?.og_description || '',
    og_image: (settings as any)?.og_image || '',
    canonical_url: (settings as any)?.canonical_url || 'https://cherry4pet.com',
  })

  const isReadOnly = userRole === 'viewer'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/seo', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('SEO 정보 업데이트 실패')
      }

      toast.success('SEO 정보가 업데이트되었습니다')
      router.refresh()
    } catch (error) {
      console.error('Error updating SEO:', error)
      toast.error('SEO 정보 업데이트 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>기본 메타 태그</CardTitle>
          <CardDescription>
            검색 엔진에 표시될 기본 정보입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta_title">사이트 제목 (Meta Title)</Label>
            <Input
              id="meta_title"
              value={formData.meta_title}
              onChange={(e) =>
                setFormData({ ...formData, meta_title: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="CHERRY for PET | 반려동물을 위한 투명한 기부 플랫폼"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              권장 길이: 50-60자 (현재: {formData.meta_title.length}자)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">사이트 설명 (Meta Description)</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) =>
                setFormData({ ...formData, meta_description: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="CHERRY for PET은 구조, 치료, 보호, 입양을 위한 반려동물 전용 투명한 기부 플랫폼입니다."
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              권장 길이: 150-160자 (현재: {formData.meta_description.length}자)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_keywords">키워드 (Meta Keywords)</Label>
            <Input
              id="meta_keywords"
              value={formData.meta_keywords}
              onChange={(e) =>
                setFormData({ ...formData, meta_keywords: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="반려동물, 기부, 구조, 치료, 보호소, 입양, CHERRY"
            />
            <p className="text-xs text-muted-foreground">
              쉼표로 구분하여 입력하세요
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical_url">Canonical URL</Label>
            <Input
              id="canonical_url"
              value={formData.canonical_url}
              onChange={(e) =>
                setFormData({ ...formData, canonical_url: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://cherry4pet.com"
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              사이트의 기본 URL을 입력하세요
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>오픈 그래프 (Open Graph)</CardTitle>
          <CardDescription>
            소셜 미디어에 공유될 때 표시될 정보입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="og_title">OG 제목</Label>
            <Input
              id="og_title"
              value={formData.og_title}
              onChange={(e) =>
                setFormData({ ...formData, og_title: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="CHERRY for PET"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og_description">OG 설명</Label>
            <Textarea
              id="og_description"
              value={formData.og_description}
              onChange={(e) =>
                setFormData({ ...formData, og_description: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="반려동물을 위한 가장 투명한 기부 플랫폼"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og_image">OG 이미지 URL</Label>
            <Input
              id="og_image"
              value={formData.og_image}
              onChange={(e) =>
                setFormData({ ...formData, og_image: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://..."
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              권장 크기: 1200x630px
            </p>
            {formData.og_image && (
              <div className="mt-2">
                <img
                  src={formData.og_image}
                  alt="OG Preview"
                  className="max-w-md rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder/hero-pet.jpg'
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
  )
}
