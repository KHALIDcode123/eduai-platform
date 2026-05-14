import HeroDark from "@/components/landing/HeroDark";
import FeaturesDark from "@/components/landing/FeaturesDark";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import NavbarDark from "@/components/landing/NavbarDark";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <NavbarDark />
      <HeroDark />
      <FeaturesDark />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
}
