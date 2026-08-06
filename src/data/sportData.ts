/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Discipline, PalmaresItem, TimelineEvent, HeroFigure, BlogArticle, Member, FightCardMatch, Product, AppNotification, GradeRecipient, OfficialExpert } from '../types';

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
    excerpt: 'La salle des fêtes de la mairie de Yaoundé 5 s’apprête à vibrer au rythme des combats lors de la finale du Championnat National, qui rassemblera les meilleurs jeunes talents et athlètes confirmés du pays...',
    content: '<p>La salle des fêtes de la mairie de Yaoundé 5 s’apprête à vibrer au rythme des combats lors de la finale du Championnat National Retour de la Série C et B, qui se tiendra le 7 juillet 2024 à partir de 10h30. Cet événement tant attendu rassemblera les meilleurs jeunes talents et athlètes confirmés du pays, offrant un spectacle sportif exceptionnel à ne pas manquer.</p><h4>Un Rendez-vous Sportif de Haut Niveau</h4><p>Ce championnat national est une occasion unique de voir en action les athlètes des catégories minimes, cadets, juniors et seniors. Chacune de ces catégories présente des compétiteurs qui ont montré des performances remarquables tout au long de l’année, se qualifiant ainsi pour cette finale prestigieuse.</p><h4>Programme de la Journée</h4><p>La journée débutera à 10h30 avec les premiers combats des minimes, suivis des catégories cadets, juniors et enfin seniors. Chaque match sera un véritable test de compétence, de stratégie et de résilience, promettant des duels palpitants et des retournements de situation.</p><h4>Les Catégories en Compétition</h4><ul><li><strong>Minimes</strong> : Les jeunes athlètes de cette catégorie sont l’avenir du sport. Leur énergie et leur passion pour la compétition seront à l’honneur.</li><li><strong>Cadets</strong> : Cette catégorie met en lumière les talents émergents, prêts à prouver leur valeur.</li><li><strong>Juniors</strong> : Les compétiteurs juniors offrent des combats dynamiques et techniques.</li><li><strong>Seniors</strong> : Les athlètes seniors apporteront une dose d’expérience et de maîtrise technique.</li></ul>',
    date: '18 Août 2020',
    category: 'Compétition Nationale',
    author: 'Fabrice Ngalieu',
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/2024/07/Sans-titre-1.jpg',
    readTime: '3 min'
  },
  {
    id: 'art2',
    title: 'Retour sur la Séance de Découverte en Savate Forme et Savate Défense du 16 Mars 2024',
    excerpt: 'Le 16 mars 2024, à partir de 16h30, une séance de découverte en Savate Forme et Savate Défense a eu lieu, offrant aux participants une introduction enrichissante à ces disciplines dynamiques...',
    content: '<p>Le 16 mars 2024, à partir de 16h30, une séance de découverte en Savate Forme et Savate Défense a eu lieu, offrant aux participants une introduction enrichissante à ces disciplines dynamiques. Organisée par des experts du domaine, cette session a attiré un large public, allant des novices curieux aux pratiquants confirmés souhaitant enrichir leurs connaissances et leurs compétences.</p><h4>Une Introduction à la Savate Forme</h4><p>La première partie de la séance était dédiée à la Savate Forme, une version de la savate axée sur le fitness et le bien-être. Cette discipline combine les techniques de la savate avec des exercices de cardio et de renforcement musculaire, offrant un entraînement complet et accessible à tous.</p><h4>Découverte de la Savate Défense</h4><p>La seconde partie de l’événement a mis l’accent sur la Savate Défense, une discipline orientée vers l’autodéfense. Les participants ont eu l’occasion d’apprendre des techniques de défense contre diverses attaques, en utilisant les mouvements de la savate de manière pragmatique et efficace.</p><h4>Un Événement Inclusif et Éducatif</h4><p>Les retours des participants ont été extrêmement positifs. Beaucoup ont exprimé leur satisfaction quant à la qualité de l’encadrement et à l’atmosphère motivante de la séance.</p>',
    date: '18 Août 2020',
    category: 'Initiation Grand Public',
    author: 'Fabrice Ngalieu',
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/2024/07/IMG_2310.jpg',
    readTime: '2 min'
  },
  {
    id: 'art3',
    title: '27ème Championnat Africain de Savate au Caire : Un Événement à Ne Pas Manquer',
    excerpt: 'Le monde de la savate s’apprête à vivre un événement majeur en 2024. Le 27ème Championnat Africain de Savate se tiendra au Caire, en Égypte, du 9 au 11 septembre 2024...',
    content: '<p>Le monde de la savate, cette discipline française de boxe pieds-poings, s’apprête à vivre un événement majeur en 2024. Le 27ème Championnat Africain de Savate se tiendra au Caire, en Égypte, du 9 au 11 septembre 2024. Cet événement promet de rassembler les meilleurs athlètes de savate du continent africain.</p><h4>Les Meilleurs Athlètes du Continent en Compétition</h4><p>Le Championnat Africain de Savate attirera les meilleurs athlètes du continent, venus défendre les couleurs de leur pays et concourir pour le titre de champion africain. Les compétiteurs se sont préparés pendant des mois, voire des années, pour cet événement.</p><h4>Un Programme Chargé et Diversifié</h4><p>Pendant trois jours, le championnat proposera un programme chargé avec des combats dans différentes catégories de poids et de niveaux. Les spectateurs pourront assister à des matchs éliminatoires, des demi-finales et des finales palpitantes. En plus des compétitions, des démonstrations et des ateliers seront organisés pour promouvoir la savate.</p><h4>Promouvoir la Savate en Afrique</h4><p>Cet événement est également une occasion importante pour promouvoir la savate en Afrique. La savate gagne en popularité sur le continent, et des événements comme celui-ci sont essentiels pour inspirer la prochaine génération de pratiquants.</p>',
    date: '18 Août 2020',
    category: 'International',
    author: 'Fabrice Ngalieu',
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/2020/08/yaounde-5-2.jpg',
    readTime: '2 min'
  },
  {
    id: 'art4',
    title: 'Ouverture des Salles de Sport de la Fecasavate : Un Nouveau Chapitre pour Tous',
    excerpt: 'La Fédération Camerounaise de Savate (Fecasavate) est ravie d’annoncer l’ouverture de ses salles de sport pour les enfants, les jeunes et les adultes...',
    content: '<p>La Fédération Camerounaise de Savate (Fecasavate) est ravie d’annoncer l’ouverture de ses salles de sport pour les enfants, les jeunes et les adultes. Nos installations sont désormais accessibles du lundi au samedi, de 06h30 à 21h00, et le dimanche, de 06h30 à 15h00.</p><h4>Horaires Étendus pour une Accessibilité Maximale</h4><p>Consciente de l’importance de rendre la savate accessible à tous, la Fecasavate a décidé d’ouvrir ses portes sur une large plage horaire. Cette initiative vise à permettre à chacun, quel que soit son emploi du temps, de profiter des bienfaits de la savate.</p><h4>Des Installations de Qualité</h4><p>Nos salles de sport sont équipées de matériel de haute qualité pour assurer un entraînement efficace et sécurisé. Que vous soyez débutant ou athlète confirmé, vous trouverez tout le nécessaire pour progresser dans votre pratique de la savate.</p><h4>Pour Tous les Niveaux et Tous les Âges</h4><p>La Fecasavate accueille des pratiquants de tous niveaux, des débutants aux athlètes de compétition. Des cours adaptés sont proposés pour les différentes tranches d’âge, garantissant une progression harmonieuse pour chaque pratiquant.</p>',
    date: '18 Août 2020',
    category: 'Vie Fédérale',
    author: 'Fabrice Ngalieu',
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/2020/08/LOGO-FCSDA-NEW.png',
    readTime: '2 min'
  },
  {
    id: 'art5',
    title: 'Restez concentrés pour les nouveaux articles de la Fédération',
    excerpt: 'Notre pôle de rédaction de la Fecasavate reste mobilisé pour les championnats nationaux de fin d’année. Activez vos notifications pour ne rien manquer...',
    content: '<p>Le pôle d’information Fecasavate travaille en continu avec le Ministère des Sports et de l’Éducation Physique (MINSEP) et la CRTV pour vous proposer des reportages détaillés, des vidéos d’entraînements à huis clos des athlètes nationaux, et des interviews exclusives de nos champions du monde d’Afrique Centrale.</p><p>Activez vos notifications sur notre site pour être averti instantanément des nouveaux communiqués sportifs, résultats de compétitions et actualités fédérales !</p>',
    date: '18 Août 2020',
    category: 'Annonce',
    author: 'Fabrice Ngalieu',
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/2025/05/WhatsApp-Image-2025-05-10-a-13.11.21_c1e312c6.jpg',
    readTime: '1 min'
  }
];

