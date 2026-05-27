/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Discipline, PalmaresItem, TimelineEvent, HeroFigure, BlogArticle, Member, FightCardMatch, Product, AppNotification } from '../types';

export const disciplines: Discipline[] = [
  {
    id: 'assaut',
    name: 'Savate Assaut',
    description: 'Une forme de boxe française de grande finesse technique basant l’évaluation uniquement sur la précision et l’esthétique des touches.',
    rules: 'Combat à la touche, sans puissance. Les tireurs sont jugés sur leurs qualités technico-tactiques. Durée : 3 rounds de 1min30s à 4 rounds de 2min. Tout impact lourd ou puissance excessive est sévèrement pénalisé. 3 avertissements = disqualification directe.',
    iconName: 'ShieldAlert',
    safetyLevel: 'Sécurité Maximale',
    duration: '3x1min30s à 4x2min',
    accentColor: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'combat',
    name: 'Savate Combat',
    description: 'L’intensité ultime de la boxe française où l’efficacité physique et morale est mise à l’épreuve.',
    rules: 'La recherche du hors-combat (K.O.) est officielle et autorisée. Les coups sont délivrés avec toute la force nécessaire. Réservé aux Juniors (18 ans min.) titulaires au minimum du Gant Jaune (ou 16 ans sous dérogation parentale stricte). Port des protections règlementaires obligatoire.',
    iconName: 'Swords',
    safetyLevel: 'Plein Contact',
    duration: '4 ou 5 rounds de 2min',
    accentColor: 'from-red-600 to-rose-600'
  },
  {
    id: 'pro',
    name: 'Savate Pro',
    description: 'La vitrine d’excellence professionnelle réunissant la rigueur de la savate et l’esprit combatif de prestige.',
    rules: 'Héberge la ligue de self-défense SUNAO en tant que discipline affinitaire d’Afrique Centrale. Format professionnel à grand spectacle, ceintures internationales et bourses significatives pour les athlètes d’élite.',
    iconName: 'Crown',
    safetyLevel: 'Élite / Professionnel',
    duration: '5 rounds de 2min',
    accentColor: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'forme',
    name: 'Savate Forme',
    description: 'La synergie parfaite de la gestuelle de boxe et du tempo musical pour entretenir son potentiel physique.',
    rules: 'Pratique aérobic en musique, sans aucune opposition ou contact physique. Ouvert à tous publics (mixte, juniors, séniors). Améliore le cardio-training, le tonus musculaire, la souplesse et la coordination motrice dans une dynamique bienveillante.',
    iconName: 'Music',
    safetyLevel: 'Zéro Contact / Fitness',
    duration: 'Séances de 45 à 60min',
    accentColor: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'defense',
    name: 'Savate Défense',
    description: 'Système moderne et pragmatique d’autodéfense issu de la savate historique de rue.',
    rules: 'Apprentissage de techniques réalistes d’esquive, de riposte et de neutralisation face à une agression armée ou à mains nues. Intègre une large dimension psychologique d’évaluation du danger par des scénarios de simulation en situation réelle.',
    iconName: 'Shield',
    safetyLevel: 'Réalisme Tactique',
    duration: 'Ateliers et Stages thématiques',
    accentColor: 'from-purple-600 to-violet-600'
  },
  {
    id: 'canne',
    name: 'Canne Combat',
    description: 'Le sport national français de percussion au moyen d’une canne en châtaignier hautement technique.',
    rules: 'Discipline d’escrime de combat manipulant une canne en bois de châtaignier de 95 cm de long (pesant 120 g). Le tireur doit effectuer des attaques codifiées et sauter ou fendre pour toucher l’adversaire tout en esquivant. Vitesse foudroyante.',
    iconName: 'Wand',
    safetyLevel: 'Technique avec Protections',
    duration: '3 rounds de 2min',
    accentColor: 'from-cyan-600 to-sky-500'
  }
];

