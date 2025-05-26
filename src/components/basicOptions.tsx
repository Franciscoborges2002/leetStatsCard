import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw, Settings } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function BasicOptions({ username, setUsername, githubUsername, setGithubUsername, fetchStats, loading, theme, setTheme, showBorder, setShowBorder, websiteUrl, setWebsiteUrl, selectedFont, setSelectedFont, showDifficultyGraph, setShowDifficultyGraph }:
    {
        username: string, setUsername: (username: string) => void, githubUsername: string,
        setGithubUsername: (githubUsername: string) => void, fetchStats: () => void, loading: boolean,
        theme: string, setTheme: (theme: string) => void, showBorder: boolean, setShowBorder: (showBorder: boolean) => void,
        websiteUrl: string, setWebsiteUrl: (websiteUrl: string) => void, selectedFont: string, setSelectedFont: (selectedFont: string) => void,
        showDifficultyGraph: boolean, setShowDifficultyGraph: (showDifficultyGraph: boolean) => void
    }) {
    return (
        <Accordion type="multiple" defaultValue={["basic"]}>
            <AccordionItem value="basic">
                <AccordionTrigger className="py-4 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>Basic Settings</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label htmlFor="username" className="mb-2 block">
                                LeetCode Username
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter LeetCode username"
                                />
                                <Button variant="outline" size="icon" onClick={fetchStats} disabled={loading} className="cursor-pointer">
                                    {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="github" className="mb-2 block">
                                GitHub Username
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    id="github"
                                    value={githubUsername}
                                    onChange={(e) => setGithubUsername(e.target.value)}
                                    placeholder="Enter GitHub username"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="website" className="mb-2 block">
                                Website URL
                            </Label>
                            <Input
                                id="website"
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
                                placeholder="https://yourwebsite.com"
                            />
                        </div>

                        <div className="flex flex-row gap-5">
                            <div>
                                <Label htmlFor="theme" className="mb-2 block">
                                    Theme
                                </Label>
                                <Select value={theme} onValueChange={setTheme}>
                                    <SelectTrigger id="theme" className="cursor-pointer">
                                        <SelectValue placeholder="Select theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light" className="cursor-pointer">Light</SelectItem>
                                        <SelectItem value="dark" className="cursor-pointer">Dark</SelectItem>
                                        <SelectItem value="github" className="cursor-pointer">GitHub</SelectItem>
                                        <SelectItem value="leetcode" className="cursor-pointer">LeetCode</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="font" className="mb-2 block">
                                    Font
                                </Label>
                                <Select value={selectedFont} onValueChange={setSelectedFont}>
                                    <SelectTrigger id="font" className="cursor-pointer">
                                        <SelectValue placeholder="Select font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inter" className="cursor-pointer">Inter</SelectItem>
                                        <SelectItem value="roboto" className="cursor-pointer">Roboto</SelectItem>
                                        <SelectItem value="mono" className="cursor-pointer">Monospace</SelectItem>
                                        <SelectItem value="serif" className="cursor-pointer">Serif</SelectItem>
                                        <SelectItem value="system" className="cursor-pointer">System UI</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center space-x-2">
                            <Switch id="border" checked={showBorder} onCheckedChange={setShowBorder} className="cursor-pointer" />
                            <Label htmlFor="border">Show Border</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="diffGraph" checked={showDifficultyGraph} onCheckedChange={setShowDifficultyGraph} className="cursor-pointer" />
                            <Label htmlFor="diffGraph">Difficulty Graph</Label>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}