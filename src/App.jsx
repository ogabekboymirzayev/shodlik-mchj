import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import CertificatesStandards from "./components/CertificatesStandards.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import Testimonials from "./components/Testimonials.jsx";
import PlitaCalculator from "./components/PlitaCalculator.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Footer from "./components/Footer.jsx";
import FloatingContactButtons from "./components/FloatingContactButtons.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CertificatesStandards />
        <Services />
        <Projects />
        <Testimonials />
        <PlitaCalculator />
        <ContactForm />
      </main>
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}