export const historyTimeline: TimelineEvent[] = [
  {
    year: '1975',
    title: 'Grains d’origine',
    description: 'Introduction de la savate-kick boxing aux prémices camerounais par Maître Eric ESSISSIMA de retour de son cursus en France.',
    tag: 'Fondation'
  },
  {
    year: '1988',
    title: 'Un parrainage de Haute Couture',
    description: 'Organisation de la première grande rencontre intercontinentale France-Cameroun à Douala, sous le prestigieux parrainage du designer Paco Rabanne.',
    tag: 'International'
  },
  {
    year: 'Jusqu’en 1997',
    title: 'Sous l’aile de la FECABOXE',
    description: 'La savate et les disciplines pieds-poings se structurent en tant que sections spécialisées au sein de la grande Fédération Camerounaise de Boxe.',
    tag: 'Tutelle'
  },
  {
    year: 'Avril 1997',
    title: 'Création de la FECASAVATE',
    description: 'Naissance officielle de la Fédération Camerounaise de Savate et Disciplines Associées, emmenée par son premier président Emmanuel ESSISSIMA avec l’agrément ministériel provisoire.',
    tag: 'Institution'
  },
  {
    year: 'Janv - Fév 1999',
    title: 'Élevage de Champions',
    description: 'Grande tournée d’arbitrage international et de détection sportive menée à Douala et Yaoundé par Richard SYLLA, immense figure de la boxe française de l’équipe de France.',
    tag: 'Technique'
  },
  {
    year: 'Avril 1999',
    title: 'Double Or aux Championnats d’Afrique',
    description: 'Douala accueille les 2èmes Championnats d’Afrique de Savate. Le Cameroun s’impose avec deux ceintures sacrées : Daniel BISSOU (Poids super-légers) et Paul Blaise ATANGANA (Poids mi-lourds).',
    tag: 'Sacre'
  },
  {
    year: '2002',
    title: 'Agrément Définitif',
    description: 'Le Ministère des Sports octroie l’agrément définitif à la FECASAVATE, lui conférant le statut officiel régulateur national de la discipline.',
    tag: 'Légal'
  },
  {
    year: '2005',
    title: 'Exploit National contre la France',
    description: 'Choc majeur à Douala : l’équipe nationale du Cameroun bat la délégation française par un score mémorable de 3 victoires à 1.',
    tag: 'Victoire'
  },
  {
    year: '2015',
    title: 'Académie de Savate de Yaoundé',
    description: 'Création du centre de formation d’excellence au cœur de Yaoundé pour encadrer les jeunes talents et asseoir la relève sportive.',
    tag: 'Futur'
  },
  {
    year: '2026',
    title: 'Fédération des Champions',
    description: 'La FECASAVATE s’affirme comme l’une des fédérations d’arts martiaux les plus performantes, accumulant les titres continentaux et mondiaux.',
    tag: 'Aujourd’hui'
  }
];

export const historicVictories: PalmaresItem[] = [
  { id: 'v1', year: 2010, title: 'Vice-Champion du Monde Savate Assaut', athlete: 'Francis NTONÉ', location: 'Paris, France', medal: 'silver', category: 'Poids Moyens' },
  { id: 'v2', year: 2012, title: 'Coupe d’Afrique des Nations', athlete: 'Marie NGONO & Alain NDONGO', location: 'Afrique', medal: 'gold', category: '3 Ors, 2 Argents' },
  { id: 'v3', year: 2014, title: 'Championnat d’Europe open', athlete: 'Françoise NKOA', location: 'Belgique', medal: 'gold', category: 'Poids Légers' },
  { id: 'v4', year: 2014, title: 'Championnat d’Europe open', athlete: 'Joseph EBOGO', location: 'Belgique', medal: 'bronze', category: 'Poids Lourds' },
  { id: 'v5', year: 2016, title: 'Champion du Monde Savate Assaut', athlete: 'Serge NDJIKI', location: 'Rome, Italie', medal: 'gold', category: 'Poids Moyens' },
  { id: 'v6', year: 2016, title: 'Vice-Championne du Monde', athlete: 'Léonie NDZANA', location: 'Rome, Italie', medal: 'silver', category: 'Poids Plumes' }
];

