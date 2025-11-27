// Données Mock pour ECHOS - Plateforme Sociale avec Marketplaces et Spaces

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  coverPhoto?: string;
  location?: string;
  work?: string;
  education?: string;
  website?: string;
  role: 'USER' | 'SPACE_OWNER' | 'SPACE_ADMIN' | 'PLATFORM_ADMIN';
  spaces: string[];
  followers: number;
  following: number;
  bio?: string;
  verified?: boolean;
  createdAt: Date;
}

export interface Space {
  id: string;
  name: string;
  description: string;
  category: 'Restaurant' | 'Shop' | 'Service' | 'Entertainment' | 'Fashion' | 'Tech';
  ownerId: string;
  logo: string;
  banner: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  rating: number;
  reviews: number;
  followers: number;
  verified: boolean;
  createdAt: Date;
  isActive: boolean;
  settings: {
    allowMessages: boolean;
    allowReviews: boolean;
    autoPublish: boolean;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: 'Neuf' | 'Comme neuf' | 'Bon état' | 'Usé';
  spaceId: string;
  stock: number;
  rating: number;
  reviews: number;
  views: number;
  isActive: boolean;
  createdAt: Date;
  tags: string[];
}

export interface Post {
  id: string;
  userId: string;
  spaceId?: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: Date;
  type: 'feed' | 'product' | 'space' | 'promotion';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  read: boolean;
  createdAt: Date;
  type: 'text' | 'image' | 'file';
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  lastActivity: Date;
  unreadCount: number;
  type: 'direct' | 'group' | 'space_support';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message' | 'product' | 'space';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  variant?: { [key: string]: string };
  addedAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  spaceId: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: string;
}

export interface Booking {
  id: string;
  customerId: string;
  spaceId: string;
  serviceId?: string;
  eventId?: string;
  title: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
}

export interface SpaceRole {
  id: string;
  name: string;
  permissions: string[];
  isCustom: boolean;
}

export interface SpaceMember {
  id: string;
  userId: string;
  spaceId: string;
  roleId: string;
  joinedAt: Date;
}

// Données Mock
export const users: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@exemple.com',
    avatar: 'https://i.pravatar.cc/150?u=jean_dupont',
    coverPhoto: '/covers/user-cover-1.jpg',
    location: 'Paris, France',
    work: 'Développeur principal chez Tech Solutions',
    education: 'M.Sc. Informatique à l\'Université Paris-Saclay',
    website: 'https://jean-dupont.dev',
    role: 'USER',
    spaces: ['space_1'],
    followers: 1250,
    following: 320,
    bio: 'Entrepreneur passionné par l\'innovation, le design et le développement de produits. Créateur de solutions qui ont du sens.',
    verified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@exemple.com',
    avatar: '/avatars/marie.jpg',
    role: 'SPACE_OWNER',
    spaces: ['space_2'],
    followers: 5432,
    following: 890,
    bio: 'Fondatrice de Boutique Échos Fashion',
    verified: true,
    createdAt: new Date('2023-11-20'),
  },
  {
    id: '3',
    name: 'Pierre Lefebvre',
    email: 'pierre@exemple.com',
    avatar: '/avatars/pierre.jpg',
    role: 'SPACE_ADMIN',
    spaces: ['space_1', 'space_3'],
    followers: 2876,
    following: 1245,
    bio: 'Manager chez Tech Solutions',
    verified: false,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'Sophie Bernard',
    email: 'sophie@echops.fr',
    avatar: '/avatars/sophie.jpg',
    role: 'PLATFORM_ADMIN',
    spaces: [],
    followers: 15673,
    following: 234,
    bio: 'Admin ECHOS - Développement communautaire',
    verified: true,
    createdAt: new Date('2023-09-01'),
  },
  {
    id: '5',
    name: 'Lucas Dubois',
    email: 'lucas@exemple.com',
    avatar: '/avatars/lucas.jpg',
    role: 'USER',
    spaces: [],
    followers: 756,
    following: 432,
    bio: 'Développeur web passionné',
    verified: false,
    createdAt: new Date('2024-05-20'),
  },
];

