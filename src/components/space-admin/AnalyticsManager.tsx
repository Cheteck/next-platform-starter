import { type FC } from 'react';
import { Card, CardContent } from '@/components/ui';
import { spaceStats } from '@/lib/mock-data';
import { BarChart3, TrendingUp, Users, ShoppingBag, Eye, DollarSign } from 'lucide-react';

interface AnalyticsManagerProps {
    spaceId: string;
}

export const AnalyticsManager: FC<AnalyticsManagerProps> = ({ spaceId }) => {
    // Dans une vraie app, on chargerait les stats spécifiques au spaceId
    const stats = spaceStats;

    const StatCard = ({ title, value, growth, icon: Icon, color }: any) => (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${color}`}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`flex items-center text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {growth >= 0 ? '+' : ''}{growth}%
                        <TrendingUp className={`h-4 w-4 ml-1 ${growth < 0 ? 'rotate-180' : ''}`} />
                    </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Analytiques</h2>
                <select className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>30 derniers jours</option>
                    <option>7 derniers jours</option>
                    <option>Cette année</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Revenu Total"
                    value={`${stats.monthlyRevenue.toFixed(2)} €`}
                    growth={stats.monthlyGrowth.revenue}
                    icon={DollarSign}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Vues du Profil"
                    value={stats.totalViews}
                    growth={stats.monthlyGrowth.views}
                    icon={Eye}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Nouveaux Abonnés"
                    value={stats.totalFollowers}
                    growth={stats.monthlyGrowth.followers}
                    icon={Users}
                    color="bg-pink-500"
                />
                <StatCard
                    title="Produits Vendus"
                    value={stats.totalProducts} // Using totalProducts as a proxy for sold items in this mock
                    growth={stats.monthlyGrowth.products}
                    icon={ShoppingBag}
                    color="bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance des Ventes</h3>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <div className="text-center text-gray-500">
                                <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p>Graphique des ventes (Mock)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Répartition par Catégorie</h3>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
                            <div className="text-center text-gray-500">
                                <div className="h-24 w-24 rounded-full border-4 border-blue-200 mx-auto mb-2"></div>
                                <p>Graphique circulaire (Mock)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
