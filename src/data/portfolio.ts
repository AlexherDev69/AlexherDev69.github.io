/**
 * Contenu général du site : profil, parcours, compétences et contact.
 * Les projets sont dans `projects.ts`.
 */

export interface Profile {
  name: string;
  role: string;
  location: string;
  availability: string;
  email: string;
  heroTitle: string[];
  heroEmphasis: string;
  heroLead: string;
  aboutLead: string;
  aboutText: string;
  contactTitle: string;
  contactEmphasis: string;
  contactText: string;
  portrait: { src: string; alt: string; width: number; height: number };
}

export interface ExternalLink {
  label: string;
  url: string;
}

/** One line of an experience entry, linked to its case study when there is one. */
interface ExperienceMission {
  text: string;
  caseSlug?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  missions?: ExperienceMission[];
}

export interface SkillGroup {
  title: string;
  items: string;
}

export interface OtherWork {
  title: string;
  context: string;
  description: string;
}

export const NBSP = ' ';

export const profile: Profile = {
  name: 'Alexandre Hernandez',
  role: 'Développeur full stack',
  location: 'Lyon, France',
  availability: 'Ouvert à un CDI ou une mission freelance',
  email: 'alexhernandez.pro@gmail.com',
  heroTitle: ['Je conçois des applications', "web et mobiles, de l'idée", 'à la'],
  heroEmphasis: 'mise en ligne',
  heroLead: `Huit ans à livrer des produits web et mobiles, en CDI chez Nicecactus puis en freelance depuis 2022. Mes propres apps, 10${NBSP}000 pas et EasyDiet, cumulent aujourd'hui plus de 2${NBSP}000 utilisateurs.`,
  aboutLead: 'Je construis des produits web et mobiles de bout en bout, du premier écran à la mise en production.',
  aboutText:
    "En plus des projets clients, j'ai lancé quatre produits en solo : deux apps mobiles, une extension Chrome et un outil open source. De l'idée à la publication, puis le support, les retours utilisateurs et les mises à jour, je m'occupe de tout. Je conçois aussi des outils d'IA agentique branchés sur les LLM et le protocole MCP, et je m'appuie sur ces workflows au quotidien pour livrer plus vite sans sacrifier la qualité. Français natif, bilingue en anglais.",
  contactTitle: 'Un projet, une mission,',
  contactEmphasis: 'un poste',
  contactText: 'Je cherche un CDI ou une mission freelance, à Lyon ou en télétravail.',
  portrait: {
    src: '/assets/moi/portrait.jpg',
    alt: "Portrait d'Alexandre Hernandez",
    width: 800,
    height: 800,
  },
};

export const socials: ExternalLink[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alexherpro/' },
  { label: 'GitHub', url: 'https://github.com/AlexherDev69' },
];

export const experienceSince = 'depuis 2016';

export const experiences: ExperienceItem[] = [
  {
    period: 'Depuis 2026',
    role: 'Développeur indépendant',
    organization: 'Projets personnels · publiés et open source',
    description: "Mes propres produits, conçus, développés et publiés seul, de l'idée au suivi des utilisateurs.",
    missions: [
      { text: `10${NBSP}000 pas : application mobile Android et iOS qui génère une boucle de marche calibrée sur les pas restants (Flutter, Cloudflare Workers). Plus de 500 utilisateurs.`, caseSlug: '10000-pas' },
      { text: `EasyDiet : application mobile Android de plans de repas et de suivi du poids, 100${NBSP}% hors ligne (Flutter). Plus de 1${NBSP}500 utilisateurs.`, caseSlug: 'easydiet' },
      { text: "Boost for Letterboxd : extension Chrome qui remonte Letterboxd dans les résultats Google (TypeScript), validée par l'équipe Letterboxd.", caseSlug: 'boost-for-letterboxd' },
      { text: 'MirrorMind : outil Windows open source qui affiche un téléphone Android sur le PC et le fait piloter par Claude Code via MCP (Tauri, Rust, React).', caseSlug: 'mirrormind' },
    ],
  },
  {
    period: 'Depuis mars 2022',
    role: 'Développeur full stack freelance',
    organization: 'IDBUCKS · Lyon, télétravail',
    description: 'Développement en autonomie complète sur plusieurs projets clients, de la conception au déploiement.',
    missions: [
      { text: 'MateApp : application mobile Android et iOS de type réseau social (Flutter) et back-office Next.js.', caseSlug: 'mateapp' },
      { text: 'Keepture : application mobile Android et iOS de partage de photos (React Native).', caseSlug: 'keepture' },
      { text: 'Acqua Protection : plateforme web de gestion (Next.js) et application mobile professionnelle (Flutter).' },
      { text: 'Collaboration directe avec les clients et les CTO, intégration à partir de maquettes Figma.' },
    ],
  },
  {
    period: 'Mars 2018 à mars 2022',
    role: 'Développeur full stack et gaming project manager',
    organization: 'Nicecactus · Sophia Antipolis, CDI',
    description:
      'Plateforme de tournois esport avec une équipe de dix développeurs, et projets événementiels B2B et B2C.',
  },
  {
    period: 'En parallèle',
    role: 'Esport',
    organization: '10 ans joueur professionnel, 4 ans organisateur',
    description:
      'Un bagage en communication, en gestion de projet et en relations partenaires : influenceurs, éditeurs de jeux, communautés.',
  },
  {
    period: '2016',
    role: 'BTS SIO',
    organization: 'Lycée ICOF · Lyon',
    description: 'Services informatiques aux organisations.',
  },
];

export const skills: SkillGroup[] = [
  { title: 'Frontend et mobile', items: 'React, Next.js, Flutter (Cubit, Riverpod), React Native, Tailwind CSS' },
  { title: 'Backend', items: 'Node.js, Express, TypeScript, PHP, Hono, Cloudflare Workers, API REST' },
  { title: 'Bases de données', items: 'MongoDB, Redis, Firebase, SQLite' },
  { title: 'IA', items: 'RAG, Qdrant, LLM (Claude, Mistral, Gemini), LangChain, Claude Code' },
  { title: 'Desktop', items: 'Tauri, Electron' },
  { title: 'Outils', items: 'Docker, Git, CI/CD (GitHub Actions), Vercel, Cloudflare' },
];

export const otherWorks: OtherWork[] = [
  {
    title: 'Acqua Protection',
    context: 'Mission client, IDBUCKS',
    description:
      'Plateforme web de gestion en Next.js et application mobile professionnelle, intégrées depuis les maquettes Figma.',
  },
  {
    title: 'Plateforme de tournois esport',
    context: 'CDI, Nicecactus',
    description:
      "Fonctionnalités clés de gestion des tournois en PHP et JavaScript, au sein d'une équipe de dix développeurs.",
  },
];
