import { type FC, useState } from 'react';
import { Modal, Button, Input, Textarea, FormField } from '@/components/ui';
import { Image, Video, Link } from 'lucide-react';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
}

export const CreatePostModal: FC<CreatePostModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState<'feed' | 'product' | 'promotion'>('feed');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating post:', { content, postType });
        onConfirm({ content, type: postType });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Créer une publication">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Type de publication">
                    <select
                        className="w-full border rounded-lg px-3 py-2"
                        value={postType}
                        onChange={(e) => setPostType(e.target.value as any)}
                    >
                        <option value="feed">Publication normale</option>
                        <option value="product">Produit</option>
                        <option value="promotion">Promotion</option>
                    </select>
                </FormField>

                <FormField label="Contenu">
                    <Textarea
                        placeholder="Quoi de neuf ?"
                        rows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </FormField>

                <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm">
                        <Image className="w-4 h-4 mr-2" />
                        Image
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Vidéo
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                        <Link className="w-4 h-4 mr-2" />
                        Lien
                    </Button>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button type="submit">Publier</Button>
                </div>
            </form>
        </Modal>
    );
};