export const worldPalmares: PalmaresItem[] = [
  ...historicVictories,
  { id: 'w1', year: 2018, title: 'Champion du Monde Savate Combat', athlete: 'Akouan Pharelle', location: 'Chine', medal: 'gold' },
  { id: 'w2', year: 2022, title: 'Champion du Monde Jr Savate Assaut (+ Meilleur combattant)', athlete: 'Wilson Akouan Pharelle', location: 'Bulgarie', medal: 'gold' },
  { id: 'w3', year: 2022, title: 'Vice-Championne du Monde Savate Assaut', athlete: 'Yanga Flora', location: 'Italie', medal: 'silver' },
  { id: 'w4', year: 2022, title: 'Médaille de Bronze Championnat du Monde', athlete: 'Halilou Hawa', location: 'Italie', medal: 'bronze' },
  { id: 'w5', year: 2023, title: 'Vice-Championne du Monde Savate Combat', athlete: 'Yanga Flora', location: 'France', medal: 'silver' },
  { id: 'w6', year: 2023, title: 'Champion du Monde Savate Pro', athlete: 'Akouan Pharelle', location: 'Bulgarie', medal: 'gold' },
  { id: 'w7', year: 2023, title: 'Championne d’Afrique par Équipe', athlete: 'Équipe Nationale du Cameroun', location: 'Yaoundé, Cameroun', medal: 'gold' },
  { id: 'w8', year: 2024, title: 'Championne d’Afrique générale', athlete: 'Équipe Nationale du Cameroun', location: 'Le Caire, Égypte', medal: 'gold' },
  { id: 'w9', year: 2025, title: 'Vice-Championne d’Afrique générale', athlete: 'Équipe Nationale du Cameroun', location: 'Sénégal', medal: 'silver' },
  { id: 'w10', year: 2025, title: 'Bronze Mondiaux Savate Combat (+ 2 Finalistes)', athlete: 'Délégation Cameroun', location: 'Bulgarie', medal: 'bronze' }
];

export const bigFigures: HeroFigure[] = [
  { name: 'Eric ESSISSIMA', contribution: 'Introduit la discipline au Cameroun dès 1975, forgeant le premier club pilote.', role: 'Père Fondateur' },
  { name: 'MANDENG BAKADAL', contribution: 'Président actuel de la Fédération, œuvrant pour le rayonnement administratif mondial de la boxe française.', role: 'Président du Conseil' },
  { name: 'Alain ICARE', contribution: 'Grand mécène historique, finançant les déplacements et passeports des jeunes tireurs vers les compétitions européennes et mondiales.', role: 'Donateur Majeur' },
  { name: 'Magloire ESSISSIMA', contribution: 'Icône des rings nationaux, ayant représenté les couleurs du Cameroun au cours de multiples finales de championnats du monde.', role: 'Champion Émérite' },
  { name: 'ZANGA MBOA Raphaël', contribution: 'Articule les stratégies de détection d’athlètes et gère le programme national d’entraînement de boxe française.', role: 'Directeur Technique National (DTN)' },
  { name: 'Arlette NGO NTEP', contribution: 'Force motrice de la discipline, présidant la commission de dynamisation et de promotion de la savate auprès de la gente féminine.', role: 'Chef de File Féminin' },
  { name: 'Parfait Guidel NDA MENGUISSA', contribution: 'Administrateur chevronné de la fédération, pilotant la communication et le secrétariat fédéral.', role: 'Secrétaire Général' }
];

