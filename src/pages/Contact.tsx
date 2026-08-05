/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertOctagon, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Clean success notification toast triggers
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime); // G5
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.15);
      } catch(e){}
    }, 1200);
  };

  return (
    <div className="space-y-12 pb-16 px-4 sm:px-8 max-w-[1700px] w-full mx-auto font-sans">
      
      {/* 1. HERO DESCRIPTION */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-10">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          Centre de Communication Fédéral
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-slate-100 leading-tight">
          Contacter la Fecasavate
        </h1>
        <p className="text-slate-300 text-sm">
          Pour toute demande d’affiliation de club, de sponsoring d’athlète, ou de renseignement sur nos formations, écrivez-nous ou localisez nos bureaux à Yaoundé.
        </p>
      </section>

      {/* 2. THREE CORE SECTIONS GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core contact channels info */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-feca-gold font-bold block">
            SIÈGE ET ADMINISTRATIONS
          </span>
          <h3 className="font-display font-black text-xl text-slate-100 uppercase mt-1 leading-tight">
            Coordonnées Principales
          </h3>

          {/* Location 1 */}
          <div className="p-4.5 bg-feca-night border border-slate-850 rounded-2xl space-y-3.5 shadow-xl">
            <h4 className="text-xs font-bold text-slate-200 font-display uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
              <span className="w-2 h-2 rounded-full bg-feca-red shrink-0" />
              <span>Site Principal : Ndi-Samba Tropicana</span>
            </h4>
            
            <ul className="space-y-2.5 text-xs">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-feca-red shrink-0 mt-0.5" />
                <span className="text-slate-400">Complexe Ndi-Samba, Tropicana, Yaoundé, Cameroun</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <a href="mailto:savatecmr@gmail.com" className="font-mono text-slate-300 hover:text-white hover:underline truncate">
                  savatecmr@gmail.com
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <Phone className="w-4 h-4 text-feca-gold shrink-0 mt-0.5" />
                <div className="font-mono text-slate-300 text-[11px] space-y-0.5">
                  <a href="tel:+237242063844" className="hover:text-white block">+237 242 063 844</a>
                  <a href="tel:+237699886386" className="hover:text-white block">+237 699 886 386</a>
                  <a href="tel:+237680342440" className="hover:text-white block">+237 680 342 440</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Location 2 */}
          <div className="p-4.5 bg-feca-night/60 border border-slate-900 rounded-2xl space-y-3 shadow-md">
            <h4 className="text-xs font-bold text-slate-300 font-display uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900/60 pb-2">
              <span className="w-2 h-2 rounded-full bg-slate-700 shrink-0" />
              <span>Site Secondaire : Total Fouda</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">Total Fouda, Yaoundé, Cameroun</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <a href="mailto:infos@fecasavate.cm" className="font-mono text-slate-400 hover:text-white hover:underline truncate">
                  infos@fecasavate.cm
                </a>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl flex items-center gap-2.5 text-xs text-slate-450 leading-relaxed font-sans select-none">
            <HelpCircle className="w-5 h-5 text-feca-gold shrink-0" />
            <p>Soutenu par le Ministère des Sports et affilié à la Fédération Internationale de Savate.</p>
          </div>
        </div>

        {/* Message Input Form Panel on Right */}
        <div className="lg:col-span-7 bg-feca-night border border-slate-850 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
          
          <span className="text-[10px] uppercase font-mono tracking-widest text-feca-red font-bold block">
            COURRIER NUMÉRIQUE CERTIFIÉ
          </span>
          <h3 className="font-display font-black text-xl text-slate-100 uppercase mt-1 mb-5">
            Formulaire de Contact
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">VOTRE NOM COMPLET</label>
                <input
                  required
                  type="text"
                  placeholder="M. Romaric NGUEMI"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 focus:border-feca-red text-xs text-white rounded-xl outline-hidden font-sans font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">VOTRE ADRESSE EMAIL</label>
                <input
                  required
                  type="email"
                  placeholder="romaric@eg-sports.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 focus:border-feca-red text-xs text-white rounded-xl outline-hidden font-sans font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">SUJET / OBJET DE DEMANDE</label>
              <input
                required
                type="text"
                placeholder="Ex. Demande de licence club Lions Indomptables"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 focus:border-feca-red text-xs text-white rounded-xl outline-hidden font-sans font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">CORPS DU MESSAGE</label>
              <textarea
                required
                rows={4}
                placeholder="Rédigez votre demande ici avec précision..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 focus:border-feca-red text-xs text-white rounded-xl outline-hidden font-sans"
              />
            </div>

            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400"
                >
                  <CheckCircle size={16} className="shrink-0" />
                  <span>Votre message a été envoyé avec succès au secrétariat fédéral à Yaoundé !</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-feca-red to-rose-600 hover:from-rose-600 hover:to-pink-600 disabled:from-slate-800 disabled:to-slate-800 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-red-950/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>{loading ? "Transmission en cours..." : "Transmettre l'Objet"}</span>
              <Send size={13} className={loading ? 'animate-pulse' : ''} />
            </button>

          </form>
        </div>

      </section>

      {/* 4. FULL WEBGL VECTOR MAP PLACEHOLDER OF YAOUNDÉ SIÈGE */}
      <section className="space-y-4">
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs uppercase tracking-widest text-feca-gold font-mono font-bold">
            Vecteur de Géolocalisation
          </span>
          <h3 className="font-display font-black text-xl text-slate-100 uppercase leading-none">
            Siège National Google Maps Style
          </h3>
          <p className="text-slate-400 text-xs">
            Aperçu vectoriel interactif de l’esplanade Tropicana à Yaoundé (Ndi-Samba).
          </p>
        </div>

        {/* Vector map simulation */}
        <div className="h-64 rounded-3xl border border-slate-800 bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center">
          
          {/* Abstract background grids visualizer */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1.5px)] bg-[size:12px_12px] opacity-70 pointer-events-none" />
          
          {/* Main street overlays visual */}
          <div className="absolute top-1/2 left-0 w-full h-8 bg-slate-900 border-y border-slate-800/60 rotate-12 flex items-center px-8 text-[6px] text-slate-500 font-mono tracking-widest select-none">
            BOULEVARD DE TROPICANA (AVENUE DES SPORTS COLS)
          </div>
          <div className="absolute top-0 left-1/3 w-8 h-full bg-slate-900 border-x border-slate-800/60 -rotate-35 flex items-center justify-center text-[6px] text-slate-500 font-mono tracking-widest select-none">
            RUE FOUDA
          </div>

          <div className="relative z-10 text-center space-y-3.5 max-w-sm p-4 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-feca-red/10 border border-feca-red/30 flex items-center justify-center mx-auto text-feca-red animate-float">
              <MapPin size={20} className="fill-feca-red" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xs text-slate-100">Complex Ndi - Samba</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Tropicana, Yaoundé, Cameroun • Cabinet Central de Coordination de la Boxe Française Savate
              </p>
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[9px] text-feca-gold hover:underline font-mono"
            >
              <span>OUVRIR DANS LE GPS SATELLITE</span>
              <BookMarkIcon />
            </a>
          </div>

          <div className="absolute bottom-2.5 right-3.5 text-[9px] font-mono text-slate-600">
            Latitude 3.8614° N, Longitude 11.5201° E • Yaoundé Central
          </div>
        </div>
      </section>

    </div>
  );
}

// Fallback visual
function BookMarkIcon() {
  return <span className="text-[10px]">↗</span>;
}
