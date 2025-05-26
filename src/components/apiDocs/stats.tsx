import renderCodeBlock from "@/utils/renderCodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function StatsApiDocs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Problem Solving Statistics Query</CardTitle>
                <CardDescription>
                    Fetches detailed statistics about the users problem-solving activity, including counts by difficulty
                    and tags.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {renderCodeBlock(
                    `query getUserProblemStats($username: String!) {
  matchedUser(username: $username) {
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    problemsSolvedBeatsStats {
      difficulty
      percentage
    }
    profileCalendar {
      activeYears
      streak
      totalActiveDays
      submissionCalendar
    }
  }
  allQuestionsCount {
    difficulty
    count
  }
  matchedUserStats: userProblemsSolved(username: $username) {
    difficulty
    count
    problemsSolved {
      titleSlug
      title
      difficulty
    }
  }
  tagProblemCounts(username: $username) {
    tag {
      name
      slug
    }
    problemsSolved
  }
}`,
                    "stats",
                )}

                <h3 className="font-medium mt-6 mb-2">Variables</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <code className="bg-muted px-1 py-0.5 rounded">username</code>: LeetCode username
                    </li>
                </ul>

                <h3 className="font-medium mt-6 mb-2">Response Structure</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    The response includes detailed problem-solving statistics, including counts by difficulty, submission
                    history, and problem tags.
                </p>

                {renderCodeBlock(
                    `{
  "data": {
    "matchedUser": {
      "submitStats": {
        "acSubmissionNum": [
          {
            "difficulty": "All",
            "count": 423,
            "submissions": 623
          },
          {
            "difficulty": "Easy",
            "count": 187,
            "submissions": 220
          },
          {
            "difficulty": "Medium",
            "count": 201,
            "submissions": 320
          },
          {
            "difficulty": "Hard",
            "count": 35,
            "submissions": 83
          }
        ],
        "totalSubmissionNum": [
          {
            "difficulty": "All",
            "count": 623,
            "submissions": 623
          },
          {
            "difficulty": "Easy",
            "count": 220,
            "submissions": 220
          },
          {
            "difficulty": "Medium",
            "count": 320,
            "submissions": 320
          },
          {
            "difficulty": "Hard",
            "count": 83,
            "submissions": 83
          }
        ]
      },
      "problemsSolvedBeatsStats": [
        {
          "difficulty": "Easy",
          "percentage": 78.5
        },
        {
          "difficulty": "Medium",
          "percentage": 65.2
        },
        {
          "difficulty": "Hard",
          "percentage": 42.3
        }
      ],
      "profileCalendar": {
        "activeYears": [2023, 2024, 2025],
        "streak": 15,
        "totalActiveDays": 187,
        "submissionCalendar": "{\"2025-05-14\":5,\"2025-05-13\":3,\"2025-05-12\":7,...}"
      }
    },
    "allQuestionsCount": [
      {
        "difficulty": "All",
        "count": 2500
      },
      {
        "difficulty": "Easy",
        "count": 750
      },
      {
        "difficulty": "Medium",
        "count": 1250
      },
      {
        "difficulty": "Hard",
        "count": 500
      }
    ],
    "matchedUserStats": [
      {
        "difficulty": "All",
        "count": 423,
        "problemsSolved": [
          {
            "titleSlug": "two-sum",
            "title": "Two Sum",
            "difficulty": "Easy"
          },
          // More problems...
        ]
      }
    ],
    "tagProblemCounts": [
      {
        "tag": {
          "name": "Array",
          "slug": "array"
        },
        "problemsSolved": 87
      },
      {
        "tag": {
          "name": "Dynamic Programming",
          "slug": "dynamic-programming"
        },
        "problemsSolved": 42
      }
      // More tags...
    ]
  }
}`,
                    "stats-response",
                )}
            </CardContent>
        </Card>
    )
}