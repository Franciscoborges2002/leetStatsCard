"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StatsChart from "@/components/statsChart"
import WorldMap from "@/components/worldMap"
import Footer from "@/components/footer"

export default function StatsPage() {
    const [timeRange, setTimeRange] = useState("30days")

    // Mock data - in a real app, this would come from a database or analytics API
    const statsData = {
        totalVisitors: 125743,
        activeUsers: 42891,
        cardsGenerated: 68452,
        githubWorkflows: 15723,
        popularDesigns: [
            { name: "Minimal", value: 45 },
            { name: "Detailed", value: 32 },
            { name: "Themed", value: 23 },
        ],
        popularComponents: [
            { name: "Activity Graph", value: 68 },
            { name: "Recent Activities", value: 54 },
            { name: "Contest Performance", value: 42 },
            { name: "Language Distribution", value: 38 },
            { name: "Achievements", value: 29 },
        ],
        dailyVisitors: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            visitors: Math.floor(Math.random() * 2000) + 3000,
            newUsers: Math.floor(Math.random() * 800) + 1200,
        })),
        countryData: [
            { country: "United States", users: 18452 },
            { country: "India", users: 12743 },
            { country: "China", users: 8921 },
            { country: "Germany", users: 5632 },
            { country: "United Kingdom", users: 4891 },
            { country: "Canada", users: 3752 },
            { country: "Brazil", users: 3421 },
            { country: "Australia", users: 2984 },
            { country: "France", users: 2753 },
            { country: "Japan", users: 2541 },
        ],
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-6xl">
            <header>
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="mb-4 cursor-pointer">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Generator
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold mb-2">Usage Statistics</h1>
                    <p className="text-muted-foreground">Global statistics for LeetCode GitHub Profile Cards usage and adoption.</p>
                </div>
            </header>

            <main>
                <div className="flex justify-end mb-4">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7days">Last 7 days</SelectItem>
                            <SelectItem value="30days">Last 30 days</SelectItem>
                            <SelectItem value="90days">Last 90 days</SelectItem>
                            <SelectItem value="year">Last year</SelectItem>
                            <SelectItem value="alltime">All time</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Key metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visitors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statsData.totalVisitors.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">+12.5% from last period</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statsData.activeUsers.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">+8.3% from last period</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Cards Generated</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statsData.cardsGenerated.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">+15.2% from last period</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">GitHub Workflows</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{statsData.githubWorkflows.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">+23.7% from last period</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts */}
                <Tabs defaultValue="visitors" className="mb-8">
                    <TabsList>
                        <TabsTrigger value="visitors">Visitors</TabsTrigger>
                        <TabsTrigger value="designs">Card Designs</TabsTrigger>
                        <TabsTrigger value="components">Components</TabsTrigger>
                        <TabsTrigger value="geography">Geography</TabsTrigger>
                    </TabsList>
                    <TabsContent value="visitors" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Daily Visitors</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <StatsChart
                                    data={statsData.dailyVisitors}
                                    type="line"
                                    xKey="date"
                                    series={[
                                        { key: "visitors", name: "Total Visitors", color: "#3b82f6" },
                                        { key: "newUsers", name: "New Users", color: "#10b981" },
                                    ]}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="designs" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Popular Card Designs</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <StatsChart data={statsData.popularDesigns} type="pie" nameKey="name" valueKey="value" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="components" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Popular Components</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <StatsChart data={statsData.popularComponents} type="bar" nameKey="name" valueKey="value" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="geography" className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Users by Country</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] mb-6">
                                    <WorldMap data={statsData.countryData} />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {statsData.countryData.slice(0, 5).map((item, index) => (
                                        <div key={index} className="text-center">
                                            <div className="text-sm font-medium">{item.country}</div>
                                            <div className="text-lg font-bold">{item.users.toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Additional stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Referrers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>GitHub</span>
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">42.3%</span>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{ width: "42.3%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Direct</span>
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">28.7%</span>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{ width: "28.7%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>LeetCode</span>
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">15.2%</span>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{ width: "15.2%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Twitter</span>
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">8.5%</span>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{ width: "8.5%" }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Other</span>
                                    <div className="flex items-center">
                                        <span className="font-medium mr-2">5.3%</span>
                                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{ width: "5.3%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>User Retention</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">1-day retention</span>
                                        <span className="text-sm font-medium">78.4%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: "78.4%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">7-day retention</span>
                                        <span className="text-sm font-medium">52.7%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: "52.7%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">30-day retention</span>
                                        <span className="text-sm font-medium">38.2%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: "38.2%" }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm">90-day retention</span>
                                        <span className="text-sm font-medium">24.5%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="bg-green-500 h-full" style={{ width: "24.5%" }}></div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
