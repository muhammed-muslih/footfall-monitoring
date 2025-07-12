import { CircleCheck, CircleX } from "lucide-react";

const StatusCard = ({ device }) => {
  const isOnline = device?.status === "active";
  const statusColor = isOnline ? "text-green-700" : "text-red-600";
  const statusBg = isOnline ? "bg-green-100" : "bg-red-100";
  const Icon = isOnline ? CircleCheck : CircleX;

  return (
    <div className="p-6 bg-white rounded-xl shadow border border-blue-700 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {device?.name||device?.sensor_id}
        </h3>
        <span
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusBg} ${statusColor}`}
        >
          <Icon className="w-4 h-4" />
          {device?.status?.toUpperCase()}
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Sensor ID:</span> {device?.sensor_id}
        </p>
        <p className="text-xs text-gray-400">
          <span className="font-medium">Last Seen:</span>{" "}
          {device?.lastSeen
            ? new Date(device.lastSeen).toLocaleString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default StatusCard;
