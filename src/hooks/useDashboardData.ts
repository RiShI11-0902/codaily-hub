import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardData, ProgressDataPoint } from "@/types/dashboard";

export const useDashboardData = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [chartData, setChartData] = useState<ProgressDataPoint[]>([]);

  const updateChart = (dataArray: ProgressDataPoint[]) => {
    const sortedData = [...dataArray].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const mappedData = sortedData.map(item => ({
      date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      correctness: item.correctness || 0
    }));
    setChartData(mappedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.post(`http://localhost:5000/user/getProgress`, { id: userId });
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
      item => new Date(item.date).toISOString().split("T")[0] === selectedDate
    );

    updateChart(filteredData);
  };

  return { loading, data, chartData, filterChartByDate, updateChart };
};
