import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Trust from "@/components/Trust";
import BuyProduct from "@/components/BuyProduct";
import FAQ from "@/components/FAQ";
import BigWhy from "@/components/BigWhy";
import ProblemSolving from "@/components/ProblemSolving";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import SizingExplanation from "@/components/SizingExplanation";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex h-[20px] w-full items-center justify-center bg-red-400 px-3 text-center text-[11px] font-semibold text-white sm:text-sm">
        Demo website. Use test payment details at checkout.
      </div>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Trust />
        <BigWhy />
        <BuyProduct />
        <FAQ />
        <SizingExplanation />
        <ProblemSolving />
        <WhoIsThisFor />
        <FinalCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
