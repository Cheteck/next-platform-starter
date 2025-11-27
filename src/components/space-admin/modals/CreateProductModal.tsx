import { type FC } from 'react';
import { Modal, Button, Input, Textarea, FormField } from '@/components/ui';
import { X } from 'lucide-react';

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
}

export const CreateProductModal: FC<CreateProductModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement product creation logic
        console.log('Creating product...');
        onConfirm({});
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Créer un nouveau produit">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Titre du produit">
                    <Input placeholder="Ex: iPhone 15 Pro Max" required />
                </FormField>

                <FormField label="Description">
                    <Textarea placeholder="Description détaillée du produit" rows={4} />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Prix (€)">
                        <Input type="number" step="0.01" placeholder="0.00" required />
                    </FormField>
                    <FormField label="Stock">
                        <Input type="number" placeholder="0" required />
                    </FormField>
                </div>

                <FormField label="Catégorie">
                    <select className="w-full border rounded-lg px-3 py-2">
                        <option>Électronique</option>
                        <option>Mode</option>
                        <option>Maison</option>
                    </select>
                </FormField>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button type="submit">Créer le produit</Button>
                </div>
            </form>
        </Modal>
    );
};
