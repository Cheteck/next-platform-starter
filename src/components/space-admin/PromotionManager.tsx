import { type FC, useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Plus, Search, Filter, Edit, Trash2, Percent, Calendar } from 'lucide-react';

interface PromotionManagerProps {
    spaceId: string;
}

interface Promotion {
    id: string;
    title: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    usageCount: number;
    maxUsage?: number;
}

export const PromotionManager: FC<PromotionManagerProps> = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock promotions data
    const promotions: Promotion[] = [
        {
            id: 'promo_1',
            title: 'Soldes d\'été -20%',
            description: 'Réduction de 20% sur tous les produits',
            discountType: 'percentage',
            discountValue: 20,
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-08-31'),
            isActive: true,
            usageCount: 45,
            maxUsage: 100
        },
        {
            id: 'promo_2',
            title: 'Livraison gratuite',
            description: 'Livraison offerte dès 50€ d\'achat',
            discountType: 'fixed',
            discountValue: 0,
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-12-31'),
            isActive: true,
            usageCount: 123
        }
    ];

    const filteredPromotions = promotions.filter(promo =>
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Promotions</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une promotion
                </Button>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une promotion..."
                                className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="text-gray-600">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtres
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {filteredPromotions.map((promo) => (
                            <div key={promo.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                                            <Badge variant={promo.isActive ? 'success' : 'secondary'}>
                                                {promo.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">{promo.description}</p>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Percent className="w-4 h-4" />
                                                <span>
                                                    {promo.discountType === 'percentage'
                                                        ? `-${promo.discountValue}%`
                                                        : `${promo.discountValue}€`}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>
                                                    {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-medium">{promo.usageCount}</span>
                                                {promo.maxUsage && <span> / {promo.maxUsage}</span>} utilisations
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 ml-4">
                                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-blue-600">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPromotions.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p>Aucune promotion trouvée.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
