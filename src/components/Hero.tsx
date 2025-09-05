import Link from "next/link";
import { ArrowRight, TrendingUp, Briefcase, Newspaper } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="
        relative min-h-screen flex items-center mt-16
        bg-gradient-to-b from-background via-muted/50 to-background
        text-foreground
      "
    >
      {/* Glow effect */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.12),transparent_70%)]
          dark:bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]
        "
      />

      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Learn{" "}
          <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent dark:from-primary dark:to-green-500">
            Stock Trading
          </span>{" "}
          <br />
          Risk-Free.
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Paper trade with real market data. Track your portfolio, follow the
          news, and sharpen your skills — all in one place.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/markets"
            className="
              px-6 py-3 rounded-2xl font-medium flex items-center gap-2
              bg-primary text-primary-foreground hover:opacity-90 transition
              shadow-lg hover:shadow-primary/25
            "
          >
            Start Trading <ArrowRight size={18} />
          </Link>
          <Link
            href="/portfolio"
            className="
              px-6 py-3 rounded-2xl font-medium transition
              bg-secondary text-secondary-foreground hover:bg-muted
            "
          >
            Explore Portfolio
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <Feature
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            title="Real-Time Market Data"
            desc="Track stocks with live prices, charts, and insights."
          />
          <Feature
            icon={
              <Briefcase className="w-6 h-6 text-pink-500 dark:text-green-400" />
            }
            title="Your Virtual Portfolio"
            desc="Build, monitor, and grow your paper trading account."
          />
          <Feature
            icon={
              <Newspaper className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            }
            title="Finance News & Insights"
            desc="Stay updated with the latest stock market headlines."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="
        p-6 rounded-2xl shadow-lg hover:shadow-xl transition
        bg-card text-card-foreground
      "
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}
