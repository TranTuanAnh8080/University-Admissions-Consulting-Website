import React, { useEffect, useState } from "react";
import axios from "axios";

const TopAcademicFieldsTable = () => {
  const [data, setData] = useState([]);
  const [topN, setTopN] = useState(5);
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_TOP_FIELDS_API}`, {
        params: { topN, timeRange },
      });
      setData(res.data.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy top ngành:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [topN, timeRange]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6 h-[50%] w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Top ngành được yêu cầu nhiều nhất
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={topN}
            onChange={(e) => setTopN(parseInt(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {[2, 5, 10, 15, 20, 24].map((n) => (
              <option key={n} value={n}>
                Top {n}
              </option>
            ))}
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="day">Ngày</option>
            <option value="month">Tháng</option>
            <option value="year">Năm</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-8">Đang tải dữ liệu...</p>
      ) : data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Ngành học</th>
                <th className="px-4 py-2 border">Số lượt yêu cầu</th>
              </tr>
            </thead>
            <tbody>
              {data.map((field, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{field.academicField}</td>
                  <td className="px-4 py-2 border">{field.totalRequests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-red-500">Không có dữ liệu.</p>
      )}
    </div>
  );
};

export default TopAcademicFieldsTable;
