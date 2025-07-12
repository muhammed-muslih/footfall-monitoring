import { createContext, useContext, useState } from "react";

const SensorContext = createContext({
  currentSensorId: "",
  handleSensorChange: () => {},
});

export const SensorProvider = ({ children }) => {
  const [currentSensorId, setCurrentSensorId] = useState("sensor-1");
  const handleSensorChange = (sensorId) => {
    setCurrentSensorId(sensorId);
  };

  return (
    <SensorContext.Provider value={{ currentSensorId, handleSensorChange }}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensor = () => useContext(SensorContext);
