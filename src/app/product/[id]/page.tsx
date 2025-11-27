'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Share2,
  Star,
  ShoppingCart,
  MessageSquare,
  Eye,
  Shield,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  MapPin,
  Calendar,
  User,
  Flag,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card, Button, Badge as UIBadge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { SellProductModal, SellProductData } from '@/components/space-admin/SellProductModal';
import {
  products,
  users,
  spaces,
  Product,
  User as UserType,
  Space
} from '@/lib/mock-data';
import { Review } from '@/types';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [space, setSpace] = useState<Space | null>(null);
  const [owner, setOwner] = useState<UserType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedProductToSell, setSelectedProductToSell] = useState<Product | null>(null);

  // Mock reviews data
  const mockReviews: Review[] = [
    {
      id: '1',
      productId: params.id,
      userId: '1',
      userName: 'Alice Dupont',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      title: 'Excellent produit !',
      content: 'Je suis très satisfaite de mon achat. La qualité est au rendez-vous et le délai de livraison respecté.',
      images: ['/api/placeholder/600/400'],
      helpful: 12,
      verified: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      productId: params.id,
      userId: '2',
      userName: 'Bob Martin',
      userAvatar: '/api/placeholder/40/40',
      rating: 4,
      title: 'Bon rapport qualité-prix',
      content: 'Produit conforme à la description. Quelques petits défauts mineurs mais rien de grave.',
      helpful: 8,
      verified: true,
      createdAt: new Date('2024-01-10')
    },
    {
      id: '3',
      productId: params.id,
      userId: '3',
      userName: 'Claire Dubois',
      userAvatar: '/api/placeholder/40/40',
      rating: 5,
      title: 'Je recommande !',
      content: 'Livraison rapide et produit en parfait état. Le vendeur est très réactif.',
      helpful: 15,
      verified: false,
      createdAt: new Date('2024-01-08')
    }
  ];

  const [relatedProducts] = useState([
    {
      id: '2',
      title: 'Produit similaire 1',
      price: 89.99,
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviews: 25
    },
    {
      id: '3',
      title: 'Produit similaire 2',
      price: 119.99,
      image: '/api/placeholder/300/300',
      rating: 4.8,
      reviews: 42
    },
    {
      id: '4',
      title: 'Produit similaire 3',
      price: 79.99,
      image: '/api/placeholder/300/300',
      rating: 4.2,
      reviews: 18
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log('ProductPage params:', params);
    const foundProduct = products.find(p => p.id === params.id);
    console.log('Found Product:', foundProduct);

    if (foundProduct) {
      setProduct(foundProduct);

      // Trouver l'espace et le propriétaire
      const foundSpace = spaces.find(s => s.id === foundProduct.spaceId);
      console.log('Found Space:', foundSpace);

      if (foundSpace) {
        setSpace(foundSpace);
        const foundOwner = users.find(u => u.id === foundSpace.ownerId);
        console.log('Found Owner:', foundOwner);
        if (foundOwner) setOwner(foundOwner);
      }
    }

    setReviews(mockReviews);
    setIsLoading(false);
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      // Ici on ajouterait au panier
      console.log(`Ajouté ${quantity}x ${product.title} au panier`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Ici on redirigerait vers le checkout
      console.log(`Achat direct de ${product.title}`);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const handleSellConfirm = (data: SellProductData) => {
    if (selectedProductToSell) {
      console.log(`Adding product ${selectedProductToSell.title} to current user space`, data);
      alert(`Produit "${selectedProductToSell.title}" ajouté à votre espace avec succès !\nPrix: ${data.price}€, Stock: ${data.stock}`);
      setSelectedProductToSell(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product || !space || !owner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produit introuvable</h2>
          <p className="text-gray-600 mb-4">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button onClick={() => window.history.back()}>Retour</Button>
        </div>
      </div>
    );
  }

  const averageRating = calculateAverageRating();
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Accueil</span>
          <span>/</span>
          <span>Marketplace</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    disabled={selectedImage === 0}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(Math.min(product.images.length - 1, selectedImage + 1))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
                    disabled={selectedImage === product.images.length - 1}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <UIBadge variant="outline">{product.category}</UIBadge>
                <UIBadge className="bg-green-100 text-green-800">
                  {product.condition}
                </UIBadge>
                <UIBadge variant={product.isActive ? 'default' : 'error'}>
                  {product.isActive ? 'En stock' : 'Rupture'}
                </UIBadge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{averageRating}</span>
                  <span className="text-gray-600">({reviews.length} avis)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{product.views} vues</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-blue-600 mb-6">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <UIBadge key={index} variant="default" className="text-xs">
                      #{tag}
                    </UIBadge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-4">
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">Quantité:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Stock: {product.stock} disponible{product.stock > 1 ? 's' : ''}
                </span>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter au panier
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  Acheter maintenant
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleWishlist}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${isWishlisted
                    ? 'border-red-300 text-red-600 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Dans les favoris' : 'Ajouter aux favoris'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  Partager
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
                  <Flag className="w-5 h-5" />
                  Signaler
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Paiement sécurisé</div>
                  <div className="text-sm text-gray-600">Protection acheteur</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Livraison rapide</div>
                  <div className="text-sm text-gray-600">Livraison en 24-48h</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">Retour gratuit</div>
                  <div className="text-sm text-gray-600">30 jours pour changer d'avis</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar src={space.logo} alt={space.name} className="w-16 h-16" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{space.name}</h3>
                <p className="text-gray-600">{space.category}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{space.rating} ({space.reviews} avis)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{space.followers.toLocaleString()} followers</span>
                  </div>
                  {space.address && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{space.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacter le vendeur
              </Button>
              <Button>
                Voir la boutique
              </Button>
              {/* Feature: Vendre ce produit (pour les admins de space) */}
              <Button
                variant="secondary"
                className="bg-green-600 hover:bg-green-700 text-white border-transparent"
                onClick={() => setSelectedProductToSell(product)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Vendre ce produit
              </Button>
            </div>
          </div>
        </Card>

        {/* Product Details Tabs */}
        <Card className="mb-8">
          <div className="border-b">
            <nav className="flex gap-8">
              {[
                { key: 'description', label: 'Description détaillée' },
                { key: 'reviews', label: `Avis (${reviews.length})` },
                { key: 'specifications', label: 'Spécifications' },
                { key: 'shipping', label: 'Livraison & Retour' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Caractéristiques principales:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Produit de qualité {product.condition.toLowerCase()}</li>
                    <li>Garantie constructeur incluse</li>
                    <li>Expédition sécurisée et rapide</li>
                    <li>Support client disponible</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Rating Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">Basé sur {reviews.length} avis</p>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-sm font-medium w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${reviews.length > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length * 100) : 0}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {ratingDistribution[rating as keyof typeof ratingDistribution]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar src={review.userAvatar} alt={review.userName} className="w-10 h-10" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.userName}</span>
                            {review.verified && (
                              <UIBadge className="bg-green-100 text-green-800 text-xs">
                                Achat vérifié
                              </UIBadge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{formatDate(review.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-3">{review.content}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Avis ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                          <ThumbsUp className="w-4 h-4" />
                          Utile ({review.helpful})
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Catégorie</span>
                      <span className="text-gray-600">{product.category}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">État</span>
                      <span className="text-gray-600">{product.condition}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Stock</span>
                      <span className="text-gray-600">{product.stock} disponible{product.stock > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Note moyenne</span>
                      <span className="text-gray-600">{averageRating}/5</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Nombre d'avis</span>
                      <span className="text-gray-600">{reviews.length}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Vues</span>
                      <span className="text-gray-600">{product.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Shipping Tab */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Options de livraison</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Livraison standard</div>
                        <div className="text-sm text-gray-600">3-5 jours ouvrés</div>
                      </div>
                      <div className="font-medium">Gratuit</div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Livraison express</div>
                        <div className="text-sm text-gray-600">1-2 jours ouvrés</div>
                      </div>
                      <div className="font-medium">9,99€</div>
                    </div>
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">Point relais</div>
                        <div className="text-sm text-gray-600">3-5 jours ouvrés</div>
                      </div>
                      <div className="font-medium">4,99€</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Retours et remboursements</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>• Retour gratuit sous 30 jours</p>
                    <p>• Remboursement intégral en cas de défaut</p>
                    <p>• Processus de retour simplifié</p>
                    <p>• Support client disponible pour vous accompagner</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <Button className="w-full">
                  Voir le produit
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <SellProductModal
        isOpen={!!selectedProductToSell}
        onClose={() => setSelectedProductToSell(null)}
        product={selectedProductToSell}
        onConfirm={handleSellConfirm}
      />
    </div>
  );
};

export default ProductPage;