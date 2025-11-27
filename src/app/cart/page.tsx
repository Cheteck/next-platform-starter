'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  Truck, 
  Shield, 
  ArrowRight,
  Gift,
  Percent,
  MapPin,
  Clock,
  CreditCard
} from 'lucide-react';
import { Card, Button, Badge as UIBadge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { 
  products, 
  spaces,
  Product,
  Space,
  CartItem
} from '@/lib/mock-data';

interface CartItemExtended extends CartItem {
  product: Product;
  space: Space;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemExtended[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Mock cart data
  useEffect(() => {
    const mockCartItems: CartItemExtended[] = [
      {
        id: '1',
        productId: '1',
        quantity: 2,
        variant: { color: 'Noir', size: 'M' },
        addedAt: new Date('2024-01-20'),
        product: products[0],
        space: spaces[0]
      },
      {
        id: '2',
        productId: '2',
        quantity: 1,
        variant: { color: 'Blanc' },
        addedAt: new Date('2024-01-19'),
        product: products[1],
        space: spaces[1]
      },
      {
        id: '3',
        productId: '4',
        quantity: 3,
        addedAt: new Date('2024-01-18'),
        product: products[3],
        space: spaces[0]
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const shippingMethods = [
    { 
      id: 'standard', 
      name: 'Livraison standard', 
      price: 0, 
      duration: '3-5 jours', 
      description: 'Livraison gratuite' 
    },
    { 
      id: 'express', 
      name: 'Livraison express', 
      price: 9.99, 
      duration: '1-2 jours', 
      description: 'Livraison rapide' 
    },
    { 
      id: 'relay', 
      name: 'Point relais', 
      price: 4.99, 
      duration: '2-3 jours', 
      description: 'Retrait en point relais' 
    }
  ];

  const promoCodes = [
    { code: 'ECHOS10', discount: 10, type: 'percentage', description: '10% de réduction' },
    { code: 'WELCOME5', discount: 5, type: 'fixed', description: '5€ de réduction' },
    { code: 'FIRST20', discount: 20, type: 'percentage', description: '20% de réduction (première commande)' }
  ];

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(newQuantity, item.product.stock) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const moveToWishlist = (itemId: string) => {
    removeItem(itemId);
    // Ici on ajouterait à la wishlist
    console.log(`Produit déplacé vers la wishlist: ${itemId}`);
  };

  const applyPromoCode = () => {
    const promo = promoCodes.find(p => p.code.toLowerCase() === promoCode.toLowerCase());
    if (promo) {
      setAppliedPromo(promo.code);
      const subtotal = calculateSubtotal();
      const discount = promo.type === 'percentage' 
        ? (subtotal * promo.discount / 100)
        : promo.discount;
      setPromoDiscount(Math.min(discount, subtotal));
    } else {
      alert('Code promo invalide');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoDiscount(0);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    const method = shippingMethods.find(m => m.id === shippingMethod);
    return method?.price || 0;
  };

  const calculateTax = () => {
    return (calculateSubtotal() - promoDiscount) * 0.20; // TVA 20%
  };

  const calculateTotal = () => {
    return calculateSubtotal() - promoDiscount + calculateShipping() + calculateTax();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h2>
          <p className="text-gray-600 mb-6">
            Découvrez nos produits et ajoutez-les à votre panier
          </p>
          <Button>
            Continuer mes achats
          </Button>
        </Card>
      </div>
    );
  }

  const selectedShipping = shippingMethods.find(m => m.id === shippingMethod);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Panier</h1>
          <UIBadge className="bg-blue-100 text-blue-800">
            {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
          </UIBadge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.space.name} • {item.product.category}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Variants */}
                    {item.variant && Object.keys(item.variant).length > 0 && (
                      <div className="flex gap-4 text-sm text-gray-600 mb-3">
                        {Object.entries(item.variant).map(([key, value]) => (
                          <span key={key}>
                            {key}: <span className="font-medium">{value}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-blue-600">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-sm text-gray-600">
                            × {item.quantity} = 
                            <span className="font-medium ml-1">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded border border-gray-300 hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded border border-gray-300 hover:bg-gray-50"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                      <button 
                        onClick={() => moveToWishlist(item.id)}
                        className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        Sauvegarder
                      </button>
                      <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        Contacter le vendeur
                      </button>
                    </div>

                    {/* Stock Warning */}
                    {item.quantity > item.product.stock && (
                      <div className="mt-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                        Stock insuffisant. Stock disponible: {item.product.stock}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Continue Shopping */}
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline">
                ← Continuer mes achats
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost">
                  <Heart className="w-4 h-4 mr-2" />
                  Voir ma wishlist
                </Button>
                <Button variant="ghost">
                  Sauvegarder pour plus tard
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Code promo</h3>
              {!appliedPromo ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  <Button onClick={applyPromoCode} disabled={!promoCode.trim()}>
                    Appliquer
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-green-600" />
                    <span className="text-green-800 font-medium">{appliedPromo}</span>
                  </div>
                  <button 
                    onClick={removePromoCode}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {promoDiscount > 0 && (
                <div className="mt-3 text-sm text-green-600">
                  Économie: {formatPrice(promoDiscount)}
                </div>
              )}
            </Card>

            {/* Shipping Method */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Livraison</h3>
              <div className="space-y-3">
                {shippingMethods.map(method => (
                  <label 
                    key={method.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      shippingMethod === method.id 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={(e) => setShippingMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {method.price === 0 ? 'Gratuit' : formatPrice(method.price)}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {method.duration}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </Card>

            {/* Order Summary */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Récapitulatif</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Sous-total ({cartItems.length} articles)</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Code promo (-{appliedPromo})</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Livraison ({selectedShipping?.name})</span>
                  <span>
                    {selectedShipping?.price === 0 ? 'Gratuit' : formatPrice(selectedShipping?.price || 0)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>TVA (20%)</span>
                  <span>{formatPrice(calculateTax())}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button 
                className="w-full mt-6 h-12 text-lg"
                size="lg"
              >
                Procéder au paiement
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Security Info */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Paiement sécurisé SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Accepte toutes les cartes</span>
                </div>
              </div>
            </Card>

            {/* Trust Badges */}
            <Card className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="flex flex-col items-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <span className="text-gray-600">Paiements sécurisés</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-gray-600">Livraison rapide</span>
                </div>
                <div className="flex flex-col items-center">
                  <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-gray-600">Retours gratuits</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits recommandés</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map(product => (
              <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">{formatPrice(product.price)}</span>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;