/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, Lock, Key, Smartphone, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifySuccess: () => void;
  phoneOrEmail: string;
}

export default function OtpModal({ isOpen, onClose, onVerifySuccess, phoneOrEmail }: OtpModalProps) {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(59);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);
  
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Simulation parameters
  const correctCode = '237486';

  useEffect(() => {
    if (!isOpen) return;
    
    // Timer countdown
    const countdown = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Alert simulation in background
    console.log(`[SECURE SMS SIMULATOR] Code envoyé à ${phoneOrEmail} : ${correctCode}`);

    return () => clearInterval(countdown);
  }, [isOpen, phoneOrEmail]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    setError(null);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = () => {
    const entered = code.join('');
    if (entered.length < 6) {
      setError('Veuillez saisir l’intégralité des 6 chiffres.');
      return;
    }

    if (entered === correctCode) {
      setSuccess(true);
      onVerifySuccess();
      onClose();
      setCode(['', '', '', '', '', '']);
      setSuccess(false);
    } else {
      setError('Code OTP incorrect ou expiré.');
    }
  };

  const handleResend = () => {
    setIsResending(false);
    setTimer(59);
    setError(null);
      // Simulative toast-like sound
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.frequency.setValueAtTime(660, audioCtx.currentTime); 
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start(); oscillator.stop(audioCtx.currentTime + 0.15);
      } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose} />

      {/* Main Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-feca-night border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-feca-red/10 border border-feca-red/30 rounded-full mb-4 animate-float">
              {success ? (
                <ShieldCheck className="w-8 h-8 text-feca-gold" />
              ) : (
                <Lock className="w-8 h-8 text-feca-red" />
              )}
            </div>
            
            <h3 className="font-display font-bold text-xl text-slate-100">
              Double Authentification (2FA)
            </h3>
            <p className="text-slate-400 text-xs mt-1 px-4">
              Pour des raisons de sécurité fédérale (grade Lions Indomptables), veuillez valider le code d'accès temporaire envoyé à vos coordonnées.
            </p>
          </div>

          {/* Secure details */}
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 my-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-feca-gold shrink-0" />
              <div className="text-[11px] text-slate-300">
                Type : <span className="text-white font-mono font-bold">SMS de Sécurité</span>
                <span className="block text-slate-500 font-mono truncate">{phoneOrEmail || '+237 ••• ••• 440'}</span>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setShowQr(!showQr)} 
              className="text-[10px] text-feca-red hover:text-feca-gold font-mono cursor-pointer underline"
            >
              {showQr ? "Masquer QR" : "Utiliser Google Auth"}
            </button>
          </div>

          {/* Simulated QR Code or OTP Input */}
          {showQr ? (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="flex flex-col items-center justify-center pb-4 text-center"
            >
              <div className="bg-white p-2.5 rounded-lg mb-2">
                {/* Simulated canvas grid drawing for a real barcode */}
                <div className="w-32 h-32 flex flex-wrap bg-slate-100 p-1 border border-slate-300 rounded gap-1.5 justify-center items-center">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-xs ${i % 3 === 0 || i % 4 === 1 ? 'bg-indigo-950' : 'bg-slate-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                Scannez cette clé avec Google Authenticator ou Duo Security pour synchroniser votre session Fecasavate avec Yaoundé.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {/* Verification Code fields */}
              <div className="flex justify-between gap-1.5">
                {code.map((num, i) => (
                  <input
                    key={i}
                    ref={(el) => { if (el) inputRefs.current[i] = el; }}
                    type="text"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={num}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center font-display font-extrabold text-lg text-slate-100 bg-slate-950 border border-slate-800 rounded-xl focus:border-feca-red focus:ring-1 focus:ring-feca-red transition-all shadow-inner outline-hidden"
                  />
                ))}
              </div>

              {/* Secure reminder widget */}
              <p className="text-[11px] text-center text-slate-400 border border-dashed border-rose-950/40 bg-rose-950/10 rounded-lg py-2">
                🔓 Entrez le code <span className="text-feca-gold font-mono font-bold">237486</span> pour simuler le scan de sécurité.
              </p>

              {/* Error messages */}
              {error && (
                <div className="p-2.5 bg-red-950/20 border border-feca-red/30 rounded-lg flex items-center gap-2 text-xs text-feca-red">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Success validation */}
              {success && (
                <div className="p-2.5 bg-emerald-950/30 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>2FA Validé. Synchronisation de la session de combat...</span>
                </div>
              )}

              {/* Resend actions */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-mono">
                  {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : 'Code expiré'}
                </span>
                
                <button
                  type="button"
                  disabled={timer > 0 || isResending}
                  onClick={handleResend}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    timer > 0 ? 'text-slate-600' : 'text-feca-gold hover:text-white'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                  <span>{isResending ? 'Renvoi en cours...' : 'Renvoyer le code'}</span>
                </button>
              </div>

              {/* Verification button */}
              <button
                type="button"
                onClick={verifyCode}
                className="w-full py-3 bg-gradient-to-r from-feca-red to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-display font-bold rounded-xl transition-all duration-300 shadow-xl shadow-red-950/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Vérifier l'Identité Fédérale</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
