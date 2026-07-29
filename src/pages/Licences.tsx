/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, Award, FileText, CheckCircle, Upload, User, Building, 
  Phone, Mail, Calendar, MapPin, Sparkles, AlertCircle, ChevronRight, Download, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../components/LanguageContext';

export default function Licences() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'licence' | 'affiliation'>('licence');

  // License Form State
  const [licenceForm, setLicenceForm] = useState({
    firstName: '',
    lastName: '',
    gender: 'Homme',
    birthDate: '',
    city: 'Yaoundé',
    region: 'Centre',
    phone: '',
    email: '',
    role: 'Athlète',
    clubName: ''
  });

  // Affiliation Form State
  const [affiliationForm, setAffiliationForm] = useState({
    clubName: '',
    acronym: '',
    city: 'Yaoundé',
    region: 'Centre',
    address: '',
    presidentName: '',
    phone: '',
    email: '',
    memberCount: '20-50'
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rolesList = [
    { id: 'Athlète', label: language === 'fr' ? 'Athlète / Tireur' : 'Athlete / Fighter', desc: language === 'fr' ? 'Pour les compétiteurs et pratiquants en club' : 'For club fighters and practitioners' },
    { id: 'Coach', label: language === 'fr' ? 'Coach / Entraîneur' : 'Coach / Instructor', desc: language === 'fr' ? 'Pour l’encadrement technique et la préparation' : 'For technical coaching and fighter prep' },
    { id: 'Président de club', label: language === 'fr' ? 'Président de Club' : 'Club President', desc: language === 'fr' ? 'Pour les responsables administratifs d’associations' : 'For administrative club heads' },
    { id: 'Communication', label: language === 'fr' ? 'Communication & RP' : 'PR & Communication', desc: language === 'fr' ? 'Pour la gestion des médias et attachés de presse' : 'For media handlers and press officers' },
    { id: 'Bureau exécutif', label: language === 'fr' ? 'Bureau Exécutif Fédéral' : 'Executive Bureau Member', desc: language === 'fr' ? 'Pour les membres élus du comité fédéral' : 'For elected federal board members' },
    { id: 'Officiel', label: language === 'fr' ? 'Officiel / Juge-Arbitre' : 'Official / Judge-Referee', desc: language === 'fr' ? 'Pour les officiels de ring et délégués de gala' : 'For ring officials and gala delegates' },
    { id: 'Direction Technique Nationale', label: language === 'fr' ? 'Direction Technique Nationale (DTN)' : 'National Technical Direction (DTN)', desc: language === 'fr' ? 'Pour les cadreurs techniques nationaux et jurys' : 'For national technical advisors and juries' }
  ];

  const handleLicenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenceForm.firstName || !licenceForm.lastName || !licenceForm.phone || !licenceForm.email) {
      setError(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires (*).' : 'Please fill all required fields (*).');
      return;
    }

    setError(null);
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      const refNumber = `LIC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedSuccess(refNumber);
    }, 1200);
  };

  const handleAffiliationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!affiliationForm.clubName || !affiliationForm.presidentName || !affiliationForm.phone || !affiliationForm.email) {
      setError(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires (*).' : 'Please fill all required fields (*).');
      return;
    }

    setError(null);
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      const refNumber = `AFF-CLUB-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedSuccess(refNumber);
    }, 1200);
  };

  const resetForm = () => {
    setSubmittedSuccess(null);
    setError(null);
  };

  return (
    <div className="space-y-12 pb-16 px-4 max-w-7xl mx-auto font-sans relative">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-feca-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-feca-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. HERO HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-10">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          {language === 'fr' ? 'Secrétariat Général & Administration' : 'General Secretariat & Administration'}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-slate-100 leading-tight">
          {language === 'fr' ? 'Licences & Affiliations Officielles' : 'Official Licenses & Affiliations'}
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          {language === 'fr'
            ? 'Plateforme réglementaire nationale de la Fédération Camerounaise de Savate Boxe Française (FECASAVATE). Soumettez vos demandes de licences professionnelles et d’affiliations de club pour homologation.'
            : 'Official regulatory platform of the Cameroon Savate Boxing Federation (FECASAVATE). Submit your professional licensing dossiers and club affiliation applications for national accreditation.'}
        </p>
      </section>

      {/* 2. MAIN CONTAINER */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* TABS SELECTOR */}
        <div className="grid grid-cols-2 bg-slate-950 p-1.5 border border-slate-800 rounded-2xl shadow-xl">
          <button
            type="button"
            onClick={() => {
              setActiveTab('licence');
              resetForm();
            }}
            className={`py-3.5 px-4 text-xs font-display font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 ${
              activeTab === 'licence' 
                ? 'bg-gradient-to-r from-feca-red via-rose-600 to-feca-red text-white shadow-lg shadow-rose-950/40 border border-rose-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <User size={16} />
            <span>{language === 'fr' ? 'Demande de Licence Individuelle' : 'Individual License Request'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('affiliation');
              resetForm();
            }}
            className={`py-3.5 px-4 text-xs font-display font-black uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 ${
              activeTab === 'affiliation' 
                ? 'bg-gradient-to-r from-feca-red via-rose-600 to-feca-red text-white shadow-lg shadow-rose-950/40 border border-rose-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <Building size={16} />
            <span>{language === 'fr' ? 'Affiliation de Club' : 'Club Affiliation'}</span>
          </button>
        </div>

        {/* SUCCESS STATE */}
        {submittedSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/90 border border-emerald-500/40 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle size={44} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-md inline-block">
                {language === 'fr' ? 'DEMANDE ENREGISTRÉE AVEC SUCCÈS' : 'APPLICATION SUCCESSFULLY REGISTERED'}
              </span>
              <h2 className="font-display font-black text-2xl uppercase text-slate-100">
                {language === 'fr' ? 'Dossier Transmis au Secrétariat Général' : 'Dossier Transmitted to Secretariat'}
              </h2>
              <p className="text-slate-300 text-xs max-w-lg mx-auto leading-relaxed font-sans">
                {language === 'fr'
                  ? 'Votre demande a été enregistrée dans la base de données fédérale sous le numéro de référence :'
                  : 'Your request has been logged into the national federal database under reference number:'}
              </p>
              <div className="inline-block bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-feca-gold font-mono font-black text-sm tracking-wider my-2 select-all">
                {submittedSuccess}
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl max-w-md mx-auto text-left text-xs font-mono space-y-1 text-slate-400">
              <div className="flex justify-between">
                <span>Type :</span>
                <span className="text-white font-bold">{activeTab === 'licence' ? licenceForm.role : 'Club Affilié'}</span>
              </div>
              <div className="flex justify-between">
                <span>Demandeur :</span>
                <span className="text-white font-bold">
                  {activeTab === 'licence' 
                    ? `${licenceForm.firstName} ${licenceForm.lastName}` 
                    : affiliationForm.clubName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Statut :</span>
                <span className="text-emerald-400 font-bold">En cours de validation (DTN)</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => alert(`Téléchargement du récépissé provisoire ${submittedSuccess}...`)}
                className="w-full sm:w-auto px-6 py-3 bg-feca-gold hover:bg-yellow-500 text-slate-950 font-display font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-yellow-950/20"
              >
                <Download size={14} />
                <span>{language === 'fr' ? 'Télécharger Récépissé PDF' : 'Download PDF Receipt'}</span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>{language === 'fr' ? 'Nouvelle Demande' : 'New Application'}</span>
              </button>
            </div>
          </motion.div>
        ) : (

          /* FORM SECTION */
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-feca-night border border-slate-850 p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            {/* ERROR ADVISORY */}
            {error && (
              <div className="mb-6 p-4 bg-red-950/30 border border-feca-red/40 rounded-2xl flex items-center gap-3 text-xs text-feca-red">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {activeTab === 'licence' ? (
              
              /* 1. DEMANDE DE LICENCE INDIVIDUELLE */
              <form onSubmit={handleLicenceSubmit} className="space-y-8">
                
                {/* SECTION: RÔLE SOLLICITÉ */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                    <Award className="w-4 h-4 text-feca-gold" />
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                      {language === 'fr' ? '1. Sélection du Rôle Officiel de Licence (*)' : '1. Official License Role Selection (*)'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rolesList.map(role => {
                      const isSelected = licenceForm.role === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setLicenceForm({ ...licenceForm, role: role.id })}
                          className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-slate-900 border-feca-red text-white ring-1 ring-feca-red/50 shadow-md'
                              : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:border-slate-700 hover:bg-slate-950'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold font-display uppercase ${isSelected ? 'text-feca-gold' : 'text-slate-200'}`}>
                              {role.label}
                            </span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-feca-red bg-feca-red' : 'border-slate-700'}`}>
                              {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 font-sans">
                            {role.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION: INFORMATIONS PERSONNELLES */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                    <User className="w-4 h-4 text-feca-gold" />
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                      {language === 'fr' ? '2. Informations Personnelles du Licencié' : '2. Personal Information'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">NOM DE FAMILLE (*)</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex. AKOUAN"
                        value={licenceForm.lastName}
                        onChange={e => setLicenceForm({ ...licenceForm, lastName: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">PRÉNOM (*)</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex. Pharelle"
                        value={licenceForm.firstName}
                        onChange={e => setLicenceForm({ ...licenceForm, firstName: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">SEXE</label>
                      <select
                        value={licenceForm.gender}
                        onChange={e => setLicenceForm({ ...licenceForm, gender: e.target.value })}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:border-feca-red outline-hidden cursor-pointer"
                      >
                        <option>Homme</option>
                        <option>Femme</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">DATE DE NAISSANCE</label>
                      <input
                        type="date"
                        value={licenceForm.birthDate}
                        onChange={e => setLicenceForm({ ...licenceForm, birthDate: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">CLUB RATTACHÉ</label>
                      <input
                        type="text"
                        placeholder="Ex. Académie Yaoundé 5"
                        value={licenceForm.clubName}
                        onChange={e => setLicenceForm({ ...licenceForm, clubName: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">NUMÉRO TÉLÉPHONE / WHATSAPP (*)</label>
                      <input
                        type="tel"
                        required
                        placeholder="+237 699 886 386"
                        value={licenceForm.phone}
                        onChange={e => setLicenceForm({ ...licenceForm, phone: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">ADRESSE E-MAIL (*)</label>
                      <input
                        type="email"
                        required
                        placeholder="nom@exemple.cm"
                        value={licenceForm.email}
                        onChange={e => setLicenceForm({ ...licenceForm, email: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">VILLE DE RÉSIDENCE</label>
                      <input
                        type="text"
                        placeholder="Yaoundé"
                        value={licenceForm.city}
                        onChange={e => setLicenceForm({ ...licenceForm, city: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">RÉGION</label>
                      <select
                        value={licenceForm.region}
                        onChange={e => setLicenceForm({ ...licenceForm, region: e.target.value })}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:border-feca-red outline-hidden cursor-pointer"
                      >
                        <option>Centre</option>
                        <option>Littoral</option>
                        <option>Ouest</option>
                        <option>Nord</option>
                        <option>Extrême-Nord</option>
                        <option>Adamaoua</option>
                        <option>Est</option>
                        <option>Sud</option>
                        <option>Nord-Ouest</option>
                        <option>Sud-Ouest</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION: PIÈCES JOINTES */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                    <Upload className="w-4 h-4 text-feca-gold" />
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                      {language === 'fr' ? '3. Pièces Justificatives (Optionnel)' : '3. Supporting Documents (Optional)'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center space-y-2">
                      <Upload className="w-6 h-6 text-slate-500 mx-auto" />
                      <span className="block text-xs font-bold text-slate-300">Photo d’Identité</span>
                      <span className="block text-[10px] text-slate-500">JPG, PNG (Max 5 MB)</span>
                      <label className="inline-block mt-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-750 text-[10px] font-mono font-bold text-slate-300 rounded-lg cursor-pointer transition-colors">
                        Parcourir...
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>

                    <div className="p-4 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center space-y-2">
                      <FileText className="w-6 h-6 text-slate-500 mx-auto" />
                      <span className="block text-xs font-bold text-slate-300">Certificat Médical / CNI</span>
                      <span className="block text-[10px] text-slate-500">PDF, JPG (Max 10 MB)</span>
                      <label className="inline-block mt-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-750 text-[10px] font-mono font-bold text-slate-300 rounded-lg cursor-pointer transition-colors">
                        Parcourir...
                        <input type="file" accept=".pdf,image/*" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-feca-red via-rose-600 to-feca-red hover:from-rose-600 hover:to-feca-red disabled:opacity-50 text-white font-display font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-red-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{submitting ? (language === 'fr' ? 'Traitement du Dossier...' : 'Processing Request...') : (language === 'fr' ? 'Soumettre la Demande de Licence' : 'Submit License Dossier')}</span>
                  <ChevronRight size={16} />
                </button>

              </form>

            ) : (

              /* 2. DEMANDE D'AFFILIATION DE CLUB */
              <form onSubmit={handleAffiliationSubmit} className="space-y-8">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                    <Building className="w-4 h-4 text-feca-gold" />
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                      {language === 'fr' ? '1. Identification Officielle du Club (*)' : '1. Club Official Identification (*)'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">NOM COMPLET DU CLUB / ASSOCIATION (*)</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex. Club Léopard de Boxe Française"
                        value={affiliationForm.clubName}
                        onChange={e => setAffiliationForm({ ...affiliationForm, clubName: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">SIGLE / ABRÉVIATION</label>
                      <input
                        type="text"
                        placeholder="Ex. CLBF"
                        value={affiliationForm.acronym}
                        onChange={e => setAffiliationForm({ ...affiliationForm, acronym: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">VILLE D’IMPLANTATION</label>
                      <input
                        type="text"
                        placeholder="Yaoundé / Douala"
                        value={affiliationForm.city}
                        onChange={e => setAffiliationForm({ ...affiliationForm, city: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">RÉGION LIGUE REGIONALE</label>
                      <select
                        value={affiliationForm.region}
                        onChange={e => setAffiliationForm({ ...affiliationForm, region: e.target.value })}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:border-feca-red outline-hidden cursor-pointer"
                      >
                        <option>Centre</option>
                        <option>Littoral</option>
                        <option>Ouest</option>
                        <option>Nord</option>
                        <option>Extrême-Nord</option>
                        <option>Adamaoua</option>
                        <option>Est</option>
                        <option>Sud</option>
                        <option>Nord-Ouest</option>
                        <option>Sud-Ouest</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">ADRESSE DU SIÈGE / SALLE D’ENTRAÎNEMENT</label>
                    <input
                      type="text"
                      placeholder="Ex. Mairie de Yaoundé 5, Salle des fêtes"
                      value={affiliationForm.address}
                      onChange={e => setAffiliationForm({ ...affiliationForm, address: e.target.value })}
                      className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                    />
                  </div>
                </div>

                {/* SECTION: RESPONSABLE ET CONTACT */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
                    <User className="w-4 h-4 text-feca-gold" />
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200">
                      {language === 'fr' ? '2. Présidence et Contacts Officiels du Club (*)' : '2. President & Club Contacts (*)'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">NOM COMPLET DU PRÉSIDENT (*)</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex. MANDENG BAKADAL"
                        value={affiliationForm.presidentName}
                        onChange={e => setAffiliationForm({ ...affiliationForm, presidentName: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">NOMBRE ESTIMÉ D’ADHÉRENTS</label>
                      <select
                        value={affiliationForm.memberCount}
                        onChange={e => setAffiliationForm({ ...affiliationForm, memberCount: e.target.value })}
                        className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl focus:border-feca-red outline-hidden cursor-pointer"
                      >
                        <option>Moins de 20 membres</option>
                        <option>20 à 50 membres</option>
                        <option>50 à 100 membres</option>
                        <option>Plus de 100 membres</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">NUMÉRO WHATSAPP OFFICIEL (*)</label>
                      <input
                        type="tel"
                        required
                        placeholder="+237 670 040 690"
                        value={affiliationForm.phone}
                        onChange={e => setAffiliationForm({ ...affiliationForm, phone: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">E-MAIL DU CLUB (*)</label>
                      <input
                        type="email"
                        required
                        placeholder="club@fecasavate.cm"
                        value={affiliationForm.email}
                        onChange={e => setAffiliationForm({ ...affiliationForm, email: e.target.value })}
                        className="w-full py-2.5 px-3.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl focus:border-feca-red outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-feca-red via-rose-600 to-feca-red hover:from-rose-600 hover:to-feca-red disabled:opacity-50 text-white font-display font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-red-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{submitting ? (language === 'fr' ? 'Traitement du Dossier d’Affiliation...' : 'Processing Affiliation...') : (language === 'fr' ? 'Soumettre la Demande d’Affiliation de Club' : 'Submit Club Affiliation Dossier')}</span>
                  <ChevronRight size={16} />
                </button>

              </form>

            )}

          </motion.div>
        )}

      </div>

    </div>
  );
}
