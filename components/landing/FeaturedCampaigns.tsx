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

  const getCardSpan = () => {
    const count = featuredCampaigns.length
    if (count === 1) return 'md:col-span-6 lg:col-span-6'
    if (count === 2) return 'md:col-span-3 lg:col-span-3'
    return 'md:col-span-3 lg:col-span-2'
  }

  return (
    <>
      <ComingSoonDialog open={showComingSoon} onOpenChange={setShowComingSoon} />
      <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            진행 중인 캠페인
          </h2>
          <p className="text-xl text-gray-600">
            도움이 필요한 반려동물들을 만나보세요
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
          {featuredCampaigns.map((campaign) => {
            const progress = calculateProgress(Number(campaign.raised_amount), Number(campaign.goal_amount))
            const daysRemaining = getDaysRemaining(campaign.end_date)

            return (
              <Card key={campaign.id} className={`overflow-hidden hover:shadow-xl transition-shadow duration-300 ${getCardSpan()}`}>
                <div className="relative h-48 w-full">
                  {campaign.image_url ? (
                    <Image
                      src={campaign.image_url}
                      alt={campaign.title}
                      fill
                      className="object-cover"
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
                <CardHeader>
                  <CardTitle className="text-xl">{campaign.title}</CardTitle>
                  {campaign.organization && (
                    <CardDescription>{campaign.organization}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {campaign.summary && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {campaign.summary}
                    </p>
                  )}
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-cherry-red">
                        {formatCurrency(Number(campaign.raised_amount))}
                      </span>
                      <span className="text-gray-500">
                        목표 {formatCurrency(Number(campaign.goal_amount))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{progress}% 달성</span>
                      {daysRemaining !== null && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          D-{daysRemaining}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {campaign.external_url && (
                    <Button
                      className="w-full bg-cherry-red hover:bg-cherry-deep"
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
