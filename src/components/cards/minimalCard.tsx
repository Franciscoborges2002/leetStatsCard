"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Flame, Globe, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiGithub, SiLeetcode, SiX } from "@icons-pack/react-simple-icons"
import { Suspense } from "react"

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
  customizations?: {
    theme: string
    showBorder: boolean
    selectedFont: string
    showDifficultyGraph: boolean
    showStreak: boolean
    showLinks: boolean
    /* borderRadius: number */
    accentColor: string
    /* backgroundOpacity: number */
    showIcons: boolean
    /* cardTitle: string
    showRanking: boolean
    showAcceptanceRate: boolean
    
    
    
    cardWidth: number
    
    
    
    compactMode: boolean
    animationStyle: string
    dateFormat: string */
  }
}

export default function MinimalCard({ statsUser, allQuestions, customizations }: MinimalCardProps) {

  if (customizations === null || customizations === undefined) {
    return (
      <div>
        asd
      </div>
    )
  }

  const getThemeClasses = () => {
    switch (customizations?.theme) {
      case "light":
        return "text-gray-800 bg-slate-100"
      case "dark":
        return "text-white bg-gray-900"
      case "github":
        return "bg-gray-50 border-gray-200 text-gray-400"
      case "leetcode":
        return "bg-[#fafafa] border-[#ffa116] text-gray-400"
      default:
        return "text-gray-400+ bg-white"
    }
  }

  const getMutedTextColor = () => {
    switch (customizations?.theme) {
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
    switch (customizations?.selectedFont) {
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

  const cardStyle = {
    //borderRadius: `${customizations?.borderRadius}px`,
    /* opacity: customizations?.backgroundOpacity/100, */
    /* backgroundColor: */
    /* theme === "dark"
      ? `rgba(17, 24, 39, ${backgroundOpacity / 100})`
      : theme === "github"
        ? `rgba(249, 250, 251, ${backgroundOpacity / 100})`
        : theme === "leetcode"
          ? `rgba(250, 250, 250, ${backgroundOpacity / 100})`
          : `rgba(255, 255, 255, ${backgroundOpacity / 100})`, */
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
          <Card id="minimalCard" className={`w-[500px] h-[250px] overflow-hidden ${!customizations?.showBorder && "border-0 shadow-none"} ${getThemeClasses()} ${getFontClasses()}`} style={cardStyle}>
            <CardContent className="p-6">
              {/*             {getThemeClasses()} */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {/* Icon */}
                  {statsUser.userAvatar ? (
                    <div className="border-2 border-orange-500 rounded" style={{ borderColor: customizations?.accentColor }}>
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
                  href="https://leetcodestatscard.fborges.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-orange-500 transition-colors">
                  <span className="text-xs text-muted-foreground">leetcodestatscard.fborges.dev</span>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex flex-row justify-center items-center">
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
                  <div className="text-2xl font-bold">{statsUser.acceptanceRate} %</div>
                  <div className="text-xs text-muted-foreground">Acceptance rate</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm pb-2">
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
              {customizations?.showDifficultyGraph && (
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

              <div
                className="flex items-center flex-wrap gap-3 text-xs pt-2 border-t"
                style={{ color: `var(--${getMutedTextColor()})` }}
              >
                {/* Links section */}
                {customizations?.showLinks && (
                  <div className="flex flex-row gap-3 text-xs items-center">
                    {/* Leetcode profile */}
                    <Link
                      href={`https://leetcode.com/u/` + statsUser.username}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                    >
                      {customizations.showIcons ? (<SiLeetcode className="h-3 w-3" />) : (<span>{statsUser.username}</span>)}
                    </Link>
                    {statsUser.githubUrl && (
                      <Link
                        href={statsUser.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                      >
                        {customizations.showIcons ? (<SiGithub className="h-3 w-3" />) : (<p>gh.com/{statsUser.githubUrl.split("/").pop()}</p>)}
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
                        {customizations.showIcons ? (<Linkedin className="h-3 w-3" />) : (<p>gh.com/{statsUser.linkedinUrl}</p>)}
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
                        {customizations.showIcons ? (<SiX className="h-3 w-3" />) : (<p>x.com/{statsUser.twitterUrl}</p>)}
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
                        {customizations.showIcons ? (<Globe className="h-3 w-3" />) : (<p>{new URL(statsUser.websites[0]).hostname.replace(/^www\./, "")}</p>)}

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

                  </div>
                )}
                {customizations?.showStreak && (
                  <div className="ml-auto flex items-center gap-1 hover:text-muted-foreground transition-colors cursor-pointer">
                    <Flame className="h-3 w-3" />
                    <span className={`${getMutedTextColor()} hover:text-muted-foreground transition-colors cursor-pointer`}>{statsUser.streak} day streak</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Suspense>
  )
}
