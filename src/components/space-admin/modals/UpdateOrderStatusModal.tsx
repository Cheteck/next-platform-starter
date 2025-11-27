import { type FC, useState } from 'react';
import { Modal, Button, FormField } from '@/components/ui';

interface UpdateOrderStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
    currentStatus: string;
    onConfirm: (status: string, note: string) => void;
}

export const UpdateOrderStatusModal: FC<UpdateOrderStatusModalProps> = ({
    isOpen,
    onClose,
    orderId,
    currentStatus,
    onConfirm
}) => {
    const [status, setStatus] = useState(currentStatus);
    const [note, setNote] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(status, note);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Mettre à jour le statut">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Nouveau statut">
                    <select
                        className="w-full border rounded-lg px-3 py-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">En attente</option>
                        <option value="processing">En cours</option>
                        <option value="shipped">Expédié</option>
                        <option value="delivered">Livré</option>
                        <option value="cancelled">Annulé</option>
                    </select>
                </FormField>

                <FormField label="Note (optionnelle)">
                    <textarea
                        className="w-full border rounded-lg px-3 py-2"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ajouter une note..."
                    />
                </FormField>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button type="submit">Confirmer</Button>
                </div>
            </form>
        </Modal>
    );
};
