# Portfolio — Alex Hernandez

Portfolio personnel construit avec **Astro + React**, déployé sur **GitHub Pages**
via GitHub Actions.

🔗 En ligne : https://AlexherDev69.github.io

## Stack

- [Astro 7](https://astro.build) — site statique ultra-rapide
- [React 19](https://react.dev) — îlots interactifs (`client:load`)
- TypeScript strict
- Police [Inter](https://rsms.me/inter/) (bundlée, offline-safe)

## Structure

```text
src/
├── components/     # Header, Hero, About, Skills, Projects, Contact, Footer + ThemeToggle (React)
├── data/
│   └── portfolio.ts  # ← contenu du site (profil, skills, projets). À éditer ici.
├── layouts/
│   └── BaseLayout.astro  # SEO, anti-FOUC thème, apparition au scroll
├── styles/
│   └── global.css   # design system (tokens, thème clair/sombre)
└── pages/
    └── index.astro
```

Pour personnaliser le contenu, édite **`src/data/portfolio.ts`**.

## Commandes

| Commande       | Action                                  |
| :------------- | :-------------------------------------- |
| `pnpm dev`     | Serveur de dev sur `localhost:4321`     |
| `pnpm build`   | Build de production dans `./dist/`      |
| `pnpm preview` | Prévisualise le build local            |

## Déploiement

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) build et
publie automatiquement le site à chaque push sur `main`.

Une fois le repo poussé sur GitHub : **Settings → Pages → Source = GitHub Actions**.
