"use client"

import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Footer from "@/components/footer"
import UserProfileApiDocs from '@/components/apiDocs/userProfile'
import StatsApiDocs from '@/components/apiDocs/stats'
import SubmissionsApiDocs from '@/components/apiDocs/submissions'
import ContestApiDocs from '@/components/apiDocs/contest'

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generator
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">LeetCode GraphQL API Documentation</h1>
        <p className="text-muted-foreground">
          Explore the GraphQL queries used to fetch LeetCode data for the GitHub profile cards.
        </p>
      </div>

      <Alert className="mb-8">
        <AlertTitle>Important Note</AlertTitle>
        <AlertDescription>
          These queries are based on LeetCodes public GraphQL API. They may change without notice as LeetCode updates
          their API. Always check for the latest API changes if youre building your own implementation.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="profile" className="cursor-pointer">User Profile</TabsTrigger>
          <TabsTrigger value="stats" className="cursor-pointer">Problem Stats</TabsTrigger>
          <TabsTrigger value="submissions" className="cursor-pointer">Recent Submissions</TabsTrigger>
          <TabsTrigger value="contest" className="cursor-pointer">Contest Data</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <UserProfileApiDocs />
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <StatsApiDocs />
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <SubmissionsApiDocs />
        </TabsContent>

        <TabsContent value="contest" className="space-y-4">
          <ContestApiDocs />
        </TabsContent>
      </Tabs>

      <div className="mt-12 p-6 border rounded-lg bg-muted/30">
        <h2 className="text-xl font-bold mb-4">Using These Queries</h2>
        <p className="mb-4">
          These GraphQL queries can be used to fetch data from LeetCodes API. You can use them to build your own
          LeetCode stats cards or other applications that display LeetCode data.
        </p>
        <h3 className="font-medium mt-6 mb-2">API Endpoint</h3>
        <code className="bg-black/90 text-white p-2 rounded-md">https://leetcode.com/graphql</code>
        <h3 className="font-medium mt-6 mb-2">Authentication</h3>
        <p className="mb-4">
          Some queries may require authentication with LeetCode. For public profile data, authentication is typically
          not required.
        </p>
        <h3 className="font-medium mt-6 mb-2">Rate Limiting</h3>
        <p>
          LeetCode may apply rate limiting to API requests. Be sure to implement appropriate caching and respect rate
          limits to avoid being blocked.
        </p>
      </div>

      <Footer />
    </div>
  )
}
