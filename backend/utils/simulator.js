import cron from "node-cron";
import moment from "moment-timezone";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const sensors = [
  {
    sensor_id: "sensor-1",
    name: "Main Entrance",
    latitude: 25.285447,
    longitude: 51.53104,
  },
  {
    sensor_id: "sensor-2",
    name: "Back Door",
    latitude: 25.287,
    longitude: 51.533,
  },
];

const startSensorSimulation = () => {
  cron.schedule(
    "0 * * * *",
    async () => {
      for (const sensor of sensors) {
        const payload = {
          sensor_id: sensor.sensor_id,
          name: sensor.name,
          latitude: sensor.latitude,
          longitude: sensor.longitude,
          timestamp: moment().tz("Asia/Qatar").toDate(),
          count: Math.floor(Math.random() * (150 - 5 + 1)) + 5,
        };
        try {
          await axios.post(`${BASE_URL}/sensor-data`, payload);
          console.log(`Sent data from ${sensor.sensor_id}`, payload);
        } catch (error) {
          console.error(
            `Failed to send data from ${sensor.sensor_id}:`,
            err.message
          );
        }
      }
    },
    {
      timezone: "Asia/Qatar",
    }
  );
  console.log("Sensor simulation cron job started...");
};

export default startSensorSimulation;
