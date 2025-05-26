import renderCodeBlock from "@/utils/renderCodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function SubmissionsApiDocs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Submissions Query</CardTitle>
                <CardDescription>
                    Fetches the users most recent submissions, including problem details and submission status.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {renderCodeBlock(
                    `query getUserRecentSubmissions($username: String!, $limit: Int!) {
  recentSubmissionList(username: $username, limit: $limit) {
    id
    title
    titleSlug
    timestamp
    statusDisplay
    lang
    __typename
    question {
      questionId
      title
      titleSlug
      difficulty
      questionFrontendId
    }
  }
}`,
                    "submissions",
                )}

                <h3 className="font-medium mt-6 mb-2">Variables</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <code className="bg-muted px-1 py-0.5 rounded">username</code>: LeetCode username
                    </li>
                    <li>
                        <code className="bg-muted px-1 py-0.5 rounded">limit</code>: Number of submissions to retrieve
                    </li>
                </ul>

                <h3 className="font-medium mt-6 mb-2">Response Structure</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    The response includes the users most recent submissions with problem details and submission status.
                </p>

                {renderCodeBlock(
                    `{
  "data": {
    "recentSubmissionList": [
      {
        "id": "1234567890",
        "title": "Two Sum",
        "titleSlug": "two-sum",
        "timestamp": "1621234567",
        "statusDisplay": "Accepted",
        "lang": "python3",
        "__typename": "SubmissionNode",
        "question": {
          "questionId": "1",
          "title": "Two Sum",
          "titleSlug": "two-sum",
          "difficulty": "Easy",
          "questionFrontendId": "1"
        }
      },
      {
        "id": "1234567891",
        "title": "LRU Cache",
        "titleSlug": "lru-cache",
        "timestamp": "1621234467",
        "statusDisplay": "Accepted",
        "lang": "javascript",
        "__typename": "SubmissionNode",
        "question": {
          "questionId": "146",
          "title": "LRU Cache",
          "titleSlug": "lru-cache",
          "difficulty": "Medium",
          "questionFrontendId": "146"
        }
      }
      // More submissions...
    ]
  }
}`,
                    "submissions-response",
                )}
            </CardContent>
        </Card>
    )
}