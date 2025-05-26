// pages/card.tsx
/* import { useRouter } from "next/router" */
import MinimalCard from "@/components/cards/minimalCard" // adjust path as needed

const mockStats = {
    username: "guest123",
    totalSolved: 150,
    totalQuestions: 2500,
    easySolved: 70,
    totalEasy: 500,
    mediumSolved: 60,
    totalMedium: 1000,
    hardSolved: 20,
    totalHard: 1000,
    ranking: 12345,
    acceptanceRate: 76.5,
    streak: 12
}

export default function CardPage() {
    /* const router = useRouter() */
    /* const { username } = router.query */

    const stats = {
        ...mockStats
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <MinimalCard stats={stats} theme="dark" showBorder={true} />
        </div>
    )
}
