import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardType } from "@/enum/Card";

interface BasicOptionsProps {
    username: string;
    setUsername: (username: string) => void;
    fetchStats: () => void;
    loading: boolean;
    theme: string;
    setTheme: (theme: string) => void;
    showBorder: boolean;
    setShowBorder: (showBorder: boolean) => void;
    selectedFont: string;
    setSelectedFont: (selectedFont: string) => void;
    showDifficultyGraph: boolean;
    setShowDifficultyGraph: (showDifficultyGraph: boolean) => void;
    showLinks: boolean;
    setShowLinks: (showLinks: boolean) => void;
    showStreak: boolean;
    setShowStreak: (showStreak: boolean) => void;
    cardType: CardType;
    setCardType: (cardType: CardType) => void;
    showIcons: boolean;
    setShowIcons: (showIcons: boolean) => void;
}

export default function BasicOptions({ username, setUsername, fetchStats, loading, theme, setTheme, showBorder, setShowBorder, selectedFont, setSelectedFont, showDifficultyGraph, setShowDifficultyGraph, showLinks, setShowLinks, showStreak, setShowStreak, cardType, setCardType, showIcons, setShowIcons }
    : BasicOptionsProps) {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <Label htmlFor="username" className="mb-2 block">
                        LeetCode Username
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">Your public LeetCode profile username</p>
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
                    <Label htmlFor="cardTyype" className="mb-2 block">
                        Type of Card
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">Select the type of card you want to display</p>
                    <div className="flex gap-2">
                        <Select value={cardType} onValueChange={setCardType}>
                            <SelectTrigger id="cardType">
                                <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={CardType.MAIN_STATS}>Main - Present overall informatios of account</SelectItem>
                                <SelectItem value={CardType.DAILY_ACTIVITY}>Daily Activity - Show you daily activity</SelectItem>
                                <SelectItem value={CardType.LAST_CONTRIBUTIONS}>Last Contributions - Show your last contributions</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-row gap-5">
                    <div>
                        <Label htmlFor="theme" className="mb-2 block font-medium">
                            Card Theme
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">Choose the visual style and color scheme</p>
                        <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger id="theme">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light - Clean white background</SelectItem>
                                <SelectItem value="dark">Dark - Dark background with light text</SelectItem>
                                <SelectItem value="github">GitHub - Matches GitHub&apos;s design</SelectItem>
                                <SelectItem value="leetcode">LeetCode - Official LeetCode colors</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="font" className="mb-2 block font-medium">
                            Font Family
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">Typography style for your card text</p>
                        <Select value={selectedFont} onValueChange={setSelectedFont}>
                            <SelectTrigger id="font">
                                <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="inter">Inter - Modern and clean</SelectItem>
                                <SelectItem value="roboto">Roboto - Google&apos;s material design</SelectItem>
                                <SelectItem value="mono">Monospace - Code-style font</SelectItem>
                                <SelectItem value="serif">Serif - Traditional and elegant</SelectItem>
                                <SelectItem value="system">System UI - Your device&apos;s default</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
                <h4 className="font-medium text-sm">Display Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-2">
                        <Switch id="border" checked={showBorder} onCheckedChange={setShowBorder} className="cursor-pointer" />
                        <div>
                            <Label htmlFor="border">Show Border</Label>
                            <p className="text-sm text-muted-foreground">Add a border around the card</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <Switch id="diffGraph" checked={showDifficultyGraph} onCheckedChange={setShowDifficultyGraph} className="cursor-pointer" />
                        <div>
                            <Label htmlFor="diffGraph">Difficulty Graph</Label>
                            <p className="text-sm text-muted-foreground">Show visual progress bars for each difficulty</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <Switch id="showStreak" checked={showStreak} onCheckedChange={setShowStreak} className="cursor-pointer" />
                        <div>
                            <Label htmlFor="showStreak" className="font-medium">
                                Show Streak
                            </Label>
                            <p className="text-sm text-muted-foreground">Display your current solving streak</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <Switch id="links" checked={showLinks} onCheckedChange={setShowLinks} className="cursor-pointer" />
                        <div>
                            <Label htmlFor="links">Show Links</Label>
                            <p className="text-sm text-muted-foreground">Display external links</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-2">
                        <Switch id="links" checked={showIcons} onCheckedChange={setShowIcons} className="cursor-pointer" />
                        <div>
                            <Label htmlFor="links">Show Icons</Label>
                            <p className="text-sm text-muted-foreground">Display Icons</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}