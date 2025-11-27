'use client'

import { useState } from 'react'
import { 
  Shield, 
  UserCheck, 
  UserX, 
  Lock, 
  Unlock,
  Plus,
  Edit,
  Trash2,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Database,
  BarChart3,
  Eye,
  MessageSquare,
  Globe,
  Smartphone,
  DollarSign,
  FileText,
  Calendar
} from 'lucide-react'

interface Permission {
  id: string
  name: string
  description: string
  category: 'content' | 'user' | 'system' | 'financial' | 'moderation'
  level: 'read' | 'write' | 'delete' | 'admin'
}

interface Role {
  id: string
  name: string
  description: string
  color: string
  permissions: string[]
  usersCount: number
  created: string
  lastModified: string
  isDefault: boolean
  isSystem: boolean
}

interface PermissionCategory {
  name: string
  icon: any
  permissions: Permission[]
  color: string
}

export default function AdminRoles() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const [permissions] = useState<PermissionCategory[]>([
    {
      name: 'Contenu & Publications',
      icon: MessageSquare,
      color: 'blue',
      permissions: [
        { id: 'content.read', name: 'Lire les contenus', description: 'Consulter tous les contenus publiés', category: 'content', level: 'read' },
        { id: 'content.create', name: 'Créer du contenu', description: 'Publier de nouveaux contenus', category: 'content', level: 'write' },
        { id: 'content.edit', name: 'Modifier du contenu', description: 'Modifier ses propres contenus', category: 'content', level: 'write' },
        { id: 'content.edit_all', name: 'Modifier tout contenu', description: 'Modifier tous les contenus', category: 'content', level: 'admin' },
        { id: 'content.delete', name: 'Supprimer du contenu', description: 'Supprimer ses propres contenus', category: 'content', level: 'delete' },
        { id: 'content.delete_all', name: 'Supprimer tout contenu', description: 'Supprimer tous les contenus', category: 'content', level: 'delete' },
        { id: 'content.moderate', name: 'Modérer le contenu', description: 'Valider ou rejeter les contenus', category: 'content', level: 'admin' }
      ]
    },
    {
      name: 'Gestion des Utilisateurs',
      icon: Users,
      color: 'green',
      permissions: [
        { id: 'user.read', name: 'Voir les utilisateurs', description: 'Consulter les profils utilisateurs', category: 'user', level: 'read' },
        { id: 'user.create', name: 'Créer des utilisateurs', description: 'Créer de nouveaux comptes', category: 'user', level: 'write' },
        { id: 'user.edit', name: 'Modifier des utilisateurs', description: 'Modifier les profils utilisateurs', category: 'user', level: 'write' },
        { id: 'user.edit_all', name: 'Modifier tous utilisateurs', description: 'Modifier tous les profils', category: 'user', level: 'admin' },
        { id: 'user.delete', name: 'Supprimer des utilisateurs', description: 'Supprimer des comptes', category: 'user', level: 'delete' },
        { id: 'user.ban', name: 'Bannir des utilisateurs', description: 'Suspendre/banir des comptes', category: 'user', level: 'admin' },
        { id: 'user.role_assign', name: 'Assigner des rôles', description: 'Modifier les rôles utilisateurs', category: 'user', level: 'admin' }
      ]
    },
    {
      name: 'Administration Système',
      icon: Settings,
      color: 'purple',
      permissions: [
        { id: 'system.read', name: 'Voir la configuration', description: 'Consulter les paramètres système', category: 'system', level: 'read' },
        { id: 'system.edit', name: 'Modifier la configuration', description: 'Modifier les paramètres généraux', category: 'system', level: 'admin' },
        { id: 'system.backup', name: 'Sauvegarder', description: 'Créer des sauvegardes', category: 'system', level: 'admin' },
        { id: 'system.maintenance', name: 'Maintenance', description: 'Activer le mode maintenance', category: 'system', level: 'admin' },
        { id: 'system.logs', name: 'Consult logs', description: 'Voir les journaux système', category: 'system', level: 'read' },
        { id: 'system.api', name: 'Gestion API', description: 'Gérer les clés API', category: 'system', level: 'admin' }
      ]
    },
    {
      name: 'Modération & Sécurité',
      icon: Shield,
      color: 'red',
      permissions: [
        { id: 'moderation.read', name: 'Voir les signalements', description: 'Consulter les contenus signalés', category: 'moderation', level: 'read' },
        { id: 'moderation.approve', name: 'Approuver le contenu', description: 'Valider les contenus en attente', category: 'moderation', level: 'admin' },
        { id: 'moderation.reject', name: 'Rejeter le contenu', description: 'Rejeter les contenus', category: 'moderation', level: 'admin' },
        { id: 'moderation.ban', name: 'Bannir temporairement', description: 'Suspendre des utilisateurs', category: 'moderation', level: 'admin' },
        { id: 'security.audit', name: 'Audit de sécurité', description: 'Consulter les audits', category: 'moderation', level: 'read' },
        { id: 'security.config', name: 'Configuration sécurité', description: 'Modifier les paramètres de sécurité', category: 'moderation', level: 'admin' }
      ]
    },
    {
      name: 'Finance & Analytics',
      icon: DollarSign,
      color: 'yellow',
      permissions: [
        { id: 'financial.read', name: 'Voir les finances', description: 'Consulter les statistiques financières', category: 'financial', level: 'read' },
        { id: 'financial.edit', name: 'Modifier les prix', description: 'Modifier les tarifs', category: 'financial', level: 'admin' },
        { id: 'financial.refunds', name: 'Gérer les remboursements', description: 'Traiter les demandes de remboursement', category: 'financial', level: 'admin' },
        { id: 'analytics.read', name: 'Voir les analytics', description: 'Consulter les statistiques', category: 'financial', level: 'read' },
        { id: 'analytics.export', name: 'Exporter les données', description: 'Exporter les analytics', category: 'financial', level: 'write' }
      ]
    }
  ])

  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Accès complet à toutes les fonctionnalités',
      color: 'red',
      permissions: permissions.flatMap(cat => cat.permissions).map(p => p.id),
      usersCount: 2,
      created: '2023-01-01',
      lastModified: '2025-11-25',
      isDefault: false,
      isSystem: true
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administration générale de la plateforme',
      color: 'purple',
      permissions: [
        'content.read', 'content.create', 'content.edit', 'content.edit_all', 'content.delete', 'content.delete_all',
        'user.read', 'user.create', 'user.edit', 'user.edit_all', 'user.ban', 'user.role_assign',
        'system.read', 'system.backup', 'system.logs',
        'moderation.read', 'moderation.approve', 'moderation.reject', 'moderation.ban',
        'financial.read', 'analytics.read'
      ],
      usersCount: 5,
      created: '2023-01-01',
      lastModified: '2025-11-20',
      isDefault: false,
      isSystem: true
    },
    {
      id: '3',
      name: 'Modérateur',
      description: 'Modération du contenu et des utilisateurs',
      color: 'blue',
      permissions: [
        'content.read', 'content.create', 'content.edit', 'content.moderate',
        'user.read', 'user.edit',
        'moderation.read', 'moderation.approve', 'moderation.reject', 'moderation.ban',
        'analytics.read'
      ],
      usersCount: 12,
      created: '2023-01-15',
      lastModified: '2025-11-18',
      isDefault: false,
      isSystem: false
    },
    {
      id: '4',
      name: 'VIP',
      description: 'Utilisateur premium avec fonctionnalités étendues',
      color: 'yellow',
      permissions: [
        'content.read', 'content.create', 'content.edit',
        'user.read', 'user.edit',
        'analytics.read'
      ],
      usersCount: 156,
      created: '2023-02-01',
      lastModified: '2025-11-15',
      isDefault: true,
      isSystem: false
    },
    {
      id: '5',
      name: 'Premium',
      description: 'Utilisateur premium standard',
      color: 'indigo',
      permissions: [
        'content.read', 'content.create', 'content.edit',
        'user.read', 'user.edit',
        'analytics.read'
      ],
      usersCount: 234,
      created: '2023-02-01',
      lastModified: '2025-11-10',
      isDefault: true,
      isSystem: false
    },
    {
      id: '6',
      name: 'Utilisateur',
      description: 'Utilisateur standard de la plateforme',
      color: 'gray',
      permissions: [
        'content.read', 'content.create', 'content.edit',
        'user.read', 'user.edit'
      ],
      usersCount: 1245,
      created: '2023-01-01',
      lastModified: '2025-11-01',
      isDefault: true,
      isSystem: true
    }
  ])

  const getRoleColor = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-800 border-red-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const getPermissionLevelIcon = (level: string) => {
    switch (level) {
      case 'read':
        return <Eye className="w-4 h-4 text-blue-500" />
      case 'write':
        return <Edit className="w-4 h-4 text-green-500" />
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-500" />
      case 'admin':
        return <Settings className="w-4 h-4 text-purple-500" />
      default:
        return <Eye className="w-4 h-4 text-gray-500" />
    }
  }

  const getPermissionLevelColor = (level: string) => {
    switch (level) {
      case 'read':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'write':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'delete':
        return 'bg-red-50 text-red-700 border-red-200'
      case 'admin':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getPermissionLevelText = (level: string) => {
    switch (level) {
      case 'read':
        return 'Lecture'
      case 'write':
        return 'Écriture'
      case 'delete':
        return 'Suppression'
      case 'admin':
        return 'Administration'
      default:
        return level
    }
  }

  const selectedRoleData = roles.find(r => r.id === selectedRole)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Rôles & Permissions</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Système de rôles avec permissions granulaires
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Rôle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Roles List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Rôles Existants</h3>
                <p className="text-sm text-gray-600">Sélectionnez un rôle pour voir ses permissions</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                        selectedRole === role.id 
                          ? 'border-blue-300 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(role.color)}`}>
                            {role.name}
                          </div>
                          {role.isDefault && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                              Défaut
                            </span>
                          )}
                          {role.isSystem && (
                            <span title="Rôle système">
                              <Lock className="w-4 h-4 text-gray-400" />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {role.usersCount} utilisateurs
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{role.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {role.permissions.length} permissions
                        </span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setEditingRole(role)
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {!role.isSystem && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Delete role:', role.id)
                              }}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Details */}
          <div className="lg:col-span-2">
            {selectedRoleData ? (
              <div className="space-y-6">
                {/* Role Overview */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(selectedRoleData.color)}`}>
                        {selectedRoleData.name}
                      </div>
                      {selectedRoleData.isDefault && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Rôle par défaut
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingRole(selectedRoleData)}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedRoleData.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Utilisateurs:</span>
                      <span className="ml-2 font-medium">{selectedRoleData.usersCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Permissions:</span>
                      <span className="ml-2 font-medium">{selectedRoleData.permissions.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Créé:</span>
                      <span className="ml-2">{new Date(selectedRoleData.created).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Modifié:</span>
                      <span className="ml-2">{new Date(selectedRoleData.lastModified).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>

                {/* Permissions by Category */}
                <div className="space-y-6">
                  {permissions.map((category) => {
                    const categoryPermissions = category.permissions.filter(p => 
                      selectedRoleData.permissions.includes(p.id)
                    )
                    
                    if (categoryPermissions.length === 0) return null

                    return (
                      <div key={category.name} className="bg-white rounded-lg shadow-sm border">
                        <div className="p-6 border-b">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              category.color === 'blue' ? 'bg-blue-100' :
                              category.color === 'green' ? 'bg-green-100' :
                              category.color === 'purple' ? 'bg-purple-100' :
                              category.color === 'red' ? 'bg-red-100' :
                              category.color === 'yellow' ? 'bg-yellow-100' : 'bg-gray-100'
                            }`}>
                              <category.icon className={`w-5 h-5 ${
                                category.color === 'blue' ? 'text-blue-600' :
                                category.color === 'green' ? 'text-green-600' :
                                category.color === 'purple' ? 'text-purple-600' :
                                category.color === 'red' ? 'text-red-600' :
                                category.color === 'yellow' ? 'text-yellow-600' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-600">{categoryPermissions.length} permissions accordées</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="space-y-3">
                            {categoryPermissions.map((permission) => (
                              <div key={permission.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  {getPermissionLevelIcon(permission.level)}
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">{permission.name}</h4>
                                    <p className="text-xs text-gray-600">{permission.description}</p>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPermissionLevelColor(permission.level)}`}>
                                  {getPermissionLevelText(permission.level)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez un rôle</h3>
                <p className="text-gray-600">
                  Choisissez un rôle dans la liste de gauche pour voir ses permissions détaillées.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Rôles</p>
                <p className="text-2xl font-semibold text-gray-900">{roles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Permissions</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {permissions.reduce((acc, cat) => acc + cat.permissions.length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs Totaux</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {roles.reduce((acc, role) => acc + role.usersCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Catégories</p>
                <p className="text-2xl font-semibold text-gray-900">{permissions.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}