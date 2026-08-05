/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, Lock, ShieldAlert, CheckCircle, RefreshCw, Key, 
  Smartphone, FileText, Download, Award, ShieldCheck, Mail, LogOut, Terminal, History, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import OtpModal from '../components/OtpModal';
import { UserSession } from '../types';

interface InscriptionProps {
  session: UserSession;
  onLoginSuccess: (session: UserSession) => void;
  onLogout: () => void;
}

export default function Inscription({ session, onLoginSuccess, onLogout }: InscriptionProps) {
  const [activeTab, setActiveTab] = useState<'connexion' | 'inscription'>('connexion');
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'Homme',
    whatsapp: '',
    use2FA: true
  });

  const [error, setError] = useState<string | null>(null);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Security logs array for authentic look
  const [securityLogs, setSecurityLogs] = useState([
    { id: 1, event: 'Connexion initiée depuis Yaoundé', status: 'Requis 2FA', time: 'À l’instant' },
    { id: 2, event: 'Chiffrement AES-256 synchronisé', status: 'Actif', time: 'Il y a 2 min' },
    { id: 3, event: 'Mise à jour certificat SSL Fecasavate', status: 'Vérifié', time: 'Il y a 10 min' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const validateForm = (isRegister: boolean) => {
    if (isRegister) {
      if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.whatsapp) {
        return 'Veuillez renseigner tous les champs obligatoires.';
      }
      if (formData.password !== formData.confirmPassword) {
        return 'Les mots de passe ne correspondent pas.';
      }
      if (formData.password.length < 5) {
        return 'Le mot de passe doit contenir au moins 5 caractères.';
      }
    } else {
      if (!formData.username || !formData.password) {
        return 'Tous les champs de connexion sont obligatoires (Identifiant & Mot de passe).';
      }
    }
    return null;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm(activeTab === 'inscription');
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(false);
    
    if (formData.use2FA) {
      setIsOtpOpen(true);
    } else {
      onLoginSuccess({
        isLoggedIn: true,
        username: formData.username,
        firstName: formData.firstName || 'Tireur',
        lastName: formData.lastName || 'Anonyme',
        role: 'Athlète Licencié',
        whatsapp: formData.whatsapp || '+237 699 886 386',
        is2Fastated: false
      });
    }
  };

  const handle2FAVerifySuccess = () => {
    onLoginSuccess({
      isLoggedIn: true,
      username: formData.username,
      firstName: formData.firstName || 'Wilson',
      lastName: formData.lastName || 'Akouan Pharelle',
      role: 'Challenger Élite',
      whatsapp: formData.whatsapp || '+237 680 342 440',
      is2Fastated: true
    });

    // Add logging entries
    setSecurityLogs(prev => [
      { id: Date.now(), event: 'Authentification 2FA validée avec succès via SMS', status: 'Sécurisé', time: 'À l’instant' },
      ...prev
    ]);
  };

  return (
    <div className="space-y-12 pb-16 px-4 sm:px-8 max-w-[1700px] w-full mx-auto font-sans relative">
      
      {/* Absolute Ambient Glow lights */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-feca-red/5 rounded-full blur-3xl pointer-events-none" />

      {/* RENDER VIEW 1: WHEN AUTHENTICATED */}
      {session.isLoggedIn ? (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* Header Dashboard panel */}
          <div className="bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-950/80 border border-emerald-500/30 p-6 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={36} className="animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold block bg-emerald-950/35 border border-emerald-500/30 px-2 py-0.5 rounded-md inline-block">
                  SÉCURISATION SATELLITE ACTIVE
                </span>
                <h2 className="font-display font-black text-slate-100 text-2xl uppercase tracking-tight mt-1">
                  Espace Privé de {session.firstName}
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Bienvenue sur votre portail d’athlète Fecasavate • Dossier Licence #237-{session.username?.toUpperCase()}
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-feca-red hover:text-feca-red text-slate-400 text-xs font-display font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={14} /> Se déconnecter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Athlete card mock licence */}
            <div className="md:col-span-5 bg-feca-night border border-slate-850 p-6 rounded-2xl space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-feca-gold/5 rounded-full blur-xl pointer-events-none" />
              
              <span className="text-[9px] font-mono font-bold tracking-widest text-feca-gold uppercase block">
                LICENCE SPORTIVE CAMEROUNAISE
              </span>

              {/* Avatar structure */}
              <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
                <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center font-display font-black text-lg text-feca-gold select-none">
                  {session.firstName[0]}
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-slate-100">
                    {session.lastName} {session.firstName}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                    RÔLE : {session.role?.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-feca-red font-mono block font-bold leading-none">
                    WhatsApp : {session.whatsapp}
                  </span>
                </div>
              </div>

              {/* Card specifications grid row */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">TIER DE COMBAT</span>
                  <span className="block font-semibold text-slate-300">Grade Gant Jaune</span>
                </div>
                <div>
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">VALIDITÉ COMPÉTITIONS</span>
                  <span className="block font-semibold text-emerald-400">Certifié Médical Actif</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Téléchargement de la carte d'adhérent format PDF pour ${session.lastName} ${session.firstName}...`)}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-feca-gold text-xs font-bold text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Exporter PDF de Licence</span>
                </button>
              </div>
            </div>

            {/* Right Box: Cryptographic audit logs and settings */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Security parameters */}
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-slate-200">
                    Configuration de la Sécurité
                  </h3>
                  <span className="text-[10px] text-feca-gold font-mono font-bold">
                    AES-CHIP 256
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-850 rounded-xl">
                  <div className="flex gap-2.5 items-start">
                    <Smartphone className="w-5 h-5 text-feca-red shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="block font-bold text-white">Double Authentification (2FA)</span>
                      <span className="block text-slate-400 text-[10px] leading-relaxed">
                        Chaque connexion de cet athlète nécessite la vérification par code OTP de sécurité.
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Toggle mockup */}
                  <span className="px-3 py-1 bg-emerald-950/40 border border-emerald-500/20 rounded font-mono text-[10px] text-emerald-400 font-bold select-none">
                    ACTIF REQUIS
                  </span>
                </div>
              </div>

              {/* Dynamic audit security log entries */}
              <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-3.5">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-slate-900 pb-2">
                  <Terminal size={14} className="text-feca-red shrink-0" />
                  <span>Rapport d’Audit Système en Temps Réel</span>
                </h4>

                <div className="space-y-2.5">
                  {securityLogs.map(log => (
                    <div key={log.id} className="flex justify-between items-center text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        <span className="text-slate-450">{log.event}</span>
                      </div>
                      <div className="flex items-center gap-2 text-right">
                        <span className="text-[10px] text-feca-gold font-bold">({log.status})</span>
                        <span className="text-[10px] text-slate-600 shrink-0">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        
        /* RENDER VIEW 2: LOGIN / REGISTER FORMS */
        <div className="max-w-md mx-auto bg-feca-night border border-slate-850 p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          {/* Header tabs toggle banner */}
          <div className="grid grid-cols-2 bg-slate-950 p-1 border border-slate-850 rounded-2xl mb-6">
            <button
              onClick={() => {
                setActiveTab('connexion');
                setError(null);
              }}
              className={`py-2 text-xs font-display font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all ${
                activeTab === 'connexion' 
                  ? 'bg-gradient-to-r from-feca-red to-rose-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setActiveTab('inscription');
                setError(null);
              }}
              className={`py-2 text-xs font-display font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all ${
                activeTab === 'inscription' 
                  ? 'bg-gradient-to-r from-feca-red to-rose-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              S'inscrire
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="font-display font-black text-xl text-slate-100 uppercase tracking-tight">
              {activeTab === 'connexion' ? 'Accéder au Portail' : 'Rejoindre Fecasavate'}
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              {activeTab === 'connexion' 
                ? 'Saisissez vos identifiants pour synchroniser vos licences et formations.' 
                : 'Remplissez le formulaire réglementaire national de boxe française.'
              }
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Form details input loop */}
            <div className="space-y-3.5 font-sans">
              
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">IDENTIFIANT UNIQUE D'ATHLÈTE / EMAIL</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500">
                    <User size={14} />
                  </span>
                  <input
                    required
                    type="text"
                    name="username"
                    placeholder="Ex. akouan237"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden font-medium"
                  />
                </div>
              </div>

              {activeTab === 'inscription' && (
                <>
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">PRÉNOM</label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        placeholder="Pharelle"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">NOM DE FAMILLE</label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        placeholder="AKOUAN"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">EMAIL PRIVÉ</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500">
                        <Mail size={14} />
                      </span>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="akouan@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">SEXE</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl focus:border-feca-red outline-hidden cursor-pointer"
                      >
                        <option>Homme</option>
                        <option>Femme</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">NUMÉRO WHATSAPP</label>
                      <input
                        required
                        type="tel"
                        name="whatsapp"
                        placeholder="+237 699 886 386"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden font-medium"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">MOT DE PASSE SÉCURISÉ</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500">
                    <Lock size={14} />
                  </span>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden font-medium"
                  />
                </div>
              </div>

              {activeTab === 'inscription' && (
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">CONFIRMATION DU MOT DE PASSE</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center justify-center text-slate-500">
                      <Lock size={14} />
                    </span>
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden font-medium"
                    />
                  </div>
                </div>
              )}

              {/* 2FA switch selector */}
              <div className="p-3 bg-slate-950/60 border border-slate-850 rounded-xl flex items-center justify-between mt-3">
                <div className="flex gap-2 items-start text-[11px]">
                  <Smartphone size={15} className="text-feca-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-200">Activer le SMS de sécurité (2FA)</span>
                    <span className="block text-slate-550 leading-none mt-0.5">Renforce l'accès officiel d'autres sites</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.use2FA}
                  onChange={(e) => setFormData({ ...formData, use2FA: e.target.checked })}
                  className="rounded border-slate-700 text-feca-red bg-feca-dark focus:ring-feca-red cursor-pointer shrink-0"
                />
              </div>

            </div>

            {/* Error notifications */}
            {error && (
              <div className="p-2.5 bg-red-950/20 border border-feca-red/30 rounded-lg flex items-center gap-2 text-xs text-feca-red">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-feca-red to-rose-600 hover:from-rose-600 hover:to-pink-600 disabled:from-slate-800 disabled:to-slate-800 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-red-950/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
            >
              <span>{loading ? 'Calcul Sécurisé...' : activeTab === 'connexion' ? 'Se Connecter' : "S'inscrire à la Fédération"}</span>
              <CheckCircle size={14} className={loading ? 'animate-pulse' : ''} />
            </button>

          </form>

          {/* Secure padlock logo at bottom */}
          <div className="mt-6 border-t border-slate-900 pt-4 text-center">
            <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1">
              🔒 CRYPTAGE MATRICIEL • SÉCURISATION PORTAIL ATHLÈTE CERTIFIÉE
            </p>
          </div>

        </div>
      )}

      {/* 5. PORT OTP Verification Modal overlay portal */}
      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onVerifySuccess={handle2FAVerifySuccess}
        phoneOrEmail={formData.whatsapp || '+237 680 342 440'}
      />

    </div>
  );
}
