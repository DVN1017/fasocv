# Preparation de deploiement FasoCV

## Variables d'environnement

Configurer les variables suivantes dans la plateforme de deploiement:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Reference: `.env.example`

## Pre-check avant deploiement

1. Installer les dependances
- `npm ci`

2. Verifier le build de production
- `npm run build`

3. Verifier le smoke test fonctionnel
- Suivre `docs/TESTS_FONCTIONNELS.md`

## Deploiement Vercel (recommande)

1. Importer le repository dans Vercel.
2. Framework detecte: Next.js.
3. Configurer les variables d'environnement.
4. Lancer le deploiement.
5. Verifier les routes critiques apres deploiement:
- `/`
- `/connexion?mode=connexion`
- `/builder`
- `/apercu`
- `/premium`

## Deploiement Node classique (alternative)

1. Sur le serveur:
- `npm ci`
- `npm run build`
- `npm run start`

2. Mettre un reverse proxy (Nginx/Caddy) devant l'app.
3. Activer HTTPS et compression.

## Points d'attention

- Si le serveur local de dev affiche des erreurs Turbopack, preferer valider le produit via `npm run build` puis `npm run start`.
- Le script Vercel Analytics peut retourner 404 en local; c'est attendu hors environnement Vercel.
