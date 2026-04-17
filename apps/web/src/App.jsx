import React from 'react';
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage.jsx';
import StreamerPage from './pages/StreamerPage.jsx';
import ArtShowcasePage from './pages/ArtShowcasePage.jsx';
import CommissionsPage from './pages/CommissionsPage.jsx';
import SocialFeedPage from './pages/SocialFeedPage.jsx';

const routeOrder = ['/', '/streamer', '/art', '/commissions', '/social'];

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  const currentIndex = routeOrder.indexOf(location.pathname);
  
  const slideIn = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideIn}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/streamer" element={<StreamerPage />} />
            <Route path="/art" element={<ArtShowcasePage />} />
            <Route path="/commissions" element={<CommissionsPage />} />
            <Route path="/social" element={<SocialFeedPage />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                  <h1 className="text-6xl font-bold text-primary">404</h1>
                  <p className="text-xl text-muted-foreground">Page not found</p>
                  <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200">
                    Back to home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <Router basename="/syakibi-website">
      <AppContent />
    </Router>
  );
}

export default App;