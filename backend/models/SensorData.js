import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema({
  sensor_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  count: { type: Number, required: true },
});

export default mongoose.model("SensorData", sensorDataSchema);
