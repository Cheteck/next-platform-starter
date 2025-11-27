'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  Calendar,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  status: 'active' | 'inactive' | 'suspended' | 'pending'
  role: 'admin' | 'moderator' | 'vip' | 'user' | 'premium'
  joinDate: string
  lastActive: string
  postsCount: number
  followers: number
  following: number
  verified: boolean
  country: string
  age?: number
  interests: string[]
}

interface UserFilters {
  status: string
  role: string
  country: string
  dateRange: string
  search: string
}

export default function AdminUsers() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice.martin@email.com',
      phone: '+33 6 12 34 56 78',
      avatar: '/avatars/alice.jpg',
      status: 'active',
      role: 'premium',
      joinDate: '2024-03-15',
      lastActive: '2025-11-25 07:25:00',
      postsCount: 45,
      followers: 234,
      following: 89,
      verified: true,
      country: 'France',
      age: 28,
      interests: ['Technology', 'Design', 'Photography']
    },
    {
      id: '2',
      name: 'Bob Dupont',
      email: 'bob.dupont@email.com',
      phone: '+33 6 23 45 67 89',
      status: 'active',
      role: 'vip',
      joinDate: '2024-01-20',
      lastActive: '2025-11-25 06:45:00',
      postsCount: 23,
      followers: 156,
      following: 67,
      verified: false,
      country: 'France',
      age: 35,
      interests: ['Business', 'Finance', 'Travel']
    },
    {
      id: '3',
      name: 'Camille Laurent',
      email: 'camille.laurent@email.com',
      status: 'inactive',
      role: 'user',
      joinDate: '2024-06-10',
      lastActive: '2025-11-20 15:30:00',
      postsCount: 12,
      followers: 45,
      following: 123,
      verified: false,
      country: 'Canada',
      age: 24,
      interests: ['Art', 'Music', 'Literature']
    },
    {
      id: '4',
      name: 'David Bernard',
      email: 'david.bernard@email.com',
      status: 'suspended',
      role: 'user',
      joinDate: '2024-08-22',
      lastActive: '2025-11-24 20:15:00',
      postsCount: 67,
      followers: 89,
      following: 200,
      verified: false,
      country: 'Belgium',
      age: 31,
      interests: ['Sports', 'Gaming', 'Fitness']
    },
    {
      id: '5',
      name: 'Emma Rousseau',
      email: 'emma.rousseau@email.com',
      status: 'active',
      role: 'moderator',
      joinDate: '2023-11-12',
      lastActive: '2025-11-25 07:15:00',
      postsCount: 156,
      followers: 445,
      following: 78,
      verified: true,
      country: 'France',
      age: 29,
      interests: ['Technology', 'Education', 'Community']
    }
  ])

  const [filters, setFilters] = useState<UserFilters>({
    status: 'all',
    role: 'all',
    country: 'all',
    dateRange: 'all',
    search: ''
  })

  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [showFilters, setShowFilters] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-400" />
      case 'suspended':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <RefreshCw className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'moderator':
        return 'bg-blue-100 text-blue-800'
      case 'vip':
        return 'bg-yellow-100 text-yellow-800'
      case 'premium':
        return 'bg-indigo-100 text-indigo-800'
      case 'user':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'inactive':
        return 'Inactif'
      case 'suspended':
        return 'Suspendu'
      case 'pending':
        return 'En attente'
      default:
        return status
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrateur'
      case 'moderator':
        return 'Modérateur'
      case 'vip':
        return 'VIP'
      case 'premium':
        return 'Premium'
      case 'user':
        return 'Utilisateur'
      default:
        return role
    }
  }

  const filteredUsers = users.filter(user => {
    if (filters.status !== 'all' && user.status !== filters.status) return false
    if (filters.role !== 'all' && user.role !== filters.role) return false
    if (filters.country !== 'all' && user.country !== filters.country) return false
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase()) && 
        !user.email.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action ${action} on user ${userId}`)
    // Implementation would go here
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} on users:`, selectedUsers)
    setSelectedUsers([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Gérer et modérer les comptes utilisateurs
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Importer
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Nouvel Utilisateur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
                <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs Premium</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {users.filter(u => u.role === 'premium' || u.role === 'vip').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Comptes Suspendus</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {users.filter(u => u.status === 'suspended').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher utilisateurs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-64"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Vue:</span>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    viewMode === 'table' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Tableau
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    viewMode === 'cards' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Cartes
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="suspended">Suspendu</option>
                    <option value="pending">En attente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.role}
                    onChange={(e) => setFilters({...filters, role: e.target.value})}
                  >
                    <option value="all">Tous les rôles</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Modérateur</option>
                    <option value="vip">VIP</option>
                    <option value="premium">Premium</option>
                    <option value="user">Utilisateur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.country}
                    onChange={(e) => setFilters({...filters, country: e.target.value})}
                  >
                    <option value="all">Tous les pays</option>
                    <option value="France">France</option>
                    <option value="Canada">Canada</option>
                    <option value="Belgium">Belgique</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Période</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  >
                    <option value="all">Toute période</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                    <option value="year">Cette année</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedUsers.length} utilisateur(s) sélectionné(s)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Activer
                </button>
                <button
                  onClick={() => handleBulkAction('suspend')}
                  className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Suspendre
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map(u => u.id))
                        } else {
                          setSelectedUsers([])
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut & Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activité
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contenu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id])
                          } else {
                            setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                          }
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar ? (
                            <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {user.name}
                            {user.verified && <CheckCircle className="w-4 h-4 text-blue-500 ml-1" />}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.phone && (
                            <div className="text-xs text-gray-400 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          {getStatusIcon(user.status)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {getStatusText(user.status)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 text-gray-400 mr-1" />
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                            {getRoleText(user.role)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">{user.country}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{new Date(user.lastActive).toLocaleDateString('fr-FR')}</div>
                      <div className="text-xs text-gray-400">
                        {user.followers} abonnés • {user.following} abonnements
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{user.postsCount} posts</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.interests.slice(0, 2).map((interest, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {interest}
                          </span>
                        ))}
                        {user.interests.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            +{user.interests.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUserAction(user.id, 'view')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'edit')}
                          className="text-green-600 hover:text-green-900"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction(user.id, 'more')}
                          className="text-gray-600 hover:text-gray-900"
                          title="Plus d'actions"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {filteredUsers.length} utilisateur(s)
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-blue-600 bg-blue-50">
              1
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}