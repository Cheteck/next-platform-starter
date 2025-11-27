'use client'

import { useState } from 'react'
import { 
  Smartphone, 
  Download, 
  Smartphone as MobileIcon, 
  Star, 
  Shield, 
  Zap,
  Users,
  Globe,
  Bell,
  Wifi,
  WifiOff,
  DownloadCloud,
  SmartphoneIcon,
  PlayCircle,
  Apple,
  QrCode,
  Share,
  Phone,
  MessageSquare,
  Camera,
  Settings,
  User,
  Search,
  Heart,
  ShoppingBag,
  Calendar,
  BarChart3,
  Headphones,
  Mail,
  HelpCircle,
  ExternalLink
} from 'lucide-react'

// Types pour l'application mobile
interface AppFeature {
  id: string
  title: string
  description: string
  icon: string
  category: 'social' | 'shopping' | 'productivity' | 'security' | 'communication'
  status: 'available' | 'coming-soon' | 'beta'
  screenshots: string[]
}

interface DownloadInfo {
  platform: 'ios' | 'android' | 'web'
  version: string
  size: string
  releaseDate: string
  downloadCount: number
  rating: number
  requirements: string
}

interface AppStats {
  totalDownloads: string
  activeUsers: string
  averageRating: number
  reviewsCount: number
}

