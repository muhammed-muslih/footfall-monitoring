// src/components/TopBar.jsx
import { useSensor } from "../context/SensorContext";

const TopBar = () => {
  const { currentSensorId } = useSensor();

  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex justify-center rounded-md">
      <h1 className="text-lg sm:text-xl font-semibold  text-blue-700 capitalize px-3 py-1 rounded-lg bg-blue-100 cursor-pointer">
        {currentSensorId}
      </h1>
    </header>
  );
};

export default TopBar;
