import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/toastManager"

export default function RenderCodeBlock(code: string, queryName: string) {
    const [copiedQuery, setCopiedQuery] = useState<string | null>(null)
    const { showToast } = useToast()
    
    const copyToClipboard = (text: string, queryName: string) => {
        navigator.clipboard.writeText(text)
        setCopiedQuery(queryName)
        showToast("success", "Copied to clipboard", `The ${queryName} query has been copied to your clipboard`)
        setTimeout(() => setCopiedQuery(null), 2000)
    }

    return (
        <div className="relative">
            <pre className="bg-black/90 text-white p-4 rounded-md overflow-x-auto text-sm my-4">
                <code>{code}</code>
            </pre>
            <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(code, queryName)}
            >
                {copiedQuery === queryName ? (
                    <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied
                    </>
                ) : (
                    <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                    </>
                )}
            </Button>
        </div>
    )
}