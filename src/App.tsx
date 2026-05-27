/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Accueil from './pages/Accueil';
import About from './pages/About';
import Blog from './pages/Blog';
import Formation from './pages/Formation';
import Palmares from './pages/Palmares';
import Champions from './pages/Champions';
import Boutique from './pages/Boutique';
import Contact from './pages/Contact';
import Inscription from './pages/Inscription';
import { UserSession } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('accueil');
  const [unreadCount, setUnreadCount] = useState<number>(2);
  const [session, setSession] = useState<UserSession>({ isLoggedIn: false });

  // Handle Hash Routing listener to support "chaque lien s'ouvre sur sa page" & "défilement fluide"
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const validPages = ['accueil', 'about', 'blog', 'formation', 'palmares', 'champions', 'boutique', 'contact', 'espace-prive'];
      if (hash && validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('accueil');
      }
      // Guarantee smooth scroll reset upon navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: string) => {
    window.location.hash = `#/${page}`;
    setCurrentPage(page);
  };

  const handleLogin = (userSession: UserSession) => {
    setSession(userSession);
  };

  const handleLogout = () => {
    setSession({ isLoggedIn: false });
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'accueil':
        return <Accueil onPageChange={handlePageChange} />;
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'formation':
        return <Formation onPageChange={handlePageChange} />;
      case 'palmares':
        return <Palmares />;
      case 'champions':
        return <Champions />;
      case 'boutique':
        return <Boutique />;
      case 'contact':
        return <Contact />;
      case 'espace-prive':
        return (
          <Inscription 
            session={session} 
            onLoginSuccess={handleLogin} 
            onLogout={handleLogout} 
          />
        );
      default:
        return <Accueil onPageChange={handlePageChange} />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 }
  };

  const pageTransition = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1] // Custom easeOutExpo
  };

  return (
    <div className="min-h-screen bg-feca-dark text-slate-100 flex flex-col justify-between font-sans selection:bg-feca-red selection:text-white antialiased relative">
      
      {/* Institutional Global Header */}
      <Navbar 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        unreadCount={unreadCount}
        onUnreadCountChange={setUnreadCount}
        isLoggedIn={session.isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Dynamic Viewport with staggered micro-transitions */}
      <main className="flex-grow pt-8 focus:outline-hidden overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Institutional Global Footer */}
      <Footer onPageChange={handlePageChange} />

      {/* Floating Customer Service WhatsApp widget */}
      <WhatsAppFloat />
    </div>
  );
}
