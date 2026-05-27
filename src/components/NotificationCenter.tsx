/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Bell, X, Info, Zap, Calendar, ShoppingBag, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppNotification } from '../types';
import { initialNotifications } from '../data/sportData';

interface NotificationCenterProps {
  onNotificationCountChange?: (count: number) => void;
}

export default function NotificationCenter({ onNotificationCountChange }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<AppNotification[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const [activeSocketUsers, setActiveSocketUsers] = useState(1);
  const socketRef = React.useRef<WebSocket | null>(null);

  // Sync notification badge count to top level
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    if (onNotificationCountChange) {
      onNotificationCountChange(unreadCount);
    }
  }, [notifications, onNotificationCountChange]);

  // Establish live real-time WebSocket connection to server.ts backend
  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimer: any = null;
    let pingInterval: any = null;
    let isMounted = true;

    function connect() {
      if (!isMounted) return;

      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}`;
        socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          if (!isMounted) return;
          setSocketConnected(true);

          // Standard Keepalive to prevent router connection cutoff
          pingInterval = setInterval(() => {
            if (socket && socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ type: 'PING' }));
            }
          }, 25000);
        };

        socket.onmessage = (event) => {
          if (!isMounted) return;
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'NOTIFICATIONS_INIT') {
              // Server sent full historical log of messages
              setNotifications(data.payload);
            } else if (data.type === 'NOTIFICATION_RECEIVED') {
              // Broadcast item pushed from backend server
              triggerToast(data.payload);
            } else if (data.type === 'PRESENCE_SYNC') {
              // Active listener pool count updated
              setActiveSocketUsers(data.payload.activeUsers || 1);
            }
          } catch (e) {
            console.warn('WebSocket message parse error:', e);
          }
        };

        socket.onclose = () => {
          if (!isMounted) return;
          setSocketConnected(false);
          socketRef.current = null;
          if (pingInterval) clearInterval(pingInterval);
          
          // Exponential backoff reconnect
          reconnectTimer = setTimeout(connect, 3000);
        };

        socket.onerror = () => {
          if (socket) socket.close();
        };
      } catch (err) {
        if (!isMounted) return;
        setSocketConnected(false);
        reconnectTimer = setTimeout(connect, 4000);
      }
    }

    connect();

    return () => {
      isMounted = false;
      if (socket) socket.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (pingInterval) clearInterval(pingInterval);
    };
  }, []);

  const triggerToast = (notif: AppNotification) => {
    // Prevent duplicate entries in the scroll list
    setNotifications(prev => {
      if (prev.some(n => n.id === notif.id)) return prev;
      return [notif, ...prev];
    });

    setToasts(prev => {
      if (prev.some(t => t.id === notif.id)) return prev;
      return [...prev, notif];
    });

    // Play a gentle modern synthetic notification tone if enabled
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
        
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.4);
      } catch (e) {
        console.log('Audio Context block or unsupported:', e);
      }
    }

    // Auto-remove toast after 6 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== notif.id));
    }, 6000);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (category: string) => {
    switch (category) {
      case 'event': return <Calendar className="w-5 h-5 text-feca-gold" />;
      case 'alert': return <ShieldAlert className="w-5 h-5 text-feca-red" />;
      case 'formation': return <Zap className="w-5 h-5 text-indigo-400" />;
      case 'boutique': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      default: return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  // Allow manual alert dispatch in the UI for visitor testing of real-time engine
  const dispatchMockAlert = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      // Send a request to the WebSocket server to broadcast a new mock alert to EVERYONE connected!
      socketRef.current.send(JSON.stringify({ type: 'TRIGGER_MOCK_BROADCAST' }));
    } else {
      // Local fallback if disconnected
      const manualNotifs = [
        { title: '🥊 Nouvelle Fight-Card parrainée', content: 'S.E. Chantal BIYA assistera en direct au combat d’Akouan Pharelle au Palais des Sports de Yaoundé.', category: 'event' as const },
        { title: '🔒 Alerte Sécurité IP', content: 'Une tentative de connexion sécurisée bloquée depuis Douala par l’antivirus de la fédération 2FA.', category: 'alert' as const },
        { title: '🎓 Place Libre arbitrage', content: 'Il reste 3 places subventionnées pour la session de formation d’arbitre national Savate Combat.', category: 'formation' as const }
      ];
      const randomIndex = Math.floor(Math.random() * manualNotifs.length);
      const selected = manualNotifs[randomIndex];
      
      const notif: AppNotification = {
        id: `man-${Date.now()}`,
        title: selected.title,
        content: selected.content,
        timestamp: 'À l’instant',
        category: selected.category,
        isRead: false
      };

      triggerToast(notif);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* BELL HEADER TRIGGER */}
      <div className="relative">
        <button
          id="btn-bell-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2.5 rounded-full bg-feca-night border border-slate-800 text-slate-300 hover:text-feca-gold hover:border-feca-gold transition-all duration-300 cursor-pointer"
          title="Alertes Fédérales en temps réel"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-feca-red text-[11px] font-bold text-white ring-2 ring-feca-dark animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* SIDE-DRAWER NOTIFICATION CENTER */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop filter overlay to isolate view */}
              <div 
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" 
                onClick={() => setIsOpen(false)} 
              />
              
              <motion.div
                id="panel-notifications"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="absolute right-0 mt-3 w-96 max-w-[calc(100vw-2rem)] bg-feca-night border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
              >
                {/* Header widget */}
                <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-feca-gold" />
                    <h3 className="font-display font-semibold text-slate-100">Centre d'Alertes</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead} 
                        className="text-xs text-feca-gold hover:underline cursor-pointer"
                      >
                        Toujours Lu
                      </button>
                    )}
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sound Controls and Test Trigger */}
                <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={soundEnabled} 
                      onChange={(e) => setSoundEnabled(e.target.checked)}
                      className="rounded border-slate-700 text-feca-red bg-feca-dark focus:ring-feca-red"
                    />
                    Sons de combat ({soundEnabled ? 'Actifs' : 'Muet'})
                  </label>
                  <button 
                    onClick={dispatchMockAlert}
                    className="flex items-center gap-1 text-[10px] bg-red-950/40 border border-feca-red/40 hover:bg-feca-red/20 text-feca-red px-2 py-0.5 rounded cursor-pointer"
                  >
                    Simuler un Push 🥊
                  </button>
                </div>

                {/* Notifications list */}
                <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-800/60 font-sans">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">
                      Aucune notification pour le moment.
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`p-4 hover:bg-slate-800/40 transition-colors duration-200 cursor-pointer relative ${!notif.isRead ? 'bg-feca-red/5 border-l-2 border-feca-red' : ''}`}
                        onClick={() => {
                          setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
                        }}
                      >
                        <div className="flex gap-3">
                          <div className="mt-0.5 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                            {getIcon(notif.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className={`text-xs font-semibold text-slate-200 truncate ${!notif.isRead ? 'text-white font-bold' : ''}`}>
                                {notif.title}
                              </h4>
                              <button 
                                onClick={(e) => deleteNotification(notif.id, e)}
                                className="text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer"
                                title="Supprimer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                              {notif.content}
                            </p>
                            <span className="text-[9px] text-slate-500 mt-1 block font-mono">
                              {notif.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-4">
                  <div className="flex items-center gap-1.5">
                    <span id="socket-badge" className={`inline-block w-2 h-2 rounded-full ${socketConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'}`} />
                    <span className="text-[10px] text-slate-400 font-mono">
                      {socketConnected ? 'Flux FECASAVATE Live' : 'Reconnexion au flux...'}
                    </span>
                  </div>
                  <span id="users-badge" className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    {activeSocketUsers} {activeSocketUsers > 1 ? 'connectés' : 'connecté'}
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* FLOATING POPUP TOAST NOTIFICATIONS (PUSH SIMULATOR) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="pointer-events-auto bg-feca-night/95 backdrop-blur-lg border-2 border-feca-gold p-4 rounded-xl shadow-2xl flex gap-3.5 glow-card relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-feca-gold animate-pulse" />
              <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/60 shrink-0 select-none">
                {getIcon(toast.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-feca-gold uppercase font-mono tracking-wider font-semibold">
                    Alerte Push Live
                  </span>
                  <button
                    onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                    className="text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-xs font-bold text-slate-100 font-display mt-0.5">
                  {toast.title}
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 font-sans leading-relaxed">
                  {toast.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
