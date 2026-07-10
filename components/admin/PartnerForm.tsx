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
  // 의료 및 치료 기관
  { value: 'veterinary_hospital', label: '동물병원', category: '의료' },
  { value: 'veterinary_clinic', label: '동물클리닉', category: '의료' },

  // 보호 및 구조
  { value: 'animal_shelter', label: '동물보호소', category: '보호/구조' },
  { value: 'rescue_organization', label: '동물구조단체', category: '보호/구조' },
  { value: 'welfare_organization', label: '동물복지단체', category: '보호/구조' },

  // 기업
  { value: 'corporation', label: '일반기업', category: '기업' },
  { value: 'pet_company', label: '반려동물 관련 기업', category: '기업' },
  { value: 'brand_sponsor', label: '브랜드/스폰서', category: '기업' },

  // 협회 및 단체
  { value: 'veterinary_association', label: '수의사회', category: '협회/단체' },
  { value: 'animal_association', label: '동물단체협회', category: '협회/단체' },

  // 국제기구
  { value: 'international_ngo', label: '국제 NGO', category: '국제' },
  { value: 'international_organization', label: '국제기구', category: '국제' },

  // 공공 및 연구
  { value: 'government', label: '정부기관', category: '공공/연구' },
  { value: 'research_institute', label: '연구기관', category: '공공/연구' },
  { value: 'education', label: '교육기관', category: '공공/연구' },

  // 기타
  { value: 'media_partner', label: '미디어 파트너', category: '기타' },
  { value: 'none', label: '없음 (설명 사용)', category: '기타' },
]

export function PartnerForm({ partner, userRole }: PartnerFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mediaAssets, setMediaAssets] = useState<any[]>([])
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
    setFormData({ ...formData, logo_url: url })
    setIsDialogOpen(false)
    toast.success('로고 이미지가 선택되었습니다')
  }

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
                <SelectContent className="max-h-[400px]">
                  {/* 의료 */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    의료 및 치료
                  </div>
                  {PARTNER_TYPES.filter(t => t.category === '의료').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}

                  {/* 보호/구조 */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                    보호 및 구조
                  </div>
                  {PARTNER_TYPES.filter(t => t.category === '보호/구조').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}

                  {/* 기업 */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                    기업 및 브랜드
                  </div>
                  {PARTNER_TYPES.filter(t => t.category === '기업').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}

                  {/* 협회/단체 */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                    협회 및 단체
                  </div>
                  {PARTNER_TYPES.filter(t => t.category === '협회/단체').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}

                  {/* 국제 */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                    국제기구
                  </div>
                  {PARTNER_TYPES.filter(t => t.category === '국제').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}

                  {/* 공공/연구 */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                    공공 및 연구
                  </div>
                  {PARTNER_TYPES.filter(t => t.category === '공공/연구').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}

                  {/* 기타 */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">
                    기타
                  </div>
                  {PARTNER_TYPES.filter(t => t.category === '기타').map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                파트너의 유형을 선택하면 공개 페이지에 한글로 표시됩니다
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              설명
              {formData.type === 'none' && (
                <span className="text-primary ml-2 text-sm font-normal">
                  ⭐ 파트너 유형 대신 이 설명이 표시됩니다
                </span>
              )}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={isReadOnly}
              placeholder={
                formData.type === 'none'
                  ? '파트너 유형에 표시될 설명을 입력하세요 (예: 공식 후원사, 전략적 파트너 등)'
                  : '파트너에 대한 간단한 설명을 입력하세요'
              }
              rows={3}
            />
            {formData.type === 'none' && (
              <p className="text-xs text-muted-foreground">
                💡 파트너 유형을 "없음"으로 선택하면 공개 페이지에서 이 설명이 유형 대신 표시됩니다
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo_url">로고 이미지</Label>

            {!formData.logo_url ? (
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
                      미디어 라이브러리에서 로고 선택
                    </p>
                    <p className="text-xs text-muted-foreground">
                      클릭하여 기존 이미지를 선택하거나 새로 업로드
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      투명 배경의 PNG 또는 SVG 파일을 권장합니다
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>파트너 로고 선택</DialogTitle>
                    <DialogDescription>
                      미디어 라이브러리에서 로고를 선택하거나 새 이미지를 업로드하세요
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
                              <div className="w-full h-40 bg-muted flex items-center justify-center p-4">
                                <img
                                  src={asset.file_url}
                                  alt={asset.alt_text || asset.file_name}
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
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
                  <div className="flex items-center justify-center h-48 bg-muted p-4">
                    <img
                      src={formData.logo_url}
                      alt="Logo preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder/partner-placeholder.svg'
                      }}
                    />
                  </div>
                  {!isReadOnly && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, logo_url: '' })}
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
                        로고 변경 (미디어 라이브러리)
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>파트너 로고 선택</DialogTitle>
                        <DialogDescription>
                          미디어 라이브러리에서 로고를 선택하거나 새 이미지를 업로드하세요
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
                                  <div className="w-full h-40 bg-muted flex items-center justify-center p-4">
                                    <img
                                      src={asset.file_url}
                                      alt={asset.alt_text || asset.file_name}
                                      className="max-w-full max-h-full object-contain"
                                    />
                                  </div>
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

                <div className="space-y-2">
                  <Label htmlFor="logo_url_input" className="text-xs text-muted-foreground">
                    또는 직접 URL 입력
                  </Label>
                  <Input
                    id="logo_url_input"
                    value={formData.logo_url}
                    onChange={(e) =>
                      setFormData({ ...formData, logo_url: e.target.value })
                    }
                    disabled={isReadOnly}
                    placeholder="https://..."
                    type="url"
                    className="text-xs"
                  />
                </div>
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
