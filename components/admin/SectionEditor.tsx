'use client'

import { useState, useRef } from 'react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImageUploader } from './ImageUploader'
import { Upload, X } from 'lucide-react'

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mediaAssets, setMediaAssets] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
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

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml']

  const fetchMediaAssets = async () => {
    try {
      const response = await fetch('/api/admin/media')
      if (response.ok) {
        const data = await response.json()
        setMediaAssets(data)
      }
    } catch (error) {
      console.error('Error fetching media assets:', error)
    }
  }

  const handleUploadComplete = () => {
    fetchMediaAssets()
    toast.success('이미지가 업로드되었습니다. 미디어 라이브러리에서 선택해주세요.')
  }

  const handleSelectMedia = (url: string) => {
    setFormData({ ...formData, image_url: url })
    setIsDialogOpen(false)
    toast.success('이미지가 선택되었습니다')
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('지원하지 않는 파일 형식입니다. PNG, JPG, JPEG, WebP, SVG만 가능합니다.')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('파일 크기는 5MB 이하여야 합니다.')
      return
    }

    setIsUploading(true)

    try {
      const formDataToUpload = new FormData()
      formDataToUpload.append('file', file)
      formDataToUpload.append('alt_text', `${sectionName} 이미지`)

      const response = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formDataToUpload,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '업로드 실패')
      }

      const data = await response.json()
      setFormData({ ...formData, image_url: data.file_url })
      toast.success('이미지가 업로드되었습니다')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error(error instanceof Error ? error.message : '이미지 업로드 중 오류가 발생했습니다')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

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
            <Label htmlFor={`image-${section.id}`}>이미지</Label>

            {!formData.image_url ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-primary/50'
                } ${isReadOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
                onDragEnter={!isReadOnly ? handleDrag : undefined}
                onDragLeave={!isReadOnly ? handleDrag : undefined}
                onDragOver={!isReadOnly ? handleDrag : undefined}
                onDrop={!isReadOnly ? handleDrop : undefined}
                onClick={() => !isReadOnly && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={ALLOWED_TYPES.join(',')}
                  onChange={handleFileInputChange}
                  disabled={isReadOnly || isUploading}
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {isUploading ? (
                  <p className="text-sm font-medium mb-1">업로드 중...</p>
                ) : (
                  <>
                    <p className="text-sm font-medium mb-1">
                      클릭하거나 파일을 드래그하여 업로드
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, JPEG, WebP, SVG (최대 5MB)
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="relative rounded-lg overflow-hidden border">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full max-h-64 object-contain bg-muted"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder/hero-pet.jpg'
                    }}
                  />
                  {!isReadOnly && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {!isReadOnly && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      이미지 변경
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept={ALLOWED_TYPES.join(',')}
                      onChange={handleFileInputChange}
                      disabled={isUploading}
                    />
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                      setIsDialogOpen(open)
                      if (open) fetchMediaAssets()
                    }}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline" className="flex-1">
                          미디어 라이브러리
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>미디어 라이브러리</DialogTitle>
                          <DialogDescription>
                            기존에 업로드된 이미지를 선택하세요
                          </DialogDescription>
                        </DialogHeader>
                        {mediaAssets.length === 0 ? (
                          <div className="text-center py-12 text-muted-foreground">
                            등록된 이미지가 없습니다.
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {mediaAssets.map((asset) => (
                              <div
                                key={asset.id}
                                className="border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
                                onClick={() => handleSelectMedia(asset.file_url)}
                              >
                                <img
                                  src={asset.file_url}
                                  alt={asset.alt_text || asset.file_name}
                                  className="w-full h-40 object-cover"
                                />
                                <div className="p-2 text-xs truncate">
                                  {asset.file_name}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
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
