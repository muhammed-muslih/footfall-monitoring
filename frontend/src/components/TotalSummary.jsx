const TotalSummary = ({ analytics }) => {
  const total = analytics.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-xl shadow border border-blue-700 h-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Total Footfall Today
      </h3>
      <p className="text-4xl font-bold text-blue-600">{total}</p>
    </div>
  );
};

export default TotalSummary;
