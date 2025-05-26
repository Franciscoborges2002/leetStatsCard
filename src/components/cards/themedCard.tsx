import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircleCheck, Code, Star, Trophy } from "lucide-react"

interface LeetCodeStats {
    username: string
    totalSolved: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    ranking: number
    acceptanceRate: number
    streak: number
}

interface ThemedCardProps {
    stats: LeetCodeStats
    theme: string
    showBorder: boolean
}

export default function ThemedCard({ stats, theme, showBorder }: ThemedCardProps) {
    const getThemeClasses = () => {
        switch (theme) {
            case "dark":
                return "bg-gray-900 text-white border-gray-800"
            case "github":
                return "bg-gray-50 border-gray-200"
            case "leetcode":
                return "bg-[#282828] text-white border-[#ffa116]"
            default:
                return "bg-white"
        }
    }

    // For the LeetCode themed card, we'll use their brand colors regardless of theme
    const isLeetCodeTheme = theme === "leetcode"
    const headerBg = isLeetCodeTheme ? "bg-[#282828]" : theme === "dark" ? "bg-gray-800" : "bg-orange-50"
    const headerText = isLeetCodeTheme || theme === "dark" ? "text-white" : "text-orange-600"
    const accentColor = isLeetCodeTheme ? "border-[#ffa116] text-[#ffa116]" : "border-orange-500 text-orange-500"

    return (
        <Card className={`w-full overflow-hidden ${!showBorder && "border-0 shadow-none"} ${getThemeClasses()}`}>
            <div className={`${headerBg} ${headerText} p-4 flex justify-between items-center`}>
                <div className="flex items-center gap-2">
                    {isLeetCodeTheme ? <div className="text-[#ffa116] font-bold text-lg">LC</div> : <Code className="h-5 w-5" />}
                    <h3 className="font-bold text-lg">LeetCode Stats</h3>
                </div>
                <Badge variant={isLeetCodeTheme ? "outline" : "default"} className={isLeetCodeTheme ? accentColor : ""}>
                    {stats.username}
                </Badge>
            </div>

            <CardContent className="p-6">
                <div className="flex justify-between mb-6">
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${accentColor}`}>
                                <Trophy className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold">{stats.ranking.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Global Ranking</div>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${accentColor}`}>
                                <CircleCheck className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold">{stats.totalSolved}</div>
                        <div className="text-xs text-muted-foreground">Problems Solved</div>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${accentColor}`}>
                                <Star className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold">{stats.acceptanceRate}%</div>
                        <div className="text-xs text-muted-foreground">Acceptance Rate</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                Easy
                            </span>
                            <span className="text-sm">{stats.easySolved}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                className="bg-green-500 h-2.5 rounded-full"
                                style={{ width: `${(stats.easySolved / stats.totalSolved) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                Medium
                            </span>
                            <span className="text-sm">{stats.mediumSolved}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                className="bg-yellow-500 h-2.5 rounded-full"
                                style={{ width: `${(stats.mediumSolved / stats.totalSolved) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                Hard
                            </span>
                            <span className="text-sm">{stats.hardSolved}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                className="bg-red-500 h-2.5 rounded-full"
                                style={{ width: `${(stats.hardSolved / stats.totalSolved) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
