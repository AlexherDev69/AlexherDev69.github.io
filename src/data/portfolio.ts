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

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  description: string;
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
  heroLead: `Huit ans à livrer des produits web et mobiles, d'abord en CDI chez Nicecactus sur une plateforme de tournois esport, puis en freelance depuis 2022 (MateApp, Keepture, Acqua Protection). Aujourd'hui, je conçois des outils d'IA agentique branchés sur les LLM et le protocole MCP, et je fais grandir mes propres apps : 10${NBSP}000 pas, lancée en août 2026 et adoptée par plus de 500 utilisateurs, et EasyDiet, qui en compte plus de 1${NBSP}500.`,
  aboutLead: 'Je construis des produits web et mobiles de bout en bout, du premier écran à la mise en production.',
  aboutText:
    "Après quatre ans en CDI chez Nicecactus puis des missions freelance pour de nombreux clients, je me suis spécialisé dans les workflows d'IA agentique : des outils et des automatisations qui s'appuient sur les LLM et le protocole MCP. Français natif, bilingue en anglais.",
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
    description: `Mes propres produits, de l'idée à la publication : 10${NBSP}000 pas, EasyDiet, Boost for Letterboxd et MirrorMind.`,
  },
  {
    period: 'Depuis mars 2022',
    role: 'Développeur full stack freelance',
    organization: 'IDBUCKS · Lyon, télétravail',
    description:
      'Missions menées en autonomie pour plusieurs clients, de la conception au déploiement. Échanges directs avec les clients et les CTO, intégration depuis Figma.',
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
