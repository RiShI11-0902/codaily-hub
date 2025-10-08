import { useState, useEffect } from "react";
import axios from "axios";
import {
  DashboardData,
  LeaderboardUser,
  ProgressDataPoint,
} from "@/types/dashboard";

export const useDashboardData = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [chartData, setChartData] = useState<ProgressDataPoint[]>([]);
  const [topFive, setTopFive] = useState<LeaderboardUser[]>([]);
  const [currentuserRank, setcurrentuserRank] = useState<LeaderboardUser>();
  const [totalPages, setTotalPages] = useState()
  const [totalUsers, setTotalUsers] = useState([])

  const updateChart = (dataArray: ProgressDataPoint[]) => {
    const sortedData = [...dataArray].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const mappedData = sortedData.map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      correctness: item.correctness || 0,
    }));
    setChartData(mappedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user/getProgress`,
          { id: userId }
        );
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/user/leaderboard/interviews`
        );

        setcurrentuserRank(data?.currentUser)
        setTopFive(data?.topFive)
        setTotalUsers(data?.users)
        setTotalPages(data?.totalPages)

        console.log(data);
        setData(response.data);
        if (response.data.progressData) updateChart(response.data.progressData);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const filterChartByDate = (selectedDate: string) => {
    if (!data?.progressData) return;

    if (!selectedDate) {
      updateChart(data.progressData);
      return;
    }

    const filteredData = data.progressData.filter(
      (item) => new Date(item.date).toISOString().split("T")[0] === selectedDate
    );

    updateChart(filteredData);
  };

  return { loading, data, chartData, filterChartByDate, updateChart, totalPages, topFive, currentuserRank, totalUsers };
};
