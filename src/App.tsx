import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import YatraDiariesPage from './pages/YatraDiariesPage';
import YatraDiaryArticlePage from './pages/YatraDiaryArticlePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* Grain Overlay */}
        <div className="grain-overlay" />
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceSlug" element={<ServicesPage />} />
          <Route path="/yatra-diaries" element={<YatraDiariesPage />} />
          <Route path="/yatra-diaries/:slug" element={<YatraDiaryArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
