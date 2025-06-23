import { TextAnimate } from "./magicui/text-animate";

export default function LoadingAnimation() {
    return (
        <div className="flex flex-col gap-5 items-center justify-center min-h-screen px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-slate-500 border-opacity-50"></div>
            <TextAnimate animation="blurInUp" by="word" once className="text-2xl font-bold">
                Leetcode Stats Card
            </TextAnimate>
            <TextAnimate animation="blurInUp" by="word" once>
                Fetching Information...
            </TextAnimate>
        </div>
    )
}