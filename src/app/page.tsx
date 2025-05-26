"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
import MinimalCard from "@/components/cards/minimalCard"
import DetailedCard from "@/components/cards/detailedCard"
import ThemedCard from "@/components/cards/themedCard"
import Footer from "@/components/footer"
import ExportViewOptions from "@/components/exportViewOptions"
import { TextAnimate } from "@/components/magicui/text-animate"
import BasicOptions from "@/components/basicOptions"
import { ApiResponse } from "@/utils/interfaces"

export default function LeetCodeCards() {
  const [username, setUsername] = useState<string>("fborges")
  const [githubUsername, setGithubUsername] = useState<string>("Franciscoborges2002")
  const [websiteUrl, setWebsiteUrl] = useState<string>("https://fborges.dev")
  const [selectedFont, setSelectedFont] = useState<string>("inter")
  const [showDifficultyGraph, setShowDifficultyGraph] = useState<boolean>(true)
  const [theme, setTheme] = useState<string>("light")
  const [loading, setLoading] = useState<boolean>(false)
  const [showBorder, setShowBorder] = useState<boolean>(true)
  const [selectedCard, setSelectedCard] = useState<string>("minimal")
  const [stats, setStats] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  /* const [url, setUrl] = useState<string>("https://leetcode.com/card/minimal?username=fborges"); */

  useEffect(() => {
    fetch(`/api/leetcode?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data)
          setStats(data);
        } else {
          setError("User not found");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch data");
      });
  }, [username]);

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

  const leetcodeStats = {
    username: username,
    totalSolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[0].count,
    totalQuestions: stats.allQuestionsCount[0].count,
    easySolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[0].count,
    totalEasy: stats.allQuestionsCount[1].count,
    mediumSolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[2].count,
    totalMedium: stats.allQuestionsCount[2].count,
    hardSolved: stats.matchedUser.submitStatsGlobal.acSubmissionNum[3].count,
    totalHard: stats.allQuestionsCount[3].count,
    ranking: 54321,
    acceptanceRate: 67.8,
    contributionPoints: 2345,
    streak: 15,
  }

  const fetchStats = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      /* toast({
        title: "Stats updated",
        description: `Fetched latest stats for ${username}`,
      }) */
    }, 1000)
  }

  return (
    <div className="">
      <header className="container mx-auto pt-10 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Leetcode Stats Cards</h1>
        <p className="text-muted-foreground">
          Showcase your LeetCode stats online with customizable cards.
        </p>
      </header>

      <main className="container mx-auto py-10 px-4 max-w-4xl">
        {/* Options above the cards */}
        <div>
          <BasicOptions username={username} setUsername={setUsername} githubUsername={githubUsername} setGithubUsername={setGithubUsername}
            fetchStats={fetchStats} loading={loading} theme={theme} setTheme={setTheme}
            showBorder={showBorder} setShowBorder={setShowBorder} websiteUrl={websiteUrl} setWebsiteUrl={setWebsiteUrl}
            selectedFont={selectedFont} setSelectedFont={setSelectedFont}
            showDifficultyGraph={showDifficultyGraph} setShowDifficultyGraph={setShowDifficultyGraph} />
        </div>

        {/* Card display */}
        <Tabs defaultValue="minimal" value={selectedCard} onValueChange={setSelectedCard}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="minimal" className="cursor-pointer">Minimal</TabsTrigger>
            <TabsTrigger value="detailed" className="cursor-pointer">Detailed</TabsTrigger>
            <TabsTrigger value="themed" className="cursor-pointer">Themed</TabsTrigger>
          </TabsList>

          <div className="flex justify-center mb-8">
            <TabsContent value="minimal" className="w-full max-w-md">
              <MinimalCard stats={leetcodeStats} theme={theme} showBorder={showBorder} font={selectedFont} showDifficultyGraph={showDifficultyGraph} githubUsername={githubUsername} websiteUrl={websiteUrl} />
            </TabsContent>
            <TabsContent value="detailed" className="w-full max-w-md">
              <DetailedCard stats={leetcodeStats} theme={theme} showBorder={showBorder} />
            </TabsContent>
            <TabsContent value="themed" className="w-full max-w-md">
              <ThemedCard stats={leetcodeStats} theme={theme} showBorder={showBorder} />
            </TabsContent>
          </div>
        </Tabs>

        {/* Options below the cards */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <ExportViewOptions selectedCard={selectedCard} username={username} theme={theme} showBorder={showBorder} githubUsername={githubUsername} websiteUrl={websiteUrl} selectedFont={selectedFont} showDifficultyGraph={false} />
        </div>
      </main>

      <Toaster />
      <Footer />
    </div>
  )
}
