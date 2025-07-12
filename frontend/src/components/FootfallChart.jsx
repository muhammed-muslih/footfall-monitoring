import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: "Hourly Footfall - Today",
    },
  },
  scales: {
    x: { title: { display: true, text: "Hour" } },
    y: { title: { display: true, text: "Footfall Count" }, beginAtZero: true },
  },
};

const normalizeHourlyData = (rawData) => {
  const allHours = Array.from(
    { length: 24 },
    (_, i) => i.toString().padStart(2, "0") + ":00"
  );

  const hourMap = Object.fromEntries(
    rawData?.map((data) => {
      const formattedHour =
        data?._id?.hour?.toString().padStart(2, "0") + ":00";
      return [formattedHour, data?.total];
    })
  );

  return allHours.map((hour) => ({
    hour,
    count: hourMap[hour] ?? 0,
  }));
};

const FootfallChart = ({ analytics }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    if (!analytics || analytics.length === 0) {
      setChartData({ labels: [], datasets: [] });
      return;
    }

    const normalized = normalizeHourlyData(analytics);
    const labels = normalized.map((item) => item.hour);
    const counts = normalized.map((item) => item.count);
    setChartData({
      labels,
      datasets: [
        {
          label: "Footfall Count",
          data: counts,
          borderColor: "rgb(29, 78, 216)",
          backgroundColor: "rgb(29, 78, 216,0.3)",
          tension: 0.3,
          fill: false,
        },
      ],
    });
  }, [analytics]);
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default FootfallChart;
