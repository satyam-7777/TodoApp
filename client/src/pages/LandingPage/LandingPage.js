import { useAuth } from "../../context/authContext";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import "./LandingPage.css";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
export default function LandingPage() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
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
