import FeatureCard from "./components/FeatureCard";
import CTAButton from "./components/CTAButton";

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
          Learn English Effortlessly
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Interactive lessons, quizzes, and flashcards designed for Bengali speakers.
        </p>
        <CTAButton href="/register" text="Get Started for Free" />
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon="📚"
          title="Vocabulary"
          description="Learn thousands of English words with Bangla meanings."
        />
        <FeatureCard
          icon="📝"
          title="Grammar"
          description="Understand English grammar with simple examples."
        />
        <FeatureCard
          icon="🎧"
          title="Listening & Speaking"
          description="Practice pronunciation and listening with interactive exercises."
        />
      </section>

      {/* Preview Lesson / Demo */}
      <section className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">Try a Free Sample Lesson</h2>
        <p className="text-gray-600 mb-6">
          Get a taste of our lessons without signing up.
        </p>
        <CTAButton href="/lessons/sample" text="View Sample Lesson" />
      </section>
    </div>
  );
}
