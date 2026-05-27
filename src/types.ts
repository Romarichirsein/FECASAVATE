/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Discipline {
  id: string;
  name: string;
  description: string;
  rules: string;
  iconName: string;
  safetyLevel: string;
  duration: string;
  accentColor: string;
}

export interface PalmaresItem {
  id: string;
  year: number;
  title: string;
  athlete: string;
  location: string;
  medal: 'gold' | 'silver' | 'bronze' | 'none';
  category?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tag?: string;
}

export interface HeroFigure {
  name: string;
  contribution: string;
  role: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  imageUrl?: string;
  readTime: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  role: 'tireur' | 'coach' | 'dirigeant' | 'arbitre';
  gender: 'M' | 'F';
  category: 'Benjamin' | 'Senior' | 'Professionnel' | 'Legende';
  club?: string;
  specialty?: string;
  achievements?: string[];
  imageUrl: string;
}

export interface FightCardMatch {
  id: string;
  type: 'Finale Mondiale' | 'Ceinture Mondiale';
  category: string;
  contenders: {
    fighterA: string;
    flagA: string;
    rankA: string;
    fighterB: string;
    flagB: string;
    rankB: string;
  };
  details: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Equipement' | 'Tenue Officielle' | 'Billet' | 'Goodies';
  imageUrl: string;
  rating: number;
  inStock: boolean;
  isPopular?: boolean;
}

export interface UserSession {
  isLoggedIn: boolean;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  whatsapp?: string;
  is2Fastated?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  category: 'event' | 'alert' | 'formation' | 'boutique';
  isRead: boolean;
}
