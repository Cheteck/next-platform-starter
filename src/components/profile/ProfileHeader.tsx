import { type FC } from 'react';
import { Button, Avatar } from '@/components/ui';
import { Camera, Mail, MoreHorizontal, MapPin, Link as LinkIcon, Calendar, Briefcase } from 'lucide-react';
import { type User } from '@/lib/mock-data';

interface ProfileHeaderProps {
    user: User;
    isFollowing: boolean;
    onFollowToggle: () => void;
    isOwner?: boolean;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ user, isFollowing, onFollowToggle, isOwner = false }) => {
    return (
        <div className="bg-white shadow rounded-xl overflow-hidden mb-6">
            {/* Cover Photo */}
            <div className="h-48 md:h-64 relative group bg-gray-200">
                <img
                    src={user.coverPhoto || '/covers/default-cover.jpg'}
                    alt="Couverture"
                    className="w-full h-full object-cover"
                />
                {isOwner && (
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" className="bg-white/90 hover:bg-white text-gray-800 shadow-sm">
                            <Camera className="h-4 w-4 mr-2" />
                            Modifier la couverture
                        </Button>
                    </div>
                )}
            </div>

            {/* Profile Info Section */}
            <div className="px-6 pb-6">
                <div className="relative flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-12 mb-4">
                    {/* Avatar */}
                    <div className="relative z-10">
                        <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                            <Avatar
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {isOwner && (
                            <button className="absolute bottom-2 right-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 border border-white shadow-sm transition-colors">
                                <Camera className="h-4 w-4 text-gray-600" />
                            </button>
                        )}
                    </div>

                    {/* Actions (Desktop) */}
                    <div className="mt-4 md:mt-0 md:ml-auto flex space-x-3 md:mb-4">
                        {isOwner ? (
                            <>
                                <Button className="rounded-full px-6 font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm">
                                    Modifier le profil
                                </Button>
                                <Button variant="ghost" size="sm" className="rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 h-10 w-10 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={onFollowToggle}
                                    className={`rounded-full px-6 font-medium transition-all ${isFollowing
                                            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    {isFollowing ? 'Abonné' : 'Suivre'}
                                </Button>
                                <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Message
                                </Button>
                                <Button variant="ghost" size="sm" className="rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 h-10 w-10 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* User Details */}
                <div className="mt-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-gray-500 font-medium">@{user.name.toLowerCase().replace(/\s+/g, '_')}</p>

                    {user.bio && (
                        <p className="mt-3 text-gray-800 max-w-2xl text-base leading-relaxed">
                            {user.bio}
                        </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
                        {user.work && (
                            <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1.5 text-gray-400" />
                                <span>{user.work}</span>
                            </div>
                        )}
                        {user.location && (
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                                <span>{user.location}</span>
                            </div>
                        )}
                        {user.website && (
                            <div className="flex items-center">
                                <LinkIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {user.website.replace(/^https?:\/\//, '')}
                                </a>
                            </div>
                        )}
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                            <span>A rejoint en {new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center space-x-6 border-t border-gray-100 pt-4">
                        <div className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                            <span className="font-bold text-gray-900 mr-1">{user.following}</span>
                            <span className="text-gray-500 text-sm">Abonnements</span>
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                            <span className="font-bold text-gray-900 mr-1">{user.followers + (isFollowing ? 1 : 0)}</span>
                            <span className="text-gray-500 text-sm">Abonnés</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
