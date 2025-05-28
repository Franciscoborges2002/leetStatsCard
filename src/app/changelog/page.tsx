"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"

export default function ChangelogPage() {
    return (
        <div>
            <div className="">
                <header className="container mx-auto py-10 px-4 max-w-3xl">
                    <div className="mb-8">
                        <Link href="/" className="cursor-text">
                            <Button variant="ghost" size="sm" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Generator
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold mb-2">Changelog</h1>
                        <p className="text-muted-foreground">
                            A history of updates and improvements to the LeetCode GitHub Profile Cards.
                        </p>
                    </div>
                </header>

                <main className="space-y-12 container mx-auto py-10 px-4 max-w-3xl">
                    {/* Version 1.0.0 */}
                    <div>
                        <div className="flex items-baseline justify-between mb-4">
                            <h2 className="text-2xl font-bold">Initial Release</h2>
                            <div className="text-sm font-mono bg-muted px-2 py-1 rounded">v1.0.0</div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">Released on March 25, 2025</div>
                        <ul className="space-y-2 list-disc pl-5">
                            <li>Launched with three card designs: Minimal, Detailed, and Themed</li>
                            <li>Basic LeetCode stats display</li>
                            <li>Simple theme customization</li>
                            <li>Markdown generation for GitHub profiles</li>
                            <li>Copy to clipboard functionality</li>
                        </ul>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}
