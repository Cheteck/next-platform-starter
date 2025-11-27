import { type FC, useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Search, Filter, User, Mail, Phone, MoreHorizontal, Eye } from 'lucide-react';
import { users, spaceMembers, orders, bookings } from '@/lib/mock-data';

interface CustomerManagerProps {
    spaceId: string;
}

export const CustomerManager: FC<CustomerManagerProps> = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Get unique customers from orders and bookings
    const customerIds = new Set([
        ...orders.filter(o => o.spaceId === spaceId).map(o => o.customerId),
        ...bookings.filter(b => b.spaceId === spaceId).map(b => b.customerId)
    ]);

    const customers = users.filter(u => customerIds.has(u.id));

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCustomerStats = (customerId: string) => {
        const customerOrders = orders.filter(o => o.customerId === customerId && o.spaceId === spaceId);
        const customerBookings = bookings.filter(b => b.customerId === customerId && b.spaceId === spaceId);

        const totalSpent = customerOrders.reduce((sum, order) => sum + order.total, 0);

        return {
            ordersCount: customerOrders.length,
            bookingsCount: customerBookings.length,
            totalSpent
        };
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Clients</h2>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un client..."
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

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commandes</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réservations</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total dépensé</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCustomers.map((customer) => {
                                    const stats = getCustomerStats(customer.id);
                                    return (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                                                        {customer.avatar && <img src={customer.avatar} alt="" className="h-full w-full object-cover" />}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                        {customer.verified && (
                                                            <Badge variant="success" className="text-xs mt-1">Vérifié</Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 flex items-center gap-1">
                                                    <Mail className="w-3 h-3 text-gray-400" />
                                                    {customer.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {stats.ordersCount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {stats.bookingsCount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {stats.totalSpent.toFixed(2)} €
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

                    {filteredCustomers.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p>Aucun client trouvé.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
