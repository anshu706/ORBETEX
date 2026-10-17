import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Research from './pages/Research';
import ResearchDetail from './pages/ResearchDetail';
import Publications from './pages/Publications';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <div id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/:slug" element={<ResearchDetail />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
