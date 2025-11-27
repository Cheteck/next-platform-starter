import { type FC, useState } from 'react';
import { Card, CardContent, Button, Badge } from '@/components/ui';
import { Plus, Search, Filter, MessageSquare, Heart, Share2, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Post, posts as allPosts } from '@/lib/mock-data';

interface PostManagerProps {
    spaceId: string;
}

export const PostManager: FC<PostManagerProps> = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const spacePosts = allPosts.filter(p => p.spaceId === spaceId);

    const filteredPosts = spacePosts.filter(p =>
        p.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Publications</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle publication
                </Button>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une publication..."
                                className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="text-gray-600">
                            <Filter className="h-4 w-4 mr-2" />
                            Filtres
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="capitalize">{post.type}</Badge>
                                        <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-gray-800 mb-4">{post.content}</p>

                                {post.images && post.images.length > 0 && (
                                    <div className="flex gap-2 mb-4 overflow-x-auto">
                                        {post.images.map((img, idx) => (
                                            <img key={idx} src={img} alt="" className="h-32 w-auto rounded-lg object-cover" />
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Heart className="w-4 h-4" />
                                        <span>{post.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>{post.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Share2 className="w-4 h-4" />
                                        <span>{post.shares}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p>Aucune publication trouvée.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
