import SensorData from "../models/SensorData.js";
import Device from "../models/Device.js";
import asyncHandler from "express-async-handler";
import moment from "moment-timezone";
import AppError from "../utils/appError.js";

export const postSensorData = asyncHandler(async (req, res, next) => {
  const { sensor_id, timestamp, count, name, latitude, longitude } = req.body;
  if (!sensor_id || !timestamp || typeof count !== "number") {
    throw new AppError(
      "Missing or invalid required fields: sensor_id, timestamp, or count",
      400
    );
  }

  const data = await SensorData.create({
    sensor_id,
    timestamp,
    count,
  });

  const existingDevice = await Device.findOne({ sensor_id });
  if (existingDevice) {
    existingDevice.lastSeen = moment().tz("Asia/Qatar").toDate();
    await existingDevice.save();
  } else {
    await Device.create({
      sensor_id,
      name,
      latitude,
      longitude,
      lastSeen: moment().tz("Asia/Qatar").toDate(),
    });
  }
  res.status(201).json({ message: "Data recorder", data });
});

//midnight to now(current day)
export const getAnalytics = asyncHandler(async (req, res, next) => {
  const tz = "Asia/Qatar";
  const today = moment.tz(tz).startOf("day").format();
  const tomorrow = moment(today).add(1, "day").format();
  const hourly = await SensorData.aggregate([
    {
      $match: {
        timestamp: {
          $gte: new Date(today),
          $lt: new Date(tomorrow),
        },
      },
    },
    {
      $group: {
        _id: {
          hour: {
            $hour: {
              date: "$timestamp",
              timezone: "Asia/Qatar",
            },
          },
          sensor: "$sensor_id",
        },
        total: { $sum: "$count" },
      },
    },
    {
      $sort: { "_id.hour": -1 },
    },
  ]);

  res.status(200).json({ message: "hourly sensor data", hourly });
});

export const getDevices = asyncHandler(async (req, res, next) => {
  const devices = await Device.find();
  const now = new Date();

  const result = devices.map((device) => {
    const diffMins = (now - device.lastSeen) / 60000;
    return {
      sensor_id: device.sensor_id,
      name: device.name,
      latitude: device.latitude,
      longitude: device.longitude,
      lastSeen: device.lastSeen,
      status: diffMins > 65 ? "inactive" : "active",
    };
  });
  res.status(200).json({ message: "device data", devices: result });
});
