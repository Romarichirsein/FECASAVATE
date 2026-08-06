/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Page Membres – Annuaire officiel des licenciés FECASAVATE
 * Données extraites de la base WordPress officielle (fecasavate.cm)
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Filter, Users, MapPin, Award, X,
  ChevronLeft, ChevronRight, Shield, Trophy, Swords,
  Star, User, Building2, Sparkles
} from 'lucide-react';
import { membresWP } from '../data/sportData';
import { WPMember } from '../types';
import { useLanguage } from '../components/LanguageContext';

/* ──────────────────────────────────────────────── */
/* Constantes de couleurs par grade                  */
/* ──────────────────────────────────────────────── */
const GRADE_COLORS: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  'Gant Blanc'       : { bg: 'bg-slate-100/10',  border: 'border-slate-400/40',  text: 'text-slate-300',  dot: 'bg-slate-400'  },
  'Gant Jaune'       : { bg: 'bg-amber-500/10',   border: 'border-amber-400/40',  text: 'text-amber-300',  dot: 'bg-amber-400'  },
  'Gant Vert'        : { bg: 'bg-emerald-500/10', border: 'border-emerald-400/40',text: 'text-emerald-300',dot: 'bg-emerald-400' },
  'Gant Vert 1°'     : { bg: 'bg-emerald-500/10', border: 'border-emerald-400/40',text: 'text-emerald-300',dot: 'bg-emerald-400' },
  'Gant Bleu'        : { bg: 'bg-blue-500/10',    border: 'border-blue-400/40',   text: 'text-blue-300',   dot: 'bg-blue-400'   },
  'Gant Bleu 1°'     : { bg: 'bg-blue-500/10',    border: 'border-blue-400/40',   text: 'text-blue-300',   dot: 'bg-blue-400'   },
  'Gant Rouge'       : { bg: 'bg-rose-500/10',    border: 'border-rose-400/40',   text: 'text-rose-300',   dot: 'bg-rose-400'   },
  'Gant Rouge 3°'    : { bg: 'bg-rose-500/10',    border: 'border-rose-400/40',   text: 'text-rose-300',   dot: 'bg-rose-400'   },
  "Gant d'Argent"    : { bg: 'bg-indigo-500/10',  border: 'border-indigo-400/40', text: 'text-indigo-300', dot: 'bg-indigo-400' },
  'Coach Fédéral'    : { bg: 'bg-teal-500/10',    border: 'border-teal-400/40',   text: 'text-teal-300',   dot: 'bg-teal-400'   },
  'Officiel Fédéral' : { bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-400/40',text: 'text-fuchsia-300',dot: 'bg-fuchsia-400' },
};

const getGradeColor = (grade?: string) => {
  if (!grade) return GRADE_COLORS['Gant Blanc'];
  const found = Object.keys(GRADE_COLORS).find(k => grade.startsWith(k));
  return found ? GRADE_COLORS[found] : GRADE_COLORS['Gant Blanc'];
};

const ROLE_LABELS: Record<string, { fr: string; en: string; icon: React.ReactNode; color: string }> = {
  tireur   : { fr: 'Combattant', en: 'Fighter',    icon: <Swords size={10} />,   color: 'text-feca-red'    },
  coach    : { fr: 'Coach',      en: 'Coach',      icon: <Trophy size={10} />,   color: 'text-feca-gold'   },
  dirigeant: { fr: 'Direction',  en: 'Board',      icon: <Shield size={10} />,   color: 'text-blue-400'    },
  arbitre  : { fr: 'Officiel',   en: 'Official',   icon: <Star size={10} />,     color: 'text-fuchsia-400' },
};

const CAT_LABELS: Record<string, { fr: string; en: string }> = {
  Benjamin    : { fr: 'Benjamin / Junior', en: 'Benjamin / Junior' },
  Senior      : { fr: 'Senior',             en: 'Senior'            },
  Professionnel: { fr: 'Professionnel',     en: 'Professional'      },
  Legende     : { fr: 'Légende',            en: 'Legend'            },
};

const ITEMS_PER_PAGE = 12;