export const spaces: Space[] = [
  {
    id: 'space_1',
    name: 'Tech Solutions Paris',
    description: 'Solutions technologiques innovantes pour entreprises modernes',
    category: 'Tech',
    ownerId: '1',
    logo: '/spaces/tech-logo.jpg',
    banner: '/spaces/tech-banner.jpg',
    address: '123 Avenue de l\'Innovation, 75008 Paris',
    phone: '+33 1 23 45 67 89',
    website: 'https://tech-solutions.fr',
    email: 'contact@tech-solutions.fr',
    rating: 4.8,
    reviews: 156,
    followers: 5432,
    verified: true,
    createdAt: new Date('2023-12-01'),
    isActive: true,
    settings: {
      allowMessages: true,
      allowReviews: true,
      autoPublish: false,
    },
  },
  {
    id: 'space_2',
    name: 'Boutique Échos Fashion',
    description: 'Mode et accessoires tendance - Collection été 2024',
    category: 'Fashion',
    ownerId: '2',
    logo: '/spaces/fashion-logo.jpg',
    banner: '/spaces/fashion-banner.jpg',
    address: '456 Rue de la Mode, 75001 Paris',
    phone: '+33 1 98 76 54 32',
    website: 'https://boutique-echos.fr',
    email: 'hello@boutique-echos.fr',
    rating: 4.9,
    reviews: 234,
    followers: 8765,
    verified: true,
    createdAt: new Date('2023-08-15'),
    isActive: true,
    settings: {
      allowMessages: true,
      allowReviews: true,
      autoPublish: true,
    },
  },
  {
    id: 'space_3',
    name: 'Restaurant Le Gourmet',
    description: 'Cuisine française traditionnelle dans une ambiance moderne',
    category: 'Restaurant',
    ownerId: '1',
    logo: '/spaces/restaurant-logo.jpg',
    banner: '/spaces/restaurant-banner.jpg',
    address: '789 Rue du Bon Gout, 75011 Paris',
    phone: '+33 1 55 44 33 22',
    website: 'https://restaurant-le-gourmet.fr',
    email: 'reservation@restaurant-le-gourmet.fr',
    rating: 4.7,
    reviews: 189,
    followers: 3241,
    verified: true,
    createdAt: new Date('2024-02-10'),
    isActive: true,
    settings: {
      allowMessages: true,
      allowReviews: true,
      autoPublish: false,
    },
  },
];