export const blogArticles: BlogArticle[] = [
  {
    id: 'art1',
    title: 'Retour sur la Finale du Championnat National : Série C et B pour Minimes, Cadets, Juniors et Seniors',
    excerpt: 'La salle des fêtes de la mairie de Yaoundé 5 accueille les combats pour la finale nationale dans une ferveur inégalée...',
    content: 'La mythique salle des fêtes de la mairie de Yaoundé 5 s’est transformée en un chaudron bouillonnant à l’occasion de la grande finale nationale de Savate. Les séries C (assaut technique) et B (combat d’intensité moyenne) ont donné lieu à des affrontements de haute voltige. Chez les Minimes et Cadets, la vivacité gestuelle a impressionné le comité de sélection de la Fecasavate, tandis que les Seniors ont combattu avec un sens tactique aiguisé sous les applaudissements des familles et des officiels du Ministère des Sports.',
    date: '10 Avril 2026',
    category: 'Compétition Nationale',
    author: 'Fabrice Ngalieu',
    readTime: '4 min'
  },
  {
    id: 'art2',
    title: 'Séance d’initiation populaire Savate Forme et Savate Défense du 16 Mars 2024',
    excerpt: 'Retour sur le rassemblement à l’esplanade omnisports de Yaoundé pour découvrir la savate bien-être et sécurité...',
    content: 'Le samedi 16 mars 2024, à partir de 16h30, l’esplanade sportive de Yaoundé a vibré au son des basses énergisantes de l’initiation publique collective de Savate Forme. Plus d’une centaine de participantes et participants se sont réunis sous la houlette de coachs fédéraux certifiés. Au programme également : un atelier pratique de Savate Défense détaillant l’art stratégique de l’esquive et des dégagements face à des saisies d’agression, mettant en scène des jeux de rôles et une sensibilisation à l’attitude psychologique d’évitement du danger.',
    date: '18 Mars 2024',
    category: 'Initiation Grand Public',
    author: 'Fabrice Ngalieu',
    readTime: '3 min'
  },
  {
    id: 'art3',
    title: '27ème Championnat Africain de Savate au Caire : Succès et consécration continentale',
    excerpt: 'La savate camerounaise s’apprête à asseoir son leadership de fer en Égypte pour le sommet continental...',
    content: 'Les Lions Indomptables de la Savate ont foulé le sol du Caire (Égypte) pour y disputer les ceintures continentales lors d’une 27ème édition mémorable du Championnat d’Afrique. Menée par le champion du monde Akouan Pharelle et la médaillée mondiale Yanga Flora, la délégation camerounaise a remporté de multiples distinctions en assaut et combat, hissant le drapeau du Cameroun au sommet du classement général continental africain face à de redoutables tireurs nord-africains. Un triomphe fêté par la diaspora camerounaise locale.',
    date: '25 Janvier 2024',
    category: 'International',
    author: 'Fabrice Ngalieu',
    readTime: '5 min'
  },
  {
    id: 'art4',
    title: 'Ouverture des Salles d’Entraînement de la Fecasavate : Un Nouveau Chapitre',
    excerpt: 'La fédération annonce l’inauguration de structures d’entraînement modernes adaptées à tous les âges...',
    content: 'C’est officiel : la FECASAVATE a inauguré son tout nouveau pôle d’entraînement d’excellence à Yaoundé (Tropicana). Dotée de tapis de combat de haute densité, de sacs de frappe professionnels, et d’un ring surélevé conforme aux normes de la FISav (Fédération Internationale de Savate), cette salle accueillera désormais les séances quotidiennes des Lions Indomptables ainsi que des sections loisirs pour enfants, adolescents, et adultes désirant maintenir une forme athlétique irréprochable.',
    date: '14 Janvier 2024',
    category: 'Vie Fédérale',
    author: 'Fabrice Ngalieu',
    readTime: '3 min'
  },
  {
    id: 'art5',
    title: 'Restez concentrés pour les nouveaux articles de la Fédération',
    excerpt: 'Notre pôle de rédaction de la Fecasavate reste mobilisé pour les championnats nationaux de fin d’année...',
    content: 'Le pôle d’information Fecasavate travaille en continu avec le Ministère des Sports et de l’Éducation Physique (MINSEP) et la CRTV pour vous proposer des reportages détaillés, des vidéos d’entraînements à huis clos des athlètes nationaux, et des interviews exclusives de nos champions du monde d’Afrique Centrale. Activez vos notifications sur notre site pour être averti instantanément des nouveaux communiqués sportifs !',
    date: '02 Décembre 2023',
    category: 'Annonce',
    author: 'Fabrice Ngalieu',
    readTime: '2 min'
  }
];