/* ──────────────────────────────────────────────── */
/* Composant AvatarPlaceholder                       */
/* ──────────────────────────────────────────────── */
function AvatarPlaceholder({ firstName, lastName, gender }: { firstName: string; lastName: string; gender: string }) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const hue = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % 360;
  return (
    <div
      className="w-full h-full flex items-center justify-center text-white font-black text-3xl select-none"
      style={{ background: `linear-gradient(135deg, hsl(${hue},60%,25%), hsl(${(hue + 40) % 360},55%,18%))` }}
    >
      <span>{initials}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────── */
/* Composant MemberCard                              */
/* ──────────────────────────────────────────────── */
function MemberCard({ member, onSelect, language }: { member: WPMember; onSelect: (m: WPMember) => void; language: string }) {
  const gradeColor = getGradeColor(member.grade);
  const roleInfo = ROLE_LABELS[member.role] ?? ROLE_LABELS.tireur;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(member)}
      className="group relative bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-600 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-slate-950/60 hover:-translate-y-1 flex flex-col"
    >
      {/* Photo / Avatar */}
      <div className="relative aspect-square overflow-hidden bg-slate-900">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={`${member.firstName} ${member.lastName}`}
            className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <AvatarPlaceholder firstName={member.firstName} lastName={member.lastName} gender={member.gender} />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Role badge */}
        <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/50 text-[9px] font-mono font-bold uppercase tracking-wider ${roleInfo.color}`}>
          {roleInfo.icon}
          <span>{language === 'fr' ? roleInfo.fr : roleInfo.en}</span>
        </div>

        {/* Gender badge */}
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-700/50 text-[9px] font-mono font-bold text-slate-400">
          {member.gender}
        </div>

        {/* Stats strip at bottom */}
        {((member.tournoi ?? 0) > 0 || (member.medailles ?? 0) > 0) && (
          <div className="absolute bottom-0 inset-x-0 flex divide-x divide-slate-700/50 bg-slate-950/80 backdrop-blur-sm border-t border-slate-800/60">
            <div className="flex-1 text-center py-1">
              <div className="text-[10px] font-black text-feca-gold">{member.tournoi}</div>
              <div className="text-[7px] font-mono text-slate-500 uppercase">tournois</div>
            </div>
            <div className="flex-1 text-center py-1">
              <div className="text-[10px] font-black text-feca-red">⭐ {member.medailles}</div>
              <div className="text-[7px] font-mono text-slate-500 uppercase">médailles</div>
            </div>
          </div>
        )}
      </div>

      {/* Info block */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest truncate">
            {member.club || 'FECASAVATE'}
          </div>
          <h3 className="font-display font-black text-slate-100 text-sm leading-tight uppercase mt-0.5">
            {member.firstName} {member.lastName}
          </h3>
          {member.ville && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={9} className="text-slate-500 shrink-0" />
              <span className="text-[9px] text-slate-500 truncate">{member.ville}{member.region ? `, ${member.region}` : ''}</span>
            </div>
          )}
        </div>

        {/* Grade */}
        {member.grade && (
          <div className={`flex items-center gap-1.5 mt-2 px-2 py-1 rounded-lg border text-[9px] font-mono font-bold uppercase ${gradeColor.bg} ${gradeColor.border} ${gradeColor.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${gradeColor.dot}`} />
            <span className="truncate">{member.grade}</span>
          </div>
        )}
      </div>

      {/* Category footer */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/50 flex items-center justify-between text-[8px] font-mono text-slate-500 uppercase tracking-wider">
        <span>{CAT_LABELS[member.category]?.[language === 'fr' ? 'fr' : 'en'] ?? member.category}</span>
        <span className="text-slate-600">›</span>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────── */
/* Modal de détail du membre                         */
/* ──────────────────────────────────────────────── */
function MemberModal({ member, onClose, language }: { member: WPMember; onClose: () => void; language: string }) {
  const gradeColor = getGradeColor(member.grade);
  const roleInfo = ROLE_LABELS[member.role] ?? ROLE_LABELS.tireur;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header image / avatar */}
          <div className="relative h-48 bg-slate-900 overflow-hidden">
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={`${member.firstName} ${member.lastName}`}
                className="w-full h-full object-cover object-top opacity-80"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <AvatarPlaceholder firstName={member.firstName} lastName={member.lastName} gender={member.gender} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-950/70 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Name overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase mb-1.5 ${gradeColor.bg} ${gradeColor.border} ${gradeColor.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${gradeColor.dot}`} />
                {member.grade || 'Licencié'}
              </div>
              <h2 className="font-display font-black text-white text-xl leading-tight uppercase drop-shadow-lg">
                {member.firstName} {member.lastName}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {/* Role + Category pills */}
            <div className="flex flex-wrap gap-2">
              <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold ${roleInfo.color}`}>
                {roleInfo.icon}
                <span>{language === 'fr' ? roleInfo.fr : roleInfo.en}</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
                {CAT_LABELS[member.category]?.[language === 'fr' ? 'fr' : 'en'] ?? member.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400 uppercase">
                {member.gender === 'M' ? (language === 'fr' ? 'Homme' : 'Male') : (language === 'fr' ? 'Femme' : 'Female')}
              </span>
            </div>

            {/* Grid info */}
            <div className="grid grid-cols-2 gap-3">
              {member.club && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono uppercase tracking-wider">
                    <Building2 size={9} />
                    <span>{language === 'fr' ? 'Club' : 'Club'}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200">{member.club}</div>
                </div>
              )}
              {(member.ville || member.region) && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono uppercase tracking-wider">
                    <MapPin size={9} />
                    <span>{language === 'fr' ? 'Ville' : 'City'}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200">{[member.ville, member.region].filter(Boolean).join(', ')}</div>
                </div>
              )}
              {member.taille && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 space-y-0.5">
                  <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{language === 'fr' ? 'Taille' : 'Height'}</div>
                  <div className="text-xs font-bold text-slate-200">{member.taille}</div>
                </div>
              )}
              {member.poids && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 space-y-0.5">
                  <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{language === 'fr' ? 'Poids' : 'Weight'}</div>
                  <div className="text-xs font-bold text-slate-200">{member.poids} kg</div>
                </div>
              )}
            </div>

            {/* Stats */}
            {((member.tournoi ?? 0) > 0 || (member.medailles ?? 0) > 0) && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-feca-gold">{member.tournoi}</div>
                  <div className="text-[9px] font-mono text-amber-500/70 uppercase tracking-wider">{language === 'fr' ? 'Tournois' : 'Tournaments'}</div>
                </div>
                <div className="bg-feca-red/10 border border-feca-red/20 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-feca-red">⭐ {member.medailles}</div>
                  <div className="text-[9px] font-mono text-rose-500/70 uppercase tracking-wider">{language === 'fr' ? 'Médailles' : 'Medals'}</div>
                </div>
              </div>
            )}

            {/* Specialty */}
            {member.specialty && (
              <div className="flex items-start gap-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                <Sparkles size={13} className="text-feca-red mt-0.5 shrink-0" />
                <div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">{language === 'fr' ? 'Spécialité' : 'Specialty'}</div>
                  <div className="text-xs text-slate-300">{member.specialty}</div>
                </div>
              </div>
            )}

            {/* Presentation */}
            {member.presentation && (
              <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-feca-gold/40 pl-3">
                {member.presentation}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────── */
/* Page principale Membres                           */
/* ──────────────────────────────────────────────── */
export default function Membres() {
  const { language } = useLanguage();

  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState('all');
  const [filterCategorie, setFilterCategorie] = useState('all');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterVille, setFilterVille] = useState('all');
  const [filterClub, setFilterClub] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<WPMember | null>(null);

  /* ── Listes uniques pour les selects ── */
  const allVilles  = useMemo(() => Array.from(new Set(membresWP.map(m => m.ville).filter(Boolean))).sort(), []);
  const allClubs   = useMemo(() => Array.from(new Set(membresWP.map(m => m.club).filter(Boolean))).sort(), []);

  /* ── Filtrage ── */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return membresWP.filter(m => {
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      const matchSearch = !q || fullName.includes(q) || (m.club ?? '').toLowerCase().includes(q) || (m.specialty ?? '').toLowerCase().includes(q);
      const matchStatut   = filterStatut    === 'all' || m.role === filterStatut;
      const matchCat      = filterCategorie === 'all' || m.category === filterCategorie;
      const matchGenre    = filterGenre     === 'all' || m.gender === filterGenre;
      const matchVille    = filterVille     === 'all' || m.ville === filterVille;
      const matchClub     = filterClub      === 'all' || m.club === filterClub;
      return matchSearch && matchStatut && matchCat && matchGenre && matchVille && matchClub;
    });
  }, [search, filterStatut, filterCategorie, filterGenre, filterVille, filterClub]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentPageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = useCallback((setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setter(e.target.value);
    setPage(1);
  }, []);

  const resetAll = () => {
    setSearch(''); setFilterStatut('all'); setFilterCategorie('all');
    setFilterGenre('all'); setFilterVille('all'); setFilterClub('all');
    setPage(1);
  };

  const hasActiveFilters = search || filterStatut !== 'all' || filterCategorie !== 'all' || filterGenre !== 'all' || filterVille !== 'all' || filterClub !== 'all';

  /* ── Statistiques ── */
  const stats = useMemo(() => ({
    total: membresWP.length,
    tireurs: membresWP.filter(m => m.role === 'tireur').length,
    coaches: membresWP.filter(m => m.role === 'coach').length,
    femmes: membresWP.filter(m => m.gender === 'F').length,
  }), []);

  return (
    <div className="space-y-0 pb-20 font-sans">

      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[52vh] min-h-[340px] overflow-hidden">
        <img
          src="/images/savat2.jpg"
          alt="Membres FECASAVATE"
          className="w-full h-full object-cover object-center"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/savate 6.png'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-feca-dark" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono mb-3"
          >
            {language === 'fr' ? 'Annuaire Officiel des Licenciés' : 'Official Licensed Members Directory'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-7xl uppercase text-white leading-tight drop-shadow-2xl"
          >
            {language === 'fr' ? 'Membres' : 'Members'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm mt-4 max-w-xl leading-relaxed"
          >
            {language === 'fr'
              ? 'La communauté des athlètes, coaches et officiels de la Fédération Camerounaise de Savate.'
              : 'The community of athletes, coaches and officials of the Cameroonian Savate Federation.'}
          </motion.p>
        </div>
      </section>

      <div className="px-4 sm:px-8 max-w-[1700px] w-full mx-auto mt-8 space-y-8">

        {/* ── STATS CARDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: language === 'fr' ? 'Membres Licenciés' : 'Licensed Members', value: stats.total, icon: <Users size={18} />, color: 'text-feca-gold', bg: 'bg-amber-500/10 border-amber-500/20' },
            { label: language === 'fr' ? 'Combattants' : 'Fighters', value: stats.tireurs, icon: <Swords size={18} />, color: 'text-feca-red', bg: 'bg-rose-500/10 border-rose-500/20' },
            { label: language === 'fr' ? 'Coaches & Officiels' : 'Coaches & Officials', value: stats.coaches, icon: <Award size={18} />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: language === 'fr' ? 'Athlètes Féminines' : 'Female Athletes', value: stats.femmes, icon: <Star size={18} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`flex items-center gap-3 p-4 rounded-2xl border ${s.bg}`}
            >
              <div className={`${s.color} shrink-0`}>{s.icon}</div>
              <div>
                <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wide leading-tight">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── PANEL FILTRES ── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 space-y-4"
        >
          {/* Header filtres */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter size={13} className="text-feca-gold" />
              <h3 className="text-xs uppercase font-mono text-slate-400 font-bold tracking-wider">
                {language === 'fr' ? 'Recherche & Filtres' : 'Search & Filters'}
              </h3>
              {filtered.length !== membresWP.length && (
                <span className="px-2 py-0.5 rounded-full bg-feca-red/20 border border-feca-red/30 text-[9px] font-mono font-bold text-feca-red">
                  {filtered.length} {language === 'fr' ? 'résultat(s)' : 'result(s)'}
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAll}
                className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-feca-red transition-colors cursor-pointer"
              >
                <X size={11} />
                <span>{language === 'fr' ? 'Effacer' : 'Clear'}</span>
              </button>
            )}
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10" />
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder={language === 'fr' ? 'Rechercher un membre par nom, club ou spécialité...' : 'Search by name, club or specialty...'}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 placeholder-slate-600 focus:ring-1 focus:ring-feca-red focus:border-feca-red outline-none transition-all"
            />
          </div>

          {/* Grille de sélects */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Statut */}
            <div className="space-y-1">
              <label className="block text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider">
                {language === 'fr' ? 'Statut' : 'Status'}
              </label>
              <select
                value={filterStatut}
                onChange={handleFilterChange(setFilterStatut)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none cursor-pointer focus:border-feca-red transition-all"
              >
                <option value="all">{language === 'fr' ? 'Tous Statuts' : 'All Roles'}</option>
                <option value="tireur">{language === 'fr' ? 'Combattants' : 'Fighters'}</option>
                <option value="coach">{language === 'fr' ? 'Coaches' : 'Coaches'}</option>
                <option value="dirigeant">{language === 'fr' ? 'Direction' : 'Board'}</option>
                <option value="arbitre">{language === 'fr' ? 'Officiels' : 'Officials'}</option>
              </select>
            </div>

            {/* Catégorie */}
            <div className="space-y-1">
              <label className="block text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider">
                {language === 'fr' ? 'Catégorie' : 'Category'}
              </label>
              <select
                value={filterCategorie}
                onChange={handleFilterChange(setFilterCategorie)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none cursor-pointer focus:border-feca-red transition-all"
              >
                <option value="all">{language === 'fr' ? 'Toutes Catégories' : 'All Categories'}</option>
                <option value="Benjamin">Benjamin / Junior</option>
                <option value="Senior">Senior</option>
                <option value="Professionnel">{language === 'fr' ? 'Professionnel' : 'Professional'}</option>
                <option value="Legende">{language === 'fr' ? 'Légende' : 'Legend'}</option>
              </select>
            </div>

            {/* Genre */}
            <div className="space-y-1">
              <label className="block text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider">
                {language === 'fr' ? 'Sexe' : 'Gender'}
              </label>
              <select
                value={filterGenre}
                onChange={handleFilterChange(setFilterGenre)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none cursor-pointer focus:border-feca-red transition-all"
              >
                <option value="all">{language === 'fr' ? 'Tous' : 'All'}</option>
                <option value="M">{language === 'fr' ? 'Homme' : 'Male'}</option>
                <option value="F">{language === 'fr' ? 'Femme' : 'Female'}</option>
              </select>
            </div>

            {/* Ville */}
            <div className="space-y-1">
              <label className="block text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider">
                {language === 'fr' ? 'Lieu de résidence' : 'City'}
              </label>
              <select
                value={filterVille}
                onChange={handleFilterChange(setFilterVille)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none cursor-pointer focus:border-feca-red transition-all"
              >
                <option value="all">{language === 'fr' ? 'Toutes Villes' : 'All Cities'}</option>
                {allVilles.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* Club */}
            <div className="space-y-1">
              <label className="block text-[9px] uppercase font-mono text-slate-500 font-bold tracking-wider">
                Club
              </label>
              <select
                value={filterClub}
                onChange={handleFilterChange(setFilterClub)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-none cursor-pointer focus:border-feca-red transition-all"
              >
                <option value="all">{language === 'fr' ? 'Tous Clubs' : 'All Clubs'}</option>
                {allClubs.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </motion.section>

        {/* ── GRILLE MEMBRES ── */}
        <section>
          {currentPageItems.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-slate-800 rounded-3xl">
              <User className="w-10 h-10 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {language === 'fr' ? 'Aucun membre ne correspond aux critères.' : 'No member matches the criteria.'}
              </p>
              <button onClick={resetAll} className="mt-4 text-xs text-feca-red hover:underline cursor-pointer">
                {language === 'fr' ? 'Réinitialiser les filtres' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {currentPageItems.map(m => (
                  <MemberCard
                    key={m.id}
                    member={m}
                    onSelect={setSelectedMember}
                    language={language}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  n === page
                    ? 'bg-feca-red text-white border border-feca-red'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* Résumé résultats */}
        {filtered.length > 0 && (
          <p className="text-center text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            {language === 'fr'
              ? `Affichage ${Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–${Math.min(page * ITEMS_PER_PAGE, filtered.length)} sur ${filtered.length} membre(s)`
              : `Showing ${Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–${Math.min(page * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} member(s)`}
          </p>
        )}

      </div>{/* /inner wrapper */}

      {/* ── MODAL DÉTAIL ── */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          language={language}
        />
      )}
    </div>
  );
}
