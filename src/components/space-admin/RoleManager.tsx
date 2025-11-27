import { type FC, useState } from 'react';
import { Card, CardContent, Button, Badge, Input, Modal } from '@/components/ui';
import { Plus, Search, Shield, User, MoreHorizontal, Trash2, Edit, Check } from 'lucide-react';
import { Space, spaceMembers, spaceRoles, users, SpaceRole } from '@/lib/mock-data';

interface RoleManagerProps {
    spaceId: string;
}

export const RoleManager: FC<RoleManagerProps> = ({ spaceId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState<string>('role_editor');
    const [emailToInvite, setEmailToInvite] = useState('');

    const members = spaceMembers.filter(m => m.spaceId === spaceId);

    const filteredMembers = members.filter(member => {
        const user = users.find(u => u.id === member.userId);
        return user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const getRoleName = (roleId: string) => {
        return spaceRoles.find(r => r.id === roleId)?.name || 'Rôle inconnu';
    };

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Invitation envoyée à ${emailToInvite} pour le rôle ${getRoleName(selectedRole)}`);
        setShowInviteModal(false);
        setEmailToInvite('');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Rôles et Membres</h2>
                <Button onClick={() => setShowInviteModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Inviter un membre
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un membre..."
                                        className="pl-9 pr-4 py-2 w-full border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                {filteredMembers.map((member) => {
                                    const user = users.find(u => u.id === member.userId);
                                    const role = spaceRoles.find(r => r.id === member.roleId);

                                    return (
                                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                                    {user?.avatar && <img src={user.avatar} alt="" className="h-full w-full object-cover" />}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{user?.name || 'Utilisateur inconnu'}</div>
                                                    <div className="text-sm text-gray-500">{user?.email}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <Shield className="w-3 h-3" />
                                                    {role?.name}
                                                </Badge>
                                                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}

                                {filteredMembers.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        Aucun membre trouvé.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rôles Disponibles</h3>
                            <div className="space-y-3">
                                {spaceRoles.map((role) => (
                                    <div key={role.id} className="p-3 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-medium text-gray-900">{role.name}</div>
                                            {!role.isCustom && <Badge variant="outline" className="text-xs">Système</Badge>}
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {role.permissions.slice(0, 3).map((perm, idx) => (
                                                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {perm.replace('_', ' ')}
                                                </span>
                                            ))}
                                            {role.permissions.length > 3 && (
                                                <span className="text-xs text-gray-500 px-1">+{role.permissions.length - 3}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full mt-4">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Créer un rôle personnalisé
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Modal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="Inviter un nouveau membre">
                <form onSubmit={handleInvite} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                        <Input
                            type="email"
                            placeholder="exemple@email.com"
                            value={emailToInvite}
                            onChange={(e) => setEmailToInvite(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                        <select
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                        >
                            {spaceRoles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => setShowInviteModal(false)}>Annuler</Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Envoyer l'invitation</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
