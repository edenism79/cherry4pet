'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Campaign } from "@/types/cms"
import { formatCurrency, calculateProgress, getDaysRemaining } from "@/lib/utils"
import Image from "next/image"
import { Clock, Heart, Home, PawPrint } from "lucide-react"
import { useComingSoon, ComingSoonDialog } from "@/components/common/ComingSoonDialog"

interface FeaturedCampaignsProps {
  campaigns: Campaign[]
}

export default function FeaturedCampaigns({ campaigns }: FeaturedCampaignsProps) {
  const { showComingSoon, setShowComingSoon, handleLinkClick } = useComingSoon()
  const featuredCampaigns = campaigns.filter(c => c.is_featured && c.is_visible)

  if (featuredCampaigns.length === 0) return null

  // 캠페인 개수에 따른 그리드 레이아웃 클래스 결정
  const getGridClass = () => {
    const count = featuredCampaigns.length
    if (count === 1) {
      // 1개: 중앙 정렬, 최대 너비 제한
      return 'flex justify-center'
    } else if (count === 2) {
      // 2개: 중앙 정렬, 2열 그리드
      return 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto'
    } else {
      // 3개 이상: 최대 3열 그리드
      return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'
    }
  }

  // 단일 카드의 최대 너비 클래스
  const getSingleCardClass = () => {
    return featuredCampaigns.length === 1 ? 'w-full max-w-md' : ''
  }

  return (
    <>
      <ComingSoonDialog open={showComingSoon} onOpenChange={setShowComingSoon} />
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container-responsive">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-display-sm md:text-display-md lg:text-display-lg font-bold text-gray-900">
            진행 중인 캠페인
          </h2>
          <p className="text-body-lg md:text-heading-md text-gray-600">
            도움이 필요한 반려동물들을 만나보세요
          </p>
        </div>
        <div className={`${getGridClass()} max-w-7xl mx-auto`}>
          {featuredCampaigns.map((campaign) => {
            const progress = calculateProgress(Number(campaign.raised_amount), Number(campaign.goal_amount))
            const daysRemaining = getDaysRemaining(campaign.end_date)

            return (
              <Card key={campaign.id} className={`overflow-hidden hover:shadow-xl active:scale-[0.98] transition-all duration-300 ${getSingleCardClass()}`}>
                <div className="relative h-40 sm:h-48 md:h-56 w-full">
                  {campaign.image_url ? (
                    <Image
                      src={campaign.image_url}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cherry-pink via-cherry-red to-cherry-deep relative overflow-hidden">
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4">
                          <PawPrint className="w-16 h-16 text-white transform -rotate-12" />
                        </div>
                        <div className="absolute top-12 right-8">
                          <Heart className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute bottom-8 left-12">
                          <PawPrint className="w-20 h-20 text-white transform rotate-45" />
                        </div>
                        <div className="absolute bottom-4 right-6">
                          <Home className="w-14 h-14 text-white transform rotate-12" />
                        </div>
                      </div>
                      {/* Center content */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <PawPrint className="w-20 h-20 text-white mb-3 mx-auto animate-pulse" />
                          <p className="text-white font-bold text-lg">CHERRY for PET</p>
                          <p className="text-white/80 text-sm mt-1">{campaign.title}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {campaign.category && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-cherry-red">{campaign.category}</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl line-clamp-2">{campaign.title}</CardTitle>
                  {campaign.organization && (
                    <CardDescription className="text-sm sm:text-base">{campaign.organization}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  {campaign.summary && (
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {campaign.summary}
                    </p>
                  )}
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-cherry-red">
                        {formatCurrency(Number(campaign.raised_amount))}
                      </span>
                      <span className="text-gray-500">
                        목표 {formatCurrency(Number(campaign.goal_amount))}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                      <span>{progress}% 달성</span>
                      {daysRemaining !== null && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          D-{daysRemaining}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 sm:p-6 pt-0">
                  {campaign.external_url && (
                    <Button
                      className="w-full bg-cherry-red hover:bg-cherry-deep touch-target text-sm sm:text-base"
                      onClick={(e) => handleLinkClick(e, campaign.external_url)}
                    >
                      기부하기
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
    </>
  )
}
