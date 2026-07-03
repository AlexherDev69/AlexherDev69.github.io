/**
 * Contenu du portfolio : édite ce fichier pour personnaliser le site.
 * Aucune donnée codée en dur dans les composants.
 */

export const profile = {
  name: 'Alexandre Hernandez',
  role: 'Développeur Full Stack',
  tagline:
    "Je conçois des applications web & mobiles rapides et bien pensées, avec un intérêt marqué pour les workflows d'IA agentique.",
  location: 'Lyon, France',
  email: 'alexhernandez.pro@gmail.com',
  available: true,
  bio: [
    "Développeur Full Stack avec 6 années d'expérience dans la conception et le développement d'applications web et mobiles, à la fois en salarié et en freelance indépendant pour de multiples clients.",
    "Récemment spécialisé dans les workflows d'IA agentique : création d'outils et d'automatisations basés sur l'IA (LLM / MCP). Je possède aussi un solide background en communication et gestion de projet, forgé dans le monde de l'Esport : joueur pro pendant 10 ans et organisateur d'événements pendant 4 ans.",
  ],
} as const;

export const socials = [
  { label: 'GitHub', url: 'https://github.com/AlexherDev69' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alexherpro/' },
  { label: 'Email', url: 'mailto:alexhernandez.pro@gmail.com' },
] as const;

export const stats = [
  { value: '6+', label: "Années d'expérience" },
  { value: '10+', label: 'Projets livrés' },
  { value: '10 ans', label: 'Carrière Esport pro' },
] as const;

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Mobile',
    items: ['Flutter', 'Cubit', 'React Native', 'Drift'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'PHP', 'REST API', 'Mongoose'],
  },
  {
    title: 'Data & Infra',
    items: ['MongoDB', 'Redis', 'Firebase', 'Docker', 'Vercel', 'CI/CD'],
  },
  {
    title: 'IA / LLM',
    items: ['Agentic AI (LLM / MCP)', 'RAG', 'LangChain', 'Qdrant'],
  },
  {
    title: 'Desktop',
    items: ['Tauri', 'Electron'],
  },
];

export type Experience = {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    company: 'IDBUCKS',
    role: 'Développeur Full Stack',
    type: 'Freelance',
    period: 'Depuis mars 2022',
    location: 'Lyon / Remote',
    highlights: [
      'Développement en autonomie complète sur plusieurs projets clients, de la conception au déploiement.',
      'MateApp : application mobile Android/iOS (Flutter) type réseau social + back-office Next.js.',
      'Keepture : application mobile Android/iOS (React Native) de partage de photos.',
      'Acqua Protection : plateforme web de gestion (Next.js) + application mobile professionnelle.',
      'Collaboration directe avec les clients et CTO, intégration depuis maquettes Figma.',
    ],
  },
  {
    company: 'Nicecactus',
    role: 'Développeur Full Stack & Gaming Project Manager',
    type: 'CDI',
    period: 'Mars 2018 à mars 2022',
    location: 'Sophia Antipolis',
    highlights: [
      "Développement d'une plateforme de tournois Esport (PHP, JavaScript) au sein d'une équipe de 10 développeurs.",
      'Conception et implémentation des fonctionnalités core de gestion des tournois.',
      'Gestion de projets événementiels Esport B2B/B2C.',
      'Relations partenaires : influenceurs, éditeurs de jeux, communautés.',
    ],
  },
];

export const education = {
  degree: 'BTS SIO',
  school: 'Lycée ICOF, Lyon',
  year: '2016',
} as const;

export const languages = ['Français (natif)', 'Anglais (bilingue)'] as const;

export type ProjectLink = { label: string; url: string };
export type ProjectChallenge = { title: string; description: string };
export type ProjectImage = { src: string; alt: string };

