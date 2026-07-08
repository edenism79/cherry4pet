'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-destructive/10 p-3 rounded-full">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          관리자 페이지 오류
        </h2>

        <div className="bg-muted p-4 rounded-lg mb-6">
          <p className="text-sm text-muted-foreground">
            {error.message || '페이지를 불러오는 중 문제가 발생했습니다.'}
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => reset()} className="w-full">
            다시 시도
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/admin'}
            className="w-full"
          >
            대시보드로
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            홈으로
          </Button>
        </div>

        {error.digest && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            오류 ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
