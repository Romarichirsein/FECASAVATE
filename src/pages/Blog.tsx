/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock, ArrowRight, X, AlertOctagon, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogSkeleton } from '../components/Skeletons';
import { blogArticles } from '../data/sportData';
import { BlogArticle } from '../types';
import { useLanguage } from '../components/LanguageContext';

export default function Blog() {
  const { language, translateItem } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories = language === 'fr' 
    ? ['all', 'Compétition Nationale', 'Initiation Grand Public', 'International', 'Vie Fédérale', 'Annonce']
    : ['all', 'National Competition', 'Public Initiation', 'International', 'Federal Life', 'Announcement'];

  const handleManualRefresh = () => {
    setIsLoading(false);
  };

  const filteredArticles = blogArticles.filter(art => {
    const titleTrans = translateItem(art, 'title').toLowerCase();
    const excerptTrans = translateItem(art, 'excerpt').toLowerCase();
    const contentTrans = translateItem(art, 'content').toLowerCase();
    
    const matchesSearch = titleTrans.includes(searchTerm.toLowerCase()) || 
                          excerptTrans.includes(searchTerm.toLowerCase()) ||
                          contentTrans.includes(searchTerm.toLowerCase());
                          
    // Translate incoming categories for matching active filter
    const translatedArtCategory = translateItem(art, 'category');
    
    // In English, category mapping:
    // 'Compétition Nationale' -> 'National Competition'
    // 'Initiation Grand Public' -> 'Public Initiation'
    // 'International' -> 'International'
    // 'Vie Fédérale' -> 'Federal Life'
    // 'Annonce' -> 'Announcement'
    const categoryMap: Record<string, string> = {
      'Compétition Nationale': 'National Competition',
      'Initiation Grand Public': 'Public Initiation',
      'International': 'International',
      'Vie Fédérale': 'Federal Life',
      'Annonce': 'Announcement'
    };

    const matchesCategory = selectedCategory === 'all' || 
                            art.category === selectedCategory ||
                            categoryMap[art.category] === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-16 font-sans">

      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[50vh] min-h-[320px] overflow-hidden">
        <img
          src="/images/savat3.jpg"
          alt="Blog FECASAVATE"
          className="w-full h-full object-cover object-center"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/savate 6.png'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/35 to-feca-dark" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono mb-3"
          >
            {language === 'fr' ? 'Chroniques de la Fédération' : 'Federation Chronologies'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl uppercase text-white leading-tight drop-shadow-lg"
          >
            {language === 'fr' ? 'L’Écho de l’Arène' : 'Echoes of the Ring'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-200 text-sm mt-4 max-w-2xl"
          >
            {language === 'fr' 
              ? "Retrouvez les comptes-rendus des finales de Yaoundé 5, les grandes actualités fédérales et les jalons de la sélection internationale."
              : "Consult the reviews of the Yaoundé 5 finals, federal news, and the steps toward international selections."}
          </motion.p>
        </div>
      </section>

      <div className="px-4 sm:px-8 max-w-[1700px] w-full mx-auto space-y-12">

      {/* 2. FILTERS AND SEARCH COMPASS */}
      <section className="bg-slate-900/60 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search bar inputs */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500 z-10">
            <Search size={16} />
          </span>
          <motion.input
            type="text"
            placeholder={language === 'fr' ? 'Rechercher une chronique...' : 'Search articles and news...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:ring-1 focus:ring-feca-red focus:border-feca-red outline-hidden font-medium relative"
          />
        </div>

        {/* Categories scroll panel */}
        <div className="flex items-center gap-2.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat 
                    ? 'bg-feca-red text-white' 
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? (language === 'fr' ? 'Tous les Thèmes' : 'All Themes') : cat}
              </button>
            ))}
          </div>
          <button
            onClick={handleManualRefresh}
            className="flex items-center justify-center p-2 rounded-lg bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-705 transition-colors cursor-pointer shrink-0"
            disabled={isLoading}
            title={language === 'fr' ? 'Rafraîchir' : 'Refresh'}
          >
            <RefreshCw size={13} className={`${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </section>

      {/* 3. BLOG POSTS LISTINGS */}
      <section>
        {isLoading ? (
          <BlogSkeleton count={6} />
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/30 border border-slate-800 border-dashed rounded-3xl">
            <AlertOctagon className="w-8 h-8 text-feca-red mx-auto mb-3 animate-pulse" />
            <p className="text-slate-400 text-sm">
              {language === 'fr' ? 'Aucun article ne correspond à votre recherche ou filtre.' : 'No chronicles match your search query.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(art => (
              <motion.article 
                key={art.id} 
                whileHover={{ 
                  y: -5,
                  borderColor: 'rgba(254, 194, 54, 0.35)', 
                  boxShadow: '0 20px 25px -5px rgba(254, 194, 54, 0.08), 0 8px 10px -6px rgba(254, 194, 54, 0.08)' 
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="bg-feca-night border border-slate-850 p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden shadow-xl"
              >
                {/* Accent glow on top */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-feca-red/40 to-transparent" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-feca-gold px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800">
                      {translateItem(art, 'category')}
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock size={11} /> {translateItem(art, 'readTime')}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-slate-100 text-base leading-tight group-hover:text-feca-gold transition-colors duration-300 min-h-[48px] line-clamp-2">
                    {translateItem(art, 'title')}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed font-sans line-clamp-3">
                    {translateItem(art, 'excerpt')}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-900/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 gap-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold font-mono">
                    <div className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                      {art.author[0]}
                    </div>
                    <span>{art.author}</span>
                    <span>•</span>
                    <span className="text-[10px]">{art.date}</span>
                  </div>

                  <button
                    onClick={() => setReadingArticle(art)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-[11px] font-bold text-white tracking-wide border border-slate-850 hover:border-slate-755 transition-all cursor-pointer animate-none"
                  >
                    <span>{language === 'fr' ? 'Lire la Suite' : 'Read More'}</span>
                    <ArrowRight size={12} className="text-feca-red shrink-0" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* 4. MODAL POPUP FOR READING THE ENTIRE ARTICLE */}
      <AnimatePresence>
        {readingArticle && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            {/* Backdrop filter */}
            <div 
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs animate-none" 
              onClick={() => setReadingArticle(null)} 
            />

            {/* Reading Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-feca-night border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              {/* Header card banner */}
              <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-feca-gold shrink-0 animate-pulse" />
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-400">
                    {language === 'fr' ? 'Communiqué Fédéral Officiel' : 'Official Federal Communication'}
                  </span>
                </div>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-slate-750 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={language === 'fr' ? 'Fermer' : 'Close'}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable text context */}
              <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs font-semibold text-feca-gold">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 animate-none">
                      {translateItem(readingArticle, 'category')}
                    </span>
                    <span className="text-slate-500 font-mono">•</span>
                    <span className="text-slate-500 font-mono flex items-center gap-1">
                      <Calendar size={12} /> {readingArticle.date}
                    </span>
                  </div>

                  <h2 className="font-display font-black text-xl sm:text-2xl text-slate-100 uppercase leading-snug">
                    {translateItem(readingArticle, 'title')}
                  </h2>
                </div>

                <div className="h-px bg-slate-850" />

                {/* Simulated Article Body */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  <p className="font-bold text-slate-200 text-sm">
                    {translateItem(readingArticle, 'excerpt')}
                  </p>
                  
                  {translateItem(readingArticle, 'content').split('\n').map((paragraph: string, key: number) => (
                    <p key={key}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Signature Block */}
                <div className="bg-slate-950/80 p-4 border border-slate-850/80 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-display font-bold text-slate-200">
                      F
                    </div>
                    <div>
                      <span className="block font-display font-bold text-xs text-white">
                        {language === 'fr' ? 'Chronique rédigée par :' : 'Article written by:'}
                      </span>
                      <span className="block text-slate-400 text-xs font-mono font-bold">{readingArticle.author}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-feca-gold font-mono font-bold">
                    {language === 'fr' ? 'PÔLE MÉDIA YAOUNDÉ' : 'YAOUNDE MEDIA DIVISION'}
                  </span>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="px-6 py-4 bg-slate-950 border-t border-slate-805 text-right">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-display font-semibold border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                >
                  {language === 'fr' ? 'Fermer' : 'Close'}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>{/* /inner content wrapper */}
    </div>
  );
}
