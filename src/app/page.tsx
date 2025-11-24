import { Navbar } from "@/components/ui/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1523825036634-aab3cce05919?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="z-10 max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary tracking-tight leading-tight">
            The Future of <br />
            <span className="text-secondary italic">African Luxury</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            White Dominion merges generative AI with bespoke tailoring to create
            personalized, avant-garde fashion. Own your design code.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Link
              href="/generate"
              className="px-8 py-4 bg-primary text-white text-lg font-medium tracking-wide hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              CREATE YOUR LOOK
            </Link>
            <Link
              href="/wardrobe"
              className="px-8 py-4 bg-white text-primary border border-primary text-lg font-medium tracking-wide hover:bg-gray-50 transition-all"
            >
              VIEW COLLECTION
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="h-1 w-12 bg-secondary mb-6" />
            <h3 className="text-2xl font-serif text-primary">AI Ideation</h3>
            <p className="text-gray-600 font-light">
              Collaborate with our AI to visualize outfits that blend traditional motifs with futuristic cuts.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-1 w-12 bg-secondary mb-6" />
            <h3 className="text-2xl font-serif text-primary">Design Codes</h3>
            <p className="text-gray-600 font-light">
              Every creation generates a unique WD-Code. Lock it, share it, or gift it. It is your digital asset.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-1 w-12 bg-secondary mb-6" />
            <h3 className="text-2xl font-serif text-primary">Bespoke Production</h3>
            <p className="text-gray-600 font-light">
              Send your design code to our Atelier. We craft it to your exact measurements and ship globally.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
