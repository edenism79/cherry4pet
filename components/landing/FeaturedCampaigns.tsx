import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Campaign } from "@/types/cms"
import { formatCurrency, calculateProgress, getDaysRemaining } from "@/lib/utils"
import Image from "next/image"
import { Clock } from "lucide-react"

interface FeaturedCampaignsProps {
  campaigns: Campaign[]
}

export default function FeaturedCampaigns({ campaigns }: FeaturedCampaignsProps) {
  const featuredCampaigns = campaigns.filter(c => c.is_featured && c.is_visible)

  if (featuredCampaigns.length === 0) return null

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCampaigns.map((campaign) => {
            const progress = calculateProgress(Number(campaign.raised_amount), Number(campaign.goal_amount))
            const daysRemaining = getDaysRemaining(campaign.end_date)

            return (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  {campaign.image_url ? (
                    <Image
                      src={campaign.image_url}
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cherry-pink to-cherry-cream flex items-center justify-center">
                      <p className="text-cherry-red font-bold">No Image</p>
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
                      asChild
                    >
                      <a href={campaign.external_url} target="_blank" rel="noopener noreferrer">
                        기부하기
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
