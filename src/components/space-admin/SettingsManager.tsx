import { type FC, useState } from 'react';
import { Card, CardContent, Button, Input, Textarea, FormField } from '@/components/ui';
import { Save, Upload, Shield, Bell, Globe } from 'lucide-react';
import { Space } from '@/lib/mock-data';

interface SettingsManagerProps {
    space: Space;
}

export const SettingsManager: FC<SettingsManagerProps> = ({ space }) => {
    const [formData, setFormData] = useState({
        name: space.name,
        description: space.description,
        address: space.address || '',
        phone: space.phone || '',
        email: space.email || '',
        website: space.website || '',
        allowMessages: space.settings.allowMessages,
        allowReviews: space.settings.allowReviews,
        autoPublish: space.settings.autoPublish,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggle = (key: string) => {
        setFormData(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saving settings:', formData);
        alert('Paramètres sauvegardés avec succès !');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Paramètres de l'Espace</h2>
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Informations Générales</h3>

                            <div className="grid grid-cols-1 gap-4">
                                <FormField label="Nom de l'espace">
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </FormField>

                                <FormField label="Description">
                                    <Textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={4}
                                    />
                                </FormField>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField label="Email de contact">
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </FormField>
                                    <FormField label="Téléphone">
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </FormField>
                                </div>

                                <FormField label="Adresse">
                                    <Input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </FormField>

                                <FormField label="Site Web">
                                    <Input
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://"
                                    />
                                </FormField>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Confidentialité et Permissions
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">Autoriser les messages</div>
                                        <div className="text-sm text-gray-500">Permettre aux utilisateurs de vous envoyer des messages privés</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.allowMessages}
                                            onChange={() => handleToggle('allowMessages')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">Autoriser les avis</div>
                                        <div className="text-sm text-gray-500">Permettre aux clients de laisser des avis sur vos produits</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.allowReviews}
                                            onChange={() => handleToggle('allowReviews')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="font-medium text-gray-900">Publication automatique</div>
                                        <div className="text-sm text-gray-500">Publier automatiquement les nouveaux produits sans modération</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.autoPublish}
                                            onChange={() => handleToggle('autoPublish')}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Apparence</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-20 w-20 rounded-lg bg-gray-100 overflow-hidden border">
                                            <img src={space.logo} alt="Logo" className="h-full w-full object-cover" />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Changer
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bannière</label>
                                    <div className="h-32 w-full rounded-lg bg-gray-100 overflow-hidden border relative group">
                                        <img src={space.banner} alt="Bannière" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Button variant="secondary" size="sm">
                                                <Upload className="h-4 w-4 mr-2" />
                                                Changer
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4 flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notifications
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Gérez comment vous recevez les notifications pour votre espace.
                            </p>
                            <Button variant="outline" className="w-full">
                                Configurer les notifications
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
