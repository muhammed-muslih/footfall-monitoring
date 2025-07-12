import { useSensor } from "../context/SensorContext";
import { Menu } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const { currentSensorId, handleSensorChange } = useSensor();
  const [open, setOpen] = useState(false);
  const sensors = [
    { label: "Sensor 1", id: "sensor-1" },
    { label: "Sensor 2", id: "sensor-2" },
  ];
  return (
    <>
      <button
        className="md:hidden fixed top-2 right-4 text-white bg-blue-700 p-2 rounded shadow cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Menu size={20} />
      </button>
      <aside
        className={`fixed md:static h-screen w-72 bg-blue-900 text-white p-6 shadow-lg z-40 transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          <h1 className="text-2xl font-extrabold mb-10 text-center tracking-wide">
            Footfall Monitor
          </h1>
        </div>

        <div className="flex flex-col space-y-4">
          {sensors.map((sensor) => (
            <button
              onClick={() => {
                handleSensorChange(sensor.id);
                setOpen(false);
              }}
              key={sensor.id}
              className={`px-4 py-3 font-bold rounded-lg transition-colors duration-200 border-blue-700 border hover:bg-blue-700 cursor-pointer
                ${
                  currentSensorId === sensor.id
                    ? "bg-blue-50 text-blue-900 hover:text-white"
                    : ""
                }
              `}
            >
              {sensor.label}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
