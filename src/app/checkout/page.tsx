'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock,
  Check,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Card, Button, Badge as UIBadge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { products, spaces } from '@/lib/mock-data';

interface CheckoutForm {
  // Informations de livraison
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    company?: string;
  };
  
  // Informations de facturation
  billingAddress: {
    sameAsShipping: boolean;
    firstName: string;
    lastName: string;
    company?: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  
  // Paiement
  paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardDetails: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  };
  
  // Options
  newsletter: boolean;
  smsNotifications: boolean;
}

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<CheckoutForm>({
    shippingAddress: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'France'
    },
    billingAddress: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'France'
    },
    paymentMethod: 'card',
    cardDetails: {
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    },
    newsletter: false,
    smsNotifications: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart data
  const cartItems = [
    {
      id: '1',
      product: products[0],
      space: spaces[0],
      quantity: 2,
      variant: { color: 'Noir', size: 'M' }
    },
    {
      id: '2', 
      product: products[1],
      space: spaces[1],
      quantity: 1,
      variant: { color: 'Blanc' }
    }
  ];

  const steps = [
    { id: 1, name: 'Livraison', description: 'Adresse de livraison' },
    { id: 2, name: 'Paiement', description: 'Mode de paiement' },
    { id: 3, name: 'Confirmation', description: 'Vérification' }
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    return 0; // Livraison gratuite
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.20; // TVA 20%
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleInputChange = (section: keyof CheckoutForm, field: string, value: any) => {
    setForm(prev => {
      const sectionValue = prev[section];
      if (typeof sectionValue === 'object' && sectionValue !== null) {
        return {
          ...prev,
          [section]: {
            ...sectionValue,
            [field]: value
          }
        };
      } else {
        return {
          ...prev,
          [section]: value
        };
      }
    });
  };

  const handleCardInputChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails,
        [field]: value
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        const shipping = form.shippingAddress;
        return !!(shipping.firstName && shipping.lastName && shipping.email && 
                 shipping.phone && shipping.street && shipping.city && 
                 shipping.postalCode && shipping.country);
      
      case 2:
        if (form.paymentMethod === 'card') {
          const card = form.cardDetails;
          return !!(card.number && card.expiry && card.cvv && card.name);
        }
        return true;
      
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setIsProcessing(true);
    
    // Simulation du traitement
    setTimeout(() => {
      setIsProcessing(false);
      alert('Commande passée avec succès !');
      // Ici on redirigerait vers la page de confirmation
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Commande</h1>
            <p className="text-gray-600">Finalisez votre achat en toute sécurité</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-3">
                  <div className={`font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-sm text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold">Adresse de livraison</h2>
                </div>

                <div className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={form.shippingAddress.firstName}
                        onChange={(e) => handleInputChange('shippingAddress', 'firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={form.shippingAddress.lastName}
                        onChange={(e) => handleInputChange('shippingAddress', 'lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={form.shippingAddress.email}
                        onChange={(e) => handleInputChange('shippingAddress', 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        value={form.shippingAddress.phone}
                        onChange={(e) => handleInputChange('shippingAddress', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse *
                    </label>
                    <input
                      type="text"
                      value={form.shippingAddress.street}
                      onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Numéro et nom de rue"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code postal *
                      </label>
                      <input
                        type="text"
                        value={form.shippingAddress.postalCode}
                        onChange={(e) => handleInputChange('shippingAddress', 'postalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="75001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ville *
                      </label>
                      <input
                        type="text"
                        value={form.shippingAddress.city}
                        onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Paris"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pays *
                      </label>
                      <select
                        value={form.shippingAddress.country}
                        onChange={(e) => handleInputChange('shippingAddress', 'country', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Luxembourg">Luxembourg</option>
                      </select>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="border-t pt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={form.billingAddress.sameAsShipping}
                        onChange={(e) => handleInputChange('billingAddress', 'sameAsShipping', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        L'adresse de facturation est identique à l'adresse de livraison
                      </span>
                    </label>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={form.newsletter}
                        onChange={(e) => handleInputChange('newsletter', '', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Recevoir les offres et nouveautés par email
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={form.smsNotifications}
                        onChange={(e) => handleInputChange('smsNotifications', '', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Recevoir les notifications SMS de livraison
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button 
                    onClick={nextStep}
                    disabled={!validateStep(1)}
                    className="px-8"
                  >
                    Continuer vers le paiement
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold">Mode de paiement</h2>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                  <label className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                    form.paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={form.paymentMethod === 'card'}
                        onChange={(e) => handleInputChange('paymentMethod', 'paymentMethod', e.target.value)}
                        className="text-blue-600"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Carte bancaire</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                    form.paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={form.paymentMethod === 'paypal'}
                        onChange={(e) => handleInputChange('paymentMethod', 'paymentMethod', e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                    form.paymentMethod === 'apple_pay' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="apple_pay"
                        checked={form.paymentMethod === 'apple_pay'}
                        onChange={(e) => handleInputChange('paymentMethod', 'paymentMethod', e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center text-white text-xs">🍎</div>
                      <span className="font-medium">Apple Pay</span>
                    </div>
                  </label>
                </div>

                {/* Card Details */}
                {form.paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom sur la carte *
                      </label>
                      <input
                        type="text"
                        value={form.cardDetails.name}
                        onChange={(e) => handleCardInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Nom complet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de carte *
                      </label>
                      <input
                        type="text"
                        value={form.cardDetails.number}
                        onChange={(e) => handleCardInputChange('number', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date d'expiration *
                        </label>
                        <input
                          type="text"
                          value={form.cardDetails.expiry}
                          onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code CVV *
                        </label>
                        <input
                          type="text"
                          value={form.cardDetails.cvv}
                          onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Info */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Paiement 100% sécurisé</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Vos données sont chiffrées et ne sont jamais stockées sur nos serveurs
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={prevStep}
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={nextStep}
                    disabled={!validateStep(2)}
                    className="px-8"
                  >
                    Continuer
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-semibold">Vérification de commande</h2>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  {/* Items */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Articles commandés</h3>
                    <div className="space-y-3">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.product.title}</h4>
                            <p className="text-sm text-gray-600">
                              {item.space.name} • Qté: {item.quantity}
                            </p>
                            {item.variant && Object.keys(item.variant).length > 0 && (
                              <p className="text-sm text-gray-500">
                                {Object.entries(item.variant).map(([key, value]) => `${key}: ${value}`).join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{formatPrice(item.product.price * item.quantity)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Adresse de livraison</h3>
                      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium">
                          {form.shippingAddress.firstName} {form.shippingAddress.lastName}
                        </div>
                        <div>{form.shippingAddress.street}</div>
                        <div>{form.shippingAddress.postalCode} {form.shippingAddress.city}</div>
                        <div>{form.shippingAddress.country}</div>
                        <div className="mt-2 text-gray-600">
                          {form.shippingAddress.email} • {form.shippingAddress.phone}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Paiement</h3>
                      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {form.paymentMethod === 'card' ? (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <CreditCard className="w-4 h-4" />
                              <span>Carte bancaire</span>
                            </div>
                            <div>**** **** **** {form.cardDetails.number.slice(-4)}</div>
                            <div>Expire: {form.cardDetails.expiry}</div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>Paiement via {form.paymentMethod}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900 mb-2">Conditions d'achat</p>
                        <p className="text-blue-800">
                          En validant cette commande, vous acceptez nos{' '}
                          <a href="#" className="underline">conditions générales de vente</a> et notre{' '}
                          <a href="#" className="underline">politique de retour</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={prevStep}
                    disabled={isProcessing}
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="px-8 relative"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Traitement...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Confirmer la commande
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="p-6 sticky top-6">
              <h3 className="font-semibold text-gray-900 mb-4">Récapitulatif</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-green-600">
                    {calculateShipping() === 0 ? 'Gratuit' : formatPrice(calculateShipping())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TVA</span>
                  <span>{formatPrice(calculateTax())}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-blue-800 mb-2">
                  <Truck className="w-4 h-4" />
                  <span className="font-medium">Livraison gratuite</span>
                </div>
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Livraison prévue: 3-5 jours ouvrés</span>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Paiement sécurisé SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Données chiffrées</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Garantie satisfait ou remboursé</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;