export const products: Product[] = [
  {
    id: 'prod_1',
    title: 'Robe Élégante Été 2024',
    description: 'Robe d\'été en coton bio, coupe moderne et tendance. Parfaite pour toutes occasions.',
    price: 89.99,
    images: ['/products/robe-1.jpg', '/products/robe-1-back.jpg'],
    category: 'Mode Femme',
    condition: 'Neuf',
    spaceId: 'space_2',
    stock: 5,
    rating: 4.9,
    reviews: 23,
    views: 156,
    isActive: true,
    createdAt: new Date('2024-11-15'),
    tags: ['été', 'bio', 'tendance', 'élégant'],
  },
  {
    id: 'prod_2',
    title: 'Smartphone Pro X 128GB',
    description: 'Smartphone dernière génération avec caméra 108MP et écran OLED 6.7"',
    price: 699.99,
    images: ['/products/smartphone-1.jpg'],
    category: 'Électronique',
    condition: 'Comme neuf',
    spaceId: 'space_1',
    stock: 3,
    rating: 4.8,
    reviews: 45,
    views: 289,
    isActive: true,
    createdAt: new Date('2024-11-10'),
    tags: ['smartphone', 'tech', '108MP', 'OLED'],
  },
  {
    id: 'prod_3',
    title: 'Menu Dégustation Gourmet',
    description: 'Menu 3 services : entrée, plat principal et dessert. Produits frais et locaux.',
    price: 45.00,
    images: ['/products/menu-1.jpg', '/products/menu-2.jpg'],
    category: 'Restauration',
    condition: 'Neuf',
    spaceId: 'space_3',
    stock: 10,
    rating: 4.7,
    reviews: 67,
    views: 445,
    isActive: true,
    createdAt: new Date('2024-11-20'),
    tags: ['menu', 'dégustation', 'local', 'bio'],
  },
  {
    id: 'prod_4',
    title: 'Casque Audio Sans Fil Premium',
    description: 'Casque audio haute fidélité avec réduction de bruit active et autonomie 30h',
    price: 299.99,
    images: ['/products/casque-1.jpg'],
    category: 'Électronique',
    condition: 'Bon état',
    spaceId: 'space_1',
    stock: 2,
    rating: 4.6,
    reviews: 12,
    views: 78,
    isActive: true,
    createdAt: new Date('2024-11-22'),
    tags: ['audio', 'sans fil', 'premium', 'réduction bruit'],
  },
  {
    id: 'prod_5',
    title: 'Sac à Main Cuir Vintage',
    description: 'Sac à main en cuir véritable, style vintage, fait main. Idéal pour le quotidien.',
    price: 129.99,
    images: ['/products/sac-1.jpg'],
    category: 'Mode Femme',
    condition: 'Neuf',
    spaceId: 'space_2',
    stock: 8,
    rating: 4.7,
    reviews: 15,
    views: 210,
    isActive: true,
    createdAt: new Date('2024-11-18'),
    tags: ['sac', 'cuir', 'vintage', 'mode'],
  },
  {
    id: 'prod_6',
    title: 'Chapeau de Paille Été',
    description: 'Chapeau de paille élégant pour se protéger du soleil avec style.',
    price: 24.99,
    images: ['/products/chapeau-1.jpg'],
    category: 'Accessoires',
    condition: 'Neuf',
    spaceId: 'space_2',
    stock: 15,
    rating: 4.5,
    reviews: 8,
    views: 95,
    isActive: true,
    createdAt: new Date('2024-11-25'),
    tags: ['chapeau', 'été', 'plage', 'accessoire'],
  },
  {
    id: 'prod_7',
    title: 'Tablette Graphique Pro',
    description: 'Tablette graphique haute précision pour les créatifs et designers.',
    price: 349.99,
    images: ['/products/tablette-1.jpg'],
    category: 'Électronique',
    condition: 'Neuf',
    spaceId: 'space_1',
    stock: 4,
    rating: 4.9,
    reviews: 32,
    views: 412,
    isActive: true,
    createdAt: new Date('2024-11-12'),
    tags: ['tablette', 'graphisme', 'design', 'tech'],
  },
  {
    id: 'prod_8',
    title: 'Montre Connectée Sport',
    description: 'Montre connectée avec GPS, suivi cardiaque et étanche 50m.',
    price: 199.99,
    images: ['/products/montre-1.jpg'],
    category: 'Électronique',
    condition: 'Neuf',
    spaceId: 'space_1',
    stock: 10,
    rating: 4.6,
    reviews: 28,
    views: 350,
    isActive: true,
    createdAt: new Date('2024-11-21'),
    tags: ['montre', 'sport', 'connecté', 'santé'],
  },
  {
    id: 'prod_9',
    title: 'Fondant au Chocolat',
    description: 'Délicieux fondant au chocolat noir 70%, cœur coulant.',
    price: 8.50,
    images: ['/products/dessert-1.jpg'],
    category: 'Restauration',
    condition: 'Neuf',
    spaceId: 'space_3',
    stock: 20,
    rating: 5.0,
    reviews: 42,
    views: 180,
    isActive: true,
    createdAt: new Date('2024-11-26'),
    tags: ['dessert', 'chocolat', 'gourmand', 'sucré'],
  },
  {
    id: 'prod_10',
    title: 'Vin Rouge Bordeaux 2018',
    description: 'Bouteille de vin rouge Bordeaux, millésime 2018. Accompagne parfaitement les viandes rouges.',
    price: 28.00,
    images: ['/products/vin-1.jpg'],
    category: 'Restauration',
    condition: 'Neuf',
    spaceId: 'space_3',
    stock: 12,
    rating: 4.8,
    reviews: 19,
    views: 120,
    isActive: true,
    createdAt: new Date('2024-11-19'),
    tags: ['vin', 'rouge', 'bordeaux', 'alcool'],
  },
];

