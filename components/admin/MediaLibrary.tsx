'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { Copy, Trash2, Image as ImageIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MediaAsset {
  id: string
  file_name: string
  file_url: string
  mime_type: string | null
  size_bytes: number | null
  alt_text: string | null
  bucket: string
  created_at: string
}

interface MediaLibraryProps {
  mediaAssets: MediaAsset[]
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

export function MediaLibrary({ mediaAssets, userRole }: MediaLibraryProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showUploader, setShowUploader] = useState(false)

  const isReadOnly = userRole === 'viewer'

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL이 클립보드에 복사되었습니다')
  }

  const handleDelete = async (id: string, fileName: string) => {
    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    if (!confirm(`"${fileName}"을(를) 삭제하시겠습니까?`)) {
      return
    }

    setDeletingId(id)

    try {
      const response = await fetch(`/api/admin/media/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('미디어 삭제 실패')
      }

      toast.success('미디어가 삭제되었습니다')
      router.refresh()
    } catch (error) {
      console.error('Error deleting media:', error)
      toast.error('미디어 삭제 중 오류가 발생했습니다')
    } finally {
      setDeletingId(null)
    }
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {!isReadOnly && (
        <Card>
          <CardContent className="pt-6">
            {!showUploader && (
              <div className="text-center py-8">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  새 이미지를 업로드하세요
                </p>
                <Button onClick={() => setShowUploader(true)}>
                  이미지 업로드
                </Button>
              </div>
            )}
            {showUploader && (
              <div className="space-y-4">
                <ImageUploader
                  onUploadComplete={() => {
                    setShowUploader(false)
                    router.refresh()
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => setShowUploader(false)}
                  className="w-full"
                >
                  취소
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {mediaAssets.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">업로드된 이미지가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mediaAssets.map((asset) => (
            <Card key={asset.id}>
              <CardContent className="p-4 space-y-3">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={asset.file_url}
                    alt={asset.alt_text || asset.file_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder/hero-pet.jpg'
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium truncate" title={asset.file_name}>
                      {asset.file_name}
                    </p>
                    {asset.mime_type && (
                      <Badge variant="outline" className="text-xs shrink-0">
                        {asset.mime_type.split('/')[1]?.toUpperCase()}
                      </Badge>
                    )}
                  </div>

                  {asset.alt_text && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {asset.alt_text}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(asset.size_bytes)}</span>
                    <span>
                      {formatDistanceToNow(new Date(asset.created_at), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCopyUrl(asset.file_url)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      URL 복사
                    </Button>
                    {!isReadOnly && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(asset.id, asset.file_name)}
                        disabled={deletingId === asset.id}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
