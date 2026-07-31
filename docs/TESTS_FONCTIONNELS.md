# Tests fonctionnels FasoCV

Ce document sert de smoke test manuel rapide avant de deployer.

## Prerequis

- Build de production valide: `npm run build`
- Serveur local de production: `npm run start`
- Variables d'environnement definies via `.env.local`

## Parcours critiques a verifier

1. Accueil (`/`)
- Le logo FasoCV apparait.
- Les boutons `Se connecter` et `S'inscrire` sont visibles pour un utilisateur non connecte.
- Le bouton `Creer mon CV` redirige vers `/builder`.
- Le bouton `Voir un exemple` redirige vers `/builder?demo=1`.

2. Connexion (`/connexion?mode=connexion`)
- Le titre `Se connecter` est visible.
- Le champ `Adresse email` est visible.

3. Inscription (`/connexion?mode=inscription`)
- Le titre `Creer un compte` est visible.
- Le champ `Adresse email` est visible.

4. Builder (`/builder`)
- Le bouton `Retour` apparait dans le header.
- Le branding `FasoCV` est visible.
- Le bouton `PDF` est visible.

5. Builder demo (`/builder?demo=1`)
- Le bloc `Apercu` est visible.
- Le bouton `PDF` est visible.

6. Apercu (`/apercu`)
- Le header affiche le logo/brand FasoCV.
- Le CV template s'affiche.

7. Premium (`/premium`)
- Le titre `Premium` est visible.
- Les cartes offres avec `Choisir` sont visibles.

## Resultat du dernier smoke test automatise (local)

Statut: OK sur toutes les routes ci-dessus.

Note: en local, une erreur 404 `/_vercel/insights/script.js` peut apparaitre hors Vercel. Cela n'impacte pas le fonctionnement de l'app en production Vercel.
