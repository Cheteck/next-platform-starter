# Plan de Refactoring : De Showcase à Full-Stack avec MySQL et Prisma

Ce document détaille le plan d'action pour faire évoluer l'application ECHOS d'un prototype frontend avec des données mockées vers une application full-stack robuste, en utilisant une base de données **MySQL** et l'ORM **Prisma**.

Le plan est divisé en phases séquentielles pour une transition maîtrisée et progressive.

---

### Phase 1 : La Fondation - Base de Données MySQL et Prisma

**Objectif :** Mettre en place la base de données et l'outil pour communiquer avec elle.

1.  **Configuration de la Base de Données MySQL** :
    *   **Option 1 (Cloud - Recommandé)** : Utilisez un service de base de données managée comme **PlanetScale** (spécialisé MySQL Serverless et doté d'un excellent "free tier"), AWS RDS, ou Google Cloud SQL. Ces services gèrent la maintenance, les sauvegardes et la scalabilité.
    *   **Option 2 (Local)** : Installez un serveur MySQL sur votre machine de développement (via Docker, WAMP, MAMP, etc.) pour les tests en local.

2.  **Installation et Configuration de Prisma** :
    *   Installez Prisma en tant que dépendance de développement : `npm install prisma --save-dev`.
    *   Initialisez Prisma dans votre projet : `npx prisma init`.
    *   Dans le fichier `prisma/schema.prisma` qui a été créé, assurez-vous que le `provider` de la source de données est bien `"mysql"` :
        ```prisma
        datasource db {
          provider = "mysql"
          url      = env("DATABASE_URL")
        }
        ```

3.  **Connexion à la Base de Données** :
    *   Récupérez l'URL de connexion de votre base de données MySQL (fournie par votre hébergeur cloud ou locale).
    *   Ajoutez cette URL au fichier `.env` à la racine de votre projet. Ce fichier est ignoré par Git pour des raisons de sécurité.
        ```
        DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
        ```

4.  **Définition du Schéma et Migration** :
    *   Définissez vos modèles (`User`, `Post`, `Product`, etc.) dans `prisma/schema.prisma`. Inspirez-vous de la structure de vos fichiers de données mockées.
    *   Exécutez la première migration pour que Prisma crée les tables correspondantes dans votre base de données MySQL : `npx prisma migrate dev --name init`.

---

### Phase 2 : L'Identité - Authentification des Utilisateurs

**Objectif :** Permettre aux utilisateurs de s'inscrire et de se connecter de manière sécurisée.

1.  **Intégration de NextAuth.js** :
    *   Installez `next-auth` et `bcrypt` : `npm install next-auth bcrypt` et `npm install @types/bcrypt --save-dev`.
    *   Créez le *Route Handler* `src/app/api/auth/[...nextauth]/route.ts` pour centraliser la configuration de NextAuth.js.

2.  **API d'Inscription** :
    *   Créez une API route dédiée `src/app/api/register/route.ts`.
    *   Cette route validera les entrées, hachera le mot de passe avec `bcrypt`, et utilisera Prisma pour créer un nouvel utilisateur dans la table `User`.

3.  **Pages et Logique Frontend** :
    *   Développez les composants et pages pour les formulaires de `/login` et `/register`.
    *   Utilisez le hook `useSession` de NextAuth.js pour gérer l'état de connexion dans l'interface.

---

### Phase 3 : Le Cœur - Rendre le Fil d'Actualité Dynamique

**Objectif :** Remplacer les données statiques par des données réelles provenant de la base de données.

1.  **Création des APIs pour les Posts** :
    *   Développez des *Route Handlers* pour gérer les opérations CRUD (Create, Read, Update, Delete) sur les posts, commentaires, et likes.
    *   Exemples : `GET /api/posts`, `POST /api/posts`, `POST /api/posts/[id]/like`.

2.  **Refactoring du Frontend** :
    *   Dans la page d'accueil (`/`), utilisez les capacités des **Server Components** de Next.js pour récupérer les données initiales directement depuis la base de données via Prisma, sans passer par une API. C'est plus simple et plus performant.
    *   Pour les interactions côté client (liker, commenter, poster), faites des appels `fetch` depuis des **Client Components** vers vos nouvelles API routes.

---

### Phase 4 : Le Commerce - Activer la Marketplace

**Objectif :** Mettre en place la logique transactionnelle de l'application.

1.  **Création des APIs E-commerce** :
    *   Développez les APIs pour la gestion des produits, du panier, et la création des commandes.

2.  **Intégration d'un Prestataire de Paiement** :
    *   Intégrez **Stripe** (recommandé) en installant son SDK (`npm install stripe`).
    *   Créez une API route `/api/checkout` qui génère une session de paiement Stripe et redirige l'utilisateur.

3.  **Refactoring du Frontend** :
    *   Connectez les pages de la marketplace aux nouvelles APIs pour afficher les produits, gérer le panier et finaliser les commandes.

---

### Phase 5 : Le Polissage - Tests et Déploiement

**Objectif :** Assurer la qualité et mettre l'application en production.

1.  **Stratégie de Test** :
    *   Écrivez des tests unitaires pour vos fonctions critiques et vos API routes avec **Vitest**.
    *   Écrivez des tests d'intégration pour vos composants avec **React Testing Library**.
    *   Mettez en place des tests **End-to-End** avec **Playwright** pour valider les parcours utilisateurs complets (inscription -> ajout au panier -> paiement).

2.  **Déploiement** :
    *   Utilisez **Vercel** pour un déploiement simple et optimisé.
    *   Configurez les variables d'environnement (`DATABASE_URL`, `NEXTAUTH_SECRET`, `STRIPE_SECRET_KEY`, etc.) dans l'interface de Vercel.
    *   Mettez en place une pipeline CI/CD (via GitHub Actions) pour automatiser les tests à chaque push.
