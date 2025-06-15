"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MinimalCard from "@/components/cards/minimalCard"
/* import DetailedCard from "@/components/cards/detailedCard"
import ThemedCard from "@/components/cards/themedCard" */
import Footer from "@/components/footer"
import ExportViewOptions from "@/components/exportViewOptions"
import { TextAnimate } from "@/components/magicui/text-animate"
import BasicOptions from "@/components/basicOptions"
import { ApiResponse } from "@/utils/interfaces"
import { GitStarButton } from "@/components/eldoraui/gitstarbutton"
import { toast } from "sonner"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Palette, Settings } from "lucide-react"
import AdvancedOptions from "@/components/advancedOptions"
import { CardType } from "@/enum/Card"
import { getGlobalAcceptanceRate } from "@/utils/utils"

export default function LeetCodeCards() {
  const [username, setUsername] = useState<string>("fborges")
  const [selectedFont, setSelectedFont] = useState<string>("inter")
  const [theme, setTheme] = useState<string>("light")
  const [selectedCard, setSelectedCard] = useState<string>("minimal")
  const [cardType, setCardType] = useState<CardType>(CardType.MAIN_STATS);

  /* Costumization */
  const [showDifficultyGraph, setShowDifficultyGraph] = useState<boolean>(true)
  const [showBorder, setShowBorder] = useState<boolean>(true)
  const [showLinks, setShowLinks] = useState<boolean>(true)
  const [showIcons, setShowIcons] = useState<boolean>(true)
  const [showStreak, setShowStreak] = useState<boolean>(true)
  const [borderRadius, setBorderRadius] = useState<number[]>([10]);
  const [accentColor, setAccentColor] = useState<string>("#3b82f6")
  const [backgroundOpacity, setBackgroundOpacity] = useState<number[]>([100])

  /* Page state handling */
  const [loading, setLoading] = useState<boolean>(false)
  const [stats, setStats] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");/* https://leetcodestatscard.tsi2market.com/ */

  useEffect(() => {
    const params = new URLSearchParams({
      username,
      font: selectedFont,
      theme: theme,
      border: showBorder ? "true" : "false",
      graph: showDifficultyGraph ? "true" : "false",
      links: showLinks ? "true" : "false",
      streak: showStreak ? "true" : "false",
      icons: showIcons ? "true" : "false",
      /* borderRadius: boderRadius, */
    })

    const url = `http://localhost:3000/card?card=${selectedCard}&${params.toString()}`
    setPreviewURL(url)
  }, [
    username,
    selectedFont,
    theme,
    showBorder,
    selectedCard,
    showDifficultyGraph,
    showLinks,
    showStreak,
    showIcons/* ,
    boderRadius */
  ])

  const fetchStats = () => {
    setLoading(true)

    toast.info("Fetching data!", {
      description: "Fetching data for " + username + " leetcode stats!",
      duration: 2000,
      closeButton: true
    })

    fetch(`/api/leetcode?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Data fetched!", {
            description: "Data fetched for " + username + "!",
            duration: 2000,
            closeButton: true,
            className: "bg-green-500"
          })
          console.log(data)
          setStats(data);
          setLoading(false);
        } else {
          toast.error("User not found!", {
            description: username + " not found!",
            duration: 2000,
            closeButton: true
          })
          setError("User not found");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error("EROOR!", {
          description: err.message,
          duration: 2000,
          closeButton: true
        })
        console.error(err);
        setError("Failed to fetch data");
        setLoading(false);
      });

    setLoading(false);
  }

  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only on first mount

  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) {
    return (
      <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-slate-500 border-opacity-50"></div>
        <TextAnimate animation="blurInUp" by="word" once className="text-2xl font-bold">
          Leetcode Stats Card
        </TextAnimate>
        <TextAnimate animation="blurInUp" by="word" once>
          Fetching Information...
        </TextAnimate>
      </div>
    )
  }

  const allQuestionsCount = stats.allQuestionsCount ? {
    totalQuestions: stats.allQuestionsCount[0].count,
    totalEasy: stats.allQuestionsCount[1].count,
    totalMedium: stats.allQuestionsCount[2].count,
    totalHard: stats.allQuestionsCount[3].count,
  } : null

  const leetcodeStats = stats?.matchedUser ? {
    username: username,
    totalSolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[0].count,
    easySolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[1].count,
    mediumSolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[2].count,
    hardSolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[3].count,
    githubUrl: stats.matchedUser.githubUrl || null,
    linkedinUrl: stats.matchedUser.linkedinUrl || null,
    twitterUrl: stats.matchedUser.twitterUrl || null,
    websites: stats.matchedUser.profile.websites || undefined,
    userAvatar: stats.matchedUser.profile.userAvatar || undefined,
    ranking: stats.matchedUser.profile.ranking,
    acceptanceRate: getGlobalAcceptanceRate(stats.matchedUser.submitStats),
    contributionPoints: 2345,
    streak: 15,
  } : null

  const cardCustomizations = {
    /* cardTitle,
    showRanking,
    showAcceptanceRate, */
    theme,
    showBorder,
    showDifficultyGraph,
    selectedFont,
    showLinks,
    showStreak,
    showIcons,
    borderRadius: borderRadius[0],
    accentColor,
    backgroundOpacity: backgroundOpacity[0],
    /* cardWidth: cardWidth[0],
    
    
    compactMode,
    animationStyle,
    dateFormat,*/
  }

  return (
    <div>
      <div className="px-50 w-full">
        <header className="w-full flex flex-row pt-10 justify-between align-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leetcode Stats Cards</h1>
            <p className="text-muted-foreground">
              Showcase your LeetCode stats online with customizable cards.
            </p>
          </div>
          <GitStarButton />
        </header>

        <main className="w-full py-10 px-4">
          {/* Options above the cards */}
          <div>
            <Accordion type="multiple" defaultValue={["basic"]}>
              <AccordionItem value="basic">
                <AccordionTrigger className="py-4 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Basic Settings</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <BasicOptions username={username} setUsername={setUsername}
                    fetchStats={fetchStats} loading={loading} theme={theme} setTheme={setTheme}
                    showBorder={showBorder} setShowBorder={setShowBorder}
                    selectedFont={selectedFont} setSelectedFont={setSelectedFont}
                    showDifficultyGraph={showDifficultyGraph} setShowDifficultyGraph={setShowDifficultyGraph}
                    showLinks={showLinks} setShowLinks={setShowLinks}
                    showStreak={showStreak} setShowStreak={setShowStreak}
                    cardType={cardType} setCardType={setCardType}
                    showIcons={showIcons} setShowIcons={setShowIcons} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="advanced">
                <AccordionTrigger className="py-4 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>Advanced Customization</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <AdvancedOptions borderRadius={borderRadius} setBorderRadius={setBorderRadius}
                    accentColor={accentColor} setAccentColor={setAccentColor}
                    backgroundOpacity={backgroundOpacity} setBackgroundOpacity={setBackgroundOpacity} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Card display */}
          <div>
            <h2 className="text-lg font-medium mb-2">Card Type:</h2>
            <Tabs defaultValue="minimal" value={selectedCard} onValueChange={setSelectedCard}>
              <TabsList className="grid w-full  mb-8">{/* grid-cols-3 */}
                <TabsTrigger value="minimal" className="cursor-pointer">Minimal</TabsTrigger>
                {/* <TabsTrigger value="detailed" className="cursor-pointer">Detailed</TabsTrigger>
                <TabsTrigger value="themed" className="cursor-pointer">Themed</TabsTrigger> */}
              </TabsList>

              <div className="flex justify-center mb-8">
                <TabsContent value="minimal" className="w-full max-w-md">
                  <MinimalCard statsUser={leetcodeStats} allQuestions={allQuestionsCount} customizations={cardCustomizations} />
                </TabsContent>
                {/* <TabsContent value="detailed" className="w-full max-w-md">
                  <DetailedCard stats={leetcodeStats} theme={theme} showBorder={showBorder} />
                </TabsContent>
                <TabsContent value="themed" className="w-full max-w-md">
                  <ThemedCard stats={leetcodeStats} theme={theme} showBorder={showBorder} />
                </TabsContent> */}
              </div>
            </Tabs>
          </div>

          {/* Options below the cards */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <ExportViewOptions selectedCard={selectedCard} username={username} theme={theme} showBorder={showBorder} selectedFont={selectedFont} showDifficultyGraph={false} previewURL={previewURL} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
