import { type FC } from 'react';
import { Modal, Button, Badge } from '@/components/ui';
import { User } from '@/lib/mock-data';
import { User as UserIcon, Mail, Phone, MapPin, Calendar, ShoppingBag } from 'lucide-react';

interface CustomerDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    customer: User | null;
    stats?: {
        ordersCount: number;
        bookingsCount: number;
        totalSpent: number;
    };
}

export const CustomerDetailsModal: FC<CustomerDetailsModalProps> = ({ isOpen, onClose, customer, stats }) => {
    if (!customer) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Détails du client">
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                        {customer.avatar ? (
                            <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <UserIcon className="w-10 h-10 text-gray-400" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
                        <p className="text-gray-600">{customer.email}</p>
                        {customer.verified && (
                            <Badge variant="success" className="mt-2">Vérifié</Badge>
                        )}
                    </div>
                </div>

                {stats && (
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <ShoppingBag className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{stats.ordersCount}</p>
                            <p className="text-xs text-gray-600">Commandes</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Calendar className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                            <p className="text-2xl font-bold text-gray-900">{stats.bookingsCount}</p>
                            <p className="text-xs text-gray-600">Réservations</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{stats.totalSpent.toFixed(2)} €</p>
                            <p className="text-xs text-gray-600">Total dépensé</p>
                        </div>
                    </div>
                )}

                <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{customer.email}</span>
                    </div>
                    {customer.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{customer.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Membre depuis {new Date(customer.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                </div>

                {customer.bio && (
                    <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
                        <p className="text-gray-600">{customer.bio}</p>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Fermer</Button>
                    <Button>Envoyer un message</Button>
                </div>
            </div>
        </Modal>
    );
};
