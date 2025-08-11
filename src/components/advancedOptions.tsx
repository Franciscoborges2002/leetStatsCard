import { Label } from "recharts"
import { Slider } from "./ui/slider"
import { Input } from "./ui/input";
/* import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"*/

interface AdvancedOptionsProps {
    /* borderRadius: number[];
    setBorderRadius: (bodyRadius: number[]) => void; */
    accentColor: string;
    setAccentColor: (bodyRadius: string) => void;
    backgroundOpacity: number[]
    setBackgroundOpacity: (bodyRadius: number[]) => void;
}

export default function AdvancedOptions({ /* borderRadius, setBorderRadius, */ accentColor, setAccentColor, backgroundOpacity, setBackgroundOpacity}: AdvancedOptionsProps) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <Label /* htmlFor="accentColor" */ className="mb-2 block font-medium">
                        Accent Color
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">Primary color for highlights and accents</p>
                    <div className="flex gap-2">
                        <Input
                            id="accentColor"
                            type="color"
                            value={accentColor}
                            onChange={(e) => setAccentColor(e.target.value)}
                            className="w-16 h-10 p-1 border rounded"
                        />
                        <Input
                            value={accentColor}
                            onChange={(e) => setAccentColor(e.target.value)}
                            placeholder="#3b82f6"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div>
                    <Label className="mb-2 block font-medium">Border Radius</Label>
                    <p className="text-sm text-muted-foreground mb-2">Roundness of card corners (0-20px)</p>
                    <div className="flex items-center gap-4">
                        <Slider
                            value={borderRadius}
                            onValueChange={setBorderRadius}
                            max={20}
                            min={0}
                            step={1}
                            className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">{borderRadius[0]}px</span>
                    </div>
                </div>

                {/* <div>
                    <Label className="mb-2 block font-medium">Card Width</Label>
                    <p className="text-sm text-muted-foreground mb-2">Width of the card (300-600px)</p>
                    <div className="flex items-center gap-4">
                        <Slider
                            value={cardWidth}
                            onValueChange={setCardWidth}
                            max={600}
                            min={300}
                            step={10}
                            className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">{cardWidth[0]}px</span>
                    </div>
                </div> */}

                <div>
                    <Label className="mb-2 block font-medium">Background Opacity</Label>
                    <p className="text-sm text-muted-foreground mb-2">Transparency of the card background</p>
                    <div className="flex items-center gap-4">
                        <Slider
                            value={backgroundOpacity}
                            onValueChange={setBackgroundOpacity}
                            max={100}
                            min={10}
                            step={5}
                            className="flex-1"
                        />
                        <span className="text-sm font-medium w-12">{backgroundOpacity[0]}%</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {/* <div>
                    <Label htmlFor="animationStyle" className="mb-2 block font-medium">
                        Animation Style
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">Hover and loading animations</p>
                    <Select value={animationStyle} onValueChange={setAnimationStyle}>
                        <SelectTrigger id="animationStyle">
                            <SelectValue placeholder="Select animation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None - No animations</SelectItem>
                            <SelectItem value="subtle">Subtle - Light hover effects</SelectItem>
                            <SelectItem value="smooth">Smooth - Gentle transitions</SelectItem>
                            <SelectItem value="bouncy">Bouncy - Playful animations</SelectItem>
                            <SelectItem value="glow">Glow - Glowing effects</SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}

                {/* <div>
                    <Label htmlFor="dateFormat" className="mb-2 block font-medium">
                        Date Format
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">How to display timestamps</p>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                        <SelectTrigger id="dateFormat">
                            <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relative">Relative - "2 hours ago"</SelectItem>
                            <SelectItem value="absolute">Absolute - "Dec 15, 2024"</SelectItem>
                            <SelectItem value="short">Short - "12/15/24"</SelectItem>
                            <SelectItem value="iso">ISO - "2024-12-15"</SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}

                {/* <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-medium mb-2">Quick Presets</h4>
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setAccentColor("#3b82f6")
                                setBorderRadius([8])
                                setBackgroundOpacity([100])
                                setAnimationStyle("subtle")
                            }}
                        >
                            Default
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setAccentColor("#10b981")
                                setBorderRadius([12])
                                setBackgroundOpacity([95])
                                setAnimationStyle("smooth")
                            }}
                        >
                            Modern
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setAccentColor("#f59e0b")
                                setBorderRadius([0])
                                setBackgroundOpacity([100])
                                setAnimationStyle("none")
                            }}
                        >
                            Minimal
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setAccentColor("#8b5cf6")
                                setBorderRadius([16])
                                setBackgroundOpacity([90])
                                setAnimationStyle("glow")
                            }}
                        >
                            Vibrant
                        </Button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}