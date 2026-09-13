import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import "./LandingPage.css";
import Footer from "../../components/Footer/Footer";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <NavBar />
      <main className="main">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
