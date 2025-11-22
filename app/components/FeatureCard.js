export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transition-transform">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
