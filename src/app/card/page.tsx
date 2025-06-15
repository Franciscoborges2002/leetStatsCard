import { Suspense } from "react"
import CardPage from "@/components/cardPage"

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CardPage />
        </Suspense>
    )
}