export const championsList: Member[] = [
  {
    id: 'm1',
    firstName: 'Akouan',
    lastName: 'Pharelle',
    role: 'tireur',
    gender: 'M',
    category: 'Professionnel',
    club: 'Académie de Savate de Yaoundé',
    specialty: 'Savate Combat & Pro',
    achievements: ['Champion du Monde Combat 2018 (Chine)', 'Champion du Monde Pro 2023 (Bulgarie)'],
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm2',
    firstName: 'Yanga',
    lastName: 'Flora',
    role: 'tireur',
    gender: 'F',
    category: 'Professionnel',
    club: 'Club Léopard de Boxe Yaoundé',
    specialty: 'Savate Assaut & Combat',
    achievements: ['Vice-championne du Monde Assaut 2022 (Italie)', 'Vice-championne du Monde Combat 2023 (France)'],
    imageUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm3',
    firstName: 'Wilson',
    lastName: 'Akouan Pharelle',
    role: 'tireur',
    gender: 'M',
    category: 'Benjamin',
    club: 'Académie de Savate de Yaoundé',
    specialty: 'Savate Assaut de Précision',
    achievements: ['Champion du Monde Junior 2022 (Bulgarie)', 'Meilleur Combattant Universel du Tournoi 2022'],
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm4',
    firstName: 'Halilou',
    lastName: 'Hawa',
    role: 'tireur',
    gender: 'F',
    category: 'Senior',
    club: 'Académie Tropicana Yaoundé',
    specialty: 'Savate Assaut',
    achievements: ['Médaille de Bronze Mondiale 2022 (Italie)'],
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm5',
    firstName: 'MANDENG',
    lastName: 'BAKADAL',
    role: 'dirigeant',
    gender: 'M',
    category: 'Legende',
    club: 'Cabinet Fédéral Fecasavate',
    specialty: 'Président Fédéral',
    achievements: ['Président de la Fecasavate', 'Négociateur des accords internationaux FISav'],
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm6',
    firstName: 'Francis',
    lastName: 'NTONÉ',
    role: 'coach',
    gender: 'M',
    category: 'Legende',
    club: 'Club Elite Yaoundé 5',
    specialty: 'Entraîneur Assaut National',
    achievements: ['Vice-Champion du Monde 2010 (Paris)', 'Coach principal des Lions de la Savate'],
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm7',
    firstName: 'Arlette',
    lastName: 'NGO NTEP',
    role: 'dirigeant',
    gender: 'F',
    category: 'Legende',
    club: 'Commission Féminine Savate',
    specialty: 'Développement Féminin',
    achievements: ['Chef de File Féminin de la Fecasavate', 'Promotion de la Savate Forme en Afrique Centrale'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'm8',
    firstName: 'Parfait Guidel',
    lastName: 'NDA MENGUISSA',
    role: 'dirigeant',
    gender: 'M',
    category: 'Legende',
    club: 'Cabinet Fédéral Fecasavate',
    specialty: 'Secrétaire Général',
    achievements: ['Secrétaire Général Fédéral', 'Responsable de la Charte d’Éthique'],
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
  }
];

export const upcomingFights: FightCardMatch[] = [
  {
    id: 'f1',
    type: 'Finale Mondiale',
    category: 'Finale Mondiale de Savate - 48 KG',
    contenders: {
      fighterA: 'Yanga Flora',
      flagA: '🇨🇲 CMR',
      rankA: '#1 World Contender',
      fighterB: 'Helena Russo',
      flagB: '🇫🇷 FRA',
      rankB: 'Championne en titre'
    },
    details: 'Combat d’une importance capitale sous le direct parrainage de la Première Dame du Cameroun, S.E. Chantal BIYA. La conquête du trône absolu en -48 KG.'
  },
  {
    id: 'f2',
    type: 'Ceinture Mondiale',
    category: 'Rencontre Mondiale Savate-Pro - -65 KG',
    contenders: {
      fighterA: 'Akouan Pharelle',
      flagA: '🇨🇲 CMR',
      rankA: 'Champion du Monde Pro',
      fighterB: 'Dmitry Volkov',
      flagB: '🇧🇬 BUL',
      rankB: '#1 Challenger Pro'
    },
    details: 'Choc de géants de l’Afrique Centrale contre l’Europe de l’Est. La Ceinture Mondiale Prestige remise en jeu devant le public survolté du Palais des Sports.'
  }
];

export const productsList: Product[] = [
  { id: 'p1', name: 'Gants Officiels Savate Fecasavate - Cuir Premium', price: 45000, category: 'Equipement', imageUrl: 'https://images.unsplash.com/photo-1583473848882-f9a5bb7fd2ee?w=400&auto=format&fit=crop&q=80', rating: 5, inStock: true, isPopular: true },
  { id: 'p2', name: 'Chaussures Homologuées Savate FISav - Lions du Cameroun', price: 65000, category: 'Equipement', imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&auto=format&fit=crop&q=80', rating: 4.8, inStock: true },
  { id: 'p3', name: 'Maillot Officiel Équipe Nationale Savate Combat', price: 25000, category: 'Tenue Officielle', imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&auto=format&fit=crop&q=80', rating: 4.9, inStock: true, isPopular: true },
  { id: 'p4', name: 'Protection Tibias-Pieds Renforcée Pro Fecasavate', price: 18000, category: 'Equipement', imageUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335ee3?w=400&auto=format&fit=crop&q=80', rating: 4.5, inStock: true },
  { id: 'p5', name: 'Ticket Catégorie VIP - Finale Mondiale 29 Nov 2025', price: 20000, category: 'Billet', imageUrl: 'https://images.unsplash.com/photo-1555696958-c5049b866f6f?w=400&auto=format&fit=crop&q=80', rating: 5, inStock: true, isPopular: true },
  { id: 'p6', name: 'Ticket Catégorie Grand Public - Finale Mondiale 29 Nov 2025', price: 5000, category: 'Billet', imageUrl: 'https://images.unsplash.com/photo-1539758462368-5a630fe15a3c?w=400&auto=format&fit=crop&q=80', rating: 4.7, inStock: true },
  { id: 'p7', name: 'Gourde Isotherme Fecasavate Métal brossé', price: 8500, category: 'Goodies', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop&q=80', rating: 4.2, inStock: false },
  { id: 'p8', name: 'Protège-Dents Premium Save-Tech thermo-moulable', price: 6000, category: 'Equipement', imageUrl: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?w=400&auto=format&fit=crop&q=80', rating: 4.6, inStock: true }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'n1',
    title: '🏆 Grand Gala Mondial du 29 Nov 2025!',
    content: 'Les places pour la Finale Mondiale de Savate et la Ceinture Mondiale Savate Pro au Palais des Sports de Yaoundé sont officiellement ouvertes à la réservation.',
    timestamp: '27 Mai 2026 12:00',
    category: 'event',
    isRead: false
  },
  {
    id: 'n2',
    title: '🥋 Certification Fédérale d’Arbitrage',
    content: 'Félicitations aux 15 nouveaux arbitres régionaux certifiés d’Afrique Centrale ayant validé les examens vidéo pratiques.',
    timestamp: '26 Mai 2026 09:30',
    category: 'formation',
    isRead: false
  },
  {
    id: 'n3',
    title: '🥊 Lions Indomptables de la Savate',
    content: 'Un reportage exclusif sur la préparation intensive de nos tireurs masculins et féminins sera diffusé ce soir sur la chaîne nationale CRTVweb.',
    timestamp: '25 Mai 2026 18:00',
    category: 'alert',
    isRead: true
  }
];

export const partnersLogos = [
  { name: 'Fédération Internationale de Savate (FISav)', role: 'Gouvernance Mondiale' },
  { name: 'Confédération Africaine de Savate (CASav)', role: 'Gouvernance Continentale' },
  { name: 'Ministère des Sports et de l’Éducation Physique (MINSEP)', role: 'Tutelle Institutionnelle' },
  { name: 'Renaprov Finance', role: 'Soutien Financier Principal' },
  { name: 'Masoa', role: 'Équipementier Officiel' },
  { name: 'Royal FM (95.5 Yaoundé)', role: 'Partenaire Média Radio' },
  { name: 'Académie des Arts et Métiers', role: 'Partenaire Formation' },
  { name: 'Wellborne', role: 'Conseil Nutritionnel' }
];
