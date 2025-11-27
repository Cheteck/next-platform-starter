import { type FC, useState } from 'react';
import { Modal, Button, Input, FormField, Badge } from '@/components/ui';
import { Shield, Check } from 'lucide-react';

interface CreateRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: any) => void;
}

const AVAILABLE_PERMISSIONS = [
    { id: 'manage_products', label: 'Gérer les produits', category: 'Produits' },
    { id: 'manage_orders', label: 'Gérer les commandes', category: 'Ventes' },
    { id: 'manage_bookings', label: 'Gérer les réservations', category: 'Ventes' },
    { id: 'manage_content', label: 'Gérer le contenu', category: 'Contenu' },
    { id: 'manage_messages', label: 'Gérer les messages', category: 'Communication' },
    { id: 'view_analytics', label: 'Voir les statistiques', category: 'Analytics' },
    { id: 'view_customers', label: 'Voir les clients', category: 'Clients' },
    { id: 'manage_settings', label: 'Gérer les paramètres', category: 'Administration' },
];

export const CreateRoleModal: FC<CreateRoleModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const togglePermission = (permId: string) => {
        setSelectedPermissions(prev =>
            prev.includes(permId)
                ? prev.filter(p => p !== permId)
                : [...prev, permId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating role:', { name: roleName, permissions: selectedPermissions });
        onConfirm({ name: roleName, permissions: selectedPermissions });
        onClose();
    };

    const groupedPermissions = AVAILABLE_PERMISSIONS.reduce((acc, perm) => {
        if (!acc[perm.category]) acc[perm.category] = [];
        acc[perm.category].push(perm);
        return acc;
    }, {} as Record<string, typeof AVAILABLE_PERMISSIONS>);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Créer un rôle personnalisé">
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Nom du rôle">
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            className="pl-10"
                            placeholder="Ex: Gestionnaire de contenu"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                        />
                    </div>
                </FormField>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {Object.entries(groupedPermissions).map(([category, perms]) => (
                            <div key={category}>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">{category}</h4>
                                <div className="space-y-2">
                                    {perms.map(perm => (
                                        <label
                                            key={perm.id}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedPermissions.includes(perm.id)}
                                                onChange={() => togglePermission(perm.id)}
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700">{perm.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>Annuler</Button>
                    <Button type="submit" disabled={!roleName || selectedPermissions.length === 0}>
                        Créer le rôle
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
