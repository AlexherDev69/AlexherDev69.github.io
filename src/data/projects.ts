/**
 * Projets présentés sur la page d'accueil, avec leur étude de cas.
 * L'ordre du tableau est l'ordre d'affichage.
 */

import { NBSP } from './portfolio';

interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ProjectVideo {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
}

interface ProjectFact {
  label: string;
  value: string;
}

interface ProjectLink {
  label: string;
  url: string;
}

interface ProjectChallenge {
  title: string;
  text: string;
}

type ShotFrame = 'phone' | 'tile';

type StageShot =
  | { kind: 'image'; frame: ShotFrame; image: ProjectImage; lead?: boolean }
  | { kind: 'video'; video: ProjectVideo; lead?: boolean };

type ProjectStage =
  | { kind: 'shots'; shots: StageShot[] }
  | { kind: 'window'; frames: ProjectImage[] }
  | { kind: 'extension'; menu: ProjectImage; popup: ProjectImage; banner: ProjectImage }
  | { kind: 'desktop'; back: ProjectImage; front: ProjectImage; side: ProjectImage };

export type GalleryFrame = 'phone' | 'tile' | 'wide' | 'short';

interface ProjectGallery {
  kind: 'images';
  frame: GalleryFrame;
  images: ProjectImage[];
  video?: ProjectVideo;
}

interface ProjectSocial {
  text: string;
  links: ProjectLink[];
  video?: ProjectVideo;
}

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  tint: string;
  tagline: string;
  highlights: ProjectFact[];
  stackSummary: string[];
  meta: ProjectFact[];
  problem?: string;
  solution: string;
  features: string[];
  challenges: ProjectChallenge[];
  result?: string;
  stack: string[];
  links: ProjectLink[];
  social?: ProjectSocial;
  stage: ProjectStage;
  gallery: ProjectGallery;
}

const PHONE_SIZE = { width: 540, height: 1206 };
const EASYDIET_SIZE = { width: 540, height: 1200 };
const WINDOW_SIZE = { width: 540, height: 648 };
const DESKTOP_SIZE = { width: 1600, height: 1000 };

const pasImage = (name: string, alt: string): ProjectImage => ({ src: `/assets/10000pas/${name}.webp`, alt, ...PHONE_SIZE });
const dietImage = (name: string, alt: string): ProjectImage => ({ src: `/assets/easydiet/${name}.webp`, alt, ...EASYDIET_SIZE });
const mirrorFrame = (index: number, alt: string): ProjectImage => ({ src: `/assets/mirrorMind/demo-${index}.webp`, alt, ...WINDOW_SIZE });
const crisisScreen = (name: string, alt: string): ProjectImage => ({ src: `/assets/5minutes/${name}.webp`, alt, ...DESKTOP_SIZE });

const pasPromo: ProjectVideo = {
  src: '/assets/10000pas/promo.mp4',
  poster: '/assets/10000pas/promo-poster.webp',
  label: `Vidéo promo de 10${NBSP}000 pas : objectif, point de départ, boucle, guidage, agenda et statistiques`,
  width: 540,
  height: 960,
};

const mate = {
  cover: { src: '/assets/mateApp/cover.webp', alt: 'Accueil : le rituel du jeudi entre membres du même niveau', width: 540, height: 958 },
  membership: { src: '/assets/mateApp/membership.webp', alt: 'Adhésion sur validation, un candidat sur trois accepté', width: 540, height: 979 },
  table: { src: '/assets/mateApp/table.webp', alt: 'Table du jeudi : six membres sélectionnés, date et lieu', width: 540, height: 1077 },
  profiles: { src: '/assets/mateApp/profiles.webp', alt: 'Profils sélectionnés du jour', width: 540, height: 1033 },
  profile: { src: '/assets/mateApp/profile.webp', alt: 'Profil détaillé pour lancer la conversation', width: 540, height: 996 },
} satisfies Record<string, ProjectImage>;

