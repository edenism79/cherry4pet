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
  const [isBgDialogOpen, setIsBgDialogOpen] = useState(false)
  const [mediaAssets, setMediaAssets] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: section.title || '',
    subtitle: section.subtitle || '',
    body: section.body || '',
    image_url: section.image_url || '',
    cta_label: section.cta_label || '',
    cta_url: section.cta_url || '',
    is_visible: section.is_visible,
    extra: section.extra || {},
  })

  // Style settings for all sections
  const [titleColor, setTitleColor] = useState(
    (section.extra as any)?.title_color || '#E9415A'
  )
  const [titleFont, setTitleFont] = useState(
    (section.extra as any)?.title_font || 'Pretendard'
  )
  const [titleSize, setTitleSize] = useState(
    (section.extra as any)?.title_size || '48'
  )
  const [subtitleColor, setSubtitleColor] = useState(
    (section.extra as any)?.subtitle_color || '#E9415A'
  )
  const [subtitleSize, setSubtitleSize] = useState(
    (section.extra as any)?.subtitle_size || '24'
  )
  const [bodyColor, setBodyColor] = useState(
    (section.extra as any)?.body_color || '#6B7280'
  )
  const [bodyFont, setBodyFont] = useState(
    (section.extra as any)?.body_font || 'Pretendard'
  )
  const [bodySize, setBodySize] = useState(
    (section.extra as any)?.body_size || '16'
  )
  const [backgroundImage, setBackgroundImage] = useState(
    (section.extra as any)?.background_image || ''
  )
  const [backgroundOpacity, setBackgroundOpacity] = useState(
    (section.extra as any)?.background_opacity || 100
  )
  const [mouImage, setMouImage] = useState(
    (section.extra as any)?.mou_image || ''
  )

  // Impact Metrics state
  const [metrics, setMetrics] = useState<Array<{label: string; value: number; unit: string; prefix?: string}>>(
    (section.extra as any)?.metrics || [
      { label: '누적 기부금', value: 500000000, unit: '원', prefix: '' },
      { label: '참여자 수', value: 10000, unit: '명', prefix: '' },
      { label: '지원 캠페인', value: 200, unit: '개', prefix: '' },
      { label: '구조/치료 동물', value: 1000, unit: '마리', prefix: '' },
      { label: '파트너', value: 100, unit: '곳', prefix: '' },
    ]
  )

  // Debug: Log initial values
  console.log('🎬 SectionEditor initialized:')
  console.log('  - Initial backgroundImage:', (section.extra as any)?.background_image)
  console.log('  - Current backgroundImage state:', backgroundImage)

  const isReadOnly = userRole === 'viewer'
  const sectionName = SECTION_NAMES[section.section_key] || section.section_key

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

  const handleSelectBackgroundImage = (url: string) => {
    console.log('🖼️ handleSelectBackgroundImage called with URL:', url)
    setBackgroundImage(url)
    console.log('🖼️ setBackgroundImage executed')
    setIsBgDialogOpen(false)
    toast.success('배경 이미지가 선택되었습니다')
    console.log('🖼️ Background image state should be updated to:', url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    // Debug: Log values before saving
    console.log('💾 Saving Section Data:')
    console.log('  - backgroundImage state:', backgroundImage)
    console.log('  - backgroundOpacity state:', backgroundOpacity)

    setIsLoading(true)

    try {
      // Update extra field with style settings
      const updatedExtra = {
        ...formData.extra,
        title_color: titleColor,
        title_font: titleFont,
        title_size: titleSize,
        subtitle_color: subtitleColor,
        subtitle_size: subtitleSize,
        body_color: bodyColor,
        body_font: bodyFont,
        body_size: bodySize,
        background_image: backgroundImage,
        background_opacity: backgroundOpacity,
        mou_image: mouImage,
        metrics: section.section_key === 'impact' ? metrics : undefined,
      }

      console.log('  - updatedExtra.background_image:', updatedExtra.background_image)
      console.log('  - updatedExtra.mou_image:', updatedExtra.mou_image)
      console.log('  - Full updatedExtra:', updatedExtra)

      const response = await fetch('/api/admin/sections', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: section.id,
          ...formData,
          extra: updatedExtra,
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
            <Label htmlFor={`body-${section.id}`}>
              본문
              {section.section_key === 'impact' && (
                <span className="text-primary ml-2 text-sm font-normal">
                  ⭐ 목표치 보기 버튼 위에 표시되는 설명 문구입니다
                </span>
              )}
            </Label>
            <Textarea
              id={`body-${section.id}`}
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              disabled={isReadOnly}
              placeholder={
                section.section_key === 'impact'
                  ? '예: 여러분의 참여로 만들어질 목표입니다'
                  : '본문 내용을 입력하세요'
              }
              rows={4}
            />
            {section.section_key === 'impact' && (
              <p className="text-xs text-muted-foreground">
                💡 이 문구는 "목표치 보기" 버튼 위에 표시됩니다. 비워두면 기본값 "여러분의 참여로 만들어질 목표입니다"가 표시됩니다.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`image-${section.id}`}>이미지</Label>

            {!formData.image_url ? (
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open)
                if (open) fetchMediaAssets()
              }}>
                <DialogTrigger asChild>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary/50 ${
                      isReadOnly ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium mb-1">
                      미디어 라이브러리에서 이미지 선택
                    </p>
                    <p className="text-xs text-muted-foreground">
                      클릭하여 기존 이미지를 선택하거나 새로 업로드
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>미디어 라이브러리</DialogTitle>
                    <DialogDescription>
                      기존 이미지를 선택하거나 새 이미지를 업로드하세요
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="library" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="library">미디어 라이브러리</TabsTrigger>
                      <TabsTrigger value="upload">새 이미지 업로드</TabsTrigger>
                    </TabsList>

                    <TabsContent value="library" className="space-y-4">
                      {mediaAssets.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <p>업로드된 이미지가 없습니다.</p>
                          <p className="text-sm mt-2">"새 이미지 업로드" 탭에서 이미지를 추가하세요.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-4">
                          {mediaAssets.map((asset) => (
                            <div
                              key={asset.id}
                              className="relative group cursor-pointer border rounded-lg overflow-hidden hover:border-primary transition-colors"
                              onClick={() => handleSelectMedia(asset.file_url)}
                            >
                              <img
                                src={asset.file_url}
                                alt={asset.alt_text || asset.file_name}
                                className="w-full h-40 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white text-sm font-medium">선택</p>
                              </div>
                              <div className="p-2 bg-white">
                                <p className="text-xs truncate">{asset.file_name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="upload" className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8">
                        <ImageUploader onUploadComplete={handleUploadComplete} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
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
                  <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (open) fetchMediaAssets()
                  }}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        이미지 변경 (미디어 라이브러리)
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>미디어 라이브러리</DialogTitle>
                        <DialogDescription>
                          기존 이미지를 선택하거나 새 이미지를 업로드하세요
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="library" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="library">미디어 라이브러리</TabsTrigger>
                          <TabsTrigger value="upload">새 이미지 업로드</TabsTrigger>
                        </TabsList>

                        <TabsContent value="library" className="space-y-4">
                          {mediaAssets.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                              <p>업로드된 이미지가 없습니다.</p>
                              <p className="text-sm mt-2">"새 이미지 업로드" 탭에서 이미지를 추가하세요.</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-3 gap-4">
                              {mediaAssets.map((asset) => (
                                <div
                                  key={asset.id}
                                  className="relative group cursor-pointer border rounded-lg overflow-hidden hover:border-primary transition-colors"
                                  onClick={() => handleSelectMedia(asset.file_url)}
                                >
                                  <img
                                    src={asset.file_url}
                                    alt={asset.alt_text || asset.file_name}
                                    className="w-full h-40 object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <p className="text-white text-sm font-medium">선택</p>
                                  </div>
                                  <div className="p-2 bg-white">
                                    <p className="text-xs truncate">{asset.file_name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="upload" className="space-y-4">
                          <div className="border-2 border-dashed rounded-lg p-8">
                            <ImageUploader onUploadComplete={handleUploadComplete} />
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
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
              <Label htmlFor={`cta-url-${section.id}`}>CTA 버튼 URL (선택사항)</Label>
              <Input
                id={`cta-url-${section.id}`}
                value={formData.cta_url}
                onChange={(e) =>
                  setFormData({ ...formData, cta_url: e.target.value })
                }
                disabled={isReadOnly}
                placeholder="https://... (비워두면 Coming Soon 팝업)"
                type="text"
              />
              <p className="text-xs text-muted-foreground">
                비워두면 Coming Soon 팝업이 표시됩니다.
              </p>
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

          <div className="border-t pt-4 space-y-4">
            <h3 className="text-lg font-semibold">스타일 설정</h3>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`title-color-${section.id}`}>제목 색상</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`title-color-${section.id}`}
                      type="color"
                      value={titleColor}
                      onChange={(e) => setTitleColor(e.target.value)}
                      disabled={isReadOnly}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={titleColor}
                      onChange={(e) => setTitleColor(e.target.value)}
                      disabled={isReadOnly}
                      placeholder="#E9415A"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">추천: #E9415A (Cherry Red), #B91C3B (Deep Cherry)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`subtitle-color-${section.id}`}>부제목 색상</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`subtitle-color-${section.id}`}
                      type="color"
                      value={subtitleColor}
                      onChange={(e) => setSubtitleColor(e.target.value)}
                      disabled={isReadOnly}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={subtitleColor}
                      onChange={(e) => setSubtitleColor(e.target.value)}
                      disabled={isReadOnly}
                      placeholder="#E9415A"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`title-font-${section.id}`}>제목 폰트</Label>
                  <Select
                    value={titleFont}
                    onValueChange={setTitleFont}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger id={`title-font-${section.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pretendard">Pretendard (기본)</SelectItem>
                      <SelectItem value="'Noto Sans KR', sans-serif">Noto Sans KR</SelectItem>
                      <SelectItem value="'Nanum Gothic', sans-serif">나눔고딕</SelectItem>
                      <SelectItem value="'Nanum Myeongjo', serif">나눔명조</SelectItem>
                      <SelectItem value="'Gothic A1', sans-serif">Gothic A1</SelectItem>
                      <SelectItem value="'Black Han Sans', sans-serif">Black Han Sans</SelectItem>
                      <SelectItem value="'Jua', sans-serif">주아체</SelectItem>
                      <SelectItem value="'Do Hyeon', sans-serif">도현체</SelectItem>
                      <SelectItem value="'Noto Serif KR', serif">Noto Serif KR</SelectItem>
                      <SelectItem value="'Gowun Batang', serif">고운 바탕</SelectItem>
                      <SelectItem value="'Gowun Dodum', sans-serif">고운 돋움</SelectItem>
                      <SelectItem value="'Cute Font', cursive">Cute Font</SelectItem>
                      <SelectItem value="'Gaegu', cursive">개구쟁이체</SelectItem>
                      <SelectItem value="'Gamja Flower', cursive">감자꽃체</SelectItem>
                      <SelectItem value="'Sunflower', sans-serif">Sunflower</SelectItem>
                      <SelectItem value="'Stylish', sans-serif">Stylish</SelectItem>
                      <SelectItem value="'Poor Story', cursive">Poor Story</SelectItem>
                      <SelectItem value="'Single Day', cursive">Single Day</SelectItem>
                      <SelectItem value="'Yeon Sung', cursive">Yeon Sung</SelectItem>
                      <SelectItem value="'Hi Melody', cursive">Hi Melody</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`title-size-${section.id}`}>제목 크기 (px)</Label>
                  <Input
                    id={`title-size-${section.id}`}
                    type="number"
                    value={titleSize}
                    onChange={(e) => setTitleSize(e.target.value)}
                    disabled={isReadOnly}
                    placeholder="48"
                    min="12"
                    max="120"
                  />
                  <p className="text-xs text-muted-foreground">권장: 36-72px</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`subtitle-size-${section.id}`}>부제목 크기 (px)</Label>
                  <Input
                    id={`subtitle-size-${section.id}`}
                    type="number"
                    value={subtitleSize}
                    onChange={(e) => setSubtitleSize(e.target.value)}
                    disabled={isReadOnly}
                    placeholder="24"
                    min="12"
                    max="72"
                  />
                  <p className="text-xs text-muted-foreground">권장: 18-36px</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`body-color-${section.id}`}>본문 색상</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`body-color-${section.id}`}
                      type="color"
                      value={bodyColor}
                      onChange={(e) => setBodyColor(e.target.value)}
                      disabled={isReadOnly}
                      className="w-20 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={bodyColor}
                      onChange={(e) => setBodyColor(e.target.value)}
                      disabled={isReadOnly}
                      placeholder="#6B7280"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`body-font-${section.id}`}>본문 폰트</Label>
                  <Select
                    value={bodyFont}
                    onValueChange={setBodyFont}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger id={`body-font-${section.id}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pretendard">Pretendard (기본)</SelectItem>
                      <SelectItem value="'Noto Sans KR', sans-serif">Noto Sans KR</SelectItem>
                      <SelectItem value="'Nanum Gothic', sans-serif">나눔고딕</SelectItem>
                      <SelectItem value="'Nanum Myeongjo', serif">나눔명조</SelectItem>
                      <SelectItem value="'Gothic A1', sans-serif">Gothic A1</SelectItem>
                      <SelectItem value="'Black Han Sans', sans-serif">Black Han Sans</SelectItem>
                      <SelectItem value="'Jua', sans-serif">주아체</SelectItem>
                      <SelectItem value="'Do Hyeon', sans-serif">도현체</SelectItem>
                      <SelectItem value="'Noto Serif KR', serif">Noto Serif KR</SelectItem>
                      <SelectItem value="'Gowun Batang', serif">고운 바탕</SelectItem>
                      <SelectItem value="'Gowun Dodum', sans-serif">고운 돋움</SelectItem>
                      <SelectItem value="'Cute Font', cursive">Cute Font</SelectItem>
                      <SelectItem value="'Gaegu', cursive">개구쟁이체</SelectItem>
                      <SelectItem value="'Gamja Flower', cursive">감자꽃체</SelectItem>
                      <SelectItem value="'Sunflower', sans-serif">Sunflower</SelectItem>
                      <SelectItem value="'Stylish', sans-serif">Stylish</SelectItem>
                      <SelectItem value="'Poor Story', cursive">Poor Story</SelectItem>
                      <SelectItem value="'Single Day', cursive">Single Day</SelectItem>
                      <SelectItem value="'Yeon Sung', cursive">Yeon Sung</SelectItem>
                      <SelectItem value="'Hi Melody', cursive">Hi Melody</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`body-size-${section.id}`}>본문 크기 (px)</Label>
                  <Input
                    id={`body-size-${section.id}`}
                    type="number"
                    value={bodySize}
                    onChange={(e) => setBodySize(e.target.value)}
                    disabled={isReadOnly}
                    placeholder="16"
                    min="12"
                    max="48"
                  />
                  <p className="text-xs text-muted-foreground">권장: 14-24px</p>
                </div>
              </div>

              {/* Background Image and Opacity - Only for rabies_campaign section */}
              {section.section_key === 'rabies_campaign' && (
                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-semibold">배경 설정</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`bg-image-${section.id}`}>배경 이미지 URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`bg-image-${section.id}`}
                          type="text"
                          value={backgroundImage}
                          onChange={(e) => setBackgroundImage(e.target.value)}
                          disabled={isReadOnly}
                          placeholder="https://..."
                          className="flex-1"
                        />
                        <Dialog open={isBgDialogOpen} onOpenChange={(open) => {
                          setIsBgDialogOpen(open)
                          if (open) fetchMediaAssets()
                        }}>
                          <DialogTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              disabled={isReadOnly}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              선택
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>배경 이미지 선택</DialogTitle>
                              <DialogDescription>
                                미디어 라이브러리에서 배경 이미지를 선택하세요
                              </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="library" className="w-full">
                              <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="library">미디어 라이브러리</TabsTrigger>
                                <TabsTrigger value="upload">새 이미지 업로드</TabsTrigger>
                              </TabsList>
                              <TabsContent value="library" className="space-y-4">
                                {mediaAssets.length === 0 ? (
                                  <div className="text-center py-12 text-muted-foreground">
                                    <p>업로드된 이미지가 없습니다.</p>
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-3 gap-4">
                                    {mediaAssets.map((asset) => (
                                      <div
                                        key={asset.id}
                                        className="relative group cursor-pointer border rounded-lg overflow-hidden hover:border-primary transition-colors"
                                        onClick={() => handleSelectBackgroundImage(asset.file_url)}
                                      >
                                        <img
                                          src={asset.file_url}
                                          alt={asset.alt_text || asset.file_name}
                                          className="w-full h-40 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                          <p className="text-white text-sm font-medium">선택</p>
                                        </div>
                                        <div className="p-2 bg-white">
                                          <p className="text-xs truncate">{asset.file_name}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </TabsContent>
                              <TabsContent value="upload" className="space-y-4">
                                <div className="border-2 border-dashed rounded-lg p-8">
                                  <ImageUploader onUploadComplete={handleUploadComplete} />
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        미디어 라이브러리에서 이미지를 선택하거나 URL을 직접 입력하세요.
                      </p>
                      {backgroundImage && (
                        <div className="relative rounded-lg overflow-hidden border mt-2">
                          <img
                            src={backgroundImage}
                            alt="Background Preview"
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder/hero-pet.jpg'
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <span className="text-white font-semibold bg-black/50 px-3 py-1 rounded text-sm">
                              미리보기
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`bg-opacity-${section.id}`}>
                        배경 투명도: {backgroundOpacity}%
                      </Label>
                      <Input
                        id={`bg-opacity-${section.id}`}
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={backgroundOpacity}
                        onChange={(e) => setBackgroundOpacity(Number(e.target.value))}
                        disabled={isReadOnly}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        0% = 완전 투명, 100% = 완전 불투명
                      </p>
                    </div>
                  </div>

                  {backgroundImage && (
                    <div className="relative rounded-lg overflow-hidden border max-h-48">
                      <img
                        src={backgroundImage}
                        alt="Background Preview"
                        className="w-full h-48 object-cover"
                        style={{ opacity: backgroundOpacity / 100 }}
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder/hero-pet.jpg'
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="text-white font-semibold bg-black/50 px-3 py-1 rounded">
                          배경 미리보기 (투명도: {backgroundOpacity}%)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* MOU Image */}
                  <div className="border-t pt-4 space-y-2">
                    <h4 className="font-semibold">MOU 체결식 이미지</h4>
                    <Label htmlFor={`mou-image-${section.id}`}>MOU 이미지 URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id={`mou-image-${section.id}`}
                        type="text"
                        value={mouImage}
                        onChange={(e) => setMouImage(e.target.value)}
                        disabled={isReadOnly}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      <Dialog onOpenChange={(open) => {
                        if (open) fetchMediaAssets()
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            disabled={isReadOnly}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            선택
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>MOU 이미지 선택</DialogTitle>
                            <DialogDescription>
                              미디어 라이브러리에서 MOU 이미지를 선택하세요
                            </DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="library" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="library">미디어 라이브러리</TabsTrigger>
                              <TabsTrigger value="upload">새 이미지 업로드</TabsTrigger>
                            </TabsList>
                            <TabsContent value="library" className="space-y-4">
                              {mediaAssets.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                  <p>업로드된 이미지가 없습니다.</p>
                                </div>
                              ) : (
                                <div className="grid grid-cols-3 gap-4">
                                  {mediaAssets.map((asset) => (
                                    <div
                                      key={asset.id}
                                      className="relative group cursor-pointer border rounded-lg overflow-hidden hover:border-primary transition-colors"
                                      onClick={() => {
                                        setMouImage(asset.file_url)
                                        toast.success('MOU 이미지가 선택되었습니다')
                                      }}
                                    >
                                      <img
                                        src={asset.file_url}
                                        alt={asset.alt_text || asset.file_name}
                                        className="w-full h-40 object-cover"
                                      />
                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white text-sm font-medium">선택</p>
                                      </div>
                                      <div className="p-2 bg-white">
                                        <p className="text-xs truncate">{asset.file_name}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </TabsContent>
                            <TabsContent value="upload" className="space-y-4">
                              <div className="border-2 border-dashed rounded-lg p-8">
                                <ImageUploader onUploadComplete={handleUploadComplete} />
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      MOU 체결식 안내 오른쪽에 표시될 이미지입니다. (정사각형 권장)
                    </p>
                    {mouImage && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border mt-2">
                        <img
                          src={mouImage}
                          alt="MOU Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder/hero-pet.jpg'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Impact Metrics Editor - Only for impact section */}
              {section.section_key === 'impact' && (
                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-semibold">목표 지표 설정</h4>
                  <p className="text-sm text-muted-foreground">
                    각 지표의 목표치를 설정하세요. 사용자가 버튼을 클릭하면 1부터 목표치까지 숫자가 올라가는 애니메이션이 표시됩니다.
                  </p>
                  <div className="space-y-4">
                    {metrics.map((metric, index) => (
                      <div key={index} className="grid gap-4 md:grid-cols-4 p-4 bg-muted/50 rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor={`metric-label-${index}`}>지표명</Label>
                          <Input
                            id={`metric-label-${index}`}
                            value={metric.label}
                            onChange={(e) => {
                              const newMetrics = [...metrics]
                              newMetrics[index].label = e.target.value
                              setMetrics(newMetrics)
                            }}
                            disabled={isReadOnly}
                            placeholder="예: 누적 기부금"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`metric-value-${index}`}>목표치</Label>
                          <Input
                            id={`metric-value-${index}`}
                            type="number"
                            value={metric.value}
                            onChange={(e) => {
                              const newMetrics = [...metrics]
                              newMetrics[index].value = Number(e.target.value)
                              setMetrics(newMetrics)
                            }}
                            disabled={isReadOnly}
                            placeholder="1000"
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`metric-unit-${index}`}>단위</Label>
                          <Input
                            id={`metric-unit-${index}`}
                            value={metric.unit}
                            onChange={(e) => {
                              const newMetrics = [...metrics]
                              newMetrics[index].unit = e.target.value
                              setMetrics(newMetrics)
                            }}
                            disabled={isReadOnly}
                            placeholder="예: 원, 명, 개"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`metric-prefix-${index}`}>접두사 (선택)</Label>
                          <Input
                            id={`metric-prefix-${index}`}
                            value={metric.prefix || ''}
                            onChange={(e) => {
                              const newMetrics = [...metrics]
                              newMetrics[index].prefix = e.target.value
                              setMetrics(newMetrics)
                            }}
                            disabled={isReadOnly}
                            placeholder="예: +, ~"
                          />
                        </div>
                        <div className="col-span-full flex items-center justify-between p-3 bg-background rounded">
                          <div className="flex-1">
                            <span className="text-sm font-medium block mb-1">미리보기:</span>
                            <span className="text-xl md:text-2xl text-primary font-bold break-words">
                              {metric.prefix}
                              {metric.unit === '원' && metric.value >= 100000000
                                ? `${Math.floor(metric.value / 100000000).toLocaleString()}억 ${
                                    metric.value % 100000000 >= 10000
                                      ? `${Math.floor((metric.value % 100000000) / 10000).toLocaleString()}만`
                                      : ''
                                  }`
                                : metric.unit === '원' && metric.value >= 10000
                                ? `${Math.floor(metric.value / 10000).toLocaleString()}만`
                                : metric.value.toLocaleString()}
                              <span className="text-base md:text-lg ml-1">{metric.unit}</span>
                            </span>
                            <span className="text-xs text-muted-foreground block mt-1">
                              (원본: {metric.value.toLocaleString()}{metric.unit})
                            </span>
                          </div>
                          {!isReadOnly && metrics.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newMetrics = metrics.filter((_, i) => i !== index)
                                setMetrics(newMetrics)
                              }}
                              className="text-destructive hover:text-destructive ml-2 flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {!isReadOnly && metrics.length < 6 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setMetrics([
                            ...metrics,
                            { label: '새 지표', value: 0, unit: '개', prefix: '' }
                          ])
                        }}
                        className="w-full"
                      >
                        + 지표 추가
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">미리보기:</p>
                <h2
                  className="font-bold mb-2"
                  style={{
                    color: titleColor,
                    fontFamily: titleFont,
                    fontSize: `${titleSize}px`
                  }}
                >
                  {formData.title || '제목'}
                </h2>
                <p
                  className="font-semibold mb-2"
                  style={{
                    color: subtitleColor,
                    fontSize: `${subtitleSize}px`
                  }}
                >
                  {formData.subtitle || '부제목'}
                </p>
                <p
                  style={{
                    color: bodyColor,
                    fontFamily: bodyFont,
                    fontSize: `${bodySize}px`
                  }}
                >
                  {formData.body || '본문 내용이 여기에 표시됩니다.'}
                </p>
              </div>
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
