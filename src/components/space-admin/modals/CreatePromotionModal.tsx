import { type FC, useState } from 'react';
import { Modal, Button, Input, FormField } from '@/components/ui';
import { Percent, Calendar } from 'lucide-react';

interface CreatePromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
}

export const CreatePromotionModal: FC<CreatePromotionModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discountType: 'percentage' as 'percentage' | 'fixed',
        discountValue: 0,
        startDate: '',
        endDate: '',
        maxUsage: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating promotion:', formData);
        onConfirm(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Créer une promotion">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Titre de la promotion">
                    <Input
                        placeholder="Ex: Soldes d'été -20%"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </FormField>

                <FormField label="Description">
                    <textarea
                        className="w-full border rounded-lg px-3 py-2"
                        rows={3}
                        placeholder="Description de la promotion..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Type de réduction">
                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={formData.discountType}
                            onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                        >
                            <option value="percentage">Pourcentage (%)</option>
                            <option value="fixed">Montant fixe (€)</option>
                        </select>
                    </FormField>

                    <FormField label="Valeur">
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                type="number"
                                className="pl-10"
                                placeholder="0"
                                value={formData.discountValue}
                                onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                    </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Date de début">
                        <Input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                        />
                    </FormField>

                    <FormField label="Date de fin">
                        <Input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            required
                        />
                    </FormField>
                </div>

                <FormField label="Nombre d'utilisations max (optionnel)">
                    <Input
                        type="number"
                        placeholder="Illimité"
                        value={formData.maxUsage}
                        onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                    />
                </FormField>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button type="submit">Créer la promotion</Button>
                </div>
            </form>
        </Modal>
    );
};
