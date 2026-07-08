'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Mail, Phone, Building } from 'lucide-react'

interface Inquiry {
  id: string
  type: string
  name: string
  organization: string | null
  email: string
  phone: string | null
  message: string
  status: 'new' | 'in_progress' | 'done'
  created_at: string
}

interface InquiryListProps {
  inquiries: Inquiry[]
  userRole: 'super_admin' | 'content_admin' | 'viewer'
}

const INQUIRY_TYPES: Record<string, string> = {
  general: '일반 문의',
  partner: '파트너 문의',
  campaign: '캠페인 문의',
  donation: '기부 문의',
  other: '기타',
}

const STATUS_CONFIG = {
  new: { label: '새 문의', variant: 'default' as const, color: 'bg-blue-500' },
  in_progress: { label: '처리 중', variant: 'secondary' as const, color: 'bg-yellow-500' },
  done: { label: '완료', variant: 'outline' as const, color: 'bg-green-500' },
}

export function InquiryList({ inquiries, userRole }: InquiryListProps) {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const isReadOnly = userRole === 'viewer'

  const filteredInquiries =
    filterStatus === 'all'
      ? inquiries
      : inquiries.filter((i) => i.status === filterStatus)

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (isReadOnly) {
      toast.error('권한이 없습니다')
      return
    }

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('상태 변경 실패')
      }

      toast.success('문의 상태가 변경되었습니다')
      router.refresh()
    } catch (error) {
      console.error('Error updating inquiry status:', error)
      toast.error('상태 변경 중 오류가 발생했습니다')
    }
  }

  if (!inquiries || inquiries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">등록된 문의가 없습니다.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 보기</SelectItem>
            <SelectItem value="new">새 문의</SelectItem>
            <SelectItem value="in_progress">처리 중</SelectItem>
            <SelectItem value="done">완료</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          총 {filteredInquiries.length}개
        </span>
      </div>

      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => {
          const isExpanded = expandedId === inquiry.id
          const statusConfig = STATUS_CONFIG[inquiry.status]

          return (
            <Card key={inquiry.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                      {inquiry.type && (
                        <Badge variant="outline">
                          {INQUIRY_TYPES[inquiry.type] || inquiry.type}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {formatDistanceToNow(new Date(inquiry.created_at), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </CardDescription>
                  </div>
                  {!isReadOnly && (
                    <Select
                      value={inquiry.status}
                      onValueChange={(value) =>
                        handleStatusChange(inquiry.id, value)
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">새 문의</SelectItem>
                        <SelectItem value="in_progress">처리 중</SelectItem>
                        <SelectItem value="done">완료</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-primary hover:underline"
                    >
                      {inquiry.email}
                    </a>
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="text-primary hover:underline"
                      >
                        {inquiry.phone}
                      </a>
                    </div>
                  )}
                  {inquiry.organization && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{inquiry.organization}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">문의 내용</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : inquiry.id)
                      }
                    >
                      {isExpanded ? '접기' : '펼치기'}
                    </Button>
                  </div>
                  <div
                    className={`text-sm text-muted-foreground whitespace-pre-wrap ${
                      isExpanded ? '' : 'line-clamp-3'
                    }`}
                  >
                    {inquiry.message}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
