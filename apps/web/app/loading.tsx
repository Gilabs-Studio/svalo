export default function Loading() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="space-y-8 max-w-5xl mx-auto">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-64 bg-white/10 rounded-lg mx-auto animate-pulse" />
            <div className="h-6 w-48 bg-white/10 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

