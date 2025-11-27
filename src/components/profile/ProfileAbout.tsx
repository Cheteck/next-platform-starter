import { type FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { Briefcase, GraduationCap, MapPin, Heart, Globe, Phone, Mail, Pencil } from 'lucide-react';
import { type User } from '@/lib/mock-data';

interface ProfileAboutProps {
    user: User;
    isOwner?: boolean;
}

export const ProfileAbout: FC<ProfileAboutProps> = ({ user, isOwner = false }) => {
    return (
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Vue d'ensemble</CardTitle>
                    {isOwner && (
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Pencil className="h-4 w-4 mr-2" /> Modifier
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center text-gray-700 group">
                        <Briefcase className="h-6 w-6 mr-4 text-gray-400" />
                        <div className="flex-1">
                            <p>Travaille chez <strong>Tech Solutions</strong></p>
                            <p className="text-sm text-gray-500">Depuis 2021</p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-700 group">
                        <GraduationCap className="h-6 w-6 mr-4 text-gray-400" />
                        <div className="flex-1">
                            <p>A étudié à <strong>Université Paris-Saclay</strong></p>
                            <p className="text-sm text-gray-500">Promotion 2018</p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-700 group">
                        <MapPin className="h-6 w-6 mr-4 text-gray-400" />
                        <div className="flex-1">
                            <p>Habite à <strong>{user.location || 'Paris, France'}</strong></p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-700 group">
                        <Heart className="h-6 w-6 mr-4 text-gray-400" />
                        <div className="flex-1">
                            <p>Situation amoureuse: <strong>Célibataire</strong></p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Coordonnées</CardTitle>
                    {isOwner && (
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Pencil className="h-4 w-4 mr-2" /> Modifier
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    {user.website && (
                        <div className="flex items-center text-gray-700">
                            <Globe className="h-6 w-6 mr-4 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Site web</p>
                                <a href={user.website} className="text-blue-600 hover:underline">{user.website}</a>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center text-gray-700">
                        <Phone className="h-6 w-6 mr-4 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Mobile</p>
                            <p>+33 6 12 34 56 78</p>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Mail className="h-6 w-6 mr-4 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