const keepture = {
  capture: { src: '/assets/keepture/capture.webp', alt: 'Capture et partage instantané de photos et vidéos', width: 383, height: 865 },
  groups: { src: '/assets/keepture/groups.webp', alt: 'Groupes créés avec ses proches', width: 389, height: 847 },
  albums: { src: '/assets/keepture/albums.webp', alt: "Albums partagés d'un groupe", width: 397, height: 831 },
  grid: { src: '/assets/keepture/grid.webp', alt: 'Les photos de tous les proches réunies dans un album', width: 382, height: 852 },
  reactions: { src: '/assets/keepture/reactions.webp', alt: 'Réactions sur une publication', width: 399, height: 845 },
} satisfies Record<string, ProjectImage>;

const letterboxd = {
  banner: { src: '/assets/boostforletterboxd/google-banner.webp', alt: 'Bannière Letterboxd en tête des résultats Google', width: 563, height: 220 },
  menu: { src: '/assets/boostforletterboxd/context-menu.webp', alt: 'Recherche Letterboxd par clic droit sur un texte sélectionné', width: 763, height: 488 },
  popup: { src: '/assets/boostforletterboxd/popup.webp', alt: "Réglages de l'extension", width: 369, height: 598 },
} satisfies Record<string, ProjectImage>;