export type PortfolioProject = {
  slug: string;
  title: string;
  category: 'Pro' | 'Perso';
  context: string;
  tagline: string;
  problem?: string;
  solution?: string;
  features?: string[];
  challenges?: ProjectChallenge[];
  result?: string;
  highlight?: string;
  gallery?: ProjectImage[];
  // Clé d'une maquette HTML custom (ex: 'easydiet') affichée dans l'Aperçu à la
  // place d'une galerie d'images.
  preview?: string;
  stack: string[];
  links?: ProjectLink[];
};

/**
 * Projets présentés dans la page /projets (navigation un par un).
 * Ordre : projets professionnels d'abord, puis projets personnels.
 * Édite ce tableau pour ajouter/compléter un projet.
 */
export const portfolioProjects: PortfolioProject[] = [
  // ----- Projets professionnels -----
  {
    slug: 'mateapp',
    title: 'MateApp',
    category: 'Pro',
    context: 'Freelance chez IDBUCKS',
    tagline: 'Application mobile de réseau social (Android/iOS) avec back-office web.',
    solution:
      'Application mobile type réseau social développée en Flutter, doublée d\'un back-office Next.js pour la gestion des contenus et des utilisateurs. Projet mené de la conception au déploiement, en collaboration directe avec le client et le CTO.',
    stack: ['Flutter', 'Dart', 'Cubit', 'Next.js', 'Node.js'],
    gallery: [
      {
        src: '/assets/mateApp/cover.png',
        alt: 'Écran d\'accueil : le rituel du jeudi entre membres du même niveau.',
      },
      {
        src: '/assets/mateApp/membership.png',
        alt: "Sélection à l'entrée : adhésion validée, 1 candidat sur 3 accepté.",
      },
      {
        src: '/assets/mateApp/table.png',
        alt: 'Table du jeudi : événement avec 6 membres sélectionnés, date et lieu.',
      },
      {
        src: '/assets/mateApp/profiles.png',
        alt: 'Fil de profils sélectionnés du jour, avec la navigation principale.',
      },
      {
        src: '/assets/mateApp/profile.png',
        alt: "Profil détaillé : prompts et centres d'intérêt pour lancer la conversation.",
      },
    ],
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.mateappes.mate&hl=fr',
      },
      {
        label: 'App Store',
        url: 'https://apps.apple.com/pt/app/mate-curated-social-circle/id6669137503?l=en-GB',
      },
    ],
  },
  {
    slug: 'keepture',
    title: 'Keepture',
    category: 'Pro',
    context: 'Freelance chez IDBUCKS',
    tagline:
      'Messagerie photo pour regrouper, partager et commenter ses photos et vidéos avec ses proches, dans des albums communs.',
    solution:
      "Keepture est une application de messagerie photo qui permet de regrouper et d'organiser ses photos et vidéos avec celles de ses proches dans des albums communs. On peut aussi prendre et partager des photos et vidéos en temps réel, et réagir à celles de ses proches dans les albums (likes, commentaires et partages).",
    features: [
      'Capture et partage de photos et vidéos en temps réel.',
      'Groupes privés avec ses proches, façon messagerie photo.',
      'Albums communs pour regrouper et organiser les médias.',
      'Réactions sur chaque publication : likes, commentaires et partages.',
    ],
    gallery: [
      {
        src: '/assets/keepture/capture.png',
        alt: 'Capture et partage instantané de photos et vidéos.',
      },
      {
        src: '/assets/keepture/groups.png',
        alt: 'Messagerie photo : groupes créés avec ses proches.',
      },
      {
        src: '/assets/keepture/albums.png',
        alt: "Liste des albums partagés au sein d'un groupe.",
      },
      {
        src: '/assets/keepture/grid.png',
        alt: 'Regroupement des photos et vidéos de tous les proches dans un album.',
      },
      {
        src: '/assets/keepture/reactions.png',
        alt: 'Réactions sur une publication : likes, commentaires et partages.',
      },
    ],
    stack: ['React Native', 'TypeScript'],
  },
  {
    slug: 'acqua-protection',
    title: 'Acqua Protection',
    category: 'Pro',
    context: 'Freelance chez IDBUCKS',
    tagline: 'Plateforme web de gestion accompagnée d\'une application mobile professionnelle.',
    solution:
      'Plateforme web de gestion développée en Next.js, complétée par une application mobile professionnelle. Intégration depuis les maquettes Figma et livraison en autonomie complète.',
    stack: ['Next.js', 'Node.js', 'React Native', 'Figma'],
  },
  {
    slug: 'plateforme-esport-nicecactus',
    title: 'Plateforme de tournois Esport',
    category: 'Pro',
    context: 'CDI chez Nicecactus',
    tagline: 'Plateforme de tournois Esport à grande échelle, développée en équipe de 10.',
    solution:
      'Conception et implémentation des fonctionnalités core de gestion des tournois au sein d\'une équipe de 10 développeurs, en parallèle de la gestion de projets événementiels Esport B2B/B2C.',
    stack: ['PHP', 'JavaScript'],
  },

  // ----- Projets personnels -----
  {
    slug: 'boost-for-letterboxd',
    title: 'Boost for Letterboxd',
    category: 'Perso',
    context: 'Projet personnel, Extension Chrome',
    tagline: 'Extension Chrome qui remonte Letterboxd en tête des résultats Google.',
    highlight: 'Validée par l\'équipe Letterboxd en personne.',
    problem:
      'Letterboxd est la référence des cinéphiles, mais ses pages sont souvent enterrées dans les résultats Google, sous les plateformes de streaming et les agrégateurs. Il fallait scroller pour y accéder.',
    solution:
      'Une extension Chrome légère qui identifie les recherches cinéma et remonte Letterboxd en tête, directement dans la page de résultats.',
    features: [
      'Une bannière avec lien direct vers la recherche Letterboxd, animée en slide-in.',
      'Un boost visuel qui remonte et surligne les résultats Letterboxd déjà présents.',
      'Une recherche par clic droit sur n\'importe quel texte sélectionné, sur n\'importe quel site.',
    ],
    challenges: [
      {
        title: 'Détection multilingue robuste',
        description:
          'Un système à quatre sources de signaux (mots-clés en anglais, français, allemand, espagnol, italien, portugais, plus l\'analyse du Knowledge Panel et des category chips de Google) pour minimiser les faux négatifs.',
      },
      {
        title: 'Nettoyage de requête',
        description:
          'Suppression des mots-clés de détection et des mots parasites via des regex triées par longueur, pour envoyer à Letterboxd un titre propre.',
      },
      {
        title: 'Résilience au DOM dynamique',
        description:
          'Google charge ses résultats de façon asynchrone. Un MutationObserver débouncé (150 ms) retraite la page sans dégrader les performances ni dupliquer les injections.',
      },
      {
        title: 'Qualité et maintenabilité',
        description:
          'Architecture modulaire (content script, service worker, popup, storage), TypeScript en mode strict, et une suite de 63 tests unitaires (Vitest + jsdom) couvrant la détection, l\'injection et le stockage.',
      },
      {
        title: 'Respect de la vie privée',
        description:
          'Aucune donnée collectée, aucun tracker, aucune analytics. Les préférences sont stockées via chrome.storage.sync. Permissions réduites au strict minimum (contextMenus, storage).',
      },
    ],
    result:
      'Une extension publiée sur le Chrome Web Store, maintenue et documentée, illustrant la maîtrise de bout en bout d\'un produit navigateur (conception, développement, tests, publication).',
    stack: [
      'TypeScript (strict)',
      'esbuild',
      'Vitest + jsdom',
      'Chrome Extension Manifest V3',
      'ESLint',
      'Prettier',
    ],
    gallery: [
      {
        src: '/assets/boostforletterboxd/google-banner.png',
        alt: 'Bannière Letterboxd remontée en tête des résultats de recherche Google.',
      },
      {
        src: '/assets/boostforletterboxd/context-menu.png',
        alt: 'Recherche Letterboxd par clic droit sur un texte sélectionné, ici sur X.',
      },
      {
        src: '/assets/boostforletterboxd/popup.png',
        alt: "Popup de configuration de l'extension : fonctionnalités, langues et accessibilité.",
      },
    ],
    links: [
      {
        label: 'Chrome Web Store',
        url: 'https://chromewebstore.google.com/detail/boost-for-letterboxd/jfnkjbammnogkcfpflgobdjadmcbjigd',
      },
    ],
  },
  {
    slug: 'easydiet',
    title: 'EasyDiet',
    category: 'Perso',
    context: 'Projet personnel, application mobile',
    tagline:
      'Application Flutter de nutrition qui compose un plan de repas sur mesure, génère la liste de courses et suit la perte de poids. Entièrement hors ligne, sans compte, sans publicité.',
    highlight: 'Publiée sur le Google Play Store.',
    preview: 'easydiet',
    problem:
      "Les applications de nutrition sérieuses sont presque toutes payantes, saturées de publicités et bloquées derrière un compte en ligne. Elles hébergent surtout des données de santé sensibles sur leurs serveurs. Suivre un régime au quotidien ne devrait pas coûter sa vie privée.",
    solution:
      "EasyDiet fait tout le travail localement. À partir d'un profil (poids, taille, objectif, activité), l'application calcule les besoins caloriques et compose un programme de repas complet, la liste de courses associée et le suivi de la progression. Aucune connexion, aucun compte, aucune donnée qui quitte l'appareil.",
    features: [
      'Plan de repas personnalisé, généré selon la formule Mifflin-St Jeor et adapté au régime (omnivore, végétarien, vegan) et aux allergies.',
      'Plus de 90 recettes en photo, avec instructions pas à pas et mode cuisine intégré (minuteur). Cuisines française, indienne, japonaise, espagnole.',
      'Liste de courses automatique : ingrédients agrégés et triés par rayon de supermarché.',
      "Suivi du poids : graphiques d'évolution et projection de la date d'objectif au rythme actuel.",
    ],
    challenges: [
      {
        title: 'Génération sous contraintes',
        description:
          "Un moteur de ~940 lignes sélectionne les recettes en respectant une cible calorique à ±10 %, le régime, les allergènes et les viandes exclues, sans répétition dans la semaine, avec un mode économique qui maximise le partage d'ingrédients.",
      },
      {
        title: 'Agrégation des courses',
        description:
          "Normalisation de plus de 500 synonymes d'ingrédients, conversion d'unités (densités, poids par pièce) et fusion en une seule ligne par ingrédient, qu'il soit mesuré en grammes, millilitres ou pièces.",
      },
      {
        title: 'Architecture offline-first',
        description:
          'Clean Architecture (core + features en domain / data / presentation), base Drift / SQLite à 9 tables, injection GetIt et état géré au Cubit / Bloc. Zéro appel réseau.',
      },
      {
        title: 'Optimiseur de batch cooking',
        description:
          'Entrelacement des phases (préparation, cuisson, finition) entre plusieurs recettes pour cuisiner plusieurs jours en une seule session.',
      },
      {
        title: 'Design system Material 3',
        description:
          'Thème émeraude sur mesure, glassmorphism, animations et illustrations CustomPaint. Interface entièrement en français, pensée mobile.',
      },
      {
        title: 'Qualité et logique métier',
        description:
          'Tests unitaires sur le moteur nutritionnel, séparation stricte logique / UI, fichiers bornés et responsabilité unique par fonction.',
      },
    ],
    result:
      "Une application mobile complète et publiée : portage d'une app Kotlin native vers Flutter. De l'onboarding au suivi de poids, une logique métier nutrition non triviale, 100 % hors ligne et respectueuse de la vie privée. Conception, développement, tests et publication menés de bout en bout.",
    stack: [
      'Flutter',
      'Dart',
      'Cubit / Bloc',
      'Drift (SQLite)',
      'GetIt',
      'go_router',
      'Material 3',
      'fl_chart',
      'Clean Architecture',
    ],
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.easydiet.easydiet',
      },
    ],
  },
  {
    slug: 'mirrormind',
    title: 'MirrorMind',
    category: 'Perso',
    context: 'Projet personnel, application desktop + serveur MCP',
    tagline:
      "Application Windows qui détecte un téléphone Android branché en USB, diffuse son écran en temps réel et l'expose à Claude Code via un serveur MCP, pour que l'IA puisse voir et piloter le téléphone directement.",
    highlight: 'Application de bureau open source.',
    problem:
      "Tester et déboguer une app mobile en cours de développement est laborieux : configurer scrcpy à la main, jongler sans cesse entre le téléphone et l'écran. Et surtout, un assistant IA comme Claude Code ne voit pas le téléphone : il ne peut ni tester une app mobile, ni la déboguer visuellement, ni reproduire un parcours utilisateur réel.",
    solution:
      "MirrorMind détecte le téléphone dès qu'il est branché et affiche son écran instantanément (protocole scrcpy, décodage H.264 accéléré par le matériel). Surtout, il expose un serveur MCP qui donne à Claude Code des outils natifs pour voir et agir : capture d'écran, tap, swipe, saisie, navigation, OCR. L'IA devient capable de piloter et tester une app mobile en autonomie.",
    features: [
      "Stream automatique en USB : branché, l'écran apparaît instantanément. Contrôle tactile, clavier et scroll depuis le PC, reconnexion auto au débranchement.",
      "Serveur MCP « MirrorMind » : plus de 15 outils exposés à Claude Code (screenshot, tap, swipe, saisie, deep links, arbre d'accessibilité, OCR, attente de texte et batch d'actions).",
      'Audio, WiFi et presse-papier : son du téléphone forwardé en Opus, mode sans fil (adb TCP/IP + mDNS), copier-coller PC vers téléphone en un raccourci.',
      'Onboarding et confort : assistant par marque (Samsung, Xiaomi, Pixel), system tray, mini-player, always-on-top, enregistrement H.264 vers MP4 et logcat en temps réel.',
    ],
    challenges: [
      {
        title: 'Protocole scrcpy bas niveau',
        description:
          "Implémentation du wire protocol : nom d'appareil sur 64 octets, paquets [PTS + taille + H.264], trois sockets vidéo / audio / contrôle, et décodage matériel via WebCodecs directement dans la WebView.",
      },
      {
        title: 'Serveur MCP autonome embarqué',
        description:
          "Bundling d'un serveur Node self-contained (dépendances natives sharp, tesseract incluses) dans l'installeur Tauri, résolu au runtime via les resources. Le MCP fonctionne sans repo source.",
      },
      {
        title: 'API interne durcie',
        description:
          'Serveur HTTP lié à 127.0.0.1 uniquement, token 32 octets persistant, validation du Host contre le DNS-rebinding, CORS strict, validation Zod et rate limiting.',
      },
      {
        title: 'Pont IA vers téléphone',
        description:
          "Traduction des intentions de Claude en actions ADB / scrcpy : coordonnées en pourcentage, batch d'actions côté serveur, attente intelligente de changement d'écran, OCR de secours.",
      },
      {
        title: "Tauri plutôt qu'Electron",
        description:
          "Backend Rust + WebView2 : installeur ~5 Mo et ~30 Mo de RAM, là où l'équivalent Electron pèserait 150 Mo. Commandes async et events Tauri pour transporter les frames vidéo.",
      },
      {
        title: 'Robustesse temps réel',
        description:
          "Auto-reconnexion USB / WiFi, activation du tcpip séquencée avant le stream pour ne pas le couper, adaptation du ratio de fenêtre, et suppression des fenêtres console au runtime.",
      },
    ],
    result:
      "Une application de bureau complète : streaming Android en temps réel et intégration IA native. Claude Code peut voir et piloter un vrai téléphone (debug visuel, test d'app mobile, pair-programming). Architecture Rust + React + MCP, sécurité, tests et releases menés de bout en bout, jusqu'à l'installeur distribué.",
    gallery: [
      {
        src: '/assets/mirrorMind/MirrorMind-demo-1.5x.gif',
        alt: 'Démonstration de MirrorMind : Claude Code voit et pilote le téléphone Android en temps réel depuis Windows.',
      },
    ],
    stack: [
      'Tauri 2',
      'Rust',
      'React 19',
      'TypeScript',
      'Zustand',
      'Tailwind CSS 4',
      'WebCodecs',
      'scrcpy',
      'MCP SDK',
      'Node.js',
      'Zod',
      'pnpm',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/AlexherDev69/MirrorMind',
      },
    ],
  },
  {
    slug: '5-minutes',
    title: '5 minutes',
    category: 'Perso',
    context: 'Projet personnel, produit SaaS B2B piloté par IA',
    tagline:
      "Tester en 15 minutes le sang-froid d'un dirigeant face à la crise.",
    solution:
      "Un dirigeant est mis en situation de crise simulée. Une IA joue le scénario, s'adapte en temps réel à chaque décision, mesure le temps de réaction et note la performance sur une grille de 100 points. À la sortie : un débrief actionnable, pas une note en l'air.",
    features: [
      'Cadrage : choix du secteur et du type de crise (sanitaire, cyber, RH, réputation, environnement).',
      "Scénario généré par l'IA, ancré dans des cas réels grâce au RAG.",
      'Boucle sous pression sur 8 à 10 tours : réponses chronométrées et crise qui évolue selon les décisions.',
      'Débrief complet : scores par critère et rapport PDF téléchargeable.',
    ],
    challenges: [
      {
        title: 'RAG souverain',
        description:
          "L'IA cite les procédures internes de l'entreprise avec source et numéro de page. Recherche hybride dense et lexicale (fusion RRF), hébergement en Europe, conforme RGPD.",
      },
      {
        title: 'Multi-tenant B2B',
        description:
          'Isolation par entreprise, espaces équipe, rôles admin et superadmin, statistiques agrégées.',
      },
      {
        title: 'Scénarios adaptatifs',
        description:
          "L'IA ajuste chaque situation aux réponses du dirigeant, en s'inspirant de cas réels (Lactalis, Lubrizol, France Télécom).",
      },
      {
        title: 'Rapports PDF',
        description:
          "Débrief de simulation, DUERP et statistiques d'équipe générés à la volée, avec des noms de fichiers normalisés.",
      },
      {
        title: 'Dictée vocale',
        description:
          "Réponses à l'oral transcrites en temps réel via Voxtral, pour coller à la réalité d'une cellule de crise.",
      },
      {
        title: 'Industrialisé',
        description:
          'Monorepo Turborepo, conteneurisation Docker, CI/CD GitHub Actions et déploiement sur VPS.',
      },
    ],
    result:
      'Chaque simulation débouche sur une évaluation sur 100 points (pertinence 35, communication 25, réactivité 20, procédures 20) et un rapport PDF actionnable.',
    stack: [
      'React',
      'TypeScript',
      'Tailwind',
      'Vite',
      'Node.js',
      'Express',
      'MongoDB',
      'Stripe',
      'Python',
      'FastAPI',
      'RAG',
      'LangChain',
      'Qdrant',
      'Mistral',
      'Voxtral',
      'Turborepo',
      'Docker',
      'CI/CD',
      'VPS OVH',
    ],
  },
];

export const personalProjects = portfolioProjects.filter(
  (project) => project.category === 'Perso'
);
