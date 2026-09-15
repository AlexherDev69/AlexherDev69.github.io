# Portfolio d'Alex Hernandez

Portfolio personnel construit avec **Astro**, déployé sur **GitHub Pages**
via GitHub Actions.

🔗 En ligne : https://AlexherDev69.github.io

## Stack

- [Astro 7](https://astro.build) : site statique, aucun framework côté client
- TypeScript strict pour les données et les scripts
- Polices [Newsreader](https://fontsource.org/fonts/newsreader) et
  [Hanken Grotesk](https://fontsource.org/fonts/hanken-grotesk) (auto-hébergées via Fontsource)

## Structure

```text
src/
├── components/        # Header, Hero, Projects, Experience, About, Contact, études de cas
├── data/
│   ├── portfolio.ts   # profil, parcours, compétences, autres réalisations
│   └── projects.ts    # projets et contenu des études de cas
├── layouts/
│   └── BaseLayout.astro  # SEO, polices, styles, activation des animations
├── scripts/           # apparitions, en-tête, études de cas, vidéos, galeries (défilement, drag, plein écran)
├── styles/            # base, projets, sections, études de cas, aperçu plein écran, responsive
├── test/              # utilitaires partagés par les tests
└── pages/
    ├── index.astro
    └── projets.astro  # redirige les anciens liens /projets#slug vers l'accueil
design/
└── og-image.html      # source de l'image de partage (public/og-image.png)
scripts/
└── generate-og-image.mjs  # capture design/og-image.html avec Chrome ou Edge en headless
```

Les tests (`*.test.ts`) sont rangés à côté du code qu'ils vérifient.

Pour modifier le contenu, édite **`src/data/portfolio.ts`** et **`src/data/projects.ts`**.
Les images et la vidéo sont dans `public/assets/`.

Chaque étude de cas s'ouvre aussi par un lien direct : `/#10000-pas`, `/#easydiet`, etc.

## Commandes

| Commande          | Action                                                          |
| :---------------- | :-------------------------------------------------------------- |
| `pnpm dev`        | Serveur de dev sur `localhost:4321`                             |
| `pnpm build`      | Build de production dans `./dist/`                              |
| `pnpm preview`    | Prévisualise le build local                                     |
| `pnpm lint`       | ESLint sur le TypeScript, les scripts et les composants Astro   |
| `pnpm knip`       | Détecte le code mort, les exports et dépendances inutilisés     |
| `pnpm test`       | Lance les tests Vitest (`pnpm test:watch` pour le mode watch)   |
| `pnpm og:image`   | Régénère `public/og-image.png` depuis `design/og-image.html`    |

La CI lance lint, knip et les tests avant chaque build de déploiement.

## Déploiement

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) build et
publie automatiquement le site à chaque push sur `main`.

Une fois le repo poussé sur GitHub : **Settings → Pages → Source = GitHub Actions**.
