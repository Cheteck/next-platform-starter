import { useState, type FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Avatar, Button } from '@/components/ui';
import { MoreHorizontal, UserMinus, UserCheck, UserPlus, Search } from 'lucide-react';

interface ProfileNetworkProps {
    isOwner?: boolean;
}

type NetworkTab = 'friends' | 'followers' | 'following';

export const ProfileNetwork: FC<ProfileNetworkProps> = ({ isOwner = false }) => {
    const [activeTab, setActiveTab] = useState<NetworkTab>('friends');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data generators
    const generateUsers = (count: number, type: string) => [...Array(count)].map((_, i) => ({
        id: `${type}-${i}`,
        name: `Utilisateur ${type} ${i + 1}`,
        avatar: `https://i.pravatar.cc/150?u=${type}-${i}`,
        mutuals: Math.floor(Math.random() * 50),
        role: i % 3 === 0 ? 'Développeur' : 'Designer',
        isFollowing: i % 2 === 0 // Mock status
    }));

    const friends = generateUsers(8, 'Friend');
    const followers = generateUsers(12, 'Follower');
    const following = generateUsers(6, 'Following');

    const getData = () => {
        switch (activeTab) {
            case 'followers': return followers;
            case 'following': return following;
            case 'friends': default: return friends;
        }
    };

    const filteredData = getData().filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <CardTitle>Mon Réseau</CardTitle>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="pl-9 pr-4 py-2 border rounded-full text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex space-x-6">
                    <button
                        onClick={() => setActiveTab('friends')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'friends' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Amis <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{friends.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('followers')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'followers' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Abonnés <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{followers.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('following')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'following' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Suivi(s) <span className="ml-1 text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{following.length}</span>
                    </button>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredData.map((user) => (
                        <div key={user.id} className="flex items-center space-x-4 p-3 border rounded-xl hover:bg-gray-50 transition-colors group">
                            <Avatar src={user.avatar} alt={user.name} className="h-14 w-14 rounded-full border border-gray-200" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.role} • {user.mutuals} amis communs</p>
                            </div>

                            {isOwner ? (
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {activeTab === 'following' ? (
                                        <Button size="sm" variant="outline" className="h-8 px-2 text-red-600 hover:bg-red-50 border-red-200">
                                            <UserMinus className="h-4 w-4 mr-1" /> <span className="text-xs">Ne plus suivre</span>
                                        </Button>
                                    ) : (
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    size="sm"
                                    variant={user.isFollowing ? "outline" : "primary"}
                                    className={`h-8 px-3 ${user.isFollowing ? 'text-gray-600' : 'bg-blue-600 text-white'}`}
                                >
                                    {user.isFollowing ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                                </Button>
                            )}
                        </div>
                    ))}

                    {filteredData.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            <p>Aucun utilisateur trouvé.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
