import { getAnalytics, getDevices } from "../services/api";
import { useEffect, useState, useMemo } from "react";
import { useSensor } from "../context/SensorContext";
import TotalSummary from "../components/TotalSummary";
import FootfallChart from "../components/FootfallChart";
import StatusCard from "../components/StatusCard";
import SensorMap from "../components/SensorMap";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [devices, setDevices] = useState([]);
  const { currentSensorId } = useSensor();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const analytics = await getAnalytics();
        const devices = await getDevices();

        setAnalytics(analytics?.hourly ?? []);
        setDevices(devices?.devices ?? []);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const filteredAnalytics = useMemo(() => {
    return analytics.filter((data) => data._id.sensor === currentSensorId);
  }, [analytics, currentSensorId]);

  const filteredDevices = useMemo(() => {
    return devices.filter((data) => data.sensor_id === currentSensorId);
  }, [devices, currentSensorId]);

  return (
    <div className="p-6 sm:p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Sensor Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <TotalSummary analytics={filteredAnalytics} />
        </div>
        <div>
          {filteredDevices.length > 0 ? (
            <StatusCard device={filteredDevices[0]} />
          ):(
            <StatusCard device={[]} />
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-blue-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Footfall Trend
        </h3>
        <FootfallChart analytics={filteredAnalytics} />
      </div>

      <div className="bg-white p-6 mt-6 rounded-xl shadow border border-blue-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Sensor Location
        </h3>
        {filteredDevices.length > 0 && (
          <SensorMap device={filteredDevices[0]} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
