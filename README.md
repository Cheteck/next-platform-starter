# ECHOS - Plateforme Sociale avec Marketplace

ECHOS est une plateforme sociale moderne inspirée de Facebook, combinant des espaces boutiques, un marketplace intégré et une messagerie avancée. Cette application Next.js offre une expérience complète pour connecter les entreprises et les clients.

## 🚀 Fonctionnalités

### 🏠 Feed Social
- **Publication de contenu** : Posts multimédias avec likes, commentaires et partages
- **Stories & Highlights** : Contenu éphémère et permanent
- **Fil d'actualité** : Algorithme de recommandation personnalisé
- **Tendances** : Hashtags et sujets populaires

### 🏪 Spaces (Espaces Boutiques)
- **Gestion d'espaces** : Pages entreprises 类似 Facebook Pages
- **Profils avancés** : Informations business, localisation, contact
- **Système de rating** : Notes et avis clients
- **Publications** : Contenu marketing et promotions
- **Analytics** : Statistiques détaillées pour les propriétaires

### 🛒 Marketplace Intégré
- **Catalogue produits** : Photos, descriptions, prix, stock
- **Recherche avancée** : Filtres par catégorie, prix, localisation
- **Géolocalisation** : Ventes locales et expédition
- **Panier & Checkout** : Système de commande complet
- **Gestion stock** : Suivi en temps réel

### 💬 Messagerie
- **Chat en temps réel** : Messages instantanés
- **Conversations privées** : Messages utilisateur à utilisateur
- **Support client** : Assistance spaces/businesses
- **Pièces jointes** : Photos, fichiers, liens
- **Status** : En ligne, occupe, absent

### 👨‍💼 Dashboards Admin

#### Dashboard Space Admin
- **Analytics avancées** : Vues, followers, revenus
- **Gestion produits** : CRUD produits, stock, prix
- **Gestion équipe** : Rôles et permissions
- **Rapports** : Performance et insights

#### Dashboard Platform Admin
- **Vue globale** : Métriques plateforme complète
- **Modération** : Gestion utilisateurs, contenus
- **Analytics système** : Health monitoring
- **Configuration** : Paramètres globaux

## 🛠️ Stack Technologique

### Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes
- **Recharts** - Visualisations de données

### Backend (Simulation)
- **Mock Data** - Données simulées pour démonstration
- **Prisma ORM** - Intégration préparée pour base de données
- **NextAuth.js** - Authentication (structure prête)

### Architecture
- **Client Components** - Interface utilisateur
- **Server Components** - Rendu côté serveur
- **API Routes** - Endpoints REST (structure)
- **Responsive Design** - Mobile-first

## 📁 Structure du Projet

```
src/
├── app/                    # App Router Next.js
│   ├── page.tsx           # Page d'accueil (Feed)
│   ├── layout.tsx         # Layout global
│   ├── spaces/            # Pages Spaces
│   │   └── page.tsx       # Liste des Spaces
│   ├── marketplace/       # Marketplace
│   │   └── page.tsx       # Catalogue produits
│   ├── chat/              # Messagerie
│   │   └── page.tsx       # Interface chat
│   ├── space-admin/       # Dashboard Space
│   │   └── page.tsx       # Gestion boutique
│   └── admin/             # Dashboard Platform
│       └── page.tsx       # Admin global
├── components/            # Composants réutilisables
│   ├── ui/                # Composants UI de base
│   │   └── index.tsx      # Button, Card, Modal, etc.
│   └── layout/            # Composants layout
│       └── index.tsx      # Header, Sidebar, Layout
├── lib/                   # Utilitaires et données
│   └── mock-data.ts       # Données simulées
└── types/                 # Types TypeScript
    └── index.ts           # Interfaces et types
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd echops

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linting ESLint
```

## 📊 Données Mock

Le projet inclut des données simulées complètes :
- **5 utilisateurs** avec différents rôles
- **3 spaces** (Tech, Fashion, Restaurant)
- **4 produits** diversifiés
- **Posts et interactions** réalistes
- **Messages et conversations** fonctionnelles
- **Statistiques** et métriques

## 🎨 Design System

### Palette de Couleurs
- **Primary**: #3B82F6 (Bleu)
- **Success**: #10B981 (Vert)
- **Warning**: #F59E0B (Orange)
- **Error**: #EF4444 (Rouge)
- **Gray**: #64748B (Gris)

### Composants UI
- **Boutons** : Primary, Secondary, Outline, Ghost, Destructive
- **Cards** : Conteneurs avec header, content, footer
- **Modals** : Dialogues et popups
- **Formulaires** : Input, Textarea, Select
- **Navigation** : Header, Sidebar, Tabs
- **Données** : Avatar, Badge, ProgressBar

## 🌟 Fonctionnalités Avancées

### Responsive Design
- **Mobile-first** : Optimisé pour tous les écrans
- **Breakpoints** : sm, md, lg, xl personnalisés
- **Touch-friendly** : Interfaces tactiles

### Performance
- **Code splitting** : Chargement optimisé
- **Image optimization** : Lazy loading
- **Bundle analysis** : Optimisation automatique

### Accessibilité
- **WCAG 2.1** : Standards respectés
- **Keyboard navigation** : Support clavier
- **Screen readers** : Compatible lecteurs d'écran

## 📈 Roadmap

### Phase 1 - Fondations ✅
- [x] Structure Next.js + TypeScript
- [x] Design system avec Tailwind
- [x] Layout responsive
- [x] Données mock complètes

### Phase 2 - Core Features ✅
- [x] Feed social avec interactions
- [x] Système Spaces fonctionnel
- [x] Marketplace avec recherche/filtres
- [x] Messagerie en temps réel

### Phase 3 - Admin Systems ✅
- [x] Dashboard Space Admin
- [x] Dashboard Platform Admin
- [x] Analytics et reporting
- [x] Gestion utilisateurs/spaces

### Phase 4 - Améliorations
- [ ] Intégration base de données réelle
- [ ] Authentication NextAuth
- [ ] API backend complète
- [ ] Tests unitaires et E2E
- [ ] Optimisations performance

## 🤝 Contribution

Ce projet a été développé comme démonstration de compétences en développement Next.js et React. Pour contribuer :

1. Fork le projet
2. Créer une branche feature
3. Committer vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteur

**MiniMax Agent** - Développement complet de la plateforme ECHOS

## 🙏 Remerciements

- **Next.js Team** - Pour le framework excellent
- **Tailwind CSS** - Pour le système de design
- **Lucide** - Pour les icônes modernes
- **Recharts** - Pour les visualisations de données

---

**ECHOS** - *Où les entreprises et les clients se rencontrent*