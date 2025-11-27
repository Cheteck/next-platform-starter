import { type FC } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Plus, Calendar, Clock, MapPin, Users, MoreHorizontal } from 'lucide-react';

interface EventManagerProps {
    spaceId: string;
}

export const EventManager: FC<EventManagerProps> = ({ spaceId }) => {
    // Mock events data
    const events = [
        {
            id: 1,
            title: "Soirée Jazz Live",
            date: "2024-06-15",
            time: "20:00",
            location: "Main Hall",
            attendees: 45,
            capacity: 100,
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 2,
            title: "Atelier Dégustation",
            date: "2024-06-20",
            time: "18:30",
            location: "Bar Lounge",
            attendees: 12,
            capacity: 20,
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 3,
            title: "Concert Rock",
            date: "2024-05-10",
            time: "21:00",
            location: "Stage A",
            attendees: 150,
            capacity: 150,
            status: "past",
            image: "https://images.unsplash.com/photo-1459749411177-0473ef716175?w=800&auto=format&fit=crop&q=60"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Événements</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un événement
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-200 relative">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            <div className="absolute top-3 right-3">
                                <Badge variant={event.status === 'upcoming' ? 'success' : 'secondary'}>
                                    {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-2 mt-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                    {event.time}
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                    {event.location}
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                                    {event.attendees} / {event.capacity} participants
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t flex space-x-2">
                                <Button variant="outline" className="flex-1 text-sm">Gérer</Button>
                                <Button variant="ghost" className="flex-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50">Promouvoir</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
