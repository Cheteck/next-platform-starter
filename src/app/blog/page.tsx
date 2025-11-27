'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  PenTool, 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  Eye,
  Calendar,
  User,
  Tag,
  TrendingUp,
  Clock,
  Star,
  Send,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'

// Types pour le blog
interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
    verified: boolean
  }
  category: 'technology' | 'business' | 'lifestyle' | 'science' | 'tutorial' | 'news'
  tags: string[]
  publishDate: string
  readTime: number
  views: number
  likes: number
  comments: number
  shares: number
  featured: boolean
  premium: boolean
  status: 'draft' | 'published' | 'archived'
  imageUrl: string
  reactions?: {
    love: number
    insight: number
    wow: number
  }
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  content: string
  publishDate: string
  likes: number
  replies: Comment[]
  edited: boolean
}

interface Category {
  id: string
  name: string
  icon: string
  description: string
  articleCount: number
  color: string
}

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'write' | 'my-articles' | 'bookmarks'>('feed')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending' | 'read-time'>('latest')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  // Données mock pour les catégories
  const categories: Category[] = [
    { id: 'all', name: 'Tous', icon: '📚', description: 'Tous les articles', articleCount: 1247, color: 'gray' },
    { id: 'technology', name: 'Technologie', icon: '💻', description: 'IT, IA, développement', articleCount: 342, color: 'blue' },
    { id: 'business', name: 'Business', icon: '💼', description: 'Entrepreneuriat, marketing', articleCount: 256, color: 'green' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '🌟', description: 'Vie quotidienne, bien-être', articleCount: 189, color: 'pink' },
    { id: 'science', name: 'Science', icon: '🔬', description: 'Recherche, découvertes', articleCount: 134, color: 'purple' },
    { id: 'tutorial', name: 'Tutoriels', icon: '📝', description: 'Guides et formations', articleCount: 167, color: 'orange' },
    { id: 'news', name: 'Actualités', icon: '📰', description: 'Nouvelles et tendances', articleCount: 159, color: 'red' }
  ]

  // Données mock pour les articles
  const articles: Article[] = [
    {
      id: '1',
      title: 'L\'IA Révolutionne le Développement Web : Guide Complet 2025',
      excerpt: 'Découvrez comment l\'intelligence artificielle transforme le développement web et quelles compétences développer pour rester compétitif.',
      content: 'Lorem ipsum dolor sit amet...',
      author: {
        name: 'Sophie Martin',
        avatar: '/imgs/avatar-sophie.jpg',
        bio: 'Lead Developer chez TechCorp, passionnée par l\'IA et le web moderne',
        verified: true
      },
      category: 'technology',
      tags: ['AI', 'Web Development', 'Machine Learning', '2025'],
      publishDate: '2025-01-20',
      readTime: 8,
      views: 15420,
      likes: 892,
      comments: 67,
      shares: 234,
      featured: true,
      premium: false,
      status: 'published',
      imageUrl: '/imgs/ai-web-dev.jpg',
      reactions: { love: 234, insight: 156, wow: 89 }
    },
    {
      id: '2',
      title: 'Stratégies Marketing Digital pour Start-ups en 2025',
      excerpt: 'Les meilleures stratégies pour lancer et développer sa start-up dans un marché concurrentiel.',
      content: 'Lorem ipsum dolor sit amet...',
      author: {
        name: 'Thomas Dubois',
        avatar: '/imgs/avatar-thomas.jpg',
        bio: 'Consultant en marketing digital, auteur de 3 livres sur l\'entrepreneuriat',
        verified: true
      },
      category: 'business',
      tags: ['Startup', 'Marketing Digital', 'Stratégie'],
      publishDate: '2025-01-19',
      readTime: 12,
      views: 8934,
      likes: 445,
      comments: 89,
      shares: 167,
      featured: false,
      premium: true,
      status: 'published',
      imageUrl: '/imgs/startup-marketing.jpg',
      reactions: { love: 123, insight: 234, wow: 88 }
    },
    {
      id: '3',
      title: 'Optimiser son Productivité : Les Techniques Scientifiques',
      excerpt: 'Basé sur des études neuroscientifiques, découvrez les méthodes les plus efficaces pour améliorer votre productivité.',
      content: 'Lorem ipsum dolor sit amet...',
      author: {
        name: 'Dr. Marie Clerc',
        avatar: '/imgs/avatar-marie.jpg',
        bio: 'Docteur en neurosciences, experte en productivité cognitive',
        verified: true
      },
      category: 'science',
      tags: ['Productivité', 'Neurosciences', 'Méthodes'],
      publishDate: '2025-01-18',
      readTime: 6,
      views: 12056,
      likes: 678,
      comments: 45,
      shares: 289,
      featured: true,
      premium: false,
      status: 'published',
      imageUrl: '/imgs/productivity-science.jpg',
      reactions: { love: 345, insight: 234, wow: 99 }
    }
  ]

  // Données mock pour les commentaires
  const comments: Comment[] = [
    {
      id: '1',
      author: {
        name: 'Alex Chen',
        avatar: '/imgs/avatar-alex.jpg',
        verified: false
      },
      content: 'Excellent article ! J\'ai appliqués ces principes dans mon projet et j\'ai vu une nette amélioration.',
      publishDate: '2025-01-20',
      likes: 23,
      edited: false,
      replies: [
        {
          id: '2',
          author: {
            name: 'Sophie Martin',
            avatar: '/imgs/avatar-sophie.jpg',
            verified: true
          },
          content: 'Merci Alex ! C\'est toujours motivant de voir que nos conseils aident vraiment.',
          publishDate: '2025-01-20',
          likes: 8,
          edited: false,
          replies: []
        }
      ]
    },
    {
      id: '3',
      author: {
        name: 'Emma Wilson',
        avatar: '/imgs/avatar-emma.jpg',
        verified: true
      },
      content: 'Pourrais-tu approfondir le point sur l\'intégration de l\'IA dans les frameworks existants ?',
      publishDate: '2025-01-20',
      likes: 12,
      edited: false,
      replies: []
    }
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-100 text-blue-800',
      business: 'bg-green-100 text-green-800',
      lifestyle: 'bg-pink-100 text-pink-800',
      science: 'bg-purple-100 text-purple-800',
      tutorial: 'bg-orange-100 text-orange-800',
      news: 'bg-red-100 text-red-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog & Articles</h1>
                <p className="text-gray-600 mt-1">Découvrez, partagez et apprenez</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Vos articles</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <PenTool className="w-6 h-6 text-blue-600" />
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
              { id: 'feed', label: 'Fil d\'actualités', icon: BookOpen },
              { id: 'write', label: 'Écrire', icon: PenTool },
              { id: 'my-articles', label: 'Mes articles', icon: User },
              { id: 'bookmarks', label: 'Favoris', icon: Bookmark }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
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
        {/* Fil d'actualités */}
        {activeTab === 'feed' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-gray-50 ${
                        selectedCategory === category.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{category.articleCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Tags */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Tendances</h3>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'React', 'Start-up', 'Productivité', 'Blockchain'].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Trier par:</span>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="latest">Plus récents</option>
                      <option value="popular">Plus populaires</option>
                      <option value="trending">Tendances</option>
                      <option value="read-time">Temps de lecture</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Articles List */}
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    {/* Article Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={article.author.avatar}
                          alt={article.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{article.author.name}</p>
                            {article.author.verified && (
                              <span className="text-blue-500">✓</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{formatDate(article.publishDate)} • {article.readTime} min</p>
                        </div>
                      </div>
                      {article.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Vedette
                        </span>
                      )}
                      {article.premium && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Article Content */}
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600" onClick={() => setSelectedArticle(article)}>
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                              {categories.find(c => c.id === article.category)?.icon} {categories.find(c => c.id === article.category)?.name}
                            </span>
                            <div className="flex space-x-1">
                              {article.tags.map((tag) => (
                                <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{formatNumber(article.views)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{formatNumber(article.likes)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{article.comments}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex-shrink-0"></div>
                    </div>

                    {/* Article Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">J'aime</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Commenter</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500">
                          <Share className="w-4 h-4" />
                          <span className="text-sm">Partager</span>
                        </button>
                      </div>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-yellow-500">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Écrire un article */}
        {activeTab === 'write' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Créer un nouvel article</h2>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700">
                  Publier
                </button>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Titre de l'article</label>
                  <input
                    type="text"
                    placeholder="Choisissez un titre accrocheur..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Sélectionnez une catégorie</option>
                      {categories.filter(c => c.id !== 'all').map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <input
                      type="text"
                      placeholder="AI, web, développement..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Extrait</label>
                  <textarea
                    rows={3}
                    placeholder="Un résumé accrocheur de votre article..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                  <div className="border border-gray-300 rounded-lg p-4 min-h-[400px]">
                    <div className="flex items-center space-x-2 mb-4 border-b border-gray-200 pb-2">
                      <button className="p-2 hover:bg-gray-100 rounded">B</button>
                      <button className="p-2 hover:bg-gray-100 rounded italic">I</button>
                      <button className="p-2 hover:bg-gray-100 rounded underline">U</button>
                      <div className="w-px h-4 bg-gray-300 mx-2"></div>
                      <button className="p-2 hover:bg-gray-100 rounded">H1</button>
                      <button className="p-2 hover:bg-gray-100 rounded">H2</button>
                      <div className="w-px h-4 bg-gray-300 mx-2"></div>
                      <button className="p-2 hover:bg-gray-100 rounded">📷</button>
                      <button className="p-2 hover:bg-gray-100 rounded">🔗</button>
                    </div>
                    <textarea
                      rows={15}
                      placeholder="Commencez à écrire votre article ici..."
                      className="w-full h-full resize-none border-none focus:outline-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Article premium</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Activer les commentaires</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                      Sauvegarder le brouillon
                    </button>
                    <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700">
                      Publier l'article
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mes articles */}
        {activeTab === 'my-articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Mes articles</h2>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nouvel article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        article.status === 'published' ? 'bg-green-100 text-green-800' :
                        article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {article.status === 'published' ? 'Publié' : 
                         article.status === 'draft' ? 'Brouillon' : 'Archivé'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(article.publishDate)}</span>
                      <span>{formatNumber(article.views)} vues</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
                      <button className="flex-1 flex items-center justify-center space-x-1 p-2 text-gray-600 hover:text-blue-600 border border-gray-300 rounded hover:border-blue-300">
                        <Edit className="w-4 h-4" />
                        <span className="text-xs">Modifier</span>
                      </button>
                      <button className="p-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded hover:border-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Favoris */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Articles favoris</h2>
            <div className="grid grid-cols-1 gap-4">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{article.title}</h3>
                        {article.featured && <Star className="w-4 h-4 text-yellow-500" />}
                        {article.premium && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Premium</span>}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{article.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{article.author.name}</span>
                        <span>•</span>
                        <span>{formatDate(article.publishDate)}</span>
                        <span>•</span>
                        <span>{article.readTime} min</span>
                        <span>•</span>
                        <span>{formatNumber(article.views)} vues</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="text-red-500 hover:text-red-700">
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Share className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">1,247</div>
              <div className="text-blue-200">Articles publiés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">856</div>
              <div className="text-blue-200">Auteurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">45K</div>
              <div className="text-blue-200">Lectures mensuelles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.8</div>
              <div className="text-blue-200">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}