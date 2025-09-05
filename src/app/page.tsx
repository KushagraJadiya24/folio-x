import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="p-6 bg-background text-foreground rounded-lg border border-border">
        Theme-aware box
      </div>
    </main>
  );
}
