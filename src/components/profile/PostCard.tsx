import { type FC } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { type Post, users } from '@/lib/mock-data';

interface PostCardProps {
    post: Post;
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
    const author = users.find(u => u.id === post.userId);
    if (!author) return null;

    return (
        <Card className="shadow-sm mb-4">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <Avatar src={author.avatar} alt={author.name} className="h-10 w-10" />
                        <div>
                            <p className="font-semibold text-sm text-gray-900 hover:underline cursor-pointer">{author.name}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <p className="text-gray-800 text-sm mb-3 whitespace-pre-wrap">{post.content}</p>

                {post.images && post.images.length > 0 && (
                    <div className="rounded-xl overflow-hidden border border-gray-100 mt-3">
                        <img
                            src={post.images[0]}
                            alt="Post content"
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                    </div>
                )}

                <div className="flex justify-between items-center text-gray-500 text-xs mt-4 mb-2">
                    <span className="hover:underline cursor-pointer">{post.likes} J'aime</span>
                    <div className="space-x-2">
                        <span className="hover:underline cursor-pointer">{post.comments} commentaires</span>
                        <span className="hover:underline cursor-pointer">{post.shares} partages</span>
                    </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-100">
                    <Button variant="ghost" className="flex-1 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">J'aime</span>
                    </Button>
                    <Button variant="ghost" className="flex-1 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Commenter</span>
                    </Button>
                    <Button variant="ghost" className="flex-1 text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                        <Share2 className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Partager</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
