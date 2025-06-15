export interface ApiResponse {
    allQuestionsCount: QuestionCount[];
    matchedUser: MatchedUser;
}

export interface QuestionCount {
    difficulty: "Easy" | "Medium" | "Hard" | string;
    count: number;
}

export interface MatchedUser {
    problemsSolvedBeatsStats: ProblemSolvedStat[];
    submitStatsGlobal: SubmitStatsGlobal;
    submitStats: SubmitData;
    githubUrl: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
    profile: UserProfile;
}

export interface ProblemSolvedStat {
    difficulty: "Easy" | "Medium" | "Hard" | string;
    percentage: number;
}

export interface SubmitStatsGlobal {
    acSubmissionNum: SubmissionStat[];
}

export interface SubmissionStat {
    difficulty: "Easy" | "Medium" | "Hard" | "All";
    count: number;
    submissions: number;
}

export interface UserProfile {
    username: string;
    ranking: number;
    contributionPoints: number;
    reputation: number;
    submissionCalendar: string;
    acceptanceRate: number;
    realName?: string;
    userAvatar?: string;
    aboutMe?: string;
    school?: string;
    countryName?: string;
    websites?: string[];
}

export interface SubmissionStats{
    difficulty: "Easy" | "Medium" | "Hard" | "All";
    count: number;
    submissions: number;
};

export interface SubmitData {
    totalSubmissionNum: SubmissionStats[];
    acSubmissionNum: SubmissionStats[];
};