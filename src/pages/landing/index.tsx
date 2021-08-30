import Navbar from "../../components/landing/Navbar";
import Launch from "../../components/landing/Launch";
import About from "../../components/landing/About";
import FAQ from "../../components/landing/FAQ";
import Footer from "../../components/dashboard/Footer";
export default function landing() {
  return (
    <div>
      <Navbar />
      <Launch />
      <About />
      <FAQ />
      <Footer />
    </div>
  );
}
