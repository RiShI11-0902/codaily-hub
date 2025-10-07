export interface LeaderboardUser {
  rank: number;
  name: string;
  avgAccuracy: number;
}

export interface DashboardStats {
  foundQuestions?: any[];
  average?: number;
  avgTime?: number;
  targetProgress?: number;
}

export interface ProgressDataPoint {
  date: string;
  correctness: number;
}

export interface DashboardData {
  stats: DashboardStats;
  progressData: ProgressDataPoint[];
}
