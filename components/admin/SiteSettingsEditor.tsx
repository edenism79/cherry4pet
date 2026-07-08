'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Upload, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Settings {
  id: string
  site_name: string
  logo_url: string | null
  favicon_url: string | null
  primary_cta_label: string
  primary_cta_url: string | null
  footer_company_name: string | null
  footer_business_info: string | null
  privacy_url: string | null
  terms_url: string | null
  sns_links: any
  is_published: boolean
}

interface SiteSettingsEditorProps {
  settings: Settings | null
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

export function SiteSettingsEditor({ settings, userRole }: SiteSettingsEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const supabase = createClient()
  const [formData, setFormData] = useState({
    site_name: settings?.site_name || 'CHERRY for PET',
    logo_url: settings?.logo_url || '',
    favicon_url: settings?.favicon_url || '',
    primary_cta_label: settings?.primary_cta_label || '지금 기부하기',
    primary_cta_url: settings?.primary_cta_url || '',
    footer_company_name: settings?.footer_company_name || 'CHERRY for PET',
    footer_business_info: settings?.footer_business_info || '',
    privacy_url: settings?.privacy_url || '',
    terms_url: settings?.terms_url || '',
    sns_links: settings?.sns_links || {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
    },
    is_published: settings?.is_published !== false,
  })

  const isReadOnly = userRole === 'viewer'

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('파일 크기는 5MB 이하여야 합니다')
      return
    }

    setIsUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `logo-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('public-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('public-assets').getPublicUrl(filePath)

      setFormData({ ...formData, logo_url: publicUrl })
      toast.success('로고가 업로드되었습니다')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('업로드 중 오류가 발생했습니다')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveLogo = () => {
    setFormData({ ...formData, logo_url: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('설정 업데이트 실패')
      }

      toast.success('설정이 업데이트되었습니다')
      router.refresh()
    } catch (error) {
      console.error('Error updating settings:', error)
      toast.error('설정 업데이트 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription>
            사이트의 기본 정보를 설정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site_name">사이트 이름</Label>
            <Input
              id="site_name"
              value={formData.site_name}
              onChange={(e) =>
                setFormData({ ...formData, site_name: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="CHERRY for PET"
            />
          </div>

          <div className="space-y-2">
            <Label>로고</Label>
            {formData.logo_url ? (
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 border rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={formData.logo_url}
                    alt="Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">현재 로고</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveLogo}
                    disabled={isReadOnly}
                  >
                    <X className="w-4 h-4 mr-1" />
                    제거
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={isReadOnly || isUploading}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG, SVG (최대 5MB, 권장 크기: 512x512px)
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="favicon_url">파비콘 URL</Label>
            <Input
              id="favicon_url"
              value={formData.favicon_url}
              onChange={(e) =>
                setFormData({ ...formData, favicon_url: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://..."
              type="url"
            />
            <p className="text-xs text-muted-foreground">
              권장 크기: 32x32px 또는 64x64px
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="is_published">사이트 공개 여부</Label>
            <Select
              value={formData.is_published ? 'published' : 'draft'}
              onValueChange={(value) =>
                setFormData({ ...formData, is_published: value === 'published' })
              }
              disabled={isReadOnly}
            >
              <SelectTrigger id="is_published">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">공개</SelectItem>
                <SelectItem value="draft">비공개</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              비공개로 설정하면 관리자만 사이트에 접근할 수 있습니다
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>메인 CTA</CardTitle>
          <CardDescription>
            사이트 전반에 사용될 메인 Call-to-Action 버튼 설정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primary_cta_label">CTA 버튼 텍스트</Label>
            <Input
              id="primary_cta_label"
              value={formData.primary_cta_label}
              onChange={(e) =>
                setFormData({ ...formData, primary_cta_label: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="지금 기부하기"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primary_cta_url">CTA 버튼 URL</Label>
            <Input
              id="primary_cta_url"
              value={formData.primary_cta_url}
              onChange={(e) =>
                setFormData({ ...formData, primary_cta_url: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="https://..."
              type="url"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>푸터 정보</CardTitle>
          <CardDescription>
            사이트 하단에 표시될 정보입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="footer_company_name">회사명</Label>
            <Input
              id="footer_company_name"
              value={formData.footer_company_name}
              onChange={(e) =>
                setFormData({ ...formData, footer_company_name: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="CHERRY for PET"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="footer_business_info">사업자 정보</Label>
            <Textarea
              id="footer_business_info"
              value={formData.footer_business_info}
              onChange={(e) =>
                setFormData({ ...formData, footer_business_info: e.target.value })
              }
              disabled={isReadOnly}
              placeholder="사업자등록번호, 주소, 대표자명 등"
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="privacy_url">개인정보처리방침 URL</Label>
              <Input
                id="privacy_url"
                value={formData.privacy_url}
                onChange={(e) =>
                  setFormData({ ...formData, privacy_url: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="https://..."
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="terms_url">이용약관 URL</Label>
              <Input
                id="terms_url"
                value={formData.terms_url}
                onChange={(e) =>
                  setFormData({ ...formData, terms_url: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="https://..."
                type="url"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>소셜 미디어 링크</CardTitle>
          <CardDescription>
            SNS 링크를 설정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sns_facebook">Facebook</Label>
              <Input
                id="sns_facebook"
                value={formData.sns_links.facebook || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sns_links: { ...formData.sns_links, facebook: e.target.value },
                  })
                }
                disabled={isReadOnly}
                placeholder="https://facebook.com/..."
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sns_instagram">Instagram</Label>
              <Input
                id="sns_instagram"
                value={formData.sns_links.instagram || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sns_links: { ...formData.sns_links, instagram: e.target.value },
                  })
                }
                disabled={isReadOnly}
                placeholder="https://instagram.com/..."
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sns_twitter">Twitter</Label>
              <Input
                id="sns_twitter"
                value={formData.sns_links.twitter || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sns_links: { ...formData.sns_links, twitter: e.target.value },
                  })
                }
                disabled={isReadOnly}
                placeholder="https://twitter.com/..."
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sns_youtube">YouTube</Label>
              <Input
                id="sns_youtube"
                value={formData.sns_links.youtube || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sns_links: { ...formData.sns_links, youtube: e.target.value },
                  })
                }
                disabled={isReadOnly}
                placeholder="https://youtube.com/..."
                type="url"
              />
            </div>
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
