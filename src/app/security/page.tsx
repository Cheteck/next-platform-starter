'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  Users, 
  MapPin,
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Settings,
  Bell,
  BellOff,
  Wifi,
  WifiOff,
  Monitor,
  Smartphone as MobileIcon,
  Globe,
  KeyRound,
  RefreshCw,
  Download,
  ExternalLink,
  UserX,
  Ban,
  AlertCircle,
  HelpCircle,
  FileText,
  Camera,
  Mic,
  MicOff,
  Monitor as MonitorIcon
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface SecurityDevice {
  id: string;
  name: string;
  type: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  location: string;
  lastActive: Date;
  isCurrent: boolean;
  ipAddress: string;
  trusted: boolean;
}

interface LoginSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  startedAt: Date;
  lastActivity: Date;
  isActive: boolean;
  status: 'active' | 'suspicious' | 'ended';
}

interface SecurityAlert {
  id: string;
  type: 'login' | 'password' | 'device' | 'activity' | 'suspicious';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  actionRequired: boolean;
  actionTaken?: string;
}

interface TwoFactorAuth {
  enabled: boolean;
  method: 'sms' | 'app' | 'email';
  backupCodes: number;
  lastUsed?: Date;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showOnlineStatus: boolean;
  allowMessages: 'everyone' | 'friends' | 'none';
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
  dataDownload: boolean;
  dataDeletion: boolean;
}

interface SecurityMetrics {
  loginAttempts: {
    successful: number;
    failed: number;
    blocked: number;
  };
  activeSessions: number;
  trustedDevices: number;
  twoFactorEnabled: boolean;
  lastPasswordChange: Date;
  securityScore: number;
}

// Mock data
const mockDevices: SecurityDevice[] = [
  {
    id: 'device-1',
    name: 'MacBook Pro - Chrome',
    type: 'desktop',
    browser: 'Chrome 120',
    os: 'macOS Sonoma 14.1',
    location: 'Paris, France',
    lastActive: new Date(),
    isCurrent: true,
    ipAddress: '192.168.1.100',
    trusted: true
  },
  {
    id: 'device-2',
    name: 'iPhone 15 Pro - Safari',
    type: 'mobile',
    browser: 'Safari Mobile',
    os: 'iOS 17.2',
    location: 'Paris, France',
    lastActive: new Date(Date.now() - 3600000),
    isCurrent: false,
    ipAddress: '192.168.1.101',
    trusted: true
  },
  {
    id: 'device-3',
    name: 'Windows PC - Edge',
    type: 'desktop',
    browser: 'Edge 120',
    os: 'Windows 11',
    location: 'Lyon, France',
    lastActive: new Date(Date.now() - 86400000 * 2),
    isCurrent: false,
    ipAddress: '192.168.2.105',
    trusted: false
  }
];

const mockSessions: LoginSession[] = [
  {
    id: 'session-1',
    device: 'MacBook Pro - Chrome',
    browser: 'Chrome 120',
    location: 'Paris, France',
    ipAddress: '192.168.1.100',
    startedAt: new Date(Date.now() - 3600000),
    lastActivity: new Date(),
    isActive: true,
    status: 'active'
  },
  {
    id: 'session-2',
    device: 'iPhone 15 Pro - Safari',
    browser: 'Safari Mobile',
    location: 'Paris, France',
    ipAddress: '192.168.1.101',
    startedAt: new Date(Date.now() - 7200000),
    lastActivity: new Date(Date.now() - 1800000),
    isActive: true,
    status: 'active'
  }
];

const mockAlerts: SecurityAlert[] = [
  {
    id: 'alert-1',
    type: 'login',
    severity: 'high',
    title: 'Nouvelle connexion depuis un nouvel appareil',
    description: 'Une connexion a été détectée depuis un ordinateur Windows à Lyon.',
    timestamp: new Date(Date.now() - 3600000 * 2),
    isRead: false,
    actionRequired: true
  },
  {
    id: 'alert-2',
    type: 'device',
    severity: 'medium',
    title: 'Tentative d\'accès depuis un lieu inconnu',
    description: 'Une tentative de connexion a été détectée depuis Madrid, Espagne.',
    timestamp: new Date(Date.now() - 3600000 * 6),
    isRead: true,
    actionRequired: false,
    actionTaken: 'Accès bloqué automatiquement'
  }
];

