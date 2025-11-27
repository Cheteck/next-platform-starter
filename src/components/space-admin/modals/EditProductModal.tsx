import { type FC } from 'react';
import { Modal, Button, Input, Textarea, FormField } from '@/components/ui';
import { Product } from '@/lib/mock-data';

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onConfirm: (data: any) => void;
}

export const EditProductModal: FC<EditProductModalProps> = ({ isOpen, onClose, product, onConfirm }) => {
    if (!product) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement product edit logic
        console.log('Editing product:', product.id);
        onConfirm({});
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Modifier: ${product.title}`}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Titre du produit">
                    <Input defaultValue={product.title} required />
                </FormField>

                <FormField label="Description">
                    <Textarea defaultValue={product.description} rows={4} />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Prix (€)">
                        <Input type="number" step="0.01" defaultValue={product.price} required />
                    </FormField>
                    <FormField label="Stock">
                        <Input type="number" defaultValue={product.stock} required />
                    </FormField>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button type="submit">Enregistrer</Button>
                </div>
            </form>
        </Modal>
    );
};
