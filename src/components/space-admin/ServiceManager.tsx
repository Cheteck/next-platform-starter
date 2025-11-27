import { type FC } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Plus, Clock, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';

interface ServiceManagerProps {
    spaceId: string;
}

export const ServiceManager: FC<ServiceManagerProps> = ({ spaceId }) => {
    // Mock services data
    const services = [
        {
            id: 1,
            name: "Consultation Stratégique",
            duration: "1h",
            price: 150,
            active: true,
            bookings: 12,
            description: "Analyse approfondie de vos besoins et élaboration d'une stratégie sur mesure."
        },
        {
            id: 2,
            name: "Audit Technique",
            duration: "3h",
            price: 450,
            active: true,
            bookings: 5,
            description: "Revue complète de votre infrastructure technique et recommandations."
        },
        {
            id: 3,
            name: "Formation Équipe",
            duration: "1 jour",
            price: 1200,
            active: false,
            bookings: 0,
            description: "Formation intensive pour votre équipe sur les dernières technologies."
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Services Proposés</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un service
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                    <Card key={service.id} className="hover:border-blue-200 transition-colors">
                        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                    <h3 className="font-bold text-gray-900">{service.name}</h3>
                                    <Badge variant={service.active ? 'success' : 'secondary'}>
                                        {service.active ? 'Actif' : 'Inactif'}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {service.duration}</span>
                                    <span className="font-semibold">{service.price} €</span>
                                    <span>{service.bookings} réservations</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Modifier</Button>
                                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
