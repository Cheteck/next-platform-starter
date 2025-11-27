import { type FC, useState } from 'react';
import { Modal, Button, Input, FormField } from '@/components/ui';
import { Calendar, Clock } from 'lucide-react';

interface CreateBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
}

export const CreateBookingModal: FC<CreateBookingModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        customerEmail: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating booking:', formData);
        onConfirm(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Créer une réservation">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Titre de la réservation">
                    <Input
                        placeholder="Ex: Dîner pour 2 personnes"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </FormField>

                <FormField label="Email du client">
                    <Input
                        type="email"
                        placeholder="client@exemple.com"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        required
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Date">
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                type="date"
                                className="pl-10"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>
                    </FormField>

                    <FormField label="Heure">
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                type="time"
                                className="pl-10"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                required
                            />
                        </div>
                    </FormField>
                </div>

                <FormField label="Notes (optionnelles)">
                    <textarea
                        className="w-full border rounded-lg px-3 py-2"
                        rows={3}
                        placeholder="Informations supplémentaires..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                </FormField>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button type="submit">Créer la réservation</Button>
                </div>
            </form>
        </Modal>
    );
};
