'use client'

import { useState } from 'react'
import { 
  Trophy, 
  Medal, 
  Star, 
  Calendar, 
  Users, 
  Gift, 
  Timer,
  Target,
  Award,
  Zap,
  Crown,
  TrendingUp,
  Play,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'

// Types pour les concours
interface Contest {
  id: string
  title: string
  description: string
  category: 'photography' | 'writing' | 'design' | 'coding' | 'business' | 'art'
  prize: string
  prizeValue: string
  participants: number
  maxParticipants: number
  startDate: string
  endDate: string
  status: 'upcoming' | 'active' | 'ending-soon' | 'ended'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  requirements: string[]
  tags: string[]
  imageUrl: string
  rules: string[]
  winner?: {
    name: string
    avatar: string
    submission: string
    votes: number
  }
}

interface Challenge {
  id: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  progress: number
  target: number
  reward: string
  rewardType: 'points' | 'badge' | 'premium' | 'cash'
  deadline: string
  icon: string
  completed: boolean
}

export default function ConcoursPage() {
  const [activeTab, setActiveTab] = useState<'contests' | 'challenges' | 'leaderboard'>('contests')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'popularity' | 'deadline' | 'prize' | 'newest'>('popularity')

  // Données mock pour les concours
  const contests: Contest[] = [
    {
      id: '1',
      title: 'Challenge Photo Urbaine 2025',
      description: 'Capturez l\'essence de la modernité urbaine dans vos meilleures photos de architecture et street art.',
      category: 'photography',
      prize: 'Canon EOS R6 + 5000€ cash',
      prizeValue: '€8,000',
      participants: 1247,
      maxParticipants: 5000,
      startDate: '2025-01-15',
      endDate: '2025-03-15',
      status: 'active',
      difficulty: 'intermediate',
      requirements: ['Photos en haute résolution', 'Minimum 5 photos par participant', 'Photos originales uniquement'],
      tags: ['Urban', 'Architecture', 'Street Art', 'Modern'],
      imageUrl: '/imgs/urban-photo-contest.jpg',
      rules: ['Les photos doivent être prises entre le 1er janvier et le 28 février 2025', 'Format JPG ou PNG uniquement', 'Pas de filigranes ou texte ajouté']
    },
    {
      id: '2',
      title: 'Hackathon IA & Innovation',
      description: 'Développez des solutions IA innovantes pour résoudre des problèmes sociétaux réels.',
      category: 'coding',
      prize: 'Investment Funding + Mentorship',
      prizeValue: '€50,000',
      participants: 342,
      maxParticipants: 500,
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      status: 'active',
      difficulty: 'advanced',
      requirements: ['Team de 2-4 développeurs', 'Prototype fonctionnel', 'Pitch vidéo de 5 minutes'],
      tags: ['AI', 'Machine Learning', 'Social Impact', 'Innovation'],
      imageUrl: '/imgs/ai-hackathon.jpg',
      rules: ['Code open-source requis', 'Démonstration en direct obligatoire', 'Présentation orale de 10 minutes']
    },
    {
      id: '3',
      title: 'Concours Design UX/UI',
      description: 'Créez l\'expérience utilisateur la plus intuitive pour une application de gestion de tâches.',
      category: 'design',
      prize: 'MacBook Pro + Design Software',
      prizeValue: '€6,500',
      participants: 891,
      maxParticipants: 2000,
      startDate: '2025-01-20',
      endDate: '2025-03-20',
      status: 'active',
      difficulty: 'intermediate',
      requirements: ['Maquettes haute-fidélité', 'Prototype interactif', 'Documentation UX'],
      tags: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
      imageUrl: '/imgs/design-contest.jpg',
      rules: ['Utilisation des guidelines fourni', 'Tests utilisateurs inclus', 'Accessibility compliance requis']
    }
  ]

  // Données mock pour les challenges quotidiens
  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Photo du Jour',
      description: 'Prenez une photo créative chaque jour pendant 7 jours',
      type: 'daily',
      progress: 5,
      target: 7,
      reward: 'Badge Photo Pro',
      rewardType: 'badge',
      deadline: '2025-12-31',
      icon: '📸',
      completed: false
    },
    {
      id: '2',
      title: 'Défi Lecture',
      description: 'Lisez 4 livres ce mois-ci',
      type: 'monthly',
      progress: 2,
      target: 4,
      reward: '500 Points + Badge',
      rewardType: 'points',
      deadline: '2025-12-31',
      icon: '📚',
      completed: false
    },
    {
      id: '3',
      title: 'Code Quotidien',
      description: 'Programmez pendant 30 jours consécutifs',
      type: 'monthly',
      progress: 12,
      target: 30,
      reward: 'Premium 1 mois',
      rewardType: 'premium',
      deadline: '2025-12-31',
      icon: '💻',
      completed: false
    }
  ]

  // Top participants leaderboard
  const leaderboard = [
    { rank: 1, name: 'Marie Dubois', points: 15420, avatar: '/imgs/avatar-1.jpg', badge: '👑' },
    { rank: 2, name: 'Alex Chen', points: 12850, avatar: '/imgs/avatar-2.jpg', badge: '🥈' },
    { rank: 3, name: 'Sarah Johnson', points: 11200, avatar: '/imgs/avatar-3.jpg', badge: '🥉' },
    { rank: 4, name: 'David Kim', points: 9850, avatar: '/imgs/avatar-4.jpg', badge: '⭐' },
    { rank: 5, name: 'Emma Wilson', points: 9200, avatar: '/imgs/avatar-5.jpg', badge: '⭐' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'upcoming': return 'text-blue-600 bg-blue-100'
      case 'ending-soon': return 'text-orange-600 bg-orange-100'
      case 'ended': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />
      case 'upcoming': return <Clock className="w-4 h-4" />
      case 'ending-soon': return <Timer className="w-4 h-4" />
      case 'ended': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days > 0 ? `${days} jours restants` : 'Terminé'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Concours & Challenges</h1>
                <p className="text-gray-600 mt-1">Participez, créez et gagnez des prix exceptionnels</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Vos points</p>
                <p className="text-2xl font-bold text-purple-600">3,450</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Medal className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'contests', label: 'Concours', icon: Trophy },
              { id: 'challenges', label: 'Challenges', icon: Target },
              { id: 'leaderboard', label: 'Classement', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-purple-500 text-purple-600'
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
        {/* Concours Tab */}
        {activeTab === 'contests' && (
          <div>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Toutes les catégories</option>
                    <option value="photography">📸 Photographie</option>
                    <option value="coding">💻 Développement</option>
                    <option value="design">🎨 Design</option>
                    <option value="writing">✍️ Écriture</option>
                    <option value="art">🎭 Art</option>
                    <option value="business">💼 Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="popularity">Popularité</option>
                    <option value="deadline">Date limite</option>
                    <option value="prize">Valeur du prix</option>
                    <option value="newest">Plus récent</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 font-medium">
                    Créer un concours
                  </button>
                </div>
              </div>
            </div>

            {/* Concours Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {contests.map((contest) => (
                <div key={contest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Contest Image */}
                  <div className="h-48 bg-gradient-to-r from-purple-400 to-indigo-500 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contest.status)}`}>
                        {getStatusIcon(contest.status)}
                        <span className="ml-1 capitalize">{contest.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(contest.difficulty)}`}>
                        {contest.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">📸</span>
                      <span className="text-sm text-gray-600">{contest.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{contest.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{contest.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Participants</span>
                        <span className="text-sm font-medium">{contest.participants}/{contest.maxParticipants}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full" 
                          style={{ width: `${(contest.participants / contest.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Prix</span>
                        <span className="text-lg font-bold text-green-600">{contest.prizeValue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Date limite</span>
                        <span className="text-sm font-medium">{getTimeRemaining(contest.endDate)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 font-medium text-sm">
                        Participer
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm">
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{challenge.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      challenge.type === 'daily' ? 'bg-green-100 text-green-800' :
                      challenge.type === 'weekly' ? 'bg-blue-100 text-blue-800' :
                      challenge.type === 'monthly' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {challenge.type === 'daily' ? 'Quotidien' :
                       challenge.type === 'weekly' ? 'Hebdomadaire' :
                       challenge.type === 'monthly' ? 'Mensuel' : 'Spécial'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progression</span>
                      <span className="text-sm font-medium">{challenge.progress}/{challenge.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" 
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Récompense</p>
                      <p className="text-sm font-medium text-green-600">{challenge.reward}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Deadline</p>
                      <p className="text-sm font-medium">{challenge.deadline}</p>
                    </div>
                  </div>

                  <button className={`w-full py-2 px-4 rounded-lg font-medium text-sm ${
                    challenge.completed 
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
                  }`}>
                    {challenge.completed ? 'Terminé' : 'Continuer'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Classement Global</h2>
                <p className="text-purple-100 text-sm">Les meilleurs participants du mois</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {leaderboard.map((participant) => (
                    <div key={participant.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <span className="text-2xl">{participant.badge}</span>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-lg font-bold text-gray-400">#{participant.rank}</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold">
                          {participant.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{participant.name}</p>
                          <p className="text-sm text-gray-600">Participant actif</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-600">{participant.points.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">47</div>
              <div className="text-purple-200">Concours actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1,234</div>
              <div className="text-purple-200">Participants totaux</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">€125K</div>
              <div className="text-purple-200">Prix distribués</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">89%</div>
              <div className="text-purple-200">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}