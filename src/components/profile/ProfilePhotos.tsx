import { type FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export const ProfilePhotos: FC = () => {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Photos</CardTitle>
                <div className="flex space-x-2">
                    <button className="text-blue-600 font-medium text-sm hover:bg-blue-50 px-3 py-1 rounded-md transition-colors">Photos de vous</button>
                    <button className="text-gray-500 font-medium text-sm hover:bg-gray-50 px-3 py-1 rounded-md transition-colors">Albums</button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative group cursor-pointer">
                            <img
                                src={`https://picsum.photos/seed/${i + 100}/400`}
                                alt={`Photo ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
