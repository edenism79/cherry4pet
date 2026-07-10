'use client'

import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useComingSoon, ComingSoonDialog } from "@/components/common/ComingSoonDialog"

interface Story {
  id: string
  title: string
  summary: string | null
  image_url: string | null
  published_at: string | null
  link_url: string | null
}

interface StoriesSectionProps {
  stories?: Story[]
}

export function StoriesSection({ stories = [] }: StoriesSectionProps) {
  const { showComingSoon, setShowComingSoon, handleLinkClick } = useComingSoon()
  // Default stories if none provided
  const defaultStories = [
    {
      id: '1',
      title: '구조견 바둑이의 새로운 시작',
      summary:
        '유기되어 거리를 헤매던 바둑이가 치료를 받고 새 가족을 만나기까지의 이야기',
      image_url: '/placeholder/hero-pet.jpg',
      published_at: '2024-01-15',
      link_url: '#',
    },
    {
      id: '2',
      title: '보호소 급식 지원 캠페인 완료',
      summary: '전국 12개 보호소에 3개월분 사료 및 의료품 지원 완료',
      image_url: '/placeholder/hero-pet.jpg',
      published_at: '2024-01-10',
      link_url: '#',
    },
    {
      id: '3',
      title: '아시아 광견병 예방 프로젝트',
      summary: '베트남 지역 반려동물 1,200마리 백신 접종 완료',
      image_url: '/placeholder/hero-pet.jpg',
      published_at: '2024-01-05',
      link_url: '#',
    },
  ]

  const displayStories = stories.length > 0 ? stories.slice(0, 3) : defaultStories

  return (
    <>
      <ComingSoonDialog open={showComingSoon} onOpenChange={setShowComingSoon} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                우리가 만든 변화의 이야기
              </h2>
              <p className="text-lg text-muted-foreground">
                함께 만들어가는 감동적인 순간들
              </p>
            </div>
            <Button
              variant="outline"
              className="hidden md:inline-flex"
              onClick={(e) => handleLinkClick(e, '/stories')}
            >
              전체 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayStories.map((story) => (
              <div
                key={story.id}
                className="group block cursor-pointer"
                onClick={(e: any) => handleLinkClick(e, story.link_url)}
              >
              <div className="bg-card rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={story.image_url || '/placeholder/hero-pet.jpg'}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  {story.published_at && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      {new Date(story.published_at).toLocaleDateString('ko-KR')}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  {story.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {story.summary}
                    </p>
                  )}
                  <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    자세히 보기
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button
            variant="outline"
            onClick={(e) => handleLinkClick(e, '/stories')}
          >
            전체 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
    </>
  )
}
