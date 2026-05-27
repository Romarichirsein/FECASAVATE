/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateItem: <T>(item: T, field: keyof T) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive dictionary for all pages, headings, buttons, and visual labels
const TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {
    // Navbar
    'nav.accueil': 'Accueil',
    'nav.about': 'À Propos',
    'nav.blog': 'Blog',
    'nav.formation': 'Formation',
    'nav.palmares': 'Palmarès',
    'nav.champions': 'Champions',
    'nav.boutique': 'Boutique',
    'nav.contact': 'Contact',
    'nav.athlete_portal': 'Portail Athlète',
    'nav.member_space': 'Espace Membre',
    'nav.quit': 'Quitter',
    'nav.logout': 'Se déconnecter',
    'nav.login_register': "Se connecter / S'inscrire",
    'nav.sub_title': 'Fédération Camerounaise de Savate',
    'nav.esc': 'ESC POUR FERMER',

    // Footer
    'footer.partenaires_sub': 'Soutiens & Alliances Institutionnelles',
    'footer.partenaires_title': 'Organisations Partenaires de la Fecasavate',
    'footer.desc': "Institution officielle nationale agréée par le Ministère de l'Éducation Physique (MINSEP) pour le rayonnement, le développement, l'éthique et la formation d'élite de la savate (boxe française) au Cameroun et en Afrique Centrale.",
    'footer.legal': 'Mentions Légales',
    'footer.rgpd': 'RGPD / Protection des Données',
    'footer.dev': 'Développement :',
    'footer.arborescence': 'Arborescence',
    'footer.horaires': "Horaires d'Ouverture",
    'footer.siege': 'Siège National (Yaoundé)',
    'footer.mon_fri': 'Lundi – Vendredi :',
    'footer.sat_sun': 'Samedi – Dimanche :',
    'footer.nonstate': '07h00 – 19h00 (Non-stop)',
    'footer.forme_section': '09h00 – 15h00 (Section Forme)',
    'footer.lions_note': "L'équipe nationale s'entraîne à huis clos au Palais des Sports en dehors de ces tranches.",
    'footer.rights': '© 2026 FECASAVATE. Tous droits réservés.',
    'footer.affiliation': 'Affiliation : Fédération Internationale de Savate (FISav) • Confédération Africaine de Savate (CASav)',

    // Common countdown and videos
    'countdown.closing': "Billetterie d'urgence • Clôture imminente",
    'countdown.limited': 'Places Limitées',
    'countdown.days': 'Jours',
    'countdown.hours': 'Heures',
    'countdown.minutes': 'Min',
    'countdown.seconds': 'Sec',
    'countdown.tickets': 'Tarifs :',
    'countdown.sold': '94% des places déjà vendues',

    // Notification Center
    'notif.title': 'Alertes & Communiqués Actuels',
    'notif.empty': 'Aucune nouvelle notification pour le moment',
    'notif.read_all': 'Tout marquer comme lu',

    // Video Lightbox
    'lightbox.esc': 'ESC POUR FERMER',
    'lightbox.title': 'FECASAVATE TV',
    'lightbox.certified': "Diffusion en continu certifiée par l'ASS & la FISav.",

    // PAGE: Accueil
    'home.hero_tag': 'ART MARTIAL & EXCELLENCE CAMEROUNAISE',
    'home.hero_title_part1': "L'Énergie Sacrée de la",
    'home.hero_title_gold': 'Savate',
    'home.hero_title_part2': 'au Cameroun',
    'home.hero_desc': "Bienvenue sur le portail officiel de la FECASAVATE. Découvrez la boxe française : une discipline alliant esthétique, habileté tactique et détermination athlétique. Rejoignez nos clubs affiliés dès aujourd'hui.",
    'home.join_league': 'Rejoindre la Ligue',
    'home.watch_teaser': 'Regarder Teaser 2025',
    'home.teaser_btn': 'Lancer le Teaser 2025',
    'home.trailer_direct': 'Trailer Direct 🎥',
    'home.arena': 'Chaudron Yaoundé',
    'home.arena_desc': 'Arène du direct. Cliquez pour lancer.',
    'home.discipline_title': 'Explorez les Disciplines de la Savate',
    'home.discipline_sub': 'De la finesse de l’assaut technique au contact de combat professionnel, trouvez votre voie.',
    'home.safety': 'Sécurité :',
    'home.duration': 'Durée :',
    'home.fight_card_sub': 'CHOCS INTERNATIONAUX',
    'home.fight_card_title': 'Grands Combats & Titres Mondiaux 2025',
    'home.fight_card_desc': 'Découvrez la programmation officielle des finales mondiales de savate boxe française à Yaoundé.',
    'home.fight_card_gold': 'Teaser Officiel',
    'home.fight_card_choc': 'Choc Continentaux Elite',
    'home.fight_card_parrain': "S.E. Chantal BIYA parraine deux finales mondiales spectaculaires réunissant deux continents pour un titre unifié de Boxe Française. Un rendez-vous historique à Yaoundé.",
    'home.location': 'Lieu des combats',
    'home.palais_sports': 'Palais des Sports, Yaoundé 🇨🇲',
    'home.tickets_btn': 'Réserver vos tickets direct',
    'home.about_sub': 'VALEURS ET HISTOIRE',
    'home.about_title': 'Un demi-siècle de passion et de médailles',
    'home.about_desc': 'La savate camerounaise est une épopée d’abnégation, initiée par de grands maîtres et soutenue par des athlètes d’exception devenus champions mondiaux.',
    'home.about_link': 'Découvrir notre histoire',
    'home.newsletter_title': 'Restez informé de l’actualité de la Savate',
    'home.newsletter_sub': 'Inscrivez-vous à notre lettre d’information officielle pour ne manquer aucune compétition, annonce ou cours.',
    'home.newsletter_placeholder': 'Votre adresse e-mail...',
    'home.newsletter_btn': 'S’abonner',

    // PAGE: About
    'about.sub': 'L’INSTITUTION OFFICIELLE',
    'about.title': 'Fédération Camerounaise de Savate',
    'about.desc': "Régulée par le Ministère des Sports et affiliée à la FISav, la FECASAVATE encadre le développement éthique et technique de la boxe française du niveau amateur à l'élite mondiale.",
    'about.mission_title': 'Nos Missions Fondamentales',
    'about.mission_1_title': "Développement National",
    'about.mission_1_desc': "Promouvoir l'accès à la savate pour tous à travers nos ligues régionales au Cameroun.",
    'about.mission_2_title': "Formation Certifiée",
    'about.mission_2_desc': "Délivrer les diplômes d'État de juges-arbitres, entraîneurs et moniteurs fédéraux.",
    'about.mission_3_title': "Élite & Rayonnement",
    'about.mission_3_desc': "Préparer nos athlètes élites aux compétitions continentales et championnats mondiaux.",
    'about.timeline_title': 'Frise Historique de la Fecasavate',
    'about.org_title': 'Membres du Conseil & Dirigeants',
    'about.org_desc': 'Les visages et institutions qui guident l’avenir de la boxe française au Cameroun.',

    // PAGE: Blog
    'blog.sub': 'ACTUALITÉS & MÉDIAS',
    'blog.title': 'Le Journal de la Savate',
    'blog.desc': 'Découvrez les résumés officiels des compétitions, les annonces fédérales et les chroniques de formation.',
    'blog.search_placeholder': 'Rechercher une chronique...',
    'blog.empty': 'Aucune chronique ne correspond à votre recherche.',
    'blog.read_more': 'Lire l’article',
    'blog.author': 'Par',

    // PAGE: Formation
    'formation.sub': 'ACADÉMIE FECASAVATE',
    'formation.title': 'Programmes de Formations & Grades',
    'formation.desc': 'Fidèle aux directives de la FISav, apprenez les règles d’arbitrage, progressez dans les grades (gants) et devenez officiel certifié.',
    'formation.video_panel': 'Lecteur Vidéo Pédagogique',
    'formation.modules_title': 'Modules de Formation Théorique & Pratique',
    'formation.module_btn': 'Écran interactif',
    'formation.fullscreen_btn': 'Plein Écran',
    'formation.grades_title': 'La Progression des Grades (Gants)',
    'formation.grades_desc': 'Le passeport officiel de tout tireur pour progresser, s’évaluer puis accéder aux compétitions de combat.',

    // PAGE: Palmares
    'palmares.sub': 'TITRES ET DISTINCTIONS',
    'palmares.title': 'Le Temple de la Gloire',
    'palmares.desc': "Retrouvez la chronologie complète des médailles d'or, d'argent et de bronze récoltées par les tireurs camerounais à l'échelle internationale.",
    'palmares.highlights': 'Chocs Continentaux Récents',
    'palmares.search_placeholder': 'Rechercher un titre, un athlète, une année ou un pays...',
    'palmares.col_year': 'Année',
    'palmares.col_title': 'Titre / Compétition',
    'palmares.col_athlete': 'Athlète(s)',
    'palmares.col_location': 'Lieu',
    'palmares.col_medal': 'Médaille',
    'palmares.empty': 'Aucun palmarès ne correspond à votre recherche.',

    // PAGE: Champions
    'champions.sub': 'LIGUE D’ÉLITE',
    'champions.title': 'Les Champions & Athlètes de Légende',
    'champions.desc': 'Les fiertés de la nation camerounaise qui combattent au plus haut niveau mondial de boxe française.',
    'champions.search_placeholder': 'Rechercher un membre par nom, prénom ou style spécialité...',
    'champions.role_all': 'Tous les rôles',
    'champions.role_tireur': 'Tireurs',
    'champions.role_coach': 'Coaches & Entraîneurs',
    'champions.role_dirigeant': 'Dirigeants & Officiels',
    'champions.role_arbitre': 'Arbitres Internationaux',
    'champions.club': 'Club : ',
    'champions.specialty': 'Spécialité : ',
    'champions.achievements': 'Palmarès Majeur :',
    'champions.empty': 'Aucun membre ne correspond aux critères filtrés.',

    // PAGE: Boutique
    'boutique.sub': 'BOUTIQUE OFFICIELLE & SOUVENIRS',
    'boutique.title': 'Équipez-vous aux Couleurs de la Savate',
    'boutique.desc': 'Achetez vos places de gala officiel et procurez-vous les protections, tenues officielles et goodies approuvés par la commission fédérale.',
    'boutique.search_placeholder': 'Rechercher un produit...',
    'boutique.cat_all': 'Tous les articles',
    'boutique.cat_equipment': 'Équipement',
    'boutique.cat_outfit': 'Tenues Officielles',
    'boutique.cat_ticket': 'Billetterie Gala',
    'boutique.cat_goodies': 'Goodies Fédéraux',
    'boutique.order_success': 'Votre commande a été enregistrée avec succès ! Notre équipe commerciale vous contactera.',
    'boutique.add_to_cart': 'Ajouter au Panier',
    'boutique.stock': 'En stock',
    'boutique.out_of_stock': 'Rupture',
    'boutique.popular': 'Populaire',
    'boutique.empty': 'Aucun produit ne correspond à votre recherche.',

    // PAGE: Contact
    'contact.sub': 'REJOINDRE LA FÉDÉRATION',
    'contact.title': 'Contactez notre secrétariat fédéral',
    'contact.desc': 'Des questions sur les affiliations de clubs, les inscriptions de licences ou les stages de formation ? Écrivez-nous directement.',
    'contact.form_title': 'Formulaire d’administration directe',
    'contact.label_name': 'Nom & Prénom',
    'contact.label_email': 'Adresse E-mail',
    'contact.label_phone': 'Numéro WhatsApp / Téléphone',
    'contact.label_subject': 'Sujet du message',
    'contact.label_message': 'Détails de votre message',
    'contact.btn_send': 'Envoyer la demande d’affiliation',
    'contact.success': 'Votre message a été transmis avec succès au Secrétariat Général. Nous vous répondrons sous 24 heures.',

    // PAGE: Inscription (Espace Privé)
    'prive.title': 'Portail Privé Fecasavate',
    'prive.desc': 'Accédez à votre espace athlète pour gérer votre licence nationale, vérifier votre grade ou planifier vos examens de moniteur.',
    'prive.label_username': 'Nom d’utilisateur / Email',
    'prive.label_password': 'Mot de passe sécurisé',
    'prive.btn_login': 'Déverrouiller l’accès',
    'prive.sub_register': 'Besoin d’une licence officielle ?',
    'prive.btn_register': 'Soumettre un dossier d’inscription'
  },

  en: {
    // Navbar
    'nav.accueil': 'Home',
    'nav.about': 'About Us',
    'nav.blog': 'Blog',
    'nav.formation': 'Training',
    'nav.palmares': 'Records',
    'nav.champions': 'Champions',
    'nav.boutique': 'Store & Tickets',
    'nav.contact': 'Contact',
    'nav.athlete_portal': 'Athlete Portal',
    'nav.member_space': 'Member Space',
    'nav.quit': 'Quit',
    'nav.logout': 'Sign Out',
    'nav.login_register': 'Login / Register',
    'nav.sub_title': 'Cameroon Savate Federation',
    'nav.esc': 'ESC TO CLOSE',

    // Footer
    'footer.partenaires_sub': 'Supports & Institutional Alliances',
    'footer.partenaires_title': 'Fecasavate Partner Organizations',
    'footer.desc': 'Official national institution approved by the Ministry of Physical Education (MINSEP) for the influence, development, ethics and elite training of savate (French boxing) in Cameroon and Central Africa.',
    'footer.legal': 'Legal Notice',
    'footer.rgpd': 'GDPR / Data Protection',
    'footer.dev': 'Development:',
    'footer.arborescence': 'Sitemap',
    'footer.horaires': 'Opening Hours',
    'footer.siege': 'National Headquarters (Yaounde)',
    'footer.mon_fri': 'Monday – Friday:',
    'footer.sat_sun': 'Saturday – Sunday:',
    'footer.nonstate': '07:00 AM – 07:00 PM (Non-stop)',
    'footer.forme_section': '09:00 AM – 03:00 PM (Fitness Section)',
    'footer.lions_note': 'The national team trains behind closed doors at the Palais des Sports outside of these hours.',
    'footer.rights': '© 2026 FECASAVATE. All rights reserved.',
    'footer.affiliation': 'Affiliation: International Savate Federation (FISav) • African Savate Confederation (CASav)',

    // Common countdown and videos
    'countdown.closing': 'Urgent ticketing • Imminent closure',
    'countdown.limited': 'Limited Seats',
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Mins',
    'countdown.seconds': 'Secs',
    'countdown.tickets': 'Prices:',
    'countdown.sold': '94% of tickets already sold',

    // Notification Center
    'notif.title': 'Alerts & Current Announcements',
    'notif.empty': 'No new notifications for now',
    'notif.read_all': 'Mark all as read',

    // Video Lightbox
    'lightbox.esc': 'ESC TO CLOSE',
    'lightbox.title': 'FECASAVATE TV',
    'lightbox.certified': 'Continuous streaming certified by ASS & FISav.',

    // PAGE: Accueil
    'home.hero_tag': 'MARTIAL ART & CAMEROONIAN EXCELLENCE',
    'home.hero_title_part1': 'The Sacred Energy of',
    'home.hero_title_gold': 'Savate',
    'home.hero_title_part2': 'in Cameroon',
    'home.hero_desc': 'Welcome to the official FECASAVATE portal. Discover French boxing: a discipline combining aesthetic beauty, tactical skill, and athletic determination. Join our affiliated clubs today.',
    'home.join_league': 'Join the League',
    'home.watch_teaser': 'Watch 2025 Teaser',
    'home.teaser_btn': 'Launch 2025 Teaser',
    'home.trailer_direct': 'Direct Trailer 🎥',
    'home.arena': 'Yaounde Caldron',
    'home.arena_desc': 'Live Arena. Click to launch.',
    'home.discipline_title': 'Explore Savate Disciplines',
    'home.discipline_sub': 'From the finesse of technical assault to professional full-contact combat, find your path.',
    'home.safety': 'Safety Level:',
    'home.duration': 'Duration:',
    'home.fight_card_sub': 'INTERNATIONAL CLASHES',
    'home.fight_card_title': 'Grand Fights & World Titles 2025',
    'home.fight_card_desc': 'Discover the official programming of the world finals of savate French boxing in Yaounde.',
    'home.fight_card_gold': 'Official Teaser',
    'home.fight_card_choc': 'Elite Continental Clash',
    'home.fight_card_parrain': 'H.E. Chantal BIYA sponsors two spectacular world finals bringing together two continents for a unified title of French Boxing. A historic meeting in Yaounde.',
    'home.location': 'Combat Location',
    'home.palais_sports': 'Palais des Sports, Yaounde 🇨🇲',
    'home.tickets_btn': 'Book your live tickets',
    'home.about_sub': 'VALUES AND HISTORY',
    'home.about_title': 'A half-century of passion and medals',
    'home.about_desc': 'Cameroonian savate is an epic story of dedication, initiated by great masters and supported by exceptional athletes who became world champions.',
    'home.about_link': 'Discover our history',
    'home.newsletter_title': 'Stay informed of Savate news',
    'home.newsletter_sub': 'Subscribe to our official newsletter to never miss a competition, announcement, or class.',
    'home.newsletter_placeholder': 'Your email address...',
    'home.newsletter_btn': 'Subscribe',

    // PAGE: About
    'about.sub': 'THE OFFICIAL INSTITUTION',
    'about.title': 'Cameroon Savate Federation',
    'about.desc': 'Regulated by the Ministry of Sports and affiliated with FISav, FECASAVATE oversees the ethical and technical development of French boxing from amateur level to the world elite.',
    'about.mission_title': 'Our Core Missions',
    'about.mission_1_title': 'National Development',
    'about.mission_1_desc': 'Promote access to savate for all through our regional leagues in Cameroon.',
    'about.mission_2_title': 'Certified Training',
    'about.mission_2_desc': 'Deliver state diplomas for judges, referees, coaches and federal instructors.',
    'about.mission_3_title': 'Elite & Influence',
    'about.mission_3_desc': 'Prepare our elite athletes for continental competitions and world championships.',
    'about.timeline_title': 'Fecasavate Historical Timeline',
    'about.org_title': 'Board Members & Leaders',
    'about.org_desc': 'The faces and institutions guiding the future of French boxing in Cameroon.',

    // PAGE: Blog
    'blog.sub': 'NEWS & MEDIA',
    'blog.title': 'The Savate Journal',
    'blog.desc': 'Discover the official summaries of competitions, federal announcements and training chronicles.',
    'blog.search_placeholder': 'Search for a chronicle...',
    'blog.empty': 'No chronicle matches your search criteria.',
    'blog.read_more': 'Read Article',
    'blog.author': 'By',

    // PAGE: Formation
    'formation.sub': 'FECASAVATE ACADEMY',
    'formation.title': 'Training Programs & Grades',
    'formation.desc': 'Adhering to FISav directives, learn the rules of refereeing, progress through the grades (gloves) and become a certified official.',
    'formation.video_panel': 'Pédagogique Video Player',
    'formation.modules_title': 'Theoretical & Practical Training Modules',
    'formation.module_btn': 'Interactive Screen',
    'formation.fullscreen_btn': 'Full Screen',
    'formation.grades_title': 'Glove Grade Progression (Grades)',
    'formation.grades_desc': 'The official certificate of every fighter to progress, evaluate and then access combat competitions.',

    // PAGE: Palmares
    'palmares.sub': 'TITLES AND DISTINCTIONS',
    'palmares.title': 'The Hall of Fame',
    'palmares.desc': 'Find the complete timeline of gold, silver, and bronze medals swept by Cameroonian fighters at the international level.',
    'palmares.highlights': 'Recent Continental Highlights',
    'palmares.search_placeholder': 'Search for a title, athlete, year, or country...',
    'palmares.col_year': 'Year',
    'palmares.col_title': 'Title / Competition',
    'palmares.col_athlete': 'Athlete(s)',
    'palmares.col_location': 'Location',
    'palmares.col_medal': 'Medal',
    'palmares.empty': 'No achievements match your search criteria.',

    // PAGE: Champions
    'champions.sub': 'ELITE LEAGUE',
    'champions.title': 'Champions & Legendary Athletes',
    'champions.desc': 'The pride of the Cameroonian nation fighting at the highest world level of French boxing.',
    'champions.search_placeholder': 'Search for a member by name, first name or special style...',
    'champions.role_all': 'All roles',
    'champions.role_tireur': 'Fighters (Tireurs)',
    'champions.role_coach': 'Coaches & Instructors',
    'champions.role_dirigeant': 'Leaders & Officials',
    'champions.role_arbitre': 'International Referees',
    'champions.club': 'Club: ',
    'champions.specialty': 'Specialty: ',
    'champions.achievements': 'Core Records:',
    'champions.empty': 'No members match the filtered criteria.',

    // PAGE: Boutique
    'boutique.sub': 'OFFICIAL STORE & SOUVENIRS',
    'boutique.title': 'Gear Up in Savate Colors',
    'boutique.desc': 'Buy your official gala tickets, and get protectors, official outfits and goodies approved by the federal commission.',
    'boutique.search_placeholder': 'Search for a product...',
    'boutique.cat_all': 'All articles',
    'boutique.cat_equipment': 'Equipment',
    'boutique.cat_outfit': 'Official Outfits',
    'boutique.cat_ticket': 'Gala Tickets',
    'boutique.cat_goodies': 'Federal Goodies',
    'boutique.order_success': 'Your order has been recorded successfully! Our commercial team will contact you.',
    'boutique.add_to_cart': 'Add to Cart',
    'boutique.stock': 'In stock',
    'boutique.out_of_stock': 'Out of Stock',
    'boutique.popular': 'Popular',
    'boutique.empty': 'No product matches your search criteria.',

    // PAGE: Contact
    'contact.sub': 'JOIN THE FEDERATION',
    'contact.title': 'Contact our federal secretariat',
    'contact.desc': 'Questions about club affiliations, license registrations, or training sessions? Write to us directly.',
    'contact.form_title': 'Direct Administrative Form',
    'contact.label_name': 'Full Name',
    'contact.label_email': 'Email Address',
    'contact.label_phone': 'WhatsApp / Phone Number',
    'contact.label_subject': 'Message Subject',
    'contact.label_message': 'Details of your message',
    'contact.btn_send': 'Submit Affiliation Request',
    'contact.success': 'Your message has been successfully sent to the Secretariat General. We will answer within 24 hours.',

    // PAGE: Inscription (Espace Privé)
    'prive.title': 'Fecasavate Private Portal',
    'prive.desc': 'Access your athlete space to manage your national license, check your glove grade, or schedule your federal instructor exams.',
    'prive.label_username': 'Username / Email',
    'prive.label_password': 'Secure Password',
    'prive.btn_login': 'Unlock Access',
    'prive.sub_register': 'Need an official license?',
    'prive.btn_register': 'Submit Registration Dossier'
  },
};

