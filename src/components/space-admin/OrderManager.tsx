import { type FC, useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Search, Filter, Eye, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Order, orders as allOrders, users } from '@/lib/mock-data';

interface OrderManagerProps {
    spaceId: string;
}

export const OrderManager: FC<OrderManagerProps> = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const spaceOrders = allOrders.filter(o => o.spaceId === spaceId);

    const filteredOrders = spaceOrders.filter(order => {
        const customer = users.find(u => u.id === order.customerId);
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer?.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter ? order.status === statusFilter : true;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'delivered':
                return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Livré</Badge>;
            case 'shipped':
                return <Badge variant="info" className="flex items-center gap-1"><Truck className="w-3 h-3" /> Expédié</Badge>;
            case 'processing':
                return <Badge variant="warning" className="flex items-center gap-1"><Clock className="w-3 h-3" /> En cours</Badge>;
            case 'cancelled':
                return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Annulé</Badge>;
            default:
                return <Badge variant="secondary">En attente</Badge>;
        }
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h2>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une commande, un client..."
                                className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={statusFilter || ''}
                                onChange={(e) => setStatusFilter(e.target.value || null)}
                            >
                                <option value="">Tous les statuts</option>
                                <option value="pending">En attente</option>
                                <option value="processing">En cours</option>
                                <option value="shipped">Expédié</option>
                                <option value="delivered">Livré</option>
                                <option value="cancelled">Annulé</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.map((order) => {
                                    const customer = users.find(u => u.id === order.customerId);
                                    return (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                                <div className="text-xs text-gray-500">{order.items.length} articles</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-3">
                                                        {customer?.avatar && <img src={customer.avatar} alt="" className="h-full w-full object-cover" />}
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{customer?.name || 'Client inconnu'}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {order.total.toFixed(2)} €
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Détails
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p>Aucune commande trouvée.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