export const projects: Project[] = [
  {
    slug: '10000-pas',
    title: `10${NBSP}000 pas`,
    kicker: 'Projet personnel · Application mobile',
    tint: '#EFDFCF',
    tagline: `Chaque jour, une boucle de marche générée autour de soi, calibrée sur les pas qu'il reste pour atteindre 10${NBSP}000.`,
    highlights: [
      { label: 'Lancement', value: 'Août 2026' },
      { label: 'Utilisateurs', value: 'Plus de 500' },
      { label: 'Plateforme', value: 'Android, iOS bientôt' },
    ],
    stackSummary: ['Flutter', 'Riverpod', 'MapLibre', 'TypeScript', 'Hono', 'Cloudflare Workers', 'OpenRouteService'],
    meta: [
      { label: 'Contexte', value: 'Projet personnel' },
      { label: 'Plateforme', value: 'Android, iOS bientôt' },
      { label: 'Rôle', value: 'Conception, développement, publication' },
      { label: 'Lancement', value: 'Août 2026, plus de 500 utilisateurs' },
    ],
    problem: `Marcher 10${NBSP}000 pas par jour, c'est surtout savoir où aller. On retombe vite sur le même trajet, sans savoir quelle distance il reste à couvrir pour boucler sa journée.`,
    solution: `10${NBSP}000 pas lit les pas déjà faits dans la journée et génère une boucle qui part de la position de l'utilisateur et couvre ce qu'il reste. Le parcours se suit en GPS, avec les points d'intérêt en chemin. Aucun compte, et l'historique reste sur le téléphone.`,
    features: [
      'Boucle de 1,5 km à 16 km calibrée sur les pas restants, régénérable, avec départ GPS ou choisi sur la carte.',
      'Guidage GPS avec vue navigation inclinée, notification et vignette picture-in-picture.',
      'Pas lus via Health Connect, avec le podomètre du téléphone en secours.',
      'Bilan de fin de balade, agenda avec séries, statistiques et export des données.',
    ],
    challenges: [
      { title: 'Génération de boucles', text: 'Un Worker Cloudflare (Hono) interroge OpenRouteService, écarte les routes nationales et élague les détours avant de noter chaque boucle candidate. Un labo local compare les résultats ville par ville.' },
      { title: 'Routage auto-hébergé', text: 'OpenRouteService tourne en Docker sur un VPS, avec un graphe couvrant la France, la Belgique, le Luxembourg, la Suisse et Monaco, et un service de secours.' },
      { title: 'Carte et navigation', text: 'MapLibre avec tracé animé et vue navigation inclinée qui suit le marcheur et la boussole, jusque dans la vignette picture-in-picture.' },
      { title: 'Données locales', text: "Agenda et statistiques en SQLite (Drift), état géré avec Riverpod. Aucune donnée de marche n'est envoyée à un serveur." },
      { title: 'Pilotage du produit', text: "Tableau de bord React des statistiques d'usage et des codes premium, ainsi que la publicité et les achats intégrés." },
      { title: 'Industrialisation', text: 'CI GitHub Actions, déploiement automatique du Worker, site vitrine 10000pas.app et vidéos promo en Remotion.' },
    ],
    result: "Lancée sur Google Play en août 2026, l'app a été portée par un tweet qui a fait le buzz sur X et adoptée par plus de 500 utilisateurs. Un produit mené seul de l'idée à la publication, avec des workflows d'IA agentique (Claude Code).",
    stack: ['Flutter', 'Dart', 'Riverpod', 'Drift (SQLite)', 'MapLibre', 'Health Connect', 'TypeScript', 'Hono', 'Cloudflare Workers', 'OpenRouteService', 'Docker', 'React', 'GitHub Actions'],
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=app.dixmillepas.dix_mille_pas' },
      { label: '10000pas.app', url: 'https://10000pas.app' },
    ],
    social: {
      text: `Une vidéo promo de 22 secondes, réalisée en code avec Remotion, pour présenter l'app. Un tweet sur 10${NBSP}000 pas a fait le buzz, et l'app a désormais son propre compte.`,
      links: [
        { label: 'Le tweet qui a buzzé', url: 'https://x.com/Alexher__/status/2097395931654090843' },
        { label: '@10000pasApp', url: 'https://x.com/10000pasApp' },
        { label: '10000pas.app', url: 'https://10000pas.app' },
      ],
      video: pasPromo,
    },
    stage: {
      kind: 'shots',
      shots: [
        { kind: 'image', frame: 'phone', image: pasImage('guidage', 'Guidage GPS sur la boucle, avec le prochain virage') },
        { kind: 'video', video: pasPromo, lead: true },
        { kind: 'image', frame: 'phone', image: pasImage('parcours', 'Boucle prête : distance, pas et durée estimés') },
      ],
    },
    gallery: {
      kind: 'images',
      frame: 'phone',
      video: pasPromo,
      images: [
        pasImage('objectif', "Choix de l'objectif de pas et du point de départ"),
        pasImage('type', "Choix du type d'itinéraire"),
        pasImage('parcours', 'Boucle prête avec distance, pas et durée'),
        pasImage('guidage', 'Guidage GPS pendant la balade'),
        pasImage('agenda', 'Agenda et séries'),
        pasImage('statistiques', 'Statistiques, pas par heure'),
      ],
    },
  },
  {
    slug: 'easydiet',
    title: 'EasyDiet',
    kicker: 'Projet personnel · Nutrition',
    tint: '#DCEBE2',
    tagline: 'Plan de repas sur mesure, liste de courses et suivi du poids. Entièrement hors ligne, sans compte, sans publicité.',
    highlights: [
      { label: 'Recettes', value: '96' },
      { label: 'Réseau', value: `100${NBSP}% hors ligne` },
      { label: 'Store', value: 'Google Play' },
    ],
    stackSummary: ['Flutter', 'Cubit', 'Drift (SQLite)', 'go_router', 'fl_chart', 'Clean Architecture'],
    meta: [
      { label: 'Contexte', value: 'Projet personnel' },
      { label: 'Plateforme', value: 'Android' },
      { label: 'Rôle', value: 'Conception, développement, publication' },
      { label: 'Statut', value: 'Publiée sur Google Play' },
    ],
    problem: 'Les applications de nutrition sérieuses sont presque toutes payantes, chargées de publicités et bloquées derrière un compte. Elles hébergent surtout des données de santé sensibles sur leurs serveurs.',
    solution: "EasyDiet fait tout le travail sur le téléphone. À partir d'un profil (poids, taille, objectif, activité), l'application calcule les besoins caloriques et compose le programme de repas, la liste de courses et le suivi de la progression. Aucune connexion, aucun compte, aucune donnée qui quitte l'appareil.",
    features: [
      "Plan de repas de la semaine selon le régime et les allergies, avec contrôle des macros et jusqu'à trois jours libres.",
      '96 recettes avec instructions pas à pas, batch cooking et mode cuisson guidé avec minuteurs.',
      'Liste de courses triée par rayon, qui garde les cases cochées quand une recette change.',
      "Suivi du poids avec graphique animé et projection de la date d'objectif.",
    ],
    challenges: [
      { title: 'Génération sous contraintes', text: `Un moteur sélectionne les recettes en respectant la cible calorique à 10${NBSP}% près, le régime, les allergènes et les exclusions, sans répétition dans la semaine, avec un mode économique qui partage les ingrédients.` },
      { title: 'Agrégation des courses', text: "Plus de 500 synonymes d'ingrédients normalisés, conversion d'unités (densités, poids par pièce) et fusion en une seule ligne par ingrédient." },
      { title: 'Architecture hors ligne', text: 'Clean Architecture, base Drift à 9 tables, injection GetIt et état géré avec Cubit. Aucun appel réseau.' },
      { title: 'Optimiseur de batch cooking', text: 'Entrelacement des étapes de préparation, cuisson et finition de plusieurs recettes pour cuisiner plusieurs jours en une session.' },
    ],
    result: `Une application complète et publiée, portée d'une app Kotlin native vers Flutter : une logique métier nutrition non triviale, 100${NBSP}% hors ligne et respectueuse de la vie privée.`,
    stack: ['Flutter', 'Dart', 'Cubit', 'Drift (SQLite)', 'GetIt', 'go_router', 'freezed', 'fl_chart', 'Clean Architecture'],
    links: [{ label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.easydiet.easydiet' }],
    social: {
      text: 'Un tweet sur EasyDiet a fait le buzz sur X.',
      links: [{ label: 'Le tweet qui a buzzé', url: 'https://x.com/Alexher__/status/2099571548377981087' }],
    },
    stage: {
      kind: 'shots',
      shots: [
        { kind: 'image', frame: 'phone', image: dietImage('recette', 'Fiche recette avec ses macros et ses ingrédients') },
        { kind: 'image', frame: 'phone', image: dietImage('tableau-de-bord', 'Tableau de bord : calories et macronutriments du jour'), lead: true },
        { kind: 'image', frame: 'phone', image: dietImage('poids', "Suivi du poids et date d'objectif projetée") },
      ],
    },
    gallery: {
      kind: 'images',
      frame: 'phone',
      images: [
        dietImage('accueil', "Accueil : plans personnalisés, courses automatiques, suivi calorique, tout hors ligne"),
        dietImage('allergies', 'Allergies et viandes exclues, prises en compte dans la génération du plan'),
        dietImage('apercu', 'Aperçu de la semaine générée, avec remplacement ou déplacement de chaque repas'),
        dietImage('tableau-de-bord', 'Tableau de bord : calories et macronutriments du jour, prochain repas'),
        dietImage('plan', 'Plan de la semaine avec le résumé des macros et les repas cochés'),
        dietImage('recettes', 'Bibliothèque de recettes filtrée par repas'),
        dietImage('recette', 'Fiche recette : macros, portions, temps de préparation et ingrédients'),
        dietImage('courses', 'Liste de courses triée par rayon, avec la progression des achats'),
        dietImage('poids', "Suivi du poids : courbe sur trois mois et date d'objectif projetée"),
      ],
    },
  },
  {
    slug: 'mateapp',
    title: 'MateApp',
    kicker: 'Mission client · Réseau social',
    tint: '#221F1C',
    tagline: 'Un cercle social sur sélection : chaque jeudi, une table de six membres choisis. Application mobile et back-office web.',
    highlights: [
      { label: 'Mission', value: 'Freelance, IDBUCKS' },
      { label: 'Plateformes', value: 'Android, iOS' },
      { label: 'Back-office', value: 'Next.js' },
    ],
    stackSummary: ['Flutter', 'Dart', 'Cubit', 'Next.js', 'Node.js'],
    meta: [
      { label: 'Contexte', value: 'Freelance, IDBUCKS' },
      { label: 'Plateforme', value: 'Android, iOS, web' },
      { label: 'Rôle', value: 'Développement mobile et back-office' },
      { label: 'Statut', value: 'Publiée sur les stores' },
    ],
    solution: "Application mobile de réseau social développée en Flutter, doublée d'un back-office Next.js pour gérer les contenus et les utilisateurs. Projet mené de la conception au déploiement, en lien direct avec le client et le CTO.",
    features: [
      'Adhésion sur validation : un candidat sur trois est accepté.',
      'Chaque jeudi, une table de six membres choisis, avec la date et le lieu.',
      'Profils sélectionnés du jour et profils détaillés pour lancer la conversation.',
      'Back-office Next.js pour la gestion des contenus et des membres.',
    ],
    challenges: [],
    stack: ['Flutter', 'Dart', 'Cubit', 'Next.js', 'Node.js'],
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.mateappes.mate&hl=fr' },
      { label: 'App Store', url: 'https://apps.apple.com/pt/app/mate-curated-social-circle/id6669137503?l=en-GB' },
    ],
    stage: {
      kind: 'shots',
      shots: [
        { kind: 'image', frame: 'tile', image: mate.cover },
        { kind: 'image', frame: 'tile', image: mate.table, lead: true },
        { kind: 'image', frame: 'tile', image: mate.profiles },
      ],
    },
    gallery: { kind: 'images', frame: 'tile', images: [mate.cover, mate.membership, mate.table, mate.profiles, mate.profile] },
  },
  {
    slug: 'keepture',
    title: 'Keepture',
    kicker: 'Mission client · Partage photo',
    tint: '#E6E1F4',
    tagline: 'Une messagerie photo pour réunir les photos et vidéos de ses proches dans des albums communs.',
    highlights: [
      { label: 'Mission', value: 'Freelance, IDBUCKS' },
      { label: 'Plateformes', value: 'Android, iOS' },
      { label: 'Technologie', value: 'React Native' },
    ],
    stackSummary: ['React Native', 'TypeScript'],
    meta: [
      { label: 'Contexte', value: 'Freelance, IDBUCKS' },
      { label: 'Plateforme', value: 'Android, iOS' },
      { label: 'Rôle', value: 'Développement mobile' },
      { label: 'Technologie', value: 'React Native' },
    ],
    solution: 'Keepture regroupe et organise les photos et vidéos de ses proches dans des albums communs. On peut aussi prendre et partager des photos en temps réel, et réagir à celles des autres : likes, commentaires et partages.',
    features: [
      'Capture et partage de photos et vidéos en temps réel.',
      'Groupes privés avec ses proches, façon messagerie photo.',
      'Albums communs pour regrouper et organiser les médias.',
      'Réactions sur chaque publication : likes, commentaires et partages.',
    ],
    challenges: [],
    stack: ['React Native', 'TypeScript'],
    links: [],
    stage: {
      kind: 'shots',
      shots: [
        { kind: 'image', frame: 'tile', image: keepture.capture },
        { kind: 'image', frame: 'tile', image: keepture.grid, lead: true },
        { kind: 'image', frame: 'tile', image: keepture.reactions },
      ],
    },
    gallery: { kind: 'images', frame: 'tile', images: [keepture.capture, keepture.groups, keepture.albums, keepture.grid, keepture.reactions] },
  },
  {
    slug: '5-minutes',
    title: '5 minutes',
    kicker: 'Projet cofondé · SaaS B2B avec IA',
    tint: '#E7E1D6',
    tagline: "Entraîner ses équipes à gérer une crise en cinq minutes face à une IA, puis les outiller le jour où elle arrive vraiment.",
    highlights: [
      { label: 'Scénarios', value: '250, sur 5 secteurs' },
      { label: 'Évaluation', value: 'Sur 100 points' },
      { label: 'IA', value: 'RAG souverain, Mistral' },
    ],
    stackSummary: ['React', 'Node.js', 'Python', 'FastAPI', 'Mistral', 'Qdrant', 'Docker'],
    meta: [
      { label: 'Contexte', value: "Cofondé avec Guillaume, fondateur d'IDBUCKS" },
      { label: 'Plateforme', value: 'Web, back-office et site vitrine' },
      { label: 'Modèle', value: 'SaaS B2B multi-entreprises' },
      { label: 'IA', value: 'RAG souverain, Mistral' },
    ],
    problem: "Une crise (cyberattaque, rappel produit, accident industriel, bad buzz) se joue dans les premières minutes. Les entreprises ont des procédures et un document unique d'évaluation des risques, mais ces documents restent rangés dans un dossier : les équipes ne s'entraînent presque jamais, et le jour venu personne ne sait qui prévenir ni par quoi commencer.",
    solution: "5 minutes couvre tout le cycle de la crise. Avant : chaque salarié s'entraîne sur une crise simulée par l'IA, adaptée à son secteur et ancrée dans les procédures de son entreprise, avec cinq minutes au chrono et une note sur 100. Pendant : un mode crise réelle transforme le plan d'action en checklist, alerte les contacts et coordonne l'équipe en direct. Après : rapport, archives et retour d'expérience sont générés automatiquement.",
    features: [
      "Onboarding conversationnel : l'IA interroge l'entreprise sur son activité puis génère des scénarios sur mesure, en plus d'un catalogue de 250 crises sur 5 secteurs (industrie Seveso, assurance, agroalimentaire, collectivités, BTP).",
      "Simulation de cinq minutes : l'IA incarne médias, autorités, salariés et réseaux sociaux avec un casting fixe, réagit à chaque décision et affiche en direct un verdict, un conseil de coach et l'évolution du score.",
      "Réponses à l'écrit ou à la voix, dictée transcrite par Voxtral, puis débrief PDF : points critiques, forces, recommandations immédiates et structurelles, analyse tour par tour.",
      "Bibliothèque de procédures : import de PDF versionnés, résumé automatique et assistant (Cmd+K) qui répond en citant le document et la page.",
      "Document unique (DUERP) : risques cotés en gravité et fréquence, plans d'action, unités de travail et filiales, export PDF et consultation par les salariés.",
      "Mode crise réelle : l'IA retrouve le risque du DUERP le plus proche et en tire une checklist horodatée, les contacts sont alertés par SMS et appel, l'équipe se coordonne par chat et visio, et un bandeau d'alerte s'affiche sur tous les écrans. À la clôture : rapport PDF, archive des pièces jointes et retour d'expérience rédigé par l'IA.",
      'Espace manager : entraînements planifiés par équipe ou par unité, statistiques individuelles et collectives, classement et exports PDF.',
    ],
    challenges: [
      { title: 'RAG souverain et hybride', text: "Embeddings bge-m3 calculés localement (vecteurs dense et lexical en un seul passage), fusion des résultats dans Qdrant auto-hébergé puis reranking. Sous un seuil de similarité, la réponse est signalée comme non sourcée. Données hébergées en Europe." },
      { title: 'Isolation multi-entreprises', text: "Chaque recherche vectorielle exige l'identifiant d'entreprise issu du jeton : sans lui, la requête échoue. Côté API, tout accès est filtré par entreprise, avec quatre rôles du salarié au super administrateur." },
      { title: 'Streaming de bout en bout', text: "Scénario, tours, assistant et indexation des procédures sont diffusés en SSE du service Python jusqu'au navigateur. Le verdict est extrait du JSON partiel avant le récit, et le temps de génération de l'IA est rendu au chrono." },
      { title: 'Une note digne de confiance', text: "La réactivité est calculée par le code, les procédures citées sont vérifiées contre les passages réellement retrouvés, les réponses bâclées plafonnent la note et l'évaluation finale ne peut pas contredire le coach." },
      { title: 'Temps réel', text: 'Mode crise synchronisé avec Socket.IO et Redis : présence sur plusieurs onglets, chat avec accusés de lecture, alertes SMS et vocales via Twilio.' },
      { title: 'Industrialisation', text: "Monorepo Turborepo (app, back-office, API, service IA, site Next.js), images Docker et CI/CD GitHub Actions qui ne redéploie que les apps modifiées, avec contrôle de santé sur VPS." },
    ],
    result: "Une plateforme SaaS complète, du site vitrine au back-office : environ 185 endpoints REST, 35 écrans, abonnements Stripe et 6 types de rapports PDF. Chaque simulation se conclut par une note sur 100 points (pertinence 35, communication 25, réactivité 20, procédures 20) et un débrief actionnable.",
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Tailwind CSS', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Redis', 'Stripe', 'Twilio', 'Python', 'FastAPI', 'Mistral', 'Voxtral', 'Qdrant', 'Turborepo', 'Docker', 'GitHub Actions'],
    links: [],
    stage: {
      kind: 'desktop',
      back: crisisScreen('simulation', 'Simulation 5 minutes : brief de crise, chrono et réponse du salarié'),
      front: crisisScreen('resultats', 'Résultats de la simulation : note de 71 sur 100 et détail par critère'),
      side: crisisScreen('cellule-de-crise', "Cellule de crise : checklist de la procédure, visio et chat d'équipe"),
    },
    gallery: {
      kind: 'images',
      frame: 'wide',
      images: [
        crisisScreen('tableau-de-bord', 'Tableau de bord : score moyen, progression et évolution des simulations'),
        crisisScreen('scenarios', "Bibliothèque de scénarios de crise adaptés au secteur de l'entreprise"),
        crisisScreen('simulation', 'Simulation en cours : brief de crise, chrono et réponse du salarié'),
        crisisScreen('simulateur', 'Le coach IA analyse la réponse, le score évolue en direct'),
        crisisScreen('resultats', 'Résultats de la simulation : note sur 100 et détail par critère'),
        crisisScreen('assistant', 'Assistant procédures : réponse sourcée avec le document et la page'),
        crisisScreen('document-unique', 'Document unique : risques cotés en gravité et fréquence'),
        crisisScreen('cellule-de-crise', "Cellule de crise : checklist horodatée, visio et chat d'équipe"),
        crisisScreen('synthese-crise', "Synthèse d'une crise clôturée : durée, étapes validées et participants"),
        crisisScreen('retex', "Retour d'expérience rédigé par l'IA après la crise"),
        crisisScreen('statistiques-equipe', "Statistiques d'équipe : évolution mensuelle et types de crises"),
      ],
    },
  },
  {
    slug: 'mirrormind',
    title: 'MirrorMind',
    kicker: 'Projet personnel · Outil desktop et IA',
    tint: '#15191C',
    tagline: "L'écran d'un téléphone Android diffusé en direct sur Windows, et piloté par Claude Code grâce à un serveur MCP.",
    highlights: [
      { label: 'Plateforme', value: 'Windows' },
      { label: "Outils exposés à l'IA", value: 'Plus de 15' },
      { label: 'Code', value: 'Open source' },
    ],
    stackSummary: ['Tauri 2', 'Rust', 'React 19', 'TypeScript', 'scrcpy', 'MCP SDK'],
    meta: [
      { label: 'Contexte', value: 'Projet personnel' },
      { label: 'Plateforme', value: 'Windows' },
      { label: 'Rôle', value: 'Conception et développement' },
      { label: 'Code', value: 'Open source' },
    ],
    problem: "Tester une app mobile en cours de développement est laborieux : configurer scrcpy à la main, jongler entre le téléphone et l'écran. Et un assistant comme Claude Code ne voit pas le téléphone : il ne peut ni tester une app, ni reproduire un vrai parcours utilisateur.",
    solution: "MirrorMind détecte le téléphone dès qu'il est branché et affiche son écran instantanément. Il expose surtout un serveur MCP qui donne à Claude Code des outils pour voir et agir : capture, tap, swipe, saisie, navigation, OCR. L'IA peut piloter et tester une app mobile en autonomie.",
    features: [
      'Stream automatique en USB, contrôle tactile, clavier et défilement depuis le PC, reconnexion automatique.',
      "Serveur MCP avec plus de 15 outils : capture, tap, swipe, saisie, deep links, arbre d'accessibilité, OCR, attente de texte.",
      'Son du téléphone, mode sans fil et copier-coller du PC vers le téléphone.',
      'Assistant de configuration par marque (Samsung, Xiaomi, Pixel), mini-lecteur, enregistrement vidéo et logcat en temps réel.',
    ],
    challenges: [
      { title: 'Protocole scrcpy bas niveau', text: 'Implémentation du protocole : trois sockets vidéo, audio et contrôle, paquets H.264 décodés par le matériel via WebCodecs dans la WebView.' },
      { title: 'Serveur MCP embarqué', text: "Un serveur Node autonome, dépendances natives comprises, livré dans l'installeur Tauri et résolu à l'exécution." },
      { title: 'API interne durcie', text: 'Écoute sur 127.0.0.1 uniquement, jeton persistant, protection contre le DNS rebinding, CORS strict, validation Zod et limitation de débit.' },
      { title: "Tauri plutôt qu'Electron", text: `Backend Rust et WebView2 : un installeur d'environ 5${NBSP}Mo et 30${NBSP}Mo de mémoire utilisée, là où l'équivalent Electron pèserait 150${NBSP}Mo.` },
    ],
    result: "Une application de bureau complète où Claude Code voit et pilote un vrai téléphone : debug visuel, tests d'app mobile, pair-programming. Architecture, sécurité, tests et releases menés de bout en bout.",
    stack: ['Tauri 2', 'Rust', 'React 19', 'TypeScript', 'Zustand', 'Tailwind CSS 4', 'WebCodecs', 'scrcpy', 'MCP SDK', 'Node.js', 'Zod'],
    links: [{ label: 'GitHub', url: 'https://github.com/AlexherDev69/MirrorMind' }],
    stage: {
      kind: 'window',
      frames: [
        mirrorFrame(1, 'MirrorMind : le téléphone Android affiché sur Windows'),
        mirrorFrame(2, ''),
        mirrorFrame(3, ''),
      ],
    },
    gallery: {
      kind: 'images',
      frame: 'wide',
      images: [
        mirrorFrame(1, 'Le téléphone détecté et diffusé sur Windows'),
        mirrorFrame(2, "Claude Code pilote l'application sur le téléphone"),
        mirrorFrame(3, 'Saisie et navigation depuis le PC'),
      ],
    },
  },
  {
    slug: 'boost-for-letterboxd',
    title: 'Boost for Letterboxd',
    kicker: 'Projet personnel · Extension Chrome',
    tint: '#1B1E22',
    tagline: 'Une extension Chrome qui remonte Letterboxd en tête des résultats Google pour les recherches de films.',
    highlights: [
      { label: 'Store', value: 'Chrome Web Store' },
      { label: 'Qualité', value: '63 tests unitaires' },
      { label: 'Accueil', value: "Validée par l'équipe Letterboxd" },
    ],
    stackSummary: ['TypeScript strict', 'esbuild', 'Vitest', 'Manifest V3'],
    meta: [
      { label: 'Contexte', value: 'Projet personnel' },
      { label: 'Plateforme', value: 'Chrome' },
      { label: 'Rôle', value: 'Conception, développement, publication' },
      { label: 'Accueil', value: "Validée par l'équipe Letterboxd" },
    ],
    problem: 'Letterboxd est la référence des cinéphiles, mais ses pages sont souvent enterrées dans Google, sous les plateformes de streaming et les agrégateurs.',
    solution: 'Une extension légère qui repère les recherches cinéma et remonte Letterboxd en tête, directement dans la page de résultats.',
    features: [
      'Une bannière animée avec un lien direct vers la recherche Letterboxd.',
      'Les résultats Letterboxd déjà présents remontés et mis en évidence.',
      "Une recherche par clic droit sur n'importe quel texte sélectionné, sur n'importe quel site.",
    ],
    challenges: [
      { title: 'Détection multilingue', text: 'Plusieurs signaux croisés (mots-clés en six langues, Knowledge Panel et catégories de Google) pour limiter les faux négatifs.' },
      { title: 'DOM dynamique', text: 'Google charge ses résultats en asynchrone : un MutationObserver temporisé retraite la page sans dupliquer les injections.' },
      { title: 'Qualité', text: "Architecture modulaire, TypeScript strict et 63 tests unitaires (Vitest et jsdom) sur la détection, l'injection et le stockage." },
      { title: 'Vie privée', text: 'Aucune donnée collectée, aucun traceur, permissions réduites au strict minimum.' },
    ],
    result: 'Une extension publiée sur le Chrome Web Store, maintenue et documentée : un produit navigateur maîtrisé de la conception à la publication.',
    stack: ['TypeScript strict', 'esbuild', 'Vitest', 'jsdom', 'Manifest V3', 'ESLint', 'Prettier'],
    links: [{ label: 'Chrome Web Store', url: 'https://chromewebstore.google.com/detail/boost-for-letterboxd/jfnkjbammnogkcfpflgobdjadmcbjigd' }],
    stage: { kind: 'extension', ...letterboxd },
    gallery: { kind: 'images', frame: 'short', images: [letterboxd.banner, letterboxd.menu, letterboxd.popup] },
  },
];
