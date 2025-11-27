import { type FC } from 'react';
import { Modal, Button, Badge } from '@/components/ui';
import { Booking, users } from '@/lib/mock-data';
import { Calendar, Clock, User, FileText } from 'lucide-react';

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

export const BookingDetailsModal: FC<BookingDetailsModalProps> = ({ isOpen, onClose, booking }) => {
    if (!booking) return null;

    const customer = users.find(u => u.id === booking.customerId);

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            pending: 'warning',
            confirmed: 'success',
            cancelled: 'destructive',
            completed: 'info'
        };
        return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Réservation: ${booking.title}`}>
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-600">Statut</p>
                        {getStatusBadge(booking.status)}
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">ID</p>
                        <p className="font-medium text-gray-900">#{booking.id}</p>
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
                    <h4 className="font-semibold text-gray-900 mb-3">Date et heure</h4>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                        </div>
                    </div>
                </div>

                {booking.notes && (
                    <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Notes
                        </h4>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg italic">"{booking.notes}"</p>
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Fermer</Button>
                    {booking.status === 'pending' && (
                        <>
                            <Button variant="outline" className="text-red-600">Refuser</Button>
                            <Button>Accepter</Button>
                        </>
                    )}
                </div>
            </div>
        </Modal>
    );
};