const mockTwoFactor: TwoFactorAuth = {
  enabled: true,
  method: 'app',
  backupCodes: 6,
  lastUsed: new Date(Date.now() - 86400000 * 3)
};

const mockPrivacySettings: PrivacySettings = {
  profileVisibility: 'friends',
  showOnlineStatus: true,
  allowMessages: 'friends',
  showEmail: false,
  showPhone: false,
  showLocation: false,
  dataDownload: true,
  dataDeletion: false
};

const mockMetrics: SecurityMetrics = {
  loginAttempts: {
    successful: 45,
    failed: 3,
    blocked: 1
  },
  activeSessions: 2,
  trustedDevices: 3,
  twoFactorEnabled: true,
  lastPasswordChange: new Date(Date.now() - 86400000 * 30),
  securityScore: 85
};

// Components
const DeviceCard: React.FC<{
  device: SecurityDevice;
  onTrust: (deviceId: string) => void;
  onRevoke: (deviceId: string) => void;
}> = ({ device, onTrust, onRevoke }) => {
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'desktop':
        return <Monitor className="text-blue-500" size={24} />;
      case 'mobile':
        return <MobileIcon className="text-green-500" size={24} />;
      case 'tablet':
        return <MonitorIcon className="text-purple-500" size={24} />;
      default:
        return <Monitor className="text-gray-500" size={24} />;
    }
  };

  const formatLastActive = (date: Date) => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `il y a ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `il y a ${Math.floor(diffInMinutes / 60)} h`;
    } else {
      return `il y a ${Math.floor(diffInMinutes / 1440)} j`;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getDeviceIcon()}
          <div>
            <h3 className="font-medium text-gray-900">{device.name}</h3>
            <p className="text-sm text-gray-600">
              {device.browser} • {device.location}
            </p>
            <p className="text-xs text-gray-500">
              Dernière activité: {formatLastActive(device.lastActive)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {device.isCurrent && (
            <Badge className="bg-green-100 text-green-800">Actuel</Badge>
          )}
          {device.trusted ? (
            <Badge className="bg-blue-100 text-blue-800">Fiable</Badge>
          ) : (
            <Badge className="bg-orange-100 text-orange-800">Non fiable</Badge>
          )}
          
          <div className="flex space-x-1">
            {!device.trusted && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onTrust(device.id)}
              >
                <CheckCircle size={16} />
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onRevoke(device.id)}
              disabled={device.isCurrent}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SecurityAlertCard: React.FC<{
  alert: SecurityAlert;
  onMarkAsRead: (alertId: string) => void;
  onAction: (alertId: string) => void;
}> = ({ alert, onMarkAsRead, onAction }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = () => {
    switch (alert.type) {
      case 'login':
        return <KeyRound className="text-blue-500" size={16} />;
      case 'password':
        return <Lock className="text-orange-500" size={16} />;
      case 'device':
        return <Monitor className="text-green-500" size={16} />;
      case 'activity':
        return <Eye className="text-purple-500" size={16} />;
      case 'suspicious':
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  return (
    <Card className="p-4 border-l-4 border-l-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {getSeverityIcon()}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-medium text-gray-900">{alert.title}</h3>
              <Badge className={getSeverityColor(alert.severity)}>
                {alert.severity === 'critical' ? 'Critique' :
                 alert.severity === 'high' ? 'Élevée' :
                 alert.severity === 'medium' ? 'Moyenne' : 'Faible'}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
            <p className="text-xs text-gray-500">
              {alert.timestamp.toLocaleDateString('fr-FR')} à {alert.timestamp.toLocaleTimeString('fr-FR')}
            </p>
            {alert.actionTaken && (
              <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-700">
                <strong>Action prise:</strong> {alert.actionTaken}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {alert.actionRequired && (
            <Button size="sm" onClick={() => onAction(alert.id)}>
              Agir
            </Button>
          )}
          {!alert.isRead && (
            <Button size="sm" variant="outline" onClick={() => onMarkAsRead(alert.id)}>
              Marquer lu
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default function SecurityCenterPage() {
  const [devices] = useState<SecurityDevice[]>(mockDevices);
  const [sessions] = useState<LoginSession[]>(mockSessions);
  const [alerts, setAlerts] = useState<SecurityAlert[]>(mockAlerts);
  const [twoFactor, setTwoFactor] = useState<TwoFactorAuth>(mockTwoFactor);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(mockPrivacySettings);
  const [metrics] = useState<SecurityMetrics>(mockMetrics);
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'sessions' | 'alerts' | 'privacy' | 'twofactor'>('overview');
  const [showPassword, setShowPassword] = useState(false);

  const handleTrustDevice = (deviceId: string) => {
    console.log('Trusting device:', deviceId);
  };

  const handleRevokeDevice = (deviceId: string) => {
    console.log('Revoking device:', deviceId);
  };

  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const handleAlertAction = (alertId: string) => {
    console.log('Taking action on alert:', alertId);
  };

  const toggleTwoFactor = () => {
    setTwoFactor({
      ...twoFactor,
      enabled: !twoFactor.enabled
    });
  };

  const getSecurityLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', icon: Shield };
    if (score >= 60) return { level: 'Bon', color: 'text-blue-600', icon: Shield };
    if (score >= 40) return { level: 'Moyen', color: 'text-yellow-600', icon: Shield };
    return { level: 'Faible', color: 'text-red-600', icon: Shield };
  };

  const securityLevel = getSecurityLevel(metrics.securityScore);
  const IconComponent = securityLevel.icon;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Shield className="mr-3 text-blue-500" size={32} />
                Centre de Sécurité
              </h1>
              <p className="text-gray-600">
                Gérez vos paramètres de sécurité et surveillez l'activité de votre compte.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw size={16} className="mr-2" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Exporter données
              </Button>
            </div>
          </div>
        </div>

        {/* Security Score */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Score de Sécurité</h2>
              <p className="text-gray-600 mb-4">
                Votre niveau de sécurité général basé sur les paramètres actifs.
              </p>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${securityLevel.color}`}>
                  <IconComponent size={24} />
                  <span className="text-2xl font-bold">{metrics.securityScore}/100</span>
                </div>
                <Badge className="bg-white text-gray-800">
                  Niveau {securityLevel.level}
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <div className="w-24 h-24 relative">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray={`${metrics.securityScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="text-blue-500" size={20} />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Lock className="mx-auto text-blue-500 mb-2" size={24} />
            <p className="font-medium text-gray-900">Changer mot de passe</p>
            <p className="text-sm text-gray-600 mt-1">Dernière modification il y a 30j</p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Key className="mx-auto text-green-500 mb-2" size={24} />
            <p className="font-medium text-gray-900">2FA</p>
            <p className="text-sm text-gray-600 mt-1">
              {twoFactor.enabled ? 'Activé' : 'Désactivé'}
            </p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Monitor className="mx-auto text-purple-500 mb-2" size={24} />
            <p className="font-medium text-gray-900">Appareils connectés</p>
            <p className="text-sm text-gray-600 mt-1">{devices.length} appareils</p>
          </Card>
          
          <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <AlertTriangle className="mx-auto text-red-500 mb-2" size={24} />
            <p className="font-medium text-gray-900">Alertes</p>
            <p className="text-sm text-gray-600 mt-1">
              {alerts.filter(a => !a.isRead).length} non lues
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Vue d\'ensemble' },
                { id: 'devices', label: 'Appareils' },
                { id: 'sessions', label: 'Sessions' },
                { id: 'alerts', label: 'Alertes' },
                { id: 'privacy', label: 'Confidentialité' },
                { id: 'twofactor', label: 'Authentification 2FA' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité de connexion</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Connexions réussies</span>
                    <span className="font-medium text-green-600">{metrics.loginAttempts.successful}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tentatives échouées</span>
                    <span className="font-medium text-red-600">{metrics.loginAttempts.failed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Connexions bloquées</span>
                    <span className="font-medium text-orange-600">{metrics.loginAttempts.blocked}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité du compte</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">2FA activé</span>
                    {twoFactor.enabled ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <X className="text-red-500" size={20} />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sessions actives</span>
                    <span className="font-medium">{metrics.activeSessions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Appareils de confiance</span>
                    <span className="font-medium">{metrics.trustedDevices}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Appareils connectés</h3>
              <Button variant="outline" size="sm">
                <RefreshCw size={16} className="mr-2" />
                Actualiser
              </Button>
            </div>
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onTrust={handleTrustDevice}
                onRevoke={handleRevokeDevice}
              />
            ))}
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Sessions actives</h3>
              <Button variant="outline" size="sm" className="text-red-600">
                <UserX size={16} className="mr-2" />
                Terminer toutes les sessions
              </Button>
            </div>
            {sessions.map((session) => (
              <Card key={session.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{session.device}</h4>
                    <p className="text-sm text-gray-600">
                      {session.browser} • {session.location} • IP: {session.ipAddress}
                    </p>
                    <p className="text-xs text-gray-500">
                      Démarrée le {session.startedAt.toLocaleDateString('fr-FR')} à {session.startedAt.toLocaleTimeString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {session.isActive && (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    )}
                    <Button size="sm" variant="outline">
                      Terminer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Alertes de sécurité</h3>
              <Button variant="outline" size="sm">
                <Settings size={16} className="mr-2" />
                Paramètres alertes
              </Button>
            </div>
            {alerts.map((alert) => (
              <SecurityAlertCard
                key={alert.id}
                alert={alert}
                onMarkAsRead={handleMarkAlertAsRead}
                onAction={handleAlertAction}
              />
            ))}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de confidentialité</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibilité du profil
                  </label>
                  <select 
                    value={privacySettings.profileVisibility}
                    onChange={(e) => setPrivacySettings({
                      ...privacySettings,
                      profileVisibility: e.target.value as any
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Amis uniquement</option>
                    <option value="private">Privé</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Afficher le statut en ligne</span>
                  <button
                    onClick={() => setPrivacySettings({
                      ...privacySettings,
                      showOnlineStatus: !privacySettings.showOnlineStatus
                    })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      privacySettings.showOnlineStatus ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      privacySettings.showOnlineStatus ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-gray-700 mb-2">
                    Autoriser les messages de
                  </label>
                  <select 
                    value={privacySettings.allowMessages}
                    onChange={(e) => setPrivacySettings({
                      ...privacySettings,
                      allowMessages: e.target.value as any
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="everyone">Tout le monde</option>
                    <option value="friends">Amis uniquement</option>
                    <option value="none">Personne</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Afficher l'email</span>
                  <button
                    onClick={() => setPrivacySettings({
                      ...privacySettings,
                      showEmail: !privacySettings.showEmail
                    })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      privacySettings.showEmail ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      privacySettings.showEmail ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestion des données</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download size={16} className="mr-2" />
                  Télécharger mes données
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600">
                  <FileText size={16} className="mr-2" />
                  Demander la suppression de mes données
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'twofactor' && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-600">
                    Sécurisez votre compte avec une couche de protection supplémentaire.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {twoFactor.enabled ? (
                    <Badge className="bg-green-100 text-green-800">Activé</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Désactivé</Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {twoFactor.enabled ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="font-medium text-green-800">2FA activé</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Méthode: Application d'authentification
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      Codes de sauvegarde restants: {twoFactor.backupCodes}
                    </p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="text-yellow-500" size={20} />
                      <span className="font-medium text-yellow-800">2FA non configuré</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Activez l'authentification à deux facteurs pour sécuriser votre compte.
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  {twoFactor.enabled ? (
                    <>
                      <Button variant="outline">
                        <Key size={16} className="mr-2" />
                        Gérer les codes
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600"
                        onClick={toggleTwoFactor}
                      >
                        Désactiver 2FA
                      </Button>
                    </>
                  ) : (
                    <Button onClick={toggleTwoFactor}>
                      <Key size={16} className="mr-2" />
                      Configurer 2FA
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            
            {twoFactor.enabled && (
              <Card className="p-6">
                <h4 className="font-medium text-gray-900 mb-3">Options de récupération</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw size={16} className="mr-2" />
                    Régénérer les codes de sauvegarde
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Smartphone size={16} className="mr-2" />
                    Changer de méthode d'authentification
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-3">
            <HelpCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Besoin d'aide avec la sécurité ?
              </h3>
              <p className="text-blue-700 mb-4">
                Notre équipe support est disponible pour vous accompagner dans la configuration de votre sécurité.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Centre d'aide
                </Button>
                <Button variant="outline" size="sm">
                  Contacter le support
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink size={16} className="mr-1" />
                  Guide sécurité
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}