export default function MobileAppPage() {
  const [activeTab, setActiveTab] = useState<'download' | 'features' | 'screenshots' | 'support'>('download')
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | 'web'>('ios')
  const [isOnline, setIsOnline] = useState(true)

  // Données mock pour les fonctionnalités
  const features: AppFeature[] = [
    {
      id: '1',
      title: 'Notifications Intelligentes',
      description: 'Recevez des notifications personnalisées basées sur vos préférences et activité.',
      icon: '🔔',
      category: 'communication',
      status: 'available',
      screenshots: ['/imgs/notifications-screenshot.jpg']
    },
    {
      id: '2',
      title: 'Chat en Temps Réel',
      description: 'Messagerie instantanée avec emojis, fichiers et appels vidéo intégrés.',
      icon: '💬',
      category: 'communication',
      status: 'available',
      screenshots: ['/imgs/chat-screenshot.jpg']
    },
    {
      id: '3',
      title: 'Achats Mobiles',
      description: 'Parcourez et achetez directement depuis votre mobile avec paiement sécurisé.',
      icon: '🛒',
      category: 'shopping',
      status: 'available',
      screenshots: ['/imgs/shopping-screenshot.jpg']
    },
    {
      id: '4',
      title: 'Scanner de Produits',
      description: 'Scannez les codes-barres pour accéder aux informations produit instantanément.',
      icon: '📷',
      category: 'shopping',
      status: 'available',
      screenshots: ['/imgs/scanner-screenshot.jpg']
    },
    {
      id: '5',
      title: 'Stories & Posts',
      description: 'Partagez vos moments avec photos, vidéos et contenus interactifs.',
      icon: '📸',
      category: 'social',
      status: 'available',
      screenshots: ['/imgs/stories-screenshot.jpg']
    },
    {
      id: '6',
      title: 'Géolocalisation Avancée',
      description: 'Découvrez les services et produits près de vous avec notre GPS intégré.',
      icon: '📍',
      category: 'social',
      status: 'available',
      screenshots: ['/imgs/location-screenshot.jpg']
    },
    {
      id: '7',
      title: 'Synchronisation Cloud',
      description: 'Vos données sont synchronisées automatiquement sur tous vos appareils.',
      icon: '☁️',
      category: 'productivity',
      status: 'available',
      screenshots: ['/imgs/cloud-screenshot.jpg']
    },
    {
      id: '8',
      title: 'Mode Hors Ligne',
      description: 'Continuez à naviguer et utiliser les fonctionnalités principales sans connexion.',
      icon: '📱',
      category: 'productivity',
      status: 'coming-soon',
      screenshots: ['/imgs/offline-screenshot.jpg']
    },
    {
      id: '9',
      title: 'Sécurité Biométrique',
      description: 'Authentification par empreinte digitale ou reconnaissance faciale.',
      icon: '🔒',
      category: 'security',
      status: 'available',
      screenshots: ['/imgs/biometric-screenshot.jpg']
    },
    {
      id: '10',
      title: 'Chiffrement E2E',
      description: 'Toutes vos communications sont protégées par un chiffrement de bout en bout.',
      icon: '🛡️',
      category: 'security',
      status: 'beta',
      screenshots: ['/imgs/encryption-screenshot.jpg']
    }
  ]

  // Informations de téléchargement par plateforme
  const downloadInfo: Record<string, DownloadInfo> = {
    ios: {
      platform: 'ios',
      version: '2.1.4',
      size: '89.3 MB',
      releaseDate: '2025-01-18',
      downloadCount: 250000,
      rating: 4.8,
      requirements: 'iOS 14.0 ou version ultérieure'
    },
    android: {
      platform: 'android',
      version: '2.1.4',
      size: '76.2 MB',
      releaseDate: '2025-01-18',
      downloadCount: 500000,
      rating: 4.7,
      requirements: 'Android 8.0 (API niveau 26) ou version ultérieure'
    },
    web: {
      platform: 'web',
      version: '2.1.4',
      size: 'Optimisé',
      releaseDate: '2025-01-20',
      downloadCount: 100000,
      rating: 4.6,
      requirements: 'Navigateur moderne avec JavaScript activé'
    }
  }

  // Statistiques de l'application
  const appStats: AppStats = {
    totalDownloads: '850K+',
    activeUsers: '180K',
    averageRating: 4.7,
    reviewsCount: 12450
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100'
      case 'coming-soon': return 'text-orange-600 bg-orange-100'
      case 'beta': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible'
      case 'coming-soon': return 'Bientôt disponible'
      case 'beta': return 'Version bêta'
      default: return 'Statut inconnu'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social': return <Users className="w-5 h-5" />
      case 'shopping': return <ShoppingBag className="w-5 h-5" />
      case 'productivity': return <Zap className="w-5 h-5" />
      case 'security': return <Shield className="w-5 h-5" />
      case 'communication': return <MessageSquare className="w-5 h-5" />
      default: return <Smartphone className="w-5 h-5" />
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const currentDownloadInfo = downloadInfo[selectedPlatform]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Application Mobile ECHOS</h1>
                <p className="text-gray-600 mt-1">L'expérience ECHOS dans votre poche</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isOnline ? 'Connecté' : 'Hors ligne'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Votre monde social et commercial mobile
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Découvrez ECHOS sur mobile : réseaux sociaux, e-commerce, messagerie et bien plus. 
                Une application tout-en-un pour rester connecté où que vous soyez.
              </p>
              
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Télécharger sur</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center space-x-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <PlayCircle className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs text-green-100">Télécharger sur</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">{appStats.totalDownloads}</div>
                  <div className="text-sm text-indigo-200">Téléchargements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{appStats.activeUsers}</div>
                  <div className="text-sm text-indigo-200">Utilisateurs actifs</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">{appStats.averageRating}</span>
                  </div>
                  <div className="text-sm text-indigo-200">Note moyenne</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 text-center">
                <div className="w-32 h-64 bg-black rounded-3xl mx-auto mb-6 relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 to-cyan-500">
                    {/* Mock phone screen */}
                    <div className="p-4 text-white text-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full mx-auto mb-4"></div>
                      <div className="text-sm font-semibold">ECHOS</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-50">
                    <DownloadCloud className="w-5 h-5 inline mr-2" />
                    Télécharger l'app
                  </button>
                  <p className="text-sm text-indigo-100">Version {currentDownloadInfo.version}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'download', label: 'Téléchargement', icon: Download },
              { id: 'features', label: 'Fonctionnalités', icon: Zap },
              { id: 'screenshots', label: 'Captures d\'écran', icon: SmartphoneIcon },
              { id: 'support', label: 'Support', icon: Headphones }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Téléchargement Tab */}
        {activeTab === 'download' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Platform Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choisir votre plateforme</h3>
                <div className="space-y-3">
                  {[
                    { id: 'ios', name: 'iOS', icon: Apple, color: 'gray' },
                    { id: 'android', name: 'Android', icon: PlayCircle, color: 'green' },
                    { id: 'web', name: 'Version Web', icon: Globe, color: 'blue' }
                  ].map(({ id, name, icon: Icon, color }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedPlatform(id as any)}
                      className={`w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
                        selectedPlatform === id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${color === 'gray' ? 'text-gray-700' : color === 'green' ? 'text-green-600' : 'text-blue-600'}`} />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{name}</div>
                        <div className="text-sm text-gray-600">
                          {downloadInfo[id as keyof typeof downloadInfo].version}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scanner le QR Code</h3>
                <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 text-center mt-3">
                  Scannez avec votre appareil photo
                </p>
              </div>
            </div>

            {/* Download Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    ECHOS App pour {selectedPlatform === 'ios' ? 'iOS' : selectedPlatform === 'android' ? 'Android' : 'Web'}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{currentDownloadInfo.rating}</span>
                    <span className="text-gray-600">({formatNumber(appStats.reviewsCount)} avis)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Version</span>
                      <span className="font-medium">{currentDownloadInfo.version}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Taille</span>
                      <span className="font-medium">{currentDownloadInfo.size}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Date de sortie</span>
                      <span className="font-medium">{new Date(currentDownloadInfo.releaseDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Téléchargements</span>
                      <span className="font-medium">{formatNumber(currentDownloadInfo.downloadCount)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Exigences système</h4>
                      <p className="text-sm text-gray-600">{currentDownloadInfo.requirements}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Sécurité vérifiée</h4>
                      <p className="text-sm text-green-700">Cette application est sécurisée et vérifiée</p>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    selectedPlatform === 'ios' 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : selectedPlatform === 'android'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                    <DownloadCloud className="w-6 h-6" />
                    <span>Télécharger maintenant</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-4 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share className="w-5 h-5" />
                    <span>Partager</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fonctionnalités Tab */}
        {activeTab === 'features' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fonctionnalités principales</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez tout ce que l'application ECHOS peut faire pour vous simplifier la vie numérique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(feature.category)}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                        {getStatusLabel(feature.status)}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 capitalize">{feature.category}</span>
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      En savoir plus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Captures d'écran Tab */}
        {activeTab === 'screenshots' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Aperçu de l'application</h2>
              <p className="text-xl text-gray-600">Découvrez l'interface intuitive de l'app ECHOS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.filter(f => f.status === 'available').map((feature) => (
                <div key={feature.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-96 bg-gradient-to-br from-indigo-400 to-cyan-500 relative">
                    {/* Mock screenshot */}
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <div className="text-lg font-semibold">{feature.title}</div>
                        <div className="text-sm opacity-80 mt-2">Capture d'écran simulée</div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="w-6 h-1 bg-white bg-opacity-50 rounded"></div>
                      <div className="w-16 h-1 bg-white bg-opacity-50 rounded"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white bg-opacity-60 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* FAQ */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Questions fréquemment posées</h2>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {[
                  {
                    question: "Comment créer un compte sur l'application ?",
                    answer: "Téléchargez l'app depuis votre store préféré et suivez le processus d'inscription simple en utilisant votre email ou numéro de téléphone."
                  },
                  {
                    question: "L'application fonctionne-t-elle hors ligne ?",
                    answer: "Certaines fonctionnalités sont disponibles hors ligne comme la consultation de votre profil et la gestion de vos favoris."
                  },
                  {
                    question: "Mes données sont-elles sécurisées ?",
                    answer: "Absolument ! Nous utilisons un chiffrement de bout en bout et respectons les réglementations de protection des données les plus strictes."
                  },
                  {
                    question: "Comment contacter le support ?",
                    answer: "Utilisez le chat en direct dans l'app, envoyez un email à support@echos.app, ou appelez notre hotline au 01 23 45 67 89."
                  }
                ].map((faq, index) => (
                  <div key={index} className="p-6 border-b border-gray-100 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacter le support</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Chat en direct</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Appeler le support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Envoyer un email</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <HelpCircle className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Centre d'aide</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens utiles</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Guide de démarrage</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Conditions d'utilisation</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Politique de confidentialité</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}