import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  sensor_id: { type: String, required: true, unique: true },
  name: { type: String, default: "" },
  lastSeen: { type: Date, default: Date.now },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
});

export default mongoose.model("Device", deviceSchema);
