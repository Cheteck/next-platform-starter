import { type FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Briefcase, GraduationCap, Home, Link as LinkIcon, MapPin } from 'lucide-react';
import { type User } from '@/lib/mock-data';

interface ProfileSidebarProps {
    user: User;
}

export const ProfileSidebar: FC<ProfileSidebarProps> = ({ user }) => {
    return (
        <div className="space-y-6">
            {/* Intro Card */}
            <Card className="shadow-sm border-none shadow-gray-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Intro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {user.bio && (
                        <p className="text-sm text-gray-700 text-center mb-4">{user.bio}</p>
                    )}

                    <div className="space-y-3 text-sm">
                        {user.work && (
                            <div className="flex items-start text-gray-700">
                                <Briefcase className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                                <span>Travaille comme <strong>{user.work}</strong></span>
                            </div>
                        )}
                        {user.education && (
                            <div className="flex items-start text-gray-700">
                                <GraduationCap className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                                <span>A étudié à <strong>{user.education}</strong></span>
                            </div>
                        )}
                        {user.location && (
                            <div className="flex items-center text-gray-700">
                                <Home className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                                <span>Habite à <strong>{user.location}</strong></span>
                            </div>
                        )}
                        {user.website && (
                            <div className="flex items-center text-gray-700">
                                <LinkIcon className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                                <a href={user.website} className="text-blue-600 hover:underline truncate">
                                    {user.website}
                                </a>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Photos Preview Card */}
            <Card className="shadow-sm border-none shadow-gray-200">
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg font-bold">Photos</CardTitle>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Tout voir</a>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2 rounded-lg overflow-hidden">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <div key={i} className="aspect-square bg-gray-100 relative group cursor-pointer">
                                <img
                                    src={`https://picsum.photos/seed/${i + user.id}/200`}
                                    alt="Gallery"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Friends/Network Preview Card (Placeholder) */}
            <Card className="shadow-sm border-none shadow-gray-200">
                <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg font-bold">Amis</CardTitle>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Tout voir</a>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-full aspect-square bg-gray-200 rounded-lg mb-1 overflow-hidden">
                                    <img
                                        src={`https://i.pravatar.cc/150?u=${i}`}
                                        alt="Friend"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-xs font-semibold text-gray-900 truncate w-full text-center">Ami {i}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
