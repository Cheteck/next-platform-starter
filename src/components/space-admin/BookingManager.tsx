import { type FC, useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Search, Calendar, Clock, CheckCircle, XCircle, User } from 'lucide-react';
import { Booking, bookings as allBookings, users } from '@/lib/mock-data';

interface BookingManagerProps {
    spaceId: string;
}

export const BookingManager: FC<BookingManagerProps> = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    const spaceBookings = allBookings.filter(b => b.spaceId === spaceId);

    const filteredBookings = spaceBookings.filter(booking => {
        const customer = users.find(u => u.id === booking.customerId);
        const matchesSearch =
            booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer?.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter ? booking.status === statusFilter : true;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmé</Badge>;
            case 'completed':
                return <Badge variant="info" className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Terminé</Badge>;
            case 'cancelled':
                return <Badge variant="destructive" className="flex items-center gap-1"><XCircle className="w-3 h-3" /> Annulé</Badge>;
            default:
                return <Badge variant="warning" className="flex items-center gap-1"><Clock className="w-3 h-3" /> En attente</Badge>;
        }
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Réservations</h2>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une réservation..."
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
                                <option value="confirmed">Confirmé</option>
                                <option value="completed">Terminé</option>
                                <option value="cancelled">Annulé</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBookings.map((booking) => {
                            const customer = users.find(u => u.id === booking.customerId);
                            return (
                                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="font-medium text-gray-900">{booking.title}</div>
                                            {getStatusBadge(booking.status)}
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(booking.date)}</span>
                                            <Clock className="w-4 h-4 ml-2" />
                                            <span>{booking.time}</span>
                                        </div>

                                        <div className="flex items-center gap-3 pt-3 border-t">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                                {customer?.avatar && <img src={customer.avatar} alt="" className="h-full w-full object-cover" />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{customer?.name || 'Client inconnu'}</div>
                                                <div className="text-xs text-gray-500">Client</div>
                                            </div>
                                        </div>

                                        {booking.notes && (
                                            <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded italic">
                                                "{booking.notes}"
                                            </div>
                                        )}

                                        <div className="flex justify-end gap-2 pt-2">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                                        Refuser
                                                    </Button>
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                                        Accepter
                                                    </Button>
                                                </>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <Button size="sm" variant="outline">
                                                    Modifier
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p>Aucune réservation trouvée.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
