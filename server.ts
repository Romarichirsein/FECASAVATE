/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import http from 'http';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';
const rootDir = process.cwd();

async function startServer() {
  const app = express();
  app.use(express.json());

  // Store active notifications dispatched in memory
  const recentNotifications: any[] = [
    {
      id: "init-1",
      title: "🥋 Bienvenue sur Fecasavate Live",
      content: "Connexion temps réel établie avec le serveur de flux de la Fédération Camerounaise de Savate.",
      category: "alert",
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    }
  ];

  // Restructure mock notification patterns
  const notificationTemplates = [
    {
      title: "🥊 Direct Combat: Elite Douala",
      content: "Mbah Jean-Claude remporte la finale nationale par K.O. technique au 3ème round face à Ndoumbe !",
      category: "event"
    },
    {
      title: "🎓 Formation Arbitres: Yaoundé 2026",
      content: "Les inscriptions pour le séminaire d'arbitrage de Savate Assaut sont officiellement ouvertes. 12 places subventionnées.",
      category: "formation"
    },
    {
      title: "🔥 Championnat du Monde: Dakar 2025",
      content: "Sélection officielle validée pour les 8 Lions Élite représentant le Cameroun aux d'Afrique de Savate combat.",
      category: "event"
    },
    {
      title: "🚨 Nouvelle réglementation de combat",
      content: "Mise à jour du règlement technique F.I.Ssav. pour la saison de Savate 2026. Téléchargez le mémo fédéral.",
      category: "alert"
    },
    {
      title: "🎖️ Hommage National aux Champions",
      content: "Cérémonie de remise des prix d'honneur d'Afrique à la Team Fecasavate de Yaoundé par le ministre des sports.",
      category: "event"
    },
    {
      title: "🛍️ Boutique: Lions Indomptables",
      content: "Nouveaux maillots officiels avec broderie traditionnelle et gants de boxe en cuir de savate homologués en stock.",
      category: "boutique"
    },
    {
      title: "🎓 Label Entraîneur Fédéral",
      content: "Session de formation d'Assistant Moniteur de Savate de niveau 1 disponible à Douala pour Juillet 2026.",
      category: "formation"
    }
  ];

  // Helper to create a new notification object from a template
  function generateNotification(template: typeof notificationTemplates[0]) {
    const notif = {
      id: `live-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: template.title,
      content: template.content,
      category: template.category,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    recentNotifications.unshift(notif);
    if (recentNotifications.length > 30) {
      recentNotifications.pop(); // limit size
    }
    return notif;
  }

  // 1. HTTP API ENDPOINTS
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  // Get current session state notifications
  app.get('/api/notifications', (req, res) => {
    res.json(recentNotifications);
  });

  // API to manual broadcast trigger
  app.post('/api/notifications/broadcast', (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Missing title, content, or category.' });
    }
    
    const notif = {
      id: `manual-${Date.now()}`,
      title,
      content,
      category,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    recentNotifications.unshift(notif);
    
    // Broadcast notification to all connected WebSockets
    broadcastToAll({
      type: 'NOTIFICATION_RECEIVED',
      payload: notif
    });

    res.json({ success: true, notification: notif });
  });

  // 2. CREATE INTEGRATED SERVER
  const server = http.createServer(app);

  // 3. ATTACH WEBSOCKET SERVER
  const wss = new WebSocketServer({ noServer: true });

  // Handle express server upgrades to websocket protocol
  server.on('upgrade', (request, socket, head) => {
    // Avoid upgrading Vite's HMR standard ports or web sockets if dev server is active
    if (request.url?.startsWith('/_vite/')) {
      return;
    }
    
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  const activeClients = new Set<WebSocket>();

  wss.on('connection', (ws: WebSocket) => {
    activeClients.add(ws);
    // console.log(`[WS] Client Connected. Total clients: ${activeClients.size}`);

    // Immediately send the client the current live notifications catalog as initialization
    ws.send(JSON.stringify({
      type: 'NOTIFICATIONS_INIT',
      payload: recentNotifications
    }));

    // Periodically send active client size or ping keepalive
    ws.send(JSON.stringify({
      type: 'PRESENCE_SYNC',
      payload: { activeUsers: activeClients.size }
    }));

    // Listen to messages from the client
    ws.on('message', (data: string) => {
      try {
        const message = JSON.parse(data);
        if (message.type === 'PING') {
          ws.send(JSON.stringify({ type: 'PONG' }));
        } else if (message.type === 'TRIGGER_MOCK_BROADCAST') {
          // Trigger a random template broadcast
          const randIdx = Math.floor(Math.random() * notificationTemplates.length);
          const newNotif = generateNotification(notificationTemplates[randIdx]);
          broadcastToAll({
            type: 'NOTIFICATION_RECEIVED',
            payload: newNotif
          });
        }
      } catch (err) {
        // Silent recovery
      }
    });

    ws.on('close', () => {
      activeClients.delete(ws);
      // console.log(`[WS] Client Disconnected. Total: ${activeClients.size}`);
      broadcastToAll({
        type: 'PRESENCE_SYNC',
        payload: { activeUsers: activeClients.size }
      });
    });

    ws.on('error', () => {
      activeClients.delete(ws);
    });

    // Notify others of updated presence count
    broadcastToAll({
      type: 'PRESENCE_SYNC',
      payload: { activeUsers: activeClients.size }
    });
  });

  // Helper: Broadcast payload to all WS clients
  function broadcastToAll(data: any) {
    const serialized = JSON.stringify(data);
    activeClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(serialized);
      }
    });
  }

  // 4. PERIODIC SIMULATION ENGINE (Push alert broadcast every 45s)
  const periodicAlertInterval = setInterval(() => {
    if (activeClients.size > 0) {
      const randIdx = Math.floor(Math.random() * notificationTemplates.length);
      const newNotif = generateNotification(notificationTemplates[randIdx]);
      broadcastToAll({
        type: 'NOTIFICATION_RECEIVED',
        payload: newNotif
      });
    }
  }, 45000);

  // 5. VITE MIDDLEWARE CONFIG
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production asset serving
    const distPath = path.join(rootDir, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Ensure cleanup on sudden container stop
  process.on('SIGTERM', () => {
    clearInterval(periodicAlertInterval);
    wss.close();
    server.close();
  });

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[FECASAVATE SERVER] Up and running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('[FECASAVATE SERVER] Initialization Failed:', error);
});
