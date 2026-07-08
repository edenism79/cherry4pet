'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 py-8 bg-card rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-muted-foreground mb-6">
          {error.message || '페이지를 불러오는 중 문제가 발생했습니다.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()}>
            다시 시도
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            홈으로
          </Button>
        </div>
      </div>
    </div>
  )
}
