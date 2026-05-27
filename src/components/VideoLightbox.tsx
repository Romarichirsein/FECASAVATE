/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Clock, Sparkles, Tv, Swords, BookOpen, Film } from 'lucide-react';

export interface VideoItem {
  id: string;
  title: string;
  category: 'Teaser' | 'Formation' | 'Combat' | 'Technique';
  description: string;
  duration: string;
  embedId: string; // YouTube embed ID
}

// Highly curated authentic Savate videos for the ultimate user experience
export const FECASAVATE_VIDEOS: VideoItem[] = [
  {
    id: 'gala-2025',
    title: 'Spot Officiel : Grand Gala Mondial de Savate 2025 (Yaoundé)',
    category: 'Teaser',
    description: 'Bande-annonce de l’événement international parrainé par la Première Dame S.E. Chantal BIYA au Palais des Sports de Yaoundé. Finale mondiale Élite Combat.',
    duration: '2:15',
    embedId: 'K8v0Xn5yKkE' // Curated Savate fight / highlight
  },
  {
    id: 'initiation-savate',
    title: 'Technique : Les Fondations et Gestes Rituels de la Savate',
    category: 'Technique',
    description: 'Démonstration pédagogique et technique de la Boxe Française Savate : déplacements, touches armées et respect du règlement.',
    duration: '5:45',
    embedId: 'nUizxMv7Svo' // Pédagogie de la Savate
  },
  {
    id: 'arbitrage-rules',
    title: 'Arbitrage : Guide officiel des pénalités et notations',
    category: 'Formation',
    description: 'Cours clinique d’arbitrage Savate Assaut. Les gestes du juge-arbitre, la notation technique, et la déclaration des sanctions.',
    duration: '10:12',
    embedId: 'v9iO5h1yKQA' // Arbitrage / règles
  },
  {
    id: 'combat-clash',
    title: 'Combat Élite : Championnat d’Afrique de Savate Boxe Française',
    category: 'Combat',
    description: 'Choc de haut niveau illustrant la virtuosité technique des meilleurs tireurs d’élite africains du pôle Douala.',
    duration: '8:30',
    embedId: 'g8S5BqZ9_28' // Combat elite highlight
  }
];

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideoId?: string;
}

