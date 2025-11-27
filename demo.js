// Script de démonstration ECHOS
// Ce fichier montre les principales fonctionnalités de la plateforme

import { users, spaces, products, conversations, getCurrentUser } from './src/lib/mock-data';

// Fonction de démonstration des fonctionnalités
export function demonstrateECHOS() {
  console.log('🎉 === ECHOS PLATEFORME SOCIALE & MARKETPLACE === 🎉');
  
  // 1. Utilisateur connecté
  const currentUser = getCurrentUser();
  console.log('\n👤 Utilisateur connecté:', {
    nom: currentUser.name,
    rôle: currentUser.role,
    abonnés: currentUser.followers,
    abonnements: currentUser.following
  });

  // 2. Spaces disponibles
  console.log('\n🏪 Spaces disponibles:', spaces.map(space => ({
    nom: space.name,
    catégorie: space.category,
    abonnés: space.followers,
    note: space.rating,
    vérifié: space.verified
  })));

  // 3. Produits marketplace
  console.log('\n🛒 Produits marketplace:', products.map(prod => ({
    titre: prod.title,
    prix: prod.price + '€',
    catégorie: prod.category,
    état: prod.condition,
    stock: prod.stock
  })));

  // 4. Conversations
  console.log('\n💬 Conversations:', conversations.map(conv => ({
    participants: conv.participants.length,
    derniersMessages: conv.lastMessage?.content || 'Aucun',
    nonLues: conv.unreadCount
  })));

  // 5. Statistiques plateforme
  console.log('\n📊 Statistiques plateforme:', {
    totalUtilisateurs: users.length,
    totalSpaces: spaces.length,
    totalProduits: products.length,
    produitsActifs: products.filter(p => p.isActive).length,
    spacesVérifiés: spaces.filter(s => s.verified).length
  });

  // 6. Fonctionnalités disponibles
  console.log('\n✨ Fonctionnalités ECHOS:');
  const features = [
    '🏠 Feed social avec posts, likes, commentaires',
    '🏪 Spaces (boutiques) avec profils business',
    '🛒 Marketplace intégré avec recherche/filtres',
    '💬 Messagerie en temps réel',
    '📊 Dashboard Space Admin avec analytics',
    '👑 Dashboard Platform Admin global',
    '📱 Design responsive mobile-first',
    '🎨 Design system cohérent',
    '⚡ Performance Next.js optimisée',
    '🔒 Architecture modulaire et sécurisée'
  ];
  
  features.forEach(feature => console.log('  ' + feature));

  console.log('\n🚀 ECHOS est prêt à être utilisé!');
  console.log('📝 Consultez README.md pour plus d\'informations');
  console.log('🌐 Accédez aux pages via les liens de navigation');
}

// Exporter pour utilisation
export default demonstrateECHOS;