export const posts: Post[] = [
  {
    id: 'post_1',
    userId: '2',
    spaceId: 'space_2',
    content: 'Nouveauté arrive ! Notre collection été 2024 est enfin disponible ! 🌟 #Fashion #Été2024 #Tendances',
    images: ['/posts/fashion-collection.jpg'],
    likes: 234,
    comments: 18,
    shares: 12,
    createdAt: new Date('2024-11-24T10:30:00'),
    type: 'feed',
  },
  {
    id: 'post_2',
    userId: '1',
    spaceId: 'space_1',
    content: 'Découvrez notre nouveau service de consulting en transformation digitale. Aidez votre entreprise à se moderniser ! 💼 #Tech #Innovation #DigitalTransformation',
    likes: 156,
    comments: 23,
    shares: 8,
    createdAt: new Date('2024-11-23T14:15:00'),
    type: 'promotion',
  },
  {
    id: 'post_3',
    userId: '2',
    spaceId: 'space_2',
    content: 'Nouveau produit disponible !',
    likes: 89,
    comments: 7,
    shares: 5,
    createdAt: new Date('2024-11-24T09:00:00'),
    type: 'product',
  },
];

export const messages: Message[] = [
  {
    id: 'msg_1',
    senderId: '1',
    receiverId: '2',
    content: 'Salut Marie ! J\'ai vu votre nouvelle collection, elle est magnifique !',
    read: true,
    createdAt: new Date('2024-11-24T16:30:00'),
    type: 'text',
  },
  {
    id: 'msg_2',
    senderId: '2',
    receiverId: '1',
    content: 'Merci beaucoup Jean ! Je serais ravie de vous la présenter en détail.',
    read: false,
    createdAt: new Date('2024-11-24T16:32:00'),
    type: 'text',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv_1',
    participants: ['1', '2'],
    lastMessage: messages[1],
    lastActivity: new Date('2024-11-24T16:32:00'),
    unreadCount: 1,
    type: 'direct',
  },
  {
    id: 'conv_2',
    participants: ['1', '3'],
    lastMessage: undefined,
    lastActivity: new Date('2024-11-23T12:00:00'),
    unreadCount: 0,
    type: 'direct',
  },
];

export const notifications: Notification[] = [
  {
    id: 'notif_1',
    userId: '1',
    type: 'message',
    title: 'Nouveau message',
    message: 'Marie vous a envoyé un message',
    read: false,
    createdAt: new Date('2024-11-24T16:32:00'),
    actionUrl: '/chat/conv_1',
  },
  {
    id: 'notif_2',
    userId: '1',
    type: 'like',
    title: 'Nouveau like',
    message: 'Sophie a liké votre publication',
    read: true,
    createdAt: new Date('2024-11-24T15:45:00'),
    actionUrl: '/spaces/space_1',
  },
];

export const orders: Order[] = [
  {
    id: 'ord_1',
    customerId: '5',
    spaceId: 'space_2',
    items: [
      { productId: 'prod_1', productName: 'Robe Élégante Été 2024', quantity: 1, price: 89.99 },
      { productId: 'prod_6', productName: 'Chapeau de Paille Été', quantity: 1, price: 24.99 }
    ],
    total: 114.98,
    status: 'processing',
    createdAt: new Date('2024-11-26T10:00:00'),
    shippingAddress: '12 Rue des Fleurs, 75002 Paris'
  },
  {
    id: 'ord_2',
    customerId: '3',
    spaceId: 'space_1',
    items: [
      { productId: 'prod_2', productName: 'Smartphone Pro X 128GB', quantity: 1, price: 699.99 }
    ],
    total: 699.99,
    status: 'delivered',
    createdAt: new Date('2024-11-20T14:30:00'),
    shippingAddress: '8 Boulevard Haussmann, 75009 Paris'
  },
  {
    id: 'ord_3',
    customerId: '1',
    spaceId: 'space_3',
    items: [
      { productId: 'prod_10', productName: 'Vin Rouge Bordeaux 2018', quantity: 2, price: 28.00 }
    ],
    total: 56.00,
    status: 'pending',
    createdAt: new Date('2024-11-27T09:15:00'),
    shippingAddress: '123 Avenue de l\'Innovation, 75008 Paris'
  }
];

