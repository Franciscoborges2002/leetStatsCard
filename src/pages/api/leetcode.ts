import type { NextApiRequest, NextApiResponse } from "next";

type LeetCodeResponse = {
  matchedUser: {
    username: string;
    submitStats: {
      acSubmissionNum: {
        difficulty: "Easy" | "Medium" | "Hard";
        count: number;
      }[];
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.query.username as string;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {    
          difficulty    
          count  
          }
      matchedUser(username: $username) {
        problemsSolvedBeatsStats { 
          difficulty
          percentage    
        }
        submitStatsGlobal {
          acSubmissionNum {        
            difficulty        
            count      
          }    
        }
        githubUrl
        twitterUrl
        linkedinUrl
        profile {
          ranking
          userAvatar
          realName
          aboutMe
          school
          websites
          countryName
          company
          jobTitle
          skillTags
          postViewCount
          postViewCountDiff
          reputation
          reputationDiff
          solutionCount
          solutionCountDiff
          categoryDiscussCount
          categoryDiscussCountDiff
        }
      }             
    } 
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const json = await response.json();

    if (!json || !json.data) {
      return res.status(500).json({ error: "Invalid response from LeetCode" });
    }

    const data: LeetCodeResponse = json.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
