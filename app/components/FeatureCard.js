export default function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="bg-[#F4F4F4] rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div
          className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-3xl`}
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#0C2B4E] mb-2">{title}</h3>

      {/* Description */}
      <p className="text-[#1D546C]">{description}</p>
    </div>
  );
}