export const officialExperts: OfficialExpert[] = [
  {
    id: 'exp1',
    name: 'Me Patrick Timbert EVINA',
    title: 'Officiel Fédéral & Expert Technique International',
    role: 'Officiel Fédéral / Encadrant des Passages de Grade',
    diplomes: [
      'Boxe Française : BEES 1 – BPJEPS',
      'Kick Boxing, Boxe thaï, Pancrace : BPJEPS SPORTS DE CONTACT',
      'Lutte contact : BMF 2'
    ],
    palmares: [
      'Boxe Française : Champion de Belgique combat & Champion du monde vétéran',
      'Boxe anglaise : Champion de France militaire',
      'Kick Boxing : Champion du monde WFC et XFC',
      'Boxe thaï : Champion de France C1 pro Fight & Vice-champion du monde WFC',
      'Lutte contact : 4 X Champion de France & Champion d’Europe'
    ],
    imageUrl: '/images/patrick_evina.jpeg'
  }
];

export const gradeRecipients: GradeRecipient[] = [
  // GANT ROUGE
  {
    id: 'gr-rouge-1',
    name: 'NYEMECK NGASSA Miguel',
    grade: 'Gant Rouge',
    degree: '3ème degré (Couleur du gang Vert)',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/nyemeck_ngassa.jpeg',
    club: 'Ligue Régionale'
  },
  // GANT VERT
  {
    id: 'gr-vert-1',
    name: 'MANDENG YOUMBI Geovanne',
    grade: 'Gant Vert',
    degree: '1er degré',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/mandeng_youmbi.jpeg',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-vert-2',
    name: 'MFEGUE NDJESSA Christian',
    grade: 'Gant Vert',
    degree: '1er degré',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/mfegue_ndjessa.jpeg',
    club: 'Ligue Régionale'
  },
  // GANT BLEU
  {
    id: 'gr-bleu-1',
    name: 'MANDENG MASSE I Noé',
    grade: 'Gant Bleu',
    degree: '1er degré',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/mandeng_noe.jpeg',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-bleu-2',
    name: 'MANDENG MASSE II David',
    grade: 'Gant Bleu',
    degree: '1er degré',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/mandeng_david.jpeg',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-bleu-3',
    name: 'ETOUNDI Raymond Ludovic',
    grade: 'Gant Bleu',
    degree: 'Officiel',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    club: 'Ligue Régionale'
  },
  // GANT JAUNE
  {
    id: 'gr-jaune-1',
    name: 'TELLA FAHA Bertrand',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/tella_faha.jpeg',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-2',
    name: 'FOTSINE FOGANG Emmanuel',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/fotsine_fogang.jpeg',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-3',
    name: 'MENGUE Tristan',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-4',
    name: 'NGOCK Michel-Archange',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-5',
    name: 'WAFEU Théodore',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-6',
    name: 'NDONGO Alfred',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-7',
    name: 'NDZIE BOMBA Elisabeth',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/ndzie_bomba.jpeg',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-8',
    name: 'AYISSI BESSALA',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/ayissi_bessala.jpeg',
    club: 'Ligue Régionale'
  },
  {
    id: 'gr-jaune-9',
    name: 'NOUAGHUE KOAGNE Jean François',
    grade: 'Gant Jaune',
    date: '12 Juillet 2026',
    officiel: 'Me EVINA PATRICK',
    imageUrl: '/images/nouaghue_koagne.jpeg',
    club: 'Ligue Régionale'
  }
];

