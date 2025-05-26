import renderCodeBlock from "@/utils/renderCodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function UserProfileApiDocs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Profile Query</CardTitle>
                <CardDescription>
                    Fetches basic user profile information including username, real name, bio, and social links.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {renderCodeBlock(
                    `query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      realName
      websites
      countryName
      skillTags
      company
      school
      starRating
      aboutMe
      userAvatar
      reputation
      ranking
    }
    socialAccounts {
      provider
      profileUrl
    }
  }
}`,
                    "profile",
                )}

                <h3 className="font-medium mt-6 mb-2">Variables</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <code className="bg-muted px-1 py-0.5 rounded">username</code>: LeetCode username
                    </li>
                </ul>

                <h3 className="font-medium mt-6 mb-2">Response Structure</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    The response includes the users profile information and social media accounts.
                </p>

                {renderCodeBlock(
                    `{
  "data": {
    "matchedUser": {
      "username": "johndoe",
      "profile": {
        "realName": "John Doe",
        "websites": ["https://johndoe.dev", "https://github.com/johndoe"],
        "countryName": "United States",
        "skillTags": ["Python", "JavaScript", "Algorithms"],
        "company": "Tech Company",
        "school": "University of Code",
        "starRating": 4.5,
        "aboutMe": "Software engineer passionate about algorithms",
        "userAvatar": "https://assets.leetcode.com/users/avatar.jpg",
        "reputation": 1250,
        "ranking": 54321
      },
      "socialAccounts": [
        {
          "provider": "github",
          "profileUrl": "https://github.com/johndoe"
        },
        {
          "provider": "linkedin",
          "profileUrl": "https://linkedin.com/in/johndoe"
        }
      ]
    }
  }
}`,
                    "profile-response",
                )}
            </CardContent>
        </Card>
    )
}