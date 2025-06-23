/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MinimalCard from "@/components/cards/minimalCard" // adjust path as needed
import { ApiResponse } from '@/utils/interfaces'
import LoadingAnimation from './loadingAnimation'


export default function CardPage() {
    const searchParams = useSearchParams()
    /* const [isReady, setIsReady] = useState<boolean>(false) */
    const [stats, setStats] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [username, setUsername] = useState('')
    const [cardType, setCardType] = useState('minimal')
    const [theme, setTheme] = useState('light')
    const [selectedFont, setSelectedFont] = useState('')

    /* Costumization */
    const [showDifficultyGraph, setShowDifficultyGraph] = useState<boolean>(true)
    const [showBorder, setShowBorder] = useState<boolean>(true)
    const [showLinks, setShowLinks] = useState<boolean>(true)
    const [showIcons, setShowIcons] = useState<boolean>(true)
    const [showStreak, setShowStreak] = useState<boolean>(true)
    const [borderRadius, setBorderRadius] = useState<number[]>([10]);
    const [accentColor, setAccentColor] = useState<string>("#3b82f6")
    const [backgroundOpacity, setBackgroundOpacity] = useState<number[]>([100])

    useEffect(() => {
        if (!searchParams) return
        const getNumberArray = (val: string | null): number[] =>
            val ? val.split(",").map(num => parseInt(num)) : []

        setUsername(searchParams.get('username') || '')
        setCardType(searchParams.get('card') || 'minimal')
        setTheme(searchParams.get('theme') || 'dark')
        setShowBorder(searchParams.get('border') === 'true')
        setShowDifficultyGraph(searchParams.get('showDifficultyGraph') === 'true')
        setSelectedFont(searchParams.get('font') || '')
        setShowLinks(searchParams.get("links") === 'true')
        setShowIcons(searchParams.get("icons") === 'true')
        setShowStreak(searchParams.get("streak") === 'true')
        setBorderRadius(getNumberArray(searchParams.get("borderRadius")) || [10])
        setAccentColor(searchParams.get("accentColor") || "#3b82f6")
        setBackgroundOpacity(getNumberArray(searchParams.get("backgroundOpacity")) || [100])
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
                console.log(data)
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

    if (!stats) return <LoadingAnimation />


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
        <>
            {cardType === 'minimal' && (
                <MinimalCard statsUser={leetcodeStats} allQuestions={allQuestionsCount} customizations={cardCustomizations}/>
            )}
        </>
    )
}