export const championsList: Member[] = [
  {
    id: 'm-evina',
    firstName: 'Patrick Timbert',
    lastName: 'EVINA',
    role: 'arbitre',
    gender: 'M',
    category: 'Legende',
    club: 'Direction Technique Fédérale',
    specialty: 'Officiel Fédéral & Expert Multi-disciplines',
    achievements: ['Encadrant du Passage de Grade Officiel du 12 Juillet 2026', 'Champion du Monde Vétéran Savate', '4x Champion de France & Champion d\'Europe Lutte Contact'],
    imageUrl: '/images/patrick_evina.jpeg',
    grade: 'Officiel Fédéral'
  },
  {
    id: 'm1',
    firstName: 'Akouan',
    lastName: 'Pharelle',
    role: 'tireur',
    gender: 'M',
    category: 'Professionnel',
    club: 'Académie de Savate de Yaoundé',
    specialty: 'Savate Combat & Pro',
    achievements: ['Champion du Monde Combat 2018 (Chine)', 'Champion du Monde Pro 2023 (Bulgarie)', 'Directeur Technique National'],
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80',
    grade: 'Gant d\'Argent'
  },
  {
    id: 'm-nyemeck',
    firstName: 'Miguel',
    lastName: 'NYEMECK NGASSA',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Combat',
    achievements: ['Récipiendaire Gant Rouge 3ème degré (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/nyemeck_ngassa.jpeg',
    grade: 'Gant Rouge 3°'
  },
  {
    id: 'm-mandeng-youmbi',
    firstName: 'Geovanne',
    lastName: 'MANDENG YOUMBI',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut & Combat',
    achievements: ['Récipiendaire Gant Vert 1er degré (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/mandeng_youmbi.jpeg',
    grade: 'Gant Vert 1°'
  },
  {
    id: 'm-mfegue',
    firstName: 'Christian',
    lastName: 'MFEGUE NDJESSA',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut',
    achievements: ['Récipiendaire Gant Vert 1er degré (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/mfegue_ndjessa.jpeg',
    grade: 'Gant Vert 1°'
  },
  {
    id: 'm-mandeng-noe',
    firstName: 'Noé',
    lastName: 'MANDENG MASSE I',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut',
    achievements: ['Récipiendaire Gant Bleu 1er degré (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/mandeng_noe.jpeg',
    grade: 'Gant Bleu 1°'
  },
  {
    id: 'm-mandeng-david',
    firstName: 'David',
    lastName: 'MANDENG MASSE II',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut',
    achievements: ['Récipiendaire Gant Bleu 1er degré (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/mandeng_david.jpeg',
    grade: 'Gant Bleu 1°'
  },
  {
    id: 'm-tella',
    firstName: 'Bertrand',
    lastName: 'TELLA FAHA',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut',
    achievements: ['Récipiendaire Gant Jaune (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/tella_faha.jpeg',
    grade: 'Gant Jaune'
  },
  {
    id: 'm-fotsine',
    firstName: 'Emmanuel',
    lastName: 'FOTSINE FOGANG MBONTSE MBA',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut',
    achievements: ['Récipiendaire Gant Jaune (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/fotsine_fogang.jpeg',
    grade: 'Gant Jaune'
  },
  {
    id: 'm-ndzie',
    firstName: 'Elisabeth',
    lastName: 'NDZIE BOMBA',
    role: 'tireur',
    gender: 'F',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut Féminin',
    achievements: ['Récipiendaire Gant Jaune (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/ndzie_bomba.jpeg',
    grade: 'Gant Jaune'
  },
  {
    id: 'm-ayissi',
    firstName: 'Ayissi',
    lastName: 'BESSALA',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut',
    achievements: ['Récipiendaire Gant Jaune (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/ayissi_bessala.jpeg',
    grade: 'Gant Jaune'
  },
  {
    id: 'm-nouaghue',
    firstName: 'Jean François',
    lastName: 'NOUAGHUE KOAGNE',
    role: 'tireur',
    gender: 'M',
    category: 'Senior',
    club: 'Ligue Régionale Fecasavate',
    specialty: 'Savate Assaut',
    achievements: ['Récipiendaire Gant Jaune (Passage de Grade du 12 Juillet 2026)'],
    imageUrl: '/images/nouaghue_koagne.jpeg',
    grade: 'Gant Jaune'
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
    imageUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&auto=format&fit=crop&q=80',
    grade: 'Gant d\'Argent'
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
    firstName: 'Bakadal',
    lastName: 'Mandeng',
    role: 'dirigeant',
    gender: 'M',
    category: 'Legende',
    club: 'Nfsmma-savate Yaoundé',
    specialty: 'Président FECASAVATE',
    achievements: ['Président de la FECASAVATE', '25 tournois disputés', '8 médailles obtenues', 'Négociateur des accords internationaux FISav'],
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/2024/07/CAMPAGNE-president.jpg'
  },
  {
    id: 'm9',
    firstName: 'Patricia',
    lastName: 'Eben',
    role: 'tireur',
    gender: 'F',
    category: 'Benjamin',
    club: 'GHT Douala',
    specialty: 'Savate Assaut',
    achievements: ['5 fois Championne du Tournoi de Douala', '5 médailles obtenues', '5 tournois disputés'],
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/2020/08/photo_2024-07-02_13-58-50.jpg'
  },
  {
    id: 'm10',
    firstName: 'Maxime Plaisir',
    lastName: 'Mbile',
    role: 'tireur',
    gender: 'M',
    category: 'Professionnel',
    club: 'National Fighting Yaoundé',
    specialty: 'Savate Pro & Combat',
    achievements: ['12 tournois nationaux et africains disputés', '9 médailles de Savate', '8 ans d\'expérience en Savate et Kick-boxing'],
    imageUrl: 'https://www.fecasavate.cm/wp-content/uploads/ultimatemember/3/profile_photo.jpg'
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
