# FasoCV

Application Next.js pour creer un CV professionnel en ligne.

## Demarrage rapide

1. Installer les dependances

```bash
npm ci
```

2. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

3. Lancer en developpement

```bash
npm run dev
```

4. Build de production

```bash
npm run build
npm run start
```

## Variables d'environnement

Voir `.env.example`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Qualite et verification

- Tests fonctionnels (smoke): `docs/TESTS_FONCTIONNELS.md`
- Checklist de deploiement: `docs/DEPLOIEMENT.md`

## Stack

- Next.js 16
- React 19
- Supabase Auth
