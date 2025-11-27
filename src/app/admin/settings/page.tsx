'use client'

import { useState } from 'react'
import { 
  Settings, 
  Globe, 
  Palette, 
  Shield, 
  Bell, 
  Mail, 
  Smartphone,
  Database,
  Server,
  Key,
  Save,
  RefreshCw,
  Upload,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Info,
  Monitor,
  Smartphone as MobileIcon,
  Globe as GlobeIcon
} from 'lucide-react'

interface PlatformConfig {
  general: {
    platformName: string
    platformDescription: string
    platformUrl: string
    supportEmail: string
    timezone: string
    language: string
    currency: string
    maintenanceMode: boolean
    registrationEnabled: boolean
    emailVerificationRequired: boolean
  }
  appearance: {
    theme: 'light' | 'dark' | 'auto'
    primaryColor: string
    secondaryColor: string
    logo: string
    favicon: string
    companyName: string
    companyLogo: string
  }
  security: {
    passwordMinLength: number
    passwordRequireSpecial: boolean
    twoFactorRequired: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    allowMultipleSessions: boolean
    ipWhitelist: string[]
    sslRequired: boolean
  }
  notifications: {
    emailEnabled: boolean
    smsEnabled: boolean
    pushEnabled: boolean
    emailNotifications: {
      newUser: boolean
      newPost: boolean
      moderationRequired: boolean
      paymentReceived: boolean
      securityAlert: boolean
    }
    smsNotifications: {
      criticalAlerts: boolean
      paymentReceived: boolean
    }
  }
  features: {
    chatEnabled: boolean
    videoCallsEnabled: boolean
    marketplaceEnabled: boolean
    eventsEnabled: boolean
    groupsEnabled: boolean
    blogEnabled: boolean
    premiumFeaturesEnabled: boolean
    aiFeaturesEnabled: boolean
  }
  storage: {
    maxFileSize: number
    allowedFileTypes: string[]
    storageProvider: 'local' | 'cloud'
    cdnEnabled: boolean
    imageQuality: number
  }
  api: {
    rateLimitPerMinute: number
    rateLimitPerHour: number
    apiKeysEnabled: boolean
    corsEnabled: boolean
    corsOrigins: string[]
  }
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showApiKeys, setShowApiKeys] = useState(false)

  const [config, setConfig] = useState<PlatformConfig>({
    general: {
      platformName: 'ECHOS',
      platformDescription: 'Réseau social moderne et interactif',
      platformUrl: 'https://echos.app',
      supportEmail: 'support@echos.app',
      timezone: 'Europe/Paris',
      language: 'fr',
      currency: 'EUR',
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#3B82F6',
      secondaryColor: '#6B7280',
      logo: '/logo.png',
      favicon: '/favicon.ico',
      companyName: 'ECHOS Technologies',
      companyLogo: '/company-logo.png'
    },
    security: {
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      twoFactorRequired: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      allowMultipleSessions: true,
      ipWhitelist: ['127.0.0.1'],
      sslRequired: true
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
      emailNotifications: {
        newUser: true,
        newPost: true,
        moderationRequired: true,
        paymentReceived: true,
        securityAlert: true
      },
      smsNotifications: {
        criticalAlerts: true,
        paymentReceived: true
      }
    },
    features: {
      chatEnabled: true,
      videoCallsEnabled: true,
      marketplaceEnabled: true,
      eventsEnabled: true,
      groupsEnabled: true,
      blogEnabled: true,
      premiumFeaturesEnabled: true,
      aiFeaturesEnabled: true
    },
    storage: {
      maxFileSize: 10,
      allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
      storageProvider: 'cloud',
      cdnEnabled: true,
      imageQuality: 80
    },
    api: {
      rateLimitPerMinute: 60,
      rateLimitPerHour: 1000,
      apiKeysEnabled: true,
      corsEnabled: true,
      corsOrigins: ['https://echos.app', 'https://www.echos.app']
    }
  })

  const tabs = [
    { id: 'general', name: 'Général', icon: Settings },
    { id: 'appearance', name: 'Apparence', icon: Palette },
    { id: 'security', name: 'Sécurité', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'features', name: 'Fonctionnalités', icon: CheckCircle },
    { id: 'storage', name: 'Stockage', icon: Database },
    { id: 'api', name: 'API', icon: Key }
  ]

  const updateConfig = (section: keyof PlatformConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
    setHasUnsavedChanges(true)
  }

  const saveConfig = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setHasUnsavedChanges(false)
    setIsLoading(false)
  }

  const resetConfig = () => {
    setHasUnsavedChanges(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Configuration de la Plateforme</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Paramètres généraux et configuration du système
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center text-yellow-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Modifications non sauvegardées</span>
                  </div>
                )}
                <button
                  onClick={resetConfig}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  disabled={!hasUnsavedChanges}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réinitialiser
                </button>
                <button
                  onClick={saveConfig}
                  disabled={!hasUnsavedChanges || isLoading}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter Config
                </button>
                <button className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Upload className="w-4 h-4 mr-2" />
                  Importer Config
                </button>
                <button className="w-full flex items-center justify-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Factory
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres Généraux</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom de la plateforme
                        </label>
                        <input
                          type="text"
                          value={config.general.platformName}
                          onChange={(e) => updateConfig('general', 'platformName', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL de la plateforme
                        </label>
                        <input
                          type="url"
                          value={config.general.platformUrl}
                          onChange={(e) => updateConfig('general', 'platformUrl', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={config.general.platformDescription}
                        onChange={(e) => updateConfig('general', 'platformDescription', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email de support
                        </label>
                        <input
                          type="email"
                          value={config.general.supportEmail}
                          onChange={(e) => updateConfig('general', 'supportEmail', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fuseau horaire
                        </label>
                        <select
                          value={config.general.timezone}
                          onChange={(e) => updateConfig('general', 'timezone', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Europe/Paris">Europe/Paris</option>
                          <option value="Europe/London">Europe/London</option>
                          <option value="America/New_York">America/New_York</option>
                          <option value="Asia/Tokyo">Asia/Tokyo</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Langue par défaut
                        </label>
                        <select
                          value={config.general.language}
                          onChange={(e) => updateConfig('general', 'language', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Devise
                        </label>
                        <select
                          value={config.general.currency}
                          onChange={(e) => updateConfig('general', 'currency', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD ($)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">État du Système</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Info className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="text-sm text-gray-700">Mode maintenance</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={config.general.maintenanceMode}
                              onChange={(e) => updateConfig('general', 'maintenanceMode', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700">Inscriptions activées</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={config.general.registrationEnabled}
                              onChange={(e) => updateConfig('general', 'registrationEnabled', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Shield className="w-5 h-5 text-purple-500 mr-2" />
                            <span className="text-sm text-gray-700">Vérification email obligatoire</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={config.general.emailVerificationRequired}
                              onChange={(e) => updateConfig('general', 'emailVerificationRequired', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Apparence & Thème</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Thème
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { value: 'light', name: 'Clair', icon: Sun },
                          { value: 'dark', name: 'Sombre', icon: Moon },
                          { value: 'auto', name: 'Automatique', icon: Monitor }
                        ].map((theme) => (
                          <button
                            key={theme.value}
                            onClick={() => updateConfig('appearance', 'theme', theme.value)}
                            className={`p-4 border-2 rounded-lg text-left ${
                              config.appearance.theme === theme.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <theme.icon className="w-6 h-6 text-gray-600" />
                              <span className="font-medium text-gray-900">{theme.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Couleur principale
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={config.appearance.primaryColor}
                            onChange={(e) => updateConfig('appearance', 'primaryColor', e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.appearance.primaryColor}
                            onChange={(e) => updateConfig('appearance', 'primaryColor', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Couleur secondaire
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={config.appearance.secondaryColor}
                            onChange={(e) => updateConfig('appearance', 'secondaryColor', e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={config.appearance.secondaryColor}
                            onChange={(e) => updateConfig('appearance', 'secondaryColor', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Logo de la plateforme
                        </label>
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <Upload className="w-6 h-6 text-gray-400" />
                          </div>
                          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                            Choisir fichier
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Favicon
                        </label>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                            <Upload className="w-4 h-4 text-gray-400" />
                          </div>
                          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                            Choisir fichier
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom de l'entreprise
                      </label>
                      <input
                        type="text"
                        value={config.appearance.companyName}
                        onChange={(e) => updateConfig('appearance', 'companyName', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres de Sécurité</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Longueur minimale du mot de passe
                        </label>
                        <input
                          type="number"
                          min="6"
                          max="32"
                          value={config.security.passwordMinLength}
                          onChange={(e) => updateConfig('security', 'passwordMinLength', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Durée de session (minutes)
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="1440"
                          value={config.security.sessionTimeout}
                          onChange={(e) => updateConfig('security', 'sessionTimeout', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tentatives de connexion max
                        </label>
                        <input
                          type="number"
                          min="3"
                          max="10"
                          value={config.security.maxLoginAttempts}
                          onChange={(e) => updateConfig('security', 'maxLoginAttempts', parseInt(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Options de sécurité
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Caractères spéciaux requis</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={config.security.passwordRequireSpecial}
                                onChange={(e) => updateConfig('security', 'passwordRequireSpecial', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Authentification 2FA obligatoire</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={config.security.twoFactorRequired}
                                onChange={(e) => updateConfig('security', 'twoFactorRequired', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Sessions multiples autorisées</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={config.security.allowMultipleSessions}
                                onChange={(e) => updateConfig('security', 'allowMultipleSessions', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">SSL/HTTPS obligatoire</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={config.security.sslRequired}
                                onChange={(e) => updateConfig('security', 'sslRequired', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Whitelist IP (une par ligne)
                      </label>
                      <textarea
                        value={config.security.ipWhitelist.join('\n')}
                        onChange={(e) => updateConfig('security', 'ipWhitelist', e.target.value.split('\n').filter(ip => ip.trim()))}
                        rows={4}
                        placeholder="192.168.1.1&#10;10.0.0.1&#10;..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Laissez vide pour autoriser toutes les IP
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Continue with other tabs... */}
              {/* For brevity, I'll show just these three tabs */}

              {/* Placeholder for other tabs */}
              {activeTab !== 'general' && activeTab !== 'appearance' && activeTab !== 'security' && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Configuration {tabs.find(t => t.id === activeTab)?.name}
                  </h3>
                  <p className="text-gray-600">
                    Cette section sera développée dans une future version.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock icons for theme buttons (since they're not imported)
function Sun({ className }: { className: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" strokeWidth={2} />
    <path strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
}

function Moon({ className }: { className: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
  </svg>
}