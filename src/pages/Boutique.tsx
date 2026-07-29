/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Eye, Trash, CheckCircle, ArrowRight, CreditCard, X, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { productsList } from '../data/sportData';
import { Product } from '../types';

export default function Boutique() {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const categories = ['all', 'Equipement', 'Tenue Officielle', 'Billet', 'Goodies'];

  const filteredProducts = productsList.filter(p => {
    return selectedCat === 'all' || p.category === selectedCat;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
    
    // Play sound chime
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); osc.type='sine';
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } catch(e){}
    
    // Auto open cart for confirmation feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const cartQty = cart.reduce((acc, item) => acc + item.qty, 0);

  const triggerCheckout = () => {
    setCheckingOut(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingOut(false);
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <div className="space-y-12 pb-16 px-4 max-w-7xl mx-auto font-sans relative">
      
      {/* 1. HERO HEAD */}
      <section className="text-center max-w-2xl mx-auto space-y-4 pt-10">
        <span className="text-xs uppercase tracking-widest text-feca-red font-semibold font-mono">
          Boutique Officielle de la Savate
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-slate-100 leading-tight">
          La Boutique des Lions
        </h1>
        <p className="text-slate-300 text-sm">
          Achetez vos billets officiels pour les Gala Mondiaux de Yaoundé, réservez vos gants homologués FISav, ou revêtez le maillot de l'équipe nationale.
        </p>
      </section>

      {/* 2. CATEGORY SELECTOR & CART TRIGGER SUMMARY */}
      <section className="bg-slate-900/60 border border-slate-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Categories scroll row */}
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                selectedCat === cat 
                  ? 'bg-feca-gold text-slate-950 font-black shadow-lg shadow-feca-gold/10' 
                  : 'bg-slate-950 border border-slate-850 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Tous les produits' : cat}
            </button>
          ))}
        </div>

        {/* Shopping Cart Trigger Summary Widget */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-feca-red text-slate-200 hover:text-white text-xs font-display font-bold flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center shadow-lg"
        >
          <ShoppingBag className="w-4 h-4 text-feca-red" />
          <span>Panier d'Achat</span>
          <span className="px-2 py-0.5 rounded-md bg-feca-red text-white text-[10px] font-mono font-bold">
            {cartQty}
          </span>
        </button>

      </section>

      {/* 3. PRODUCTS GRID */}
      <section>
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/30 border border-slate-800 border-dashed rounded-3xl">
            <p className="text-slate-500 text-sm">Aucun produit ne correspond à cette catégorie actuellement.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(p => (
              <div 
                key={p.id} 
                className="bg-feca-night border border-slate-850 hover:border-slate-700/80 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 relative shadow-xl"
              >
                {/* Popular badges */}
                {p.isPopular && (
                  <div className="absolute top-2.5 left-2.5 z-10 p-1 bg-feca-red text-white text-[8px] font-mono uppercase tracking-widest font-black rounded flex items-center gap-1 select-none">
                    <Sparkles size={8} className="animate-pulse" /> Popular
                  </div>
                )}

                {/* Cover Image Container */}
                <div className="aspect-square bg-slate-950 relative overflow-hidden">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-[10px] uppercase font-mono tracking-widest font-bold text-feca-red">
                      Rupture de Stock
                    </div>
                  )}
                </div>

                {/* Details card content */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none font-bold">
                      {p.category.toUpperCase()}
                    </span>
                    <h3 className="font-display font-black text-slate-150 text-xs sm:text-sm leading-tight mt-1 group-hover:text-feca-gold transition-colors duration-300 min-h-[38px] line-clamp-2 uppercase">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between border-t border-slate-900 pt-3">
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 leading-none">PRIX TTC</span>
                      <span className="font-mono text-xs sm:text-sm font-black text-white block mt-1">
                        {p.price.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={!p.inStock}
                      onClick={() => addToCart(p)}
                      className={`px-3 py-2 rounded-lg text-[10px] font-display font-black uppercase tracking-wider transition-all cursor-pointer ${
                        p.inStock 
                          ? 'bg-slate-950 hover:bg-slate-900 hover:text-feca-gold border border-slate-800 hover:border-feca-gold text-white' 
                          : 'bg-slate-950 text-slate-700 border border-slate-900 cursor-not-allowed'
                      }`}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. SHOPPING CART SIDEBAR PANEL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop layer */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
              onClick={() => setIsCartOpen(false)} 
            />

            {/* Sidebar window */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-sm bg-feca-night border-l border-slate-800 shadow-2xl flex flex-col h-full z-10"
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-feca-gold" />
                  <h3 className="font-display font-bold text-slate-100 uppercase tracking-wider text-sm">
                    Votre Sélection ({cartQty})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items row */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-slate-850/40">
                {cart.length === 0 ? (
                  <div className="py-20 text-center text-slate-500 text-xs">
                    Votre panier est actuellement vide.
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.product.id} className="pt-3.5 flex gap-3">
                      <div className="w-14 h-14 rounded-lg bg-slate-950 border border-slate-850 overflow-hidden shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-200 uppercase truncate">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-feca-gold font-mono block mt-0.5">
                          {item.product.price.toLocaleString('fr-FR')} FCFA x {item.qty}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[9px] text-slate-500 font-mono">
                            Subtotal : {(item.product.price * item.qty).toLocaleString('fr-FR')} FCFA
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[10px] text-slate-500 hover:text-feca-red hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Trash size={10} /> Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total footer values */}
              {cart.length > 0 && (
                <div className="p-4 bg-slate-950 border-t border-slate-850 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Total Net TTC :</span>
                    <span className="font-mono text-sm sm:text-base font-black text-white">
                      {cartTotal.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <button
                      onClick={clearCart}
                      className="py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Vider Panier
                    </button>
                    <button
                      onClick={triggerCheckout}
                      className="py-2.5 rounded-lg bg-feca-red hover:bg-rose-600 text-white font-display font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Commander</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. SECURE SIMULATIVE CHECKOUT MODAL WINDOW */}
      <AnimatePresence>
        {checkingOut && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs" onClick={() => setCheckingOut(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-md bg-feca-night border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-feca-gold shrink-0" />
                <h3 className="font-display font-black text-sm uppercase text-slate-100 tracking-wider">
                  Validation de la Réservation Fédérale
                </h3>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400 border-b border-slate-850 pb-3">
                <div className="flex justify-between text-white font-bold">
                  <span>Montant de la commande :</span>
                  <span className="font-mono">{cartTotal.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <p className="text-[10px] text-slate-500 italic mt-1 leading-relaxed">
                  * Note: Les commandes physiques et réservations VIP sont à récupérer au Cabinet Fédéral Tropicana ou envoyées par courrier sécurisé après paiement.
                </p>
              </div>

              {/* Simulated billing form fields */}
              <form onSubmit={handlePlaceOrder} className="space-y-3 font-sans">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">NOM COMPLET CLIENT</label>
                  <input
                    required
                    type="text"
                    placeholder="M. Romaric NGUEMI"
                    defaultValue="Romaric NGUEMI"
                    className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">NUMÉRO WHATSAPP D'EXPLOITATION</label>
                  <input
                    required
                    type="tel"
                    placeholder="+237 699 886 386"
                    className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold">TYPE DE LIVRAISON</label>
                  <select
                    className="w-full py-2 px-3 bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg outline-hidden"
                  >
                    <option>Récupération à Tropicana, Yaoundé</option>
                    <option>Envoi Postaux par Courrier National</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-feca-red to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-red-950/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Valider l'Achat Sécurisé</span>
                    <CheckCircle size={14} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. SUCCESS BANNER FOR PLACED ORDER */}
      <AnimatePresence>
        {orderPlaced && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backend-blur-2xs" onClick={() => setOrderPlaced(false)} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-sm bg-slate-900 border border-emerald-500/30 p-6 rounded-2xl shadow-2xl text-center space-y-4 z-10"
            >
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle size={24} className="animate-bounce" />
              </div>

              <div>
                <h3 className="font-display font-black text-slate-100 text-base uppercase">
                  Commande Transmise !
                </h3>
                <p className="text-xs text-slate-350 mt-1 font-sans leading-relaxed">
                  Votre réservation a été partagée avec les régulateurs Fecasavate VIP de Yaoundé. Un justificatif a été synchronisé. Notre equipe vous recontactera par Whatsapp très rapidement.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setOrderPlaced(false)}
                  className="px-5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs text-emerald-400 border border-emerald-500/20 transition-all cursor-pointer font-semibold"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
