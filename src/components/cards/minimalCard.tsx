import { Card, CardContent } from "@/components/ui/card"
import { Github, Globe, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface LeetCodeStats {
  username: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  acceptanceRate: number
  streak: number
  githubUrl: string | null
  linkedinUrl: string | null
  twitterUrl: string | null
  websites: string[] | undefined
  userAvatar: string | undefined
}

interface QuestionCount {
  totalQuestions: number
  totalEasy: number
  totalMedium: number
  totalHard: number
}

interface MinimalCardProps {
  statsUser: LeetCodeStats | null
  allQuestions: QuestionCount | null
  theme: string
  showBorder: boolean
  font: string
  showDifficultyGraph: boolean
}

export default function MinimalCard({ statsUser, allQuestions, theme, showBorder, font, showDifficultyGraph }: MinimalCardProps) {
  const getThemeClasses = () => {
    switch (theme) {
      case "light":
        return "bg-slate-100 text-gray-800"
      case "dark":
        return "bg-gray-900 text-white"
      case "github":
        return "bg-gray-50 border-gray-200 text-gray-400"
      case "leetcode":
        return "bg-[#fafafa] border-[#ffa116] text-gray-400"
      default:
        return "bg-white text-gray-400"
    }
  }

  const getMutedTextColor = () => {
    switch (theme) {
      case "dark":
        return "text-gray-400"
      case "github":
        return "text-gray-600"
      case "leetcode":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getFontClasses = () => {
    switch (font) {
      case "roboto":
        return "font-sans"
      case "mono":
        return "font-mono"
      case "serif":
        return "font-serif"
      case "system":
        return "font-sans"
      default:
        return "font-sans"
    }
  }

  console.log(statsUser)

  return (
    <div>

      {/* No user FOund */}
      {(statsUser === null) && (
        <Card className="w-full overflow-hidden bg-red-500/50 text-white border-2 border-red-400/50 shadow-none rounded-lg">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[220px]">
            <div className="text-2xl font-bold mb-2">🚫 User Not Found</div>
            <p className="text-sm text-white/90 text-center">
              The LeetCode user you requested does not exist or could not be found.
            </p>
          </CardContent>
        </Card>
      )}
      {(statsUser !== null && allQuestions !== null) && (
        <Card className={`w-[500px] h-[250px] overflow-hidden ${!showBorder && "border-0 shadow-none"} ${getThemeClasses()} ${getFontClasses()}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* Icon */}
                {statsUser.userAvatar ? (
                  <div className="border-2 border-orange-500 rounded">
                    <Image src={statsUser.userAvatar} alt="LeetCode Stats" width={32} height={32} />
                  </div>
                ) : (
                  <div className="border-2 border-orange-500 rounded">
                    <Image src="./logo.svg" alt="LeetCode Stats" width={32} height={32} />
                  </div>
                )}

                <h3 className="font-bold">{statsUser.username}</h3>
              </div>
              <div ></div>
              <Link
                href="https://leetstatscard.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                <span className="text-xs text-muted-foreground">leetstatscard.com</span>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex flex-row justify-center">
                  <div className="text-2xl font-bold">{statsUser.totalSolved}</div>
                  <div className="flex flex-row justify-center text-xs text-muted-foreground"> /
                    <span>{allQuestions.totalQuestions}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Problems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statsUser.ranking}</div>
                <div className="text-xs text-muted-foreground">Ranking</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statsUser.streak}</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className={`${getMutedTextColor()}`}>Easy: </span>
                <span className="font-medium">{statsUser.easySolved}</span>
                <div className="flex flex-row justify-center text-xs text-muted-foreground">
                  / <span>{allQuestions.totalEasy}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className={`${getMutedTextColor()}`}>Medium: </span>
                <span className="font-medium">{statsUser.mediumSolved}</span>
                <div className="flex flex-row justify-center text-xs text-muted-foreground">
                  / <span>{allQuestions.totalMedium}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className={`${getMutedTextColor()}`}>Hard: </span>
                <span className="font-medium">{statsUser.hardSolved}</span>
                <div className="flex flex-row justify-center text-xs text-muted-foreground">
                  / <span>{allQuestions.totalHard}</span>
                </div>
              </div>
            </div>

            {/* Show difficulty graph */}
            {showDifficultyGraph && (
              <div className="space-y-2 mb-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: `${(statsUser.easySolved / statsUser.totalSolved) * 100}%` }}
                  ></div>
                  <div
                    className="bg-yellow-500 h-full"
                    style={{ width: `${(statsUser.mediumSolved / statsUser.totalSolved) * 100}%` }}
                  ></div>
                  <div
                    className="bg-red-500 h-full"
                    style={{ width: `${(statsUser.hardSolved / statsUser.totalSolved) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Links section */}
            {(statsUser.githubUrl || statsUser.linkedinUrl || statsUser.twitterUrl) && (
              <div
                className="flex items-center gap-3 text-xs pt-2 border-t"
                style={{ color: `var(--${getMutedTextColor()})` }}
              >
                {statsUser.githubUrl && (
                  <Link
                    href={statsUser.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                  >
                    <Github className="h-3 w-3" />
                    {/* <span>{statsUser.githubUrl}</span> */}
                  </Link>
                )}

                {statsUser.linkedinUrl && (
                  <Link
                    href={statsUser.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                  >
                    <Linkedin className="h-3 w-3" />
                    {/* <span>{statsUser.linkedinUrl}</span> */}
                  </Link>
                )}

                {statsUser.twitterUrl && (
                  <Link
                    href={statsUser.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                  >
                    <Twitter className="h-3 w-3" />
                    {/* <span>{statsUser.twitterUrl}</span> */}
                  </Link>
                )}

                {statsUser.websites && (
                  <Link
                    href={statsUser.websites[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                  >
                    <Globe className="h-3 w-3" />
                    {/* <span>{statsUser.twitterUrl}</span> */}
                  </Link>
                )}
                {/* {websiteUrl && (
                  <Link
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                  >
                    <Globe className="h-3 w-3" />
                    <span>{new URL(websiteUrl).hostname}</span>
                  </Link>
                )} */}
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className={`${getMutedTextColor()}`}>{statsUser.streak} day streak</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
