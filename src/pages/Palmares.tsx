/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Trophy, Search, Filter, ShieldAlert, Award, Calendar, ExternalLink, Mail, Phone, Bookmark, MessageSquare, RefreshCw } from 'lucide-react';
import { PalmaresCardSkeleton, PalmaresTableSkeleton } from '../components/Skeletons';
import { worldPalmares } from '../data/sportData';
import { PalmaresItem } from '../types';
import EventCountdown from '../components/EventCountdown';
import { useLanguage } from '../components/LanguageContext';

export default function Palmares() {
  const { language, translateItem } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedal, setSelectedMedal] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Trigger brief shimmer state on medal choice change or initial load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedMedal]);

  const handleManualRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 750);
  };

  // Filter medals history list
  const filteredPalmares = worldPalmares.filter(item => {
    const matchesSearch = item.athlete.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMedal = selectedMedal === 'all' || item.medal === selectedMedal;
    return matchesSearch && matchesMedal;
  });

  const getMedalIcon = (medal: string) => {
    switch (medal) {
      case 'gold': return <span className="text-xl inline-block" title="Médaille d'Or">🥇</span>;
      case 'silver': return <span className="text-xl inline-block" title="Médaille d'Argent">🥈</span>;
      case 'bronze': return <span className="text-xl inline-block" title="Médaille de Bronze">🥉</span>;
      default: return null;
    }
  };

  const getMedalTextClass = (medal: string) => {
    switch (medal) {
      case 'gold': return 'text-feca-gold font-bold';
      case 'silver': return 'text-slate-350 font-semibold';
      case 'bronze': return 'text-amber-700 font-medium';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-16 pb-16 px-4 sm:px-8 max-w-[1700px] w-full mx-auto font-sans">
      
      {/* 1. HERO HEAD */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-10">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          {language === 'fr' ? "Les Victoires de l'Histoire" : "History's Mighty Victories"}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-slate-100 leading-tight">
          {language === 'fr' ? 'Palmarès de la Savate' : 'Savate Award History'}
        </h1>
        <p className="text-slate-300 text-sm">
          {language === 'fr' 
            ? "Découvrez le tableau officiel d'honneurs des athlètes camerounais de 2010 à 2025, de l'Or de Bulgarie aux Coupes et championnats nationaux de Yaoundé."
            : "Discover the official honor board of Cameroonian athletes from 2010 to 2025, from Gold in Bulgaria to the national cups and championships of Yaoundé."}
        </p>
      </section>

      {/* 2. CHANTAL BIYA WORLD FIGHT GRAND EVENT VIP CARD (NOV 29, 2025) */}
      <section className="bg-slate-900 border-2 border-feca-gold p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-3 bg-feca-gold text-slate-950 font-mono text-[9px] font-bold tracking-widest uppercase rounded-bl-xl">
          {language === 'fr' ? 'HAUT PARRAINAGE PRÉSIDENTIEL' : 'HIGH PRESIDENTIAL PATRONAGE'}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] text-feca-red uppercase tracking-wider font-extrabold block">
              ⭐ {language === 'fr' ? 'ÉVÉNEMENT MAJEUR HISTORIQUE' : 'HISTORIC MAJOR EVENT'}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 uppercase leading-tight">
              {language === 'fr' ? 'Palais des Sports de Yaoundé' : 'Yaoundé Sports Palace'} <br /> {language === 'fr' ? '29 Novembre 2025' : 'November 29, 2025'}
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="leading-relaxed">
                {language === 'fr' ? (
                  <>Sous le parrainage exclusif de la <strong>Première Dame S.E. Chantal BIYA</strong>, la Fecasavate organise et accueille les finales mondiales les plus captivantes d’Afrique Centrale.</>
                ) : (
                  <>Under the exclusive patronage of <strong>First Lady H.E. Chantal BIYA</strong>, Fecasavate hosts and organizes the most captivating world finals in Central Africa.</>
                )}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-200">
                <li className="flex items-center gap-2">
                  <Award size={14} className="text-feca-gold" /> {language === 'fr' ? 'Finale Mondiale (48 KG)' : 'World Final (48 KG)'}
                </li>
                <li className="flex items-center gap-2">
                  <Award size={14} className="text-feca-gold" /> {language === 'fr' ? 'Ceinture Mondiale Savate Pro (-65 KG)' : 'Savate Pro World Belt (-65 KG)'}
                </li>
              </ul>
            </div>

            {/* Event Countdown ticker */}
            <div className="py-1">
              <EventCountdown targetDateStr="2025-11-29T15:00:00" />
            </div>
            
            {/* WhatsApp Ticketing Call Action Block */}
            <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-slate-950 p-4 border border-slate-800 rounded-xl w-full">
              <div>
                <span className="block text-[9px] font-mono text-slate-500">{language === 'fr' ? 'RÉSERVATIONS TICKETS WHATSAPP' : 'WHATSAPP TICKET BOOKINGS'}</span>
                <span className="block text-xs font-mono font-black text-white">+33 7 53 04 93 53</span>
              </div>
              <a 
                href="https://wa.me/33753049355" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-display font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>{language === 'fr' ? 'Réserver par WhatsApp' : 'Book on WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Continent Match Graphic */}
          <div className="lg:col-span-6 border border-slate-800/80 bg-slate-950/60 p-5 rounded-2xl space-y-4">
            <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider text-center">
              {language === 'fr' ? 'Détail des Combats du Podium' : 'Podium Fights Details'}
            </span>
            
            <div className="space-y-3.5">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="flex justify-between text-[9px] font-mono text-feca-gold font-bold">
                  <span>{language === 'fr' ? 'FINALE MONDIALE MASCULINE (-65 KG)' : 'MASCULINE WORLD FINAL (-65 KG)'}</span>
                  <span>15:00 UTC+1</span>
                </div>
                <div className="flex items-center justify-between text-xs font-display font-black text-white mt-1">
                  <span>Akouan Pharelle 🇨🇲</span>
                  <span className="text-feca-red font-bold text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-red-950/20">SAVATE PRO</span>
                  <span>Dmitry Volkov 🇧🇬</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="flex justify-between text-[9px] font-mono text-feca-gold font-bold">
                  <span>{language === 'fr' ? 'FINALE MONDIALE FÉMININE (48 KG)' : 'FEMININE WORLD FINAL (48 KG)'}</span>
                  <span>16:30 UTC+1</span>
                </div>
                <div className="flex items-center justify-between text-xs font-display font-black text-white mt-1">
                  <span>Yanga Flora 🇨🇲</span>
                  <span className="text-feca-red font-bold text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-red-950/20">SAVATE ASSAUT</span>
                  <span>Helena Russo 🇫🇷</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. RECENT CONTINENTAL TOURNAMENT HIGHLIGHTS */}
      {isLoading ? (
        <PalmaresCardSkeleton count={3} />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Senegal 2025 Block */}
          <div className="p-5 rounded-2xl bg-feca-night border border-slate-850 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-feca-red uppercase tracking-wider font-extrabold font-bold">
                {language === 'fr' ? 'PODIUM SÉNÉGAL 2025' : 'SENEGAL PODIUM 2025'}
              </span>
              <h4 className="font-display font-extrabold text-sm text-slate-100">
                {language === 'fr' ? "Championnat d'Afrique de Savate" : "Savate African Championship"}
              </h4>
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 font-sans text-xs space-y-1.5 mt-2">
                <div className="flex items-center justify-between font-bold text-slate-300">
                  <span>1. {language === 'fr' ? 'Sénégal' : 'Senegal'} 🇸🇳</span>
                  <span className="text-feca-gold font-mono">{language === 'fr' ? '🥇 Or Général' : '🥇 General Gold'}</span>
                </div>
                <div className="flex items-center justify-between font-bold text-white">
                  <span>2. {language === 'fr' ? 'Cameroun' : 'Cameroon'} 🇨🇲</span>
                  <span className="text-slate-300 font-mono">{language === 'fr' ? '🥈 Argent Général' : '🥈 General Silver'}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>3. {language === 'fr' ? 'Maroc' : 'Morocco'} 🇲🇦</span>
                  <span className="text-amber-700 font-mono">{language === 'fr' ? '🥉 Bronze Général' : '🥉 General Bronze'}</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-mono">
              {language === 'fr' ? "Compétition continentale de l'ASS" : "ASS Continental Championship"}
            </p>
          </div>

          {/* Cairo 2024 block */}
          <div className="p-5 rounded-2xl bg-feca-night border border-slate-850 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-feca-gold uppercase tracking-wider font-bold">
                {language === 'fr' ? 'LE CAIRE ÉGYPTE 2024' : 'CAIRO EGYPT 2024'}
              </span>
              <h4 className="font-display font-extrabold text-sm text-slate-100">
                {language === 'fr' ? "Sacre de l'Afrique du Nord et Centrale" : "North & Central Africa Coronation"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {language === 'fr'
                  ? "Événement majeur continental réunissant de multiples pays africains. La team Fecasavate des Lions Indomptables s’est hissée à un taux exceptionnel de réussite technique."
                  : "Major continental event bringing together multiple African countries. The Indomitable Lions team of Fecasavate rose to an exceptional technical success rate."}
              </p>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-mono">
              {language === 'fr' ? "Sommet continental d'élite" : "Elite Continental Summit"}
            </p>
          </div>

          {/* National 2024 returns block */}
          <div className="p-5 rounded-2xl bg-feca-night border border-slate-850 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-feca-red uppercase tracking-wider font-bold">
                {language === 'fr' ? 'YAOUNDÉ JUILLET 2024' : 'YAOUNDE JULY 2024'}
              </span>
              <h4 className="font-display font-extrabold text-sm text-slate-100">
                {language === 'fr' ? "Finale Retour Nationale de Savate" : "National Return Savate Finals"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {language === 'fr'
                  ? "Le dimanche 07 Juillet à 10h30, les meilleurs athlètes nationaux et régionaux se sont livrés un combat de sélection intensive pour le pôle élite de Douala."
                  : "On Sunday, July 7 at 10:30 AM, the best national and regional athletes engaged in intensive selection fights for the Douala elite squad."}
              </p>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 font-mono">
              {language === 'fr' ? "Coupe du Cameroun Déc 2022" : "Cameroon Cup Dec 2022"}
            </p>
          </div>
        </section>
      )}

      {/* 4. INTERACTIVE DYNAMIC TABLE WITH SEARCH GRID */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-feca-red font-mono font-bold">
              {language === 'fr' ? 'Base de Données des Podiums' : 'Podiums Database Registry'}
            </span>
            <h3 className="font-display font-black text-xl text-slate-100 uppercase mt-0.5">
              {language === 'fr' ? 'Tableau Interactif du Palmarès Mondial' : 'Interactive World Awards Table'}
            </h3>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search bar */}
            <div className="relative flex-1 md:flex-none">
              <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder={language === 'fr' ? 'Filtrer un athlète/titre...' : 'Search athlete or title...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg focus:ring-1 focus:ring-feca-red focus:border-feca-red outline-hidden w-full font-sans"
              />
            </div>

            {/* Medal filter */}
            <select
              value={selectedMedal}
              onChange={(e) => setSelectedMedal(e.target.value)}
              className="py-2 px-3 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg focus:ring-feca-red focus:border-feca-red outline-hidden shrink-0 cursor-pointer"
            >
              <option value="all">{language === 'fr' ? 'Toutes médailles' : 'All Medals'}</option>
              <option value="gold">{language === 'fr' ? '🥇 Or uniquement' : '🥇 Gold Only'}</option>
              <option value="silver">{language === 'fr' ? '🥈 Argent uniquement' : '🥈 Silver Only'}</option>
              <option value="bronze">{language === 'fr' ? '🥉 Bronze uniquement' : '🥉 Bronze Only'}</option>
            </select>

            {/* Manual refresh action button */}
            <button
              onClick={handleManualRefresh}
              className="flex items-center justify-center p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-705 transition-colors cursor-pointer shrink-0"
              disabled={isLoading}
              title={language === 'fr' ? 'Rafraîchir' : 'Refresh'}
            >
              <RefreshCw size={13} className={`${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* The Main Table Grid Layout */}
        <div className="bg-feca-night border border-slate-850 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-display uppercase tracking-wider text-[11px] select-none">
                <tr>
                  <th className="py-4 px-5">{language === 'fr' ? 'Année' : 'Year'}</th>
                  <th className="py-4 px-5">{language === 'fr' ? 'Titre Remporté' : 'Title Won'}</th>
                  <th className="py-4 px-5">{language === 'fr' ? 'Athlète / Équipe' : 'Athlete / Team'}</th>
                  <th className="py-4 px-5">{language === 'fr' ? 'Lieu de Choc' : 'Venue / Location'}</th>
                  <th className="py-4 px-5 text-right">{language === 'fr' ? 'Médaille' : 'Medal'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/60">
                {isLoading ? (
                  <PalmaresTableSkeleton count={6} />
                ) : filteredPalmares.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                      {language === 'fr' 
                        ? 'Aucune victoire ne correspond aux filtres indiqués.' 
                        : 'No victories found matching the specified filters.'}
                    </td>
                  </tr>
                ) : (
                  filteredPalmares.map(item => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-slate-900/30 transition-colors"
                    >
                      {/* Year column */}
                      <td className="py-3 px-5">
                        <span className="font-mono font-bold text-slate-400">
                          {item.year}
                        </span>
                      </td>

                      {/* Title column */}
                      <td className="py-3 px-5">
                        <div>
                          <span className={`font-display font-bold text-slate-200 block text-xs`}>
                             {translateItem(item, 'title')}
                          </span>
                          {item.category && (
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              {translateItem(item, 'category')}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Athlete column */}
                      <td className="py-3 px-5">
                        <span className="font-sans font-extrabold text-white text-xs block">
                          {item.athlete}
                        </span>
                      </td>

                      {/* Location column */}
                      <td className="py-3 px-5">
                        <span className="text-slate-400 text-xs">
                          {translateItem(item, 'location')}
                        </span>
                      </td>

                      {/* Medal column */}
                      <td className="py-3 px-5 text-right font-mono">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <span className={`text-xs ${getMedalTextClass(item.medal)} uppercase text-[10px] tracking-wider`}>
                            {item.medal === 'gold' 
                              ? (language === 'fr' ? 'Or' : 'Gold') 
                              : item.medal === 'silver' 
                                ? (language === 'fr' ? 'Argent' : 'Silver') 
                                : item.medal === 'bronze' 
                                  ? (language === 'fr' ? 'Bronze' : 'Bronze') 
                                  : (language === 'fr' ? 'Aucune' : 'None')}
                          </span>
                          {getMedalIcon(item.medal)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
