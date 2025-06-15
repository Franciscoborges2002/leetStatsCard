import Link from "next/link"
import { Github, FileCode, History, Moon, Sun } from "lucide-react"/* BarChart */
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Footer() {
    const { setTheme } = useTheme()

    return (
        <footer className="w-full text-sm mt-12">
            {/* Top Divider Line */}
            <div className="border-t" />

            {/* Main Footer Content */}
            <div className="py-6 flex flex-row s:flex-col items-center justify-between gap-6 w-full px-5">
                {/* Left: Description */}
                <div className="text-muted-foreground text-wrap">
                    <p>LeetCode Stats Card – easily share your coding grind with style.</p>
                </div>

                {/* Right: Links + Theme Toggle */}
                <div className="flex flex-row items-center gap-4 justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Toggle theme" className="cursor-pointer">
                                <Sun className="h-[1.2rem] w-[1.2rem] transition-transform dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">Dark</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex flex-col gap-4 md:flex-row sm:gap-2">
                        {[
                            { href: "/changelog", label: "Changelog", icon: History },
                            /* { href: "/stats", label: "Stats", icon: BarChart }, */
                            /* { href: "/apidocs", label: "API Docs", icon: FileCode }, */
                        ].map(({ href, label, icon: Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </Link>
                        ))}

                        <Link
                            href="https://github.com/Franciscoborges2002/leetStatsCard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="h-4 w-4" />
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Divider Line */}
            <div className="border-t" />

            {/* Bottom Copyright */}
            <div className="container py-4">
                <p className="text-muted-foreground text-center text-xs">
                    &copy; {new Date().getFullYear()} LeetCode Cards. Built with ❤️ by <a href="https://fborges.dev" className="hover:underline">fborges</a>.
                </p>
            </div>
        </footer>
    )
}
