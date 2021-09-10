import Navbar from "../../components/landing/Navbar";
import Launch from "../../components/landing/Launch";
import About from "../../components/landing/About";
import FAQ from "../../components/landing/FAQ";
import Sponsors from "../../components/landing/Sponsors";
import Footer from "../../components/dashboard/Footer";
import { CssBaseline } from "@material-ui/core";

export default function Landing() {
  return (
    <div>
      <CssBaseline>
        <Navbar />
        <Launch />
        <About />
        <FAQ />
        <Sponsors />
        <Footer />
      </CssBaseline>
    </div>
  );
}