export const bookings: Booking[] = [
  {
    id: 'bk_1',
    customerId: '5',
    spaceId: 'space_3',
    title: 'Dîner pour 2 personnes',
    date: new Date('2024-12-01'),
    time: '20:00',
    status: 'confirmed',
    notes: 'Table près de la fenêtre si possible',
    createdAt: new Date('2024-11-25T11:20:00')
  },
  {
    id: 'bk_2',
    customerId: '3',
    spaceId: 'space_1',
    title: 'Consultation Technique',
    date: new Date('2024-11-29'),
    time: '14:00',
    status: 'pending',
    notes: 'Besoin d\'audit sécurité',
    createdAt: new Date('2024-11-26T16:45:00')
  }
];

export const spaceRoles: SpaceRole[] = [
  {
    id: 'role_admin',
    name: 'Administrateur',
    permissions: ['all'],
    isCustom: false
  },
  {
    id: 'role_editor',
    name: 'Éditeur',
    permissions: ['manage_products', 'manage_content', 'view_analytics'],
    isCustom: false
  },
  {
    id: 'role_support',
    name: 'Support Client',
    permissions: ['manage_messages', 'manage_orders', 'view_customers'],
    isCustom: false
  }
];

export const spaceMembers: SpaceMember[] = [
  {
    id: 'mem_1',
    userId: '3',
    spaceId: 'space_1',
    roleId: 'role_admin',
    joinedAt: new Date('2024-01-15')
  },
  {
    id: 'mem_2',
    userId: '5',
    spaceId: 'space_1',
    roleId: 'role_editor',
    joinedAt: new Date('2024-06-20')
  }
];

// Fonctions utilitaires
export const getCurrentUser = (): User => {
  // Simulation de l'utilisateur connecté
  return users[0];
};

export const getSpaceById = (id: string): Space | undefined => {
  return spaces.find(space => space.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getProductsBySpace = (spaceId: string): Product[] => {
  return products.filter(product => product.spaceId === spaceId && product.isActive);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product =>
    product.category.toLowerCase().includes(category.toLowerCase()) &&
    product.isActive
  );
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.isActive && (
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  );
};

export const getConversationsForUser = (userId: string): Conversation[] => {
  return conversations.filter(conv => conv.participants.includes(userId));
};

export const getMessagesForConversation = (conversationId: string): Message[] => {
  // Simulation - dans un vrai app, cela viendrait de la DB
  return messages.filter(msg =>
    msg.senderId === '1' && msg.receiverId === '2' ||
    msg.senderId === '2' && msg.receiverId === '1'
  );
};

export const getNotificationsForUser = (userId: string): Notification[] => {
  return notifications.filter(notif => notif.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Données pour les dashboards admin
export const platformStats = {
  totalUsers: 15673,
  totalSpaces: 2847,
  totalProducts: 12456,
  totalRevenue: 456780.50,
  activeUsers: 8934,
  newUsersThisMonth: 1234,
  topCategories: [
    { name: 'Fashion', count: 3456, growth: 12.5 },
    { name: 'Tech', count: 2341, growth: 8.3 },
    { name: 'Restaurant', count: 1876, growth: 15.2 },
    { name: 'Shop', count: 1456, growth: -2.1 },
    { name: 'Service', count: 987, growth: 6.7 },
  ],
  monthlyGrowth: {
    users: 8.7,
    spaces: 5.3,
    products: 12.4,
    revenue: 18.9,
  },
};

export const spaceStats = {
  totalViews: 15678,
  totalFollowers: 5432,
  totalProducts: 45,
  monthlyRevenue: 12340.80,
  avgRating: 4.8,
  totalReviews: 156,
  monthlyGrowth: {
    views: 15.2,
    followers: 8.9,
    products: 3.4,
    revenue: 22.1,
  },
};