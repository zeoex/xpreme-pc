import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageCarousel from "@/components/ImageCarousel";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import MatrixRain from "@/components/MatrixRain";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Matrix rain fija en todo el fondo de la página */}
      <MatrixRain />

      <div className="relative" style={{ zIndex: 1 }}>
      <Header />
      <Hero />
      <ImageCarousel />
      <Services />
      <About />
      <WhyUs />
      <Contact />
      <Footer />
      </div>
      <ChatWidget />
    </main>
  );
}
