import { SubmitData } from "./interfaces";

export function getGlobalAcceptanceRate(data: SubmitData): number {
    const totalAll = data.totalSubmissionNum.find(d => d.difficulty === "All")?.submissions || 0;
    const acceptedAll = data.acSubmissionNum.find(d => d.difficulty === "All")?.submissions || 0;

    if (totalAll === 0) return 0;

    const acceptanceRate = (acceptedAll / totalAll) * 100;
    return parseFloat(acceptanceRate.toFixed(2));
  }