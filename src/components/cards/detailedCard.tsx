/* import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Award, Zap } from "lucide-react"

interface LeetCodeStats {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  acceptanceRate: number
  contributionPoints: number
  streak: number
}

interface DetailedCardProps {
  stats: LeetCodeStats | null
  theme: string
  showBorder: boolean
}

export default function DetailedCard({ stats, theme, showBorder }: DetailedCardProps) {
  const getThemeClasses = () => {
    switch (theme) {
      case "dark":
        return "bg-gray-900 text-white"
      case "github":
        return "bg-gray-50 border-gray-200"
      case "leetcode":
        return "bg-[#fafafa] border-[#ffa116]"
      default:
        return "bg-white"
    }
  }

  // Calculate total problems (assuming the stats don't include total)
  const totalProblems = 2500 // This would come from the API in a real app
  const solvedPercentage = (stats.totalSolved / totalProblems) * 100

  return (
    { (stats !== null) ? (
      <Card className={`w-full overflow-hidden ${!showBorder && "border-0 shadow-none"} ${getThemeClasses()}`}>
        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1.5 rounded">
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{stats.username}</h3>
                <p className="text-xs text-muted-foreground">Rank: {stats.ranking.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{stats.streak} day streak</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Problems Solved</span>
              <span className="text-sm font-medium">
                {stats.totalSolved} / {totalProblems}
              </span>
            </div>
            <Progress value={solvedPercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-100 rounded-md p-3 text-center">
              <div className="text-xl font-bold text-green-700">{stats.easySolved}</div>
              <div className="text-xs text-green-700">Easy</div>
            </div>
            <div className="bg-yellow-100 rounded-md p-3 text-center">
              <div className="text-xl font-bold text-yellow-700">{stats.mediumSolved}</div>
              <div className="text-xs text-yellow-700">Medium</div>
            </div>
            <div className="bg-red-100 rounded-md p-3 text-center">
              <div className="text-xl font-bold text-red-700">{stats.hardSolved}</div>
              <div className="text-xs text-red-700">Hard</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Contribution</div>
                <div className="font-medium">{stats.contributionPoints} points</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 flex items-center justify-center text-green-500 font-bold">%</div>
              <div>
                <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                <div className="font-medium">{stats.acceptanceRate}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )}
  )
}
 */