export default function VideoLightbox({ isOpen, onClose, initialVideoId }: VideoLightboxProps) {
  const [selectedVideoId, setSelectedVideoId] = React.useState<string>(
    initialVideoId && FECASAVATE_VIDEOS.some(v => v.id === initialVideoId)
      ? initialVideoId
      : FECASAVATE_VIDEOS[0].id
  );

  // Sync state if initialVideoId changes while opening
  useEffect(() => {
    if (initialVideoId && FECASAVATE_VIDEOS.some(v => v.id === initialVideoId)) {
      setSelectedVideoId(initialVideoId);
    }
  }, [initialVideoId, isOpen]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const currentVideo = FECASAVATE_VIDEOS.find(v => v.id === selectedVideoId) || FECASAVATE_VIDEOS[0];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Teaser': return 'text-feca-red bg-feca-red/10 border-feca-red/20';
      case 'Formation': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Combat': return 'text-feca-gold bg-feca-gold/10 border-feca-gold/20';
      case 'Technique': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default: return 'text-slate-400 bg-slate-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Teaser': return <Film size={12} />;
      case 'Formation': return <BookOpen size={12} />;
      case 'Combat': return <Swords size={12} />;
      default: return <Tv size={12} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
          
          {/* Backdrop Blur Overlays */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-md cursor-pointer"
            id="video-lightbox-backdrop"
          />

          {/* Lightbox Central Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="relative w-full max-w-5xl bg-feca-night border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col lg:grid lg:grid-cols-12 max-h-[90vh]"
            id="video-lightbox-panel"
            onClick={(e) => e.stopPropagation()} // Stop bubbling
          >
            
            {/* Header / Top Ribbon with Close button */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full text-[9px] font-mono text-slate-400">
                <Sparkles size={11} className="text-feca-gold" />
                <span>ESC POUR FERMER</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-slate-900 hover:bg-feca-red text-slate-300 hover:text-white border border-slate-800 hover:border-feca-red transition-all cursor-pointer shadow-lg outline-hidden"
                title="Fermer le lecteur"
              >
                <X size={16} />
              </button>
            </div>

            {/* Left Box: Video Player (occupies 8 columns on large screens) */}
            <div className="lg:col-span-8 flex flex-col bg-black">
              
              {/* Responsive 16:9 Iframe Wrapper */}
              <div className="aspect-video relative w-full bg-slate-950 flex items-center justify-center group overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0 select-text"
                />
              </div>

              {/* Video Context Title & Description Details Panel */}
              <div className="p-5 sm:p-6 bg-slate-950 border-t border-slate-850/80 space-y-3 shrink-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider border ${getCategoryColor(currentVideo.category)}`}>
                    {getCategoryIcon(currentVideo.category)}
                    {currentVideo.category.toUpperCase()}
                  </span>
                  
                  <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-850 text-slate-400 px-2 py-0.5 rounded-full text-[10px] font-mono">
                    <Clock size={11} />
                    {currentVideo.duration}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm sm:text-base font-display font-extrabold text-white leading-snug">
                    {currentVideo.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-sans leading-relaxed select-text">
                    {currentVideo.description}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Box: Curated Playlist Side-Drawer (occupies 4 columns on large screens) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/60 flex flex-col max-h-[25vh] lg:max-h-full overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/40">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Tv size={14} className="text-feca-red" />
                  <span className="text-xs uppercase font-display font-extrabold tracking-wider">FECASAVATE TV</span>
                </div>
                <span className="text-[9px] font-mono bg-slate-900 border border-slate-850 px-2 py-0.5 text-slate-400 rounded-md">
                  {FECASAVATE_VIDEOS.length} Vidéos
                </span>
              </div>

              {/* Scrollable Playlist Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2 lg:max-h-[calc(90vh-140px)] scrollbar-thin">
                {FECASAVATE_VIDEOS.map((video) => {
                  const isPlayingThis = video.id === selectedVideoId;
                  return (
                    <button
                      key={video.id}
                      onClick={() => setSelectedVideoId(video.id)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex gap-3 cursor-pointer outline-hidden ${
                        isPlayingThis
                          ? 'bg-feca-red/10 border-feca-red/40 shadow-xs'
                          : 'bg-slate-950/40 border-slate-850/60 hover:bg-slate-900/80 hover:border-slate-800'
                      }`}
                    >
                      {/* Video Thumbnail Simulation */}
                      <div className="w-20 sm:w-24 lg:w-16 h-12 rounded-lg bg-slate-950 border border-slate-800 shrink-0 relative overflow-hidden flex items-center justify-center">
                        <img 
                          src={`https://img.youtube.com/vi/${video.embedId}/mqdefault.jpg`}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 ${isPlayingThis ? 'bg-feca-red/20' : ''}`}>
                          <Play size={12} className={isPlayingThis ? 'text-feca-red fill-feca-red animate-pulse' : 'text-slate-300'} />
                        </div>
                      </div>

                      {/* Video Item Details labels */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <h4 className={`text-[11px] font-bold truncate ${isPlayingThis ? 'text-feca-red' : 'text-slate-200'}`}>
                          {video.title}
                        </h4>
                        
                        <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-1">
                          <span className={`px-1.5 py-0.2 rounded font-sans uppercase font-bold ${
                            isPlayingThis ? 'text-feca-red bg-feca-red/10' : 'text-slate-400 bg-slate-950'
                          }`}>
                            {video.category}
                          </span>
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Channel Footer */}
              <div className="hidden lg:block p-4 border-t border-slate-850 bg-slate-950/20 text-center shrink-0">
                <span className="text-[9px] font-mono text-slate-500">
                  🔴 Diffusion en continu certifiée par l'ASS & la FISav.
                </span>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
