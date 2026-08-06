/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Page Membres – Annuaire officiel et Fiche de Profil détaillée FECASAVATE
 * Reproduit fidèlement la mise en page WordPress (Ultimate Member profile layout)
 */

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Filter, Users, MapPin, Award, X,
  ChevronLeft, ChevronRight, Shield, Trophy, Swords,
  Star, User, Building2, Sparkles, ArrowLeft, Mail, Phone,
  Facebook, Instagram, Youtube, FileText, MessageSquare, Globe
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
function AvatarPlaceholder({ firstName, lastName }: { firstName: string; lastName: string }) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  const hue = (firstName.charCodeAt(0) + (lastName.charCodeAt(0) || 65)) % 360;
  return (
    <div
      className="w-full h-full flex items-center justify-center text-white font-black text-4xl select-none"
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
          <AvatarPlaceholder firstName={member.firstName} lastName={member.lastName} />
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
/* Vue de Profil détaillée (Ultimate Member style)   */
/* ──────────────────────────────────────────────── */
function MemberProfileView({ member, onBack, language }: { member: WPMember; onBack: () => void; language: string }) {
  const [activeTab, setActiveTab] = useState<'about' | 'posts' | 'comments'>('about');
  const displayName = `${member.firstName} ${member.lastName.toLowerCase()}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto space-y-6 pt-4 pb-16 px-4"
    >
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft size={14} />
          <span>{language === 'fr' ? "Retour à l'annuaire des membres" : "Back to members directory"}</span>
        </button>

        <div className="text-xs font-mono text-slate-500">
          ID: {member.id}
        </div>
      </div>

      {/* Page Title */}
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-100 tracking-tight">
        {displayName}
      </h1>

      {/* Cover Photo Banner & Avatar Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Cover image banner */}
        <div className="h-56 sm:h-72 w-full relative bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900">
          <img
            src="/images/savat2.jpg"
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/savate 6.png'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        {/* User Card Overlap Header */}
        <div className="relative px-6 pb-6 pt-0 bg-slate-950 flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20 z-10">
          {/* Avatar circular frame */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-950 shadow-2xl bg-slate-900 overflow-hidden shrink-0 relative">
            {member.imageUrl ? (
              <img
                src={member.imageUrl}
                alt={displayName}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <AvatarPlaceholder firstName={member.firstName} lastName={member.lastName} />
            )}
          </div>

          {/* User title and social buttons */}
          <div className="space-y-3 text-center sm:text-left flex-1">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {displayName}
              </h2>
              {member.club && (
                <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                  {member.club}
                </p>
              )}
            </div>

            {/* Social media links bar */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {member.facebook && (
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 text-xs font-medium transition-colors"
                >
                  <Facebook size={13} />
                  <span>Facebook</span>
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-600/20 border border-pink-500/30 text-pink-400 hover:bg-pink-600/30 text-xs font-medium transition-colors"
                >
                  <Instagram size={13} />
                  <span>Instagram</span>
                </a>
              )}
              {member.youtube && (
                <a
                  href={member.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 text-xs font-medium transition-colors"
                >
                  <Youtube size={13} />
                  <span>YouTube</span>
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <Mail size={13} className="text-feca-gold" />
                  <span>{member.email}</span>
                </a>
              )}
              {member.mobile && (
                <a
                  href={`tel:${member.mobile}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                >
                  <Phone size={13} className="text-emerald-400" />
                  <span>{member.mobile}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation bar (styled matching Ultimate Member profile tabs) */}
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
              activeTab === 'about'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <User size={14} />
            <span>{language === 'fr' ? 'À propos' : 'About'}</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
              activeTab === 'posts'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText size={14} />
            <span>{language === 'fr' ? 'Publications' : 'Posts'}</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
              activeTab === 'comments'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare size={14} />
            <span>{language === 'fr' ? 'Commentaires' : 'Comments'}</span>
          </button>
        </div>
      </div>

      {/* Tab Content Panel */}
      <AnimatePresence mode="wait">
        {activeTab === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Présentation Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <User size={16} className="text-sky-400" />
                <h3 className="font-display font-bold text-slate-200 text-sm uppercase tracking-wider">
                  {language === 'fr' ? 'Présentation' : 'Presentation'}
                </h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {member.presentation || (language === 'fr' ? "Aucune biographie rédigée pour le moment." : "No bio entered yet.")}
              </p>
            </div>

            {/* Ultimate Member Form Data Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                  {language === 'fr' ? 'Fiche de Renseignements Officielle' : 'Official Information Record'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400">
                  Statut : {member.role.toUpperCase()}
                </span>
              </div>

              {/* Attributes Grid Table (Matching Ultimate Member rows) */}
              <div className="divide-y divide-slate-800/60 text-xs">
                
                {/* Row 1: Nom | Prénom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900/90">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Nom</span>
                    <span className="text-slate-200 font-medium">{member.lastName.toLowerCase() || '—'}</span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Prénom</span>
                    <span className="text-slate-200 font-medium">{member.firstName || '—'}</span>
                  </div>
                </div>

                {/* Row 2: Age / Birthdate | Sexe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-950/60">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Date de naissance / Âge</span>
                    <span className="text-slate-200 font-medium">{member.birth_date || 'Non renseigné'}</span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Sexe</span>
                    <span className="text-slate-200 font-medium">{member.gender === 'F' ? 'Femme' : 'Homme'}</span>
                  </div>
                </div>

                {/* Row 3: Pays | Ville | Région */}
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-900/90">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Pays de résidence</span>
                    <span className="text-slate-200 font-medium">{member.pays || 'Cameroun'}</span>
                  </div>
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Ville de résidence</span>
                    <span className="text-slate-200 font-medium">{member.ville || '—'}</span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Région</span>
                    <span className="text-slate-200 font-medium">{member.region || '—'}</span>
                  </div>
                </div>

                {/* Row 4: Mobile | Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-950/60">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Numéro de mobile</span>
                    <span className="text-sky-400 font-medium">{member.mobile || '—'}</span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Adresse d'email</span>
                    <span className="text-sky-400 font-medium">{member.email || '—'}</span>
                  </div>
                </div>

                {/* Row 5: Taille | Poids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900/90">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Taille</span>
                    <span className="text-slate-200 font-medium">{member.taille || '—'}</span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Poids</span>
                    <span className="text-slate-200 font-medium">{member.poids ? `${member.poids} kg` : '—'}</span>
                  </div>
                </div>

                {/* Row 6: Club */}
                <div className="p-4 bg-slate-950/60 space-y-1">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Club</span>
                  <span className="text-slate-200 font-medium">{member.club || 'FECASAVATE Indépendant'}</span>
                </div>

                {/* Row 7: Tournoi | Médailles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900/90">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Tournoi(s) disputé(s)</span>
                    <span className="text-feca-gold font-bold">{member.tournoi ?? 0}</span>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Nombre de médailles</span>
                    <span className="text-feca-red font-bold">⭐ {member.medailles ?? 0}</span>
                  </div>
                </div>

                {/* Row 8: Catégorie */}
                <div className="p-4 bg-slate-950/60 space-y-1">
                  <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Catégorie</span>
                  <span className="text-slate-200 font-medium">{CAT_LABELS[member.category]?.[language === 'fr' ? 'fr' : 'en'] ?? member.category}</span>
                </div>

                {/* Row 9: Réseaux Sociaux */}
                <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-900/90">
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Facebook</span>
                    {member.facebook ? (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block">
                        {member.facebook}
                      </a>
                    ) : <span className="text-slate-600">—</span>}
                  </div>
                  <div className="p-4 border-b sm:border-b-0 sm:border-r border-slate-800/60 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Instagram</span>
                    {member.instagram ? (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline truncate block">
                        {member.instagram}
                      </a>
                    ) : <span className="text-slate-600">—</span>}
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">YouTube</span>
                    {member.youtube ? (
                      <a href={member.youtube} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline truncate block">
                        {member.youtube}
                      </a>
                    ) : <span className="text-slate-600">—</span>}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'posts' && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl"
          >
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              {language === 'fr' ? 'Aucune publication pour le moment par cet utilisateur.' : 'No posts published yet by this user.'}
            </p>
          </motion.div>
        )}

        {activeTab === 'comments' && (
          <motion.div
            key="comments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl"
          >
            <MessageSquare className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">
              {language === 'fr' ? 'Aucun commentaire pour le moment.' : 'No comments yet.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

  /* ── Si un membre est sélectionné, afficher la fiche de profil complète ── */
  if (selectedMember) {
    return (
      <MemberProfileView
        member={selectedMember}
        onBack={() => setSelectedMember(null)}
        language={language}
      />
    );
  }

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
    </div>
  );
}
