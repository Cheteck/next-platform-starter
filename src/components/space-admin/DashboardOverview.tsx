import { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { TrendingUp, Users, ShoppingBag, Eye, Star, DollarSign, Activity, MessageCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, BarChart, Bar } from 'recharts';
import { type Space, products } from '@/lib/mock-data';

interface DashboardOverviewProps {
    space: Space;
}

export const DashboardOverview: FC<DashboardOverviewProps> = ({ space }) => {
    const spaceProducts = products.filter(p => p.spaceId === space.id);

    const stats = {
        totalFollowers: space.followers,
        totalViews: 45678, // Mock
        monthlyRevenue: 12500, // Mock
        avgRating: space.rating,
        totalReviews: space.reviews,
    };

    const monthlyData = [
        { name: 'Jan', followers: 1200, views: 2400, revenue: 3200 },
        { name: 'Fév', followers: 1350, views: 2680, revenue: 3800 },
        { name: 'Mar', followers: 1480, views: 2950, revenue: 4200 },
        { name: 'Avr', followers: 1620, views: 3320, revenue: 4600 },
        { name: 'Mai', followers: 1850, views: 3750, revenue: 5200 },
        { name: 'Jun', followers: 2100, views: 4200, revenue: 5800 },
    ];

    const recentActivities = [
        { id: 1, type: 'sale', message: 'Nouvelle commande - Robe Élégante (89.99€)', time: '5 min', amount: 89.99 },
        { id: 2, type: 'review', message: 'Nouveau avis 5 étoiles reçu', time: '12 min', rating: 5 },
        { id: 3, type: 'follower', message: '+3 nouveaux abonnés', time: '25 min' },
        { id: 4, type: 'message', message: 'Nouveau message client', time: '1h' },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Abonnés</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalFollowers.toLocaleString()}</p>
                                <p className="text-sm text-green-600 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    +8.9% ce mois
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Vues Mensuelles</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                                <p className="text-sm text-green-600 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    +15.2% ce mois
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <Eye className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Revenus du Mois</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.monthlyRevenue.toLocaleString()}€</p>
                                <p className="text-sm text-green-600 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    +22.1% ce mois
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <DollarSign className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                                <p className="text-sm text-gray-600 flex items-center">
                                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                    {stats.totalReviews} avis
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <Star className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Performance Mensuelle</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="followers" stroke="#3B82F6" strokeWidth={2} />
                                <Line type="monotone" dataKey="views" stroke="#10B981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Évolution des Revenus</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#F59E0B" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Activité Récente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                                <div className={`p-2 rounded-full ${activity.type === 'sale' ? 'bg-green-100' :
                                        activity.type === 'review' ? 'bg-blue-100' :
                                            activity.type === 'follower' ? 'bg-purple-100' :
                                                activity.type === 'message' ? 'bg-yellow-100' :
                                                    'bg-red-100'
                                    }`}>
                                    {activity.type === 'sale' && <ShoppingBag className="h-4 w-4 text-green-600" />}
                                    {activity.type === 'review' && <Star className="h-4 w-4 text-blue-600" />}
                                    {activity.type === 'follower' && <Users className="h-4 w-4 text-purple-600" />}
                                    {activity.type === 'message' && <MessageCircle className="h-4 w-4 text-yellow-600" />}
                                    {activity.type === 'product' && <Activity className="h-4 w-4 text-red-600" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                                </div>
                                {activity.amount && (
                                    <span className="text-sm font-semibold text-green-600">+{activity.amount}€</span>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