// Direct translations maps for database items defined in sportData.ts
const SPORT_DATA_TRANSLATIONS: Record<Language, Record<string, string>> = {
  fr: {}, // Identity
  en: {
    // Disciplines names
    'Savate Assaut': 'Savate Assault',
    'Une forme de boxe française de grande finesse technique basant l’évaluation uniquement sur la précision et l’esthétique des touches.': 'A highly technical form of French boxing evaluating athletes exclusively on touches precision and elegance.',
    'Combat à la touche, sans puissance. Les tireurs sont jugés sur leurs qualités technico-tactiques. Durée : 3 rounds de 1min30s à 4 rounds de 2min. Tout impact lourd ou puissance excessive est sévèrement pénalisé. 3 avertissements = disqualification directe.': 'Touch-based combat, without power. Fighters are judged on tactical qualities. Duration: 3 rounds of 1min30s to 4 rounds of 2min. Heavy impacts are penalized. 3 warnings = direct disqualification.',
    'Sécurité Maximale': 'Maximum Safety',
    
    'Savate Combat': 'Savate Combat',
    'L’intensité ultime de la boxe française où l’efficacité physique et morale est mise à l’épreuve.': 'The ultimate intensity of French boxing where physical and mental efficacy is put to the test.',
    'La recherche du hors-combat (K.O.) est officielle et autorisée. Les coups sont délivrés avec toute la force nécessaire. Réservé aux Juniors (18 ans min.) titulaires au minimum du Gant Jaune (ou 16 ans sous dérogation parentale stricte). Port des protections règlementaires obligatoire.': 'Attempting knockout (K.O.) is official and permitted. Strikes delivered with full force. Reserved for Juniors/Seniors (18+) holding at least a Yellow Glove.',
    'Plein Contact': 'Full Contact',

    'Savate Pro': 'Savate Pro',
    'La vitrine d’excellence professionnelle réunissant la rigueur de la savate et l’esprit combatif de prestige.': 'The professional showcase uniting savate rigor and high-prestige combative spirit.',
    'Héberge la ligue de self-défense SUNAO en tant que discipline affinitaire d’Afrique Centrale. Format professionnel à grand spectacle, ceintures internationales et bourses significatives pour les athlètes d’élite.': 'Hosts the SUNAO self-defense league as an affiliate discipline in Central Africa. Spectator-oriented show format with international belts.',
    'Élite / Professionnel': 'Elite / Professional',

    'Savate Forme': 'Savate Fitness',
    'La synergie parfaite de la gestuelle de boxe et du tempo musical pour entretenir son potentiel physique.': 'The perfect synergy of boxing moves and musical tempo to maintain physical potential.',
    'Pratique aérobic en musique, sans aucune opposition ou contact physique. Ouvert à tous publics (mixte, juniors, séniors). Améliore le cardio-training, le tonus musculaire, la souplesse et la coordination motrice dans une dynamique bienveillante.': 'Aerobic practice to music, with zero opposition or physical contact. Open to all publics (mixed, juniors, seniors). Improves cardio-training and motor coordination.',
    'Zéro Contact / Fitness': 'Zero Contact / Fitness',

    'Savate Défense': 'Savate Defense',
    'Système moderne et pragmatique d’autodéfense issu de la savate historique de rue.': 'Modern pragmatical self-defense system derived from historical street savate.',
    'Apprentissage de techniques réalistes d’esquive, de riposte et de neutralisation face à une agression armée ou à mains nues. Intègre une large dimension psychologique d’évaluation du danger par des scénarios de simulation en situation réelle.': 'Learning realistic dodging, restriking, and neutralisation techniques against armed or bare-hand aggressions.',
    'Réalisme Tactique': 'Tactical Realism',

    'Canne Combat': 'Canne de Combat',
    'Le sport national français de percussion au moyen d’une canne en châtaignier hautement technique.': 'The French national sport of percussion using a highly technical chestnut cane.',
    'Discipline d’escrime de combat manipulant une canne en bois de châtaignier de 95 cm de long (pesant 120 g). Le tireur doit effectuer des attaques codifiées et sauter ou fendre pour toucher l’adversaire tout en esquivant. Vitesse foudroyante.': 'Combat fencing using a 95 cm chestnut cane (weighing 120g). Extremely fast speed.',
    'Technique avec Protections': 'Technical with Protection',

    // History Timeline events
    'Grains d’origine': 'Origins & Seeds',
    'Introduction de la savate-kick boxing aux prémices camerounais par Maître Eric ESSISSIMA de retour de son cursus en France.': 'Introduction of savate in Cameroon by Master Eric ESSISSIMA upon returning from his training in France.',
    'Un parrainage de Haute Couture': 'A High-Fashion Sponsorship',
    'Organisation de la première grande rencontre intercontinentale France-Cameroun à Douala, sous le prestigieux parrainage du designer Paco Rabanne.': 'Organisation of the first French-Cameroonian intercontinental clash in Douala, sponsored by Paco Rabanne.',
    'Sous l’aile de la FECABOXE': 'Under the FECABOXE wing',
    'La savate et les disciplines pieds-poings se structurent en tant que sections spécialisées au sein de la grande Fédération Camerounaise de Boxe.': 'Savate structured as specialized sections within the Cameroonian Boxing Federation.',
    'Création de la FECASAVATE': 'Creation of FECASAVATE',
    'Naissance officielle de la Fédération Camerounaise de Savate et Disciplines Associées, emmenée par son premier président Emmanuel ESSISSIMA avec l’agrément ministériel provisoire.': 'Official birth of the Cameroon Savate Federation, led by its first president Emmanuel ESSISSIMA.',
    'Élevage de Champions': 'Cultivating Champions',
    'Grande tournée d’arbitrage international et de détection sportive menée à Douala et Yaoundé par Richard SYLLA, immense figure de la boxe française de l’équipe de France.': ' الكبير لبعثة التحكيم والكشف led by Richard SYLLA, legend of Team France.',
    'Double Or aux Championnats d’Afrique': 'Double Gold at African Championships',
    'Douala accueille les 2èmes Championnats d’Afrique de Savate. Le Cameroun s’impose avec deux ceintures sacrées : Daniel BISSOU (Poids super-légers) et Paul Blaise ATANGANA (Poids mi-lourds).': 'Douala hosts 2nd African Championships. Cameroon takes two belts: Daniel BISSOU and Paul Blaise ATANGANA.',
    'Agrément Définitif': 'Definitive Approval',
    'Le Ministère des Sports octroie l’agrément définitif à la FECASAVATE, lui conférant le statut officiel régulateur national de la discipline.': 'Ministry of Sports grants definitive regulation approval to FECASAVATE.',
    'Exploit National contre la France': 'National Exploit vs France',
    'Choc majeur à Douala : l’équipe nationale du Cameroun bat la délégation française par un score mémorable de 3 victoires à 1.': 'Major clash in Douala: Team Cameroon defeats Team France with a memorable score of 3-1.',
    'Académie de Savate de Yaoundé': 'Yaounde Savate Academy',
    'Création du centre de formation d’excellence au cœur de Yaoundé pour encadrer les jeunes talents et asseoir la relève sportive.': 'Establishment of the excellence training academy in Yaounde to coach junior talent.',
    'Fédération des Champions': 'Federation of Champions',
    'La FECASAVATE s’affirme comme l’une des fédérations d’arts martiaux les plus performantes, accumulant les titres continentaux et mondiaux.': 'FECASAVATE establishes itself as one of the best performing federations, accumulating major titles.',

    // Board / Org Big Figures roles
    'Père Fondateur': 'Founding Father',
    'Introduit la discipline au Cameroun dès 1975, forgeant le premier club pilote.': 'Introduced the discipline in Cameroon in 1975, founding the first pilot club.',
    'Président du Conseil': 'Board President',
    'Président actuel de la Fédération, œuvrant pour le rayonnement administratif mondial de la boxe française.': 'Current President, working on the global administrative expansion of Cameroonian savate.',
    'Donateur Majeur': 'Major Sponsor',
    'Grand mécène historique, finançant les déplacements et passeports des jeunes tireurs vers les compétitions européennes et mondiales.': 'Historic patron, funding travel, visas and passports of young fighters to world tournaments.',
    'Champion Émérite': 'Emeritus Champion',
    'Icône des rings nationaux, ayant représenté les couleurs du Cameroun au cours de multiples finales de championnats du monde.': 'Icon of national rings, twice world championships silver medallist.',
    'Directeur Technique National (DTN)': 'National Technical Director (DTN)',
    'Articule les stratégies de détection d’athlètes et gère le programme national d’entraînement de boxe française.': 'Directs athlete scouts and manages the national French boxing training schemes.',
    'Chef de File Féminin': 'Female Division Leader',
    'Force motrice de la discipline, présidant la commission de dynamisation et de promotion de la savate auprès de la gente féminine.': 'Driving force of the discipline, boosting active participation in the female divisions.',
    'Secrétaire Général': 'General Secretary',
    'Administrateur chevronné de la fédération, pilotant la communication et le secrétariat fédéral.': 'Veteran administrator of the federation, steering all communications and administrative branches.',

    // Roles and categories
    'tireur': 'Fighter',
    'coach': 'Coach',
    'dirigeant': 'Official',
    'arbitre': 'Referee',
    'Benjamin': 'Junior',
    'Senior': 'Senior',
    'Professionnel': 'Professional',
    'Legende': 'Legend',

    // Products Categories
    'Equipement': 'Equipment',
    'Tenue Officielle': 'Official Apparel',
    'Billet': 'Gala Entry Ticket',
    'Goodies': 'Official Souvenirs',

    // Podiums
    'PODIUM SÉNÉGAL 2025': 'SENEGAL PODIUM 2025',
    'Or Général': 'General Gold 🥇',
    'Argent Général': 'General Silver 🥈',
    'Bronze Général': 'General Bronze 🥉',
    "Sacre de l'Afrique du Nord et Centrale": 'Northern & Central Africa Crown',
    'Événement majeur continental réunissant de multiples pays africains. La team Fecasavate des Lions Indomptables s’est hissée à un taux exceptionnel de réussite technique.': 'Major continental event gathering multiple nations. The Indomitable Lions team peaked at technical mastery.',
    'Sommet continental d’élite': 'Elite Continental Summit',
    'Finale Retour Nationale de Savate': 'National Savate Finals Return',
    'Le dimanche 07 Juillet à 10h30, les meilleurs athlètes nationaux et régionaux se sont livrés un combat de sélection intensive pour le pôle élite de Douala.': 'On July 7th, top national athletes fought intensive trial matches for the elite team.',
    'Coupe du Cameroun Déc 2022': 'Cameroon Cup Dec 2022',

    // Inscription forms elements
    'Licencié Actif': 'Active Licensee',
    'Arbitre Fédéral': 'Federal Referee',
    'Bénéficiaire VIP': 'VIP Beneficiary'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fec_lang');
    return (saved === 'fr' || saved === 'en') ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fec_lang', lang);
  };

  const t = (key: string): string => {
    const activeDict = TRANSLATIONS[language];
    if (activeDict && activeDict[key]) {
      return activeDict[key];
    }
    // Fallback to french
    const frDict = TRANSLATIONS['fr'];
    if (frDict && frDict[key]) {
      return frDict[key];
    }
    return key;
  };

  // Helper function to translate static items dynamically based on exact match or context
  const translateItem = <T,>(item: T, field: keyof T): string => {
    const value = String(item[field] || '');
    if (language === 'fr') return value;

    // Is there a pre-defined english translation for this line?
    const trMap = SPORT_DATA_TRANSLATIONS['en'];
    if (trMap && trMap[value]) {
      return trMap[value];
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateItem }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
