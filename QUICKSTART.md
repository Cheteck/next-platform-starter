# Guide de Démarrage Rapide ECHOS

## 🚀 Lancement du Projet

### 1. Installation des Dépendances
```bash
cd echops
npm install
```

### 2. Démarrage du Serveur
```bash
npm run dev
```

### 3. Accès à l'Application
Ouvrez votre navigateur sur : `http://localhost:3000`

## 📱 Pages Principales

### 🏠 Page d'Accueil (`/`)
- Feed social avec posts et interactions
- Stories et highlights
- Suggestions de spaces
- Tendances et hashtags

### 🏪 Spaces (`/spaces`)
- Liste des boutiques et entreprises
- Recherche et filtres avancés
- Détails des spaces avec ratings
- Boutons suivre/visiter

### 🛒 Marketplace (`/marketplace`)
- Catalogue produits complet
- Recherche par mots-clés
- Filtres par catégorie/prix/état
- Vue grille/liste commutables
- Gestion panier

### 💬 Messagerie (`/chat`)
- Interface de chat en temps réel
- Liste des conversations
- Envoi/réception messages
- Statuts utilisateur

### 👨‍💼 Admin Space (`/space-admin`)
- Dashboard analytics pour propriétaires
- Gestion des produits
- Statistiques followers/revenus
- Performance temporelle

### 👑 Admin Plateforme (`/admin`)
- Vue globale de la plateforme
- Métriques utilisateurs/spaces
- Monitoring système
- Modération et alertes

## 🎨 Fonctionnalités Clés

### Système de Navigation
- **Header** : Logo, recherche globale, notifications, profil utilisateur
- **Sidebar** : Menu principal avec accès rapide aux sections
- **Breadcrumbs** : Navigation contextuelle
- **Mobile** : Menu hamburger responsive

### Interactions Utilisateur
- **Likes/Commentaires** : Interactions sociales sur posts
- **Follow/Unfollow** : Gestion abonnements spaces
- **Messages** : Chat en temps réel
- **Notifications** : Système d'alertes

### Gestion de Contenu
- **CRUD Produits** : Création/modification/suppression
- **Publication Posts** : Contenu avec images
- **Gestion Spaces** : Profils business complets
- **Modération** : Outils d'administration

## 🔧 Technologies Utilisées

### Core Framework
- **Next.js 14** : React framework avec App Router
- **TypeScript** : Typage statique robuste
- **Tailwind CSS** : Utility-first CSS framework

### Composants & UI
- **Lucide React** : Icônes modernes vectorielles
- **Custom Components** : Design system personnalisé
- **Responsive Design** : Mobile-first approach

### Data & Charts
- **Recharts** : Visualisations données interactives
- **Mock Data** : Données simulées réalistes
- **TypeScript Types** : Interfaces fortement typées

## 🎯 Cas d'Usage

### Pour les Utilisateurs
1. **Découvrir** : Parcourir spaces et produits
2. **Interagir** : Liker, commenter, suivre
3. **Acheter** : Parcourir marketplace et commander
4. **Communiquer** : Messagerie avec entreprises

### Pour les Businesses (Space Owners)
1. **Gérer** : Dashboard analytics détaillé
2. **Publier** : Contenu marketing et produits
3. **Analyser** : Métriques performance
4. **Engager** : Interactions clients

### Pour les Administrateurs
1. **Superviser** : Vue globale plateforme
2. **Modérer** : Gestion contenus/utilisateurs
3. **Analyser** : Statistiques système
4. **Configurer** : Paramètres globaux

## 📊 Données de Démonstration

### Utilisateurs Inclus
- **Jean Dupont** : Entrepreneur Tech
- **Marie Martin** : Propriétaire Boutique Fashion
- **Pierre Lefebvre** : Manager multi-spaces
- **Sophie Bernard** : Admin Plateforme
- **Lucas Dubois** : Utilisateur standard

### Spaces Exemple
- **Tech Solutions Paris** : Services technologiques
- **Boutique Échos Fashion** : Mode et accessoires
- **Restaurant Le Gourmet** : Restauration française

### Produits Marketplace
- **Mode** : Robe Élégante Été 2024 (89.99€)
- **Tech** : Smartphone Pro X 128GB (699.99€)
- **Restauration** : Menu Dégustation Gourmet (45.00€)
- **Audio** : Casque Premium (299.99€)

## 🛠️ Développement & Contribution

### Structure des Composants
```
src/components/
├── ui/           # Composants de base (Button, Card, Modal)
├── layout/       # Composants de mise en page
└── [features]/   # Composants spécifiques
```

### Ajout de Fonctionnalités
1. **Types** : Définir interfaces dans `src/types/`
2. **Mock Data** : Ajouter données dans `src/lib/mock-data.ts`
3. **Composants** : Créer dans `src/components/`
4. **Pages** : Ajouter dans `src/app/`

### Bonnes Pratiques
- **TypeScript** : Types stricts pour la sécurité
- **Responsive** : Mobile-first design
- **Accessibilité** : WCAG 2.1 compliance
- **Performance** : Optimisation Next.js

## 🎯 Prochaines Étapes

### Phase 1 : Backend Réel
- [ ] Intégration base de données (PostgreSQL)
- [ ] API REST avec Next.js API Routes
- [ ] Authentication NextAuth.js
- [ ] Upload images (Cloudinary)

### Phase 2 : Fonctionnalités Avancées
- [ ] Notifications push temps réel
- [ ] Système de paiement (Stripe)
- [ ] Géolocalisation avancée
- [ ] Recommandations ML

### Phase 3 : Scalabilité
- [ ] Tests unitaires E2E
- [ ] CI/CD pipeline
- [ ] Monitoring & logging
- [ ] Performance optimization

## 📞 Support

Pour toute question sur ECHOS :
- 📖 Consultez le `README.md` principal
- 🐛 Signalez les bugs via GitHub Issues
- 💡 Proposez des améliorations
- 🤝 Contribuez au développement

---

**ECHOS** - *Votre plateforme sociale et marketplace tout-en-un*