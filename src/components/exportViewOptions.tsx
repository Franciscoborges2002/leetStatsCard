import { Github, Clipboard, ExternalLink, IdCard } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { toast } from "sonner";

export default function ExportViewOptions({ selectedCard, username, theme, showBorder, selectedFont, showDifficultyGraph, previewURL }:
    { selectedCard: string, username: string, theme: string, showBorder: boolean, selectedFont: string, showDifficultyGraph: boolean, previewURL: string })
    : ReactNode | Promise<ReactNode> {
    const copyMarkdown = () => {
        const markdown = `![LeetCode Stats](${previewURL})`

        navigator.clipboard.writeText(markdown)
        toast("Copied to clipboard", {
            description: "Markdown has been copied to your clipboard!",
            duration: 2000,
            closeButton: true,
        })
    }

    const copyWebsite = () => {
        const markdown = `<a hred="${previewURL}"><img src="${previewURL}" alt="LeetCode Stats" /></a>`

        navigator.clipboard.writeText(markdown)
        toast("Copied to clipboard", {
            description: "HTML code has been copied to your clipboard!",
            duration: 2000,
            closeButton: true,
        })
    }

    /* const generateMarkdown = () => {
        const baseUrl = "https://leetcode-cards.vercel.app"

        // Build position parameters
        const positionParams = Object.entries(componentPositions)
            .map(([key, value]) => `${key}Position=${value}`)
            .join("&")

        const cardMarkdown = `![LeetCode Stats](${baseUrl}/api/${selectedCard}?username=${username}&github=${githubUsername}&website=${encodeURIComponent(websiteUrl)}&theme=${theme}&border=${showBorder}&font=${selectedFont}&diffGraph=${showDifficultyGraph}&timeframe=${activityTimeframe}&${positionParams})`

        return cardMarkdown
    } */

    /* timeframe: "${activityTimeframe}"
          component_positions: "${Object.entries(componentPositions)
                .map(([key, value]) => `${key}:${value}`)
                .join(",")}" */

    const generateAutoUpdateGuide = () => {
        return `## 🔄 Auto-updating LeetCode Stats

This LeetCode stats card can be automatically updated using GitHub Actions! Here's how to set it up:

### Step 1: Create the Workflow File

1. In your GitHub profile repository, create a new file at \`.github/workflows/leetcode-stats.yml\`
2. Add the following content:

\`\`\`yaml
name: Update LeetCode Stats

on:
  schedule:
    # Runs at 12am UTC every day
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  update-readme:
    name: Update LeetCode Stats
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update README with LeetCode Stats
        uses: leetcode-cards/stats-action@v1
        with:
          leetcode_username: "${username}"
          card_design: "${selectedCard}"
          theme: "${theme}"
          show_border: ${showBorder}
          font: "${selectedFont}"
          show_difficulty_graph: ${showDifficultyGraph}
          readme_path: "./README.md"
          gh_token: \${{ secrets.GITHUB_TOKEN }}
\`\`\`

### Step 2: Commit and Enable

1. Commit the workflow file to your repository
2. Your LeetCode stats will now update automatically every day at midnight UTC
3. You can also manually trigger the workflow by going to the **Actions** tab in your repository and clicking "Run workflow"

### Step 3: Verify Setup

- Check the **Actions** tab in your repository to see if the workflow runs successfully
- The first run might take a few minutes to complete
- Your README will be automatically updated with fresh LeetCode stats

### Troubleshooting

- Make sure your repository has a README.md file
- Ensure the LeetCode username is correct and publicly accessible
- Check the Actions tab for any error messages if the workflow fails

> 💡 **Pro Tip**: You can customize the schedule by modifying the cron expression. For example, \`"0 12 * * *"\` runs at noon UTC daily.`
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row gap-2 align-center justify-between">
                <div className="flex flex-row gap-2 align-center">
                    <IdCard />
                    <h2 className="text-xl font-medium mb-4">Add Card</h2>
                </div>
                <Button
                    variant="outline"
                    className="flex gap-2 cursor-pointer"
                    onClick={() => {
                        /* const baseUrl = "https://leetcode-cards.vercel.app" */
                        /*  const positionParams = Object.entries(componentPositions)
                             .map(([key, value]) => `${key}Position=${value}`)
                             .join("&") */
                        window.open(previewURL, "_blank")
                    }}
                >
                    <ExternalLink className="h-4 w-4" />
                    Preview Badge
                </Button>
            </div>
            <Tabs className="bg-muted/50 p-4 rounded-lg" defaultValue="static">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="static" className="cursor-pointer">Static</TabsTrigger>
                    <TabsTrigger value="autoUpdate" className="cursor-pointer">Auto Update</TabsTrigger>
                </TabsList>
                <TabsContent value={"static"} className="flex flex-col gap-5">
                    <div>
                        <h3 className="text-lg font-medium mb-4">Add to your GitHub profile</h3>
                        <div className="mb-4 bg-black/90 text-white p-3 rounded-md overflow-x-auto">
                            <code className="text-sm">
                                {`![LeetCode Stats](${previewURL})`}
                            </code>
                        </div>

                        <div className="flex flex-row gap-5">
                            <Button onClick={copyMarkdown} className="flex gap-2 w-2/6 cursor-pointer">
                                <Clipboard className="h-4 w-4" />
                                Copy Markdown
                            </Button>
                            <Button variant="outline" className="flex gap-2 w-2/6 cursor-pointer" asChild>
                                <a href="https://github.com/settings/profile" target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4" />
                                    Edit GitHub Profile
                                </a>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">Add to your website</h3>
                        <div className="mb-4 bg-black/90 text-white p-3 rounded-md overflow-x-auto">
                            <code className="text-sm">
                                {`<a hred="${previewURL}"><img src="${previewURL}" alt="LeetCode Stats" /></a>`}
                            </code>
                        </div>

                        <div className="flex flex-row sm:flex-col gap-5">
                            <Button onClick={copyWebsite} className="flex gap-2 w-2/6 cursor-pointer">
                                <Clipboard className="h-4 w-4" />
                                Copy
                            </Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value={"autoUpdate"}>
                    <div className="border-t pt-6">
                        <div className="mb-4 bg-black/90 text-white p-3 rounded-md overflow-x-auto">
                            <code className="text-sm whitespace-pre-wrap">{generateAutoUpdateGuide()}</code>
                        </div>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(generateAutoUpdateGuide())
                                /* showToast(
                                    "success",
                                    "Auto-update guide copied",
                                    "The GitHub Actions workflow guide has been copied to your clipboard",
                                ) */
                            }}
                            variant="outline"
                            className="flex gap-2 w-2/6"
                        >
                            <Clipboard className="h-4 w-4" />
                            Copy Auto-Update Guide
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            {/*  <div className="flex gap-2">
                
                <Button variant="outline" className="flex gap-2" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <Code className="h-4 w-4" />
                        View Source
                    </a>
                </Button> 
            </div>*/}
        </div>
    )
}