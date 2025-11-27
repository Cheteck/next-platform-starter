'use client'

import { useState } from 'react'
import { 
  Globe, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  MapPin,
  User,
  Search,
  HelpCircle,
  Book,
  Video,
  FileText,
  Users,
  Star,
  Send,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Download,
  Play,
  Volume2,
  VolumeX,
  Languages,
  MessageSquare,
  Calendar,
  Headphones,
  Bot,
  Zap,
  Shield,
  Lock,
  Eye
} from 'lucide-react'

// Types pour le support multilingue
interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  speakers: string
  supportLevel: 'full' | 'partial' | 'beta'
  available: boolean
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  language: string
  views: number
  helpful: number
}

interface SupportChannel {
  id: string
  name: string
  description: string
  icon: any
  availability: {
    status: 'online' | 'offline' | 'busy'
    responseTime: string
    languages: string[]
  }
  action: string
  color: string
}

interface Article {
  id: string
  title: string
  summary: string
  category: string
  language: string
  readTime: number
  views: number
  rating: number
  lastUpdated: string
}

export default function SupportPage() {
  const [activeLanguage, setActiveLanguage] = useState('fr')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'faq' | 'articles' | 'contact' | 'community'>('faq')

  // Données des langues supportées
  const languages: Language[] = [
    { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷', speakers: '80M', supportLevel: 'full', available: true },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', speakers: '1.5B', supportLevel: 'full', available: true },
    { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', speakers: '500M', supportLevel: 'full', available: true },
    { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪', speakers: '95M', supportLevel: 'full', available: true },
    { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', speakers: '85M', supportLevel: 'full', available: true },
    { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇵🇹', speakers: '260M', supportLevel: 'full', available: true },
    { code: 'ar', name: 'العربية', nativeName: 'العربية', flag: '🇸🇦', speakers: '400M', supportLevel: 'partial', available: true },
    { code: 'zh', name: '中文', nativeName: '中文', flag: '🇨🇳', speakers: '1.3B', supportLevel: 'partial', available: true },
    { code: 'ja', name: '日本語', nativeName: '日本語', flag: '🇯🇵', speakers: '125M', supportLevel: 'partial', available: true },
    { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷', speakers: '77M', supportLevel: 'partial', available: true },
    { code: 'ru', name: 'Русский', nativeName: 'Русский', flag: '🇷🇺', speakers: '258M', supportLevel: 'beta', available: true },
    { code: 'hi', name: 'हिन्दी', nativeName: 'हिन्दी', flag: '🇮🇳', speakers: '600M', supportLevel: 'beta', available: true }
  ]

  // FAQ multilingues
  const faqs: FAQ[] = [
    {
      id: '1',
      question: activeLanguage === 'fr' ? 'Comment créer un compte ECHOS ?' : 
                activeLanguage === 'en' ? 'How to create an ECHOS account?' :
                activeLanguage === 'es' ? '¿Cómo crear una cuenta ECHOS?' :
                'Comment créer un compte ECHOS ?',
      answer: activeLanguage === 'fr' ? 'Pour créer un compte ECHOS, cliquez sur "S\'inscrire" et suivez les étapes. Vous pouvez utiliser votre email, numéro de téléphone ou vous connecter via Facebook/Google.' :
            activeLanguage === 'en' ? 'To create an ECHOS account, click "Sign Up" and follow the steps. You can use your email, phone number or sign in via Facebook/Google.' :
            activeLanguage === 'es' ? 'Para crear una cuenta ECHOS, haz clic en "Registrarse" y sigue los pasos. Puedes usar tu email, número de teléfono o iniciar sesión a través de Facebook/Google.' :
            'Pour créer un compte ECHOS, cliquez sur "S\'inscrire" et suivez les étapes.',
      category: 'account',
      language: activeLanguage,
      views: 1245,
      helpful: 89
    },
    {
      id: '2',
      question: activeLanguage === 'fr' ? 'Comment sécuriser mon compte ?' : 
                activeLanguage === 'en' ? 'How to secure my account?' :
                activeLanguage === 'es' ? '¿Cómo asegurar mi cuenta?' :
                'Comment sécuriser mon compte ?',
      answer: activeLanguage === 'fr' ? 'Activez l\'authentification à deux facteurs dans les paramètres de sécurité, utilisez un mot de passe fort et unique, et surveillez régulièrement vos sessions actives.' :
            activeLanguage === 'en' ? 'Enable two-factor authentication in security settings, use a strong and unique password, and regularly monitor your active sessions.' :
            activeLanguage === 'es' ? 'Habilita la autenticación de dos factores en la configuración de seguridad, usa una contraseña fuerte y única, y monitorea regularmente tus sesiones activas.' :
            'Activez l\'authentification à deux facteurs dans les paramètres de sécurité.',
      category: 'security',
      language: activeLanguage,
      views: 987,
      helpful: 76
    },
    {
      id: '3',
      question: activeLanguage === 'fr' ? 'Comment fonctionne le système de paiement ?' : 
                activeLanguage === 'en' ? 'How does the payment system work?' :
                activeLanguage === 'es' ? '¿Cómo funciona el sistema de pago?' :
                'Comment fonctionne le système de paiement ?',
      answer: activeLanguage === 'fr' ? 'ECHOS accepte les cartes bancaires, PayPal, Apple Pay, Google Pay et les virements bancaires. Tous les paiements sont sécurisés par chiffrement SSL.' :
            activeLanguage === 'en' ? 'ECHOS accepts credit cards, PayPal, Apple Pay, Google Pay and bank transfers. All payments are secured by SSL encryption.' :
            activeLanguage === 'es' ? 'ECHOS acepta tarjetas de crédito, PayPal, Apple Pay, Google Pay y transferencias bancarias. Todos los pagos están protegidos por encriptación SSL.' :
            'ECHOS accepte les cartes bancaires, PayPal, Apple Pay, Google Pay et les virements bancaires.',
      category: 'payment',
      language: activeLanguage,
      views: 754,
      helpful: 65
    }
  ]

  // Canaux de support
  const supportChannels: SupportChannel[] = [
    {
      id: '1',
      name: 'Chat en Direct',
      description: 'Assistance immédiate par messagerie instantanée',
      icon: MessageCircle,
      availability: {
        status: 'online',
        responseTime: '< 2 min',
        languages: ['fr', 'en', 'es', 'de']
      },
      action: 'Démarrer le chat',
      color: 'green'
    },
    {
      id: '2',
      name: 'Appel Téléphonique',
      description: 'Support vocal en temps réel',
      icon: Phone,
      availability: {
        status: 'online',
        responseTime: 'Immédiat',
        languages: ['fr', 'en', 'es']
      },
      action: 'Appeler maintenant',
      color: 'blue'
    },
    {
      id: '3',
      name: 'Email Support',
      description: 'Réponse détaillée par email',
      icon: Mail,
      availability: {
        status: 'online',
        responseTime: '< 4h',
        languages: ['fr', 'en', 'es', 'de', 'it', 'pt']
      },
      action: 'Envoyer un email',
      color: 'purple'
    },
    {
      id: '4',
      name: 'Tickets Support',
      description: 'Suivi personnalisé de vos demandes',
      icon: FileText,
      availability: {
        status: 'online',
        responseTime: '< 24h',
        languages: ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh']
      },
      action: 'Créer un ticket',
      color: 'orange'
    },
    {
      id: '5',
      name: 'IA Assistant',
      description: 'Réponses automatiques intelligentes',
      icon: Bot,
      availability: {
        status: 'online',
        responseTime: 'Instantané',
        languages: ['fr', 'en', 'es', 'de', 'it', 'pt', 'ar', 'zh', 'ja', 'ko']
      },
      action: 'Poser une question',
      color: 'indigo'
    },
    {
      id: '6',
      name: 'Support Vidéo',
      description: 'Assistance visuelle par appel vidéo',
      icon: Video,
      availability: {
        status: 'busy',
        responseTime: '< 30 min',
        languages: ['fr', 'en']
      },
      action: 'Réserver un créneau',
      color: 'pink'
    }
  ]

  // Articles d'aide
  const articles: Article[] = [
    {
      id: '1',
      title: activeLanguage === 'fr' ? 'Guide de démarrage rapide' : 
             activeLanguage === 'en' ? 'Quick Start Guide' :
             activeLanguage === 'es' ? 'Guía de Inicio Rápido' :
             'Guide de démarrage rapide',
      summary: activeLanguage === 'fr' ? 'Tout ce que vous devez savoir pour commencer avec ECHOS en quelques minutes.' :
               activeLanguage === 'en' ? 'Everything you need to know to get started with ECHOS in minutes.' :
               activeLanguage === 'es' ? 'Todo lo que necesitas saber para comenzar con ECHOS en minutos.' :
               'Tout ce que vous devez savoir pour commencer avec ECHOS.',
      category: 'getting-started',
      language: activeLanguage,
      readTime: 5,
      views: 2341,
      rating: 4.8,
      lastUpdated: '2025-01-15'
    },
    {
      id: '2',
      title: activeLanguage === 'fr' ? 'Paramètres de confidentialité' : 
             activeLanguage === 'en' ? 'Privacy Settings' :
             activeLanguage === 'es' ? 'Configuración de Privacidad' :
             'Paramètres de confidentialité',
      summary: activeLanguage === 'fr' ? 'Contrôlez qui peut voir vos informations et gérer vos données personnelles.' :
               activeLanguage === 'en' ? 'Control who can see your information and manage your personal data.' :
               activeLanguage === 'es' ? 'Controla quién puede ver tu información y gestiona tus datos personales.' :
               'Contrôlez qui peut voir vos informations et gérer vos données.',
      category: 'privacy',
      language: activeLanguage,
      readTime: 8,
      views: 1876,
      rating: 4.6,
      lastUpdated: '2025-01-10'
    },
    {
      id: '3',
      title: activeLanguage === 'fr' ? 'Sécuriser votre compte' : 
             activeLanguage === 'en' ? 'Securing Your Account' :
             activeLanguage === 'es' ? 'Asegurar tu Cuenta' :
             'Sécuriser votre compte',
      summary: activeLanguage === 'fr' ? 'Meilleures pratiques pour protéger votre compte et vos données.' :
               activeLanguage === 'en' ? 'Best practices to protect your account and data.' :
               activeLanguage === 'es' ? 'Mejores prácticas para proteger tu cuenta y datos.' :
               'Meilleures pratiques pour protéger votre compte.',
      category: 'security',
      language: activeLanguage,
      readTime: 12,
      views: 1456,
      rating: 4.9,
      lastUpdated: '2025-01-08'
    }
  ]

  // Communauté
  const communityStats = {
    totalMembers: '125K',
    activeToday: '8.5K',
    solutions: '15K',
    satisfaction: '94%'
  }

  const getSupportLevelColor = (level: string) => {
    switch (level) {
      case 'full': return 'text-green-600 bg-green-100'
      case 'partial': return 'text-yellow-600 bg-yellow-100'
      case 'beta': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSupportLevelLabel = (level: string) => {
    switch (level) {
      case 'full': return 'Support complet'
      case 'partial': return 'Support partiel'
      case 'beta': return 'Support bêta'
      default: return 'Support non disponible'
    }
  }

  const getChannelStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100'
      case 'busy': return 'text-yellow-600 bg-yellow-100'
      case 'offline': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'getting-started': return <Zap className="w-5 h-5" />
      case 'privacy': return <Shield className="w-5 h-5" />
      case 'security': return <Lock className="w-5 h-5" />
      default: return <HelpCircle className="w-5 h-5" />
    }
  }

  return (
    <div>
      <h1>Support Page</h1>
    </div>
  )
}
