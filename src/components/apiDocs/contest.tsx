import renderCodeBlock from "@/utils/renderCodeBlock";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

export default function ContestApiDocs() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Contest Performance Query</CardTitle>
          <CardDescription>
            Fetches the users contest history, including ratings, rankings, and attended contests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderCodeBlock(
            `query getUserContestInfo($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
  }
  userContestRankingHistory(username: $username) {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
}`,
            "contest",
          )}

          <h3 className="font-medium mt-6 mb-2">Variables</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">username</code>: LeetCode username
            </li>
          </ul>

          <h3 className="font-medium mt-6 mb-2">Response Structure</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The response includes the users contest ranking and history of participated contests.
          </p>

          {renderCodeBlock(
            `{
  "data": {
    "userContestRanking": {
      "attendedContestsCount": 24,
      "rating": 1842,
      "globalRanking": 12543,
      "totalParticipants": 145678,
      "topPercentage": 8.6,
      "badge": {
        "name": "Knight"
      }
    },
    "userContestRankingHistory": [
      {
        "attended": true,
        "trendDirection": "UP",
        "problemsSolved": 3,
        "totalProblems": 4,
        "finishTimeInSeconds": 3600,
        "rating": 1842,
        "ranking": 2345,
        "contest": {
          "title": "Weekly Contest 345",
          "startTime": 1620504000
        }
      },
      {
        "attended": true,
        "trendDirection": "DOWN",
        "problemsSolved": 2,
        "totalProblems": 4,
        "finishTimeInSeconds": 3450,
        "rating": 1820,
        "ranking": 3456,
        "contest": {
          "title": "Weekly Contest 344",
          "startTime": 1619899200
        }
      }
      // More contest history...
    ]
  }
}`,
            "contest-response",
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language Distribution Query</CardTitle>
          <CardDescription>
            Fetches the distribution of programming languages used in the users submissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderCodeBlock(
            `query getUserLanguageStats($username: String!) {
  matchedUser(username: $username) {
    languageProblemCount {
      languageName
      problemsSolved
    }
  }
}`,
            "language",
          )}

          <h3 className="font-medium mt-6 mb-2">Variables</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <code className="bg-muted px-1 py-0.5 rounded">username</code>: LeetCode username
            </li>
          </ul>

          <h3 className="font-medium mt-6 mb-2">Response Structure</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The response includes the count of problems solved with each programming language.
          </p>

          {renderCodeBlock(
            `{
  "data": {
    "matchedUser": {
      "languageProblemCount": [
        {
          "languageName": "Python",
          "problemsSolved": 245
        },
        {
          "languageName": "JavaScript",
          "problemsSolved": 98
        },
        {
          "languageName": "Java",
          "problemsSolved": 45
        },
        {
          "languageName": "C++",
          "problemsSolved": 35
        }
      ]
    }
  }
}`,
            "language-response",
          )}
        </CardContent>
      </Card>
    </div>
  )
}