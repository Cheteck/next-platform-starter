import { type FC } from 'react';
import { Modal, Button, Badge } from '@/components/ui';
import { Order, users } from '@/lib/mock-data';
import { Package, User, MapPin, CreditCard, Calendar } from 'lucide-react';

interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}

export const OrderDetailsModal: FC<OrderDetailsModalProps> = ({ isOpen, onClose, order }) => {
    if (!order) return null;

    const customer = users.find(u => u.id === order.customerId);

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            pending: 'warning',
            processing: 'info',
            shipped: 'info',
            delivered: 'success',
            cancelled: 'destructive'
        };
        return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Commande #${order.id}`}>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-600">Statut</p>
                        {getStatusBadge(order.status)}
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Client
                    </h4>
                    <p className="text-gray-900">{customer?.name}</p>
                    <p className="text-sm text-gray-600">{customer?.email}</p>
                </div>

                <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Adresse de livraison
                    </h4>
                    <p className="text-gray-600">{order.shippingAddress}</p>
                </div>

                <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Articles
                    </h4>
                    <div className="space-y-2">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <div>
                                    <p className="font-medium text-gray-900">{item.productName}</p>
                                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                                </div>
                                <p className="font-medium">{item.price.toFixed(2)} €</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span>{order.total.toFixed(2)} €</span>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Fermer</Button>
                    <Button>Mettre à jour le statut</Button>
                </div>
            </div>
        </Modal>
    );
};
