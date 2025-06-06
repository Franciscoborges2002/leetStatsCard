/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
// pages/card.tsx
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MinimalCard from "@/components/cards/minimalCard" // adjust path as needed
import { ApiResponse } from '@/utils/interfaces'
import { TextAnimate } from '@/components/magicui/text-animate'


export default function CardPage() {
    const searchParams = useSearchParams()
    /* const [isReady, setIsReady] = useState<boolean>(false) */
    const [stats, setStats] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [username, setUsername] = useState('')
    const [cardType, setCardType] = useState('minimal')
    const [theme, setTheme] = useState('dark')
    const [showBorder, setShowBorder] = useState(true)
    const [showDifficultyGraph, setShowDifficultyGraph] = useState(false)
    const [font, setFont] = useState('')

    useEffect(() => {
        if (!searchParams) return

        const usernameParam = searchParams.get('username') || ''
        setUsername(usernameParam)
        setCardType(searchParams.get('card') || 'minimal')
        setTheme(searchParams.get('type') || 'dark')
        setShowBorder(searchParams.get('showBorder') === 'true')
        setShowDifficultyGraph(searchParams.get('showDifficultyGraph') === 'true')
        setFont(searchParams.get('font') || '')
    }, [searchParams])

    useEffect(() => {
        if (!username) return

        const fetchStats = async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await fetch(`/api/leetcode?username=${username}`)
                if (!res.ok) throw new Error(`API error: ${res.status}`)
                const data = await res.json()
                setStats(data)
            } catch (err: any) {
                setError(err.message || 'Unknown error')
                setStats(null)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [username])



    if (!searchParams) return <div>Loading...</div>

    if (!username) return <div className="p-6">Username is required.</div>
    if (loading) return <div className="p-6">Loading stats for {username}...</div>
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>

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
        linkedinUrl: stats.matchedUser.linkedinUrl,
        twitterUrl: stats.matchedUser.twitterUrl,
        websites: stats.matchedUser.profile.websites,
        userAvatar: stats.matchedUser.profile.userAvatar,
        ranking: stats.matchedUser.profile.ranking, // you can calculate or fetch this if needed
        acceptanceRate: 67.8, // replace with real value if available
        contributionPoints: 2345,
        streak: 15,
    } : null

    return (
        <div className="">
            {cardType === 'minimal' && (
                <MinimalCard statsUser={leetcodeStats} allQuestions={allQuestionsCount} theme={theme} showBorder={showBorder} font={font} showDifficultyGraph={showDifficultyGraph} />
            )}
        </div>
    )
}
