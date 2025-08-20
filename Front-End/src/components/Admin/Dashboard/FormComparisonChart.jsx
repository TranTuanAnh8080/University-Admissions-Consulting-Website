import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FormComparisonCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_FORM_COUNT_API}?timeRange=${timeRange}`
      );
      setChartData(res.data.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [timeRange]);

  const chartOptions = (title) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, font: { size: 18 } },
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Biểu đồ hồ sơ theo Campus</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center py-8">Đang tải dữ liệu...</p>
      ) : chartData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart Hồ sơ tư vấn */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <Bar
              options={chartOptions("Hồ sơ tư vấn")}
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Hồ sơ tư vấn",
                    data: chartData.datasets[0]?.data || [],
                    backgroundColor: "#3b82f6",
                  },
                ],
              }}
            />
          </div>

          {/* Chart Hồ sơ xét tuyển */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <Bar
              options={chartOptions("Hồ sơ xét tuyển")}
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Hồ sơ xét tuyển",
                    data: chartData.datasets[1]?.data || [],
                    backgroundColor: "#f97316",
                  },
                ],
              }}
            />
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-center">
          Không có dữ liệu để hiển thị.
        </p>
      )}
    </div>
  );
};

export default FormComparisonCharts;
