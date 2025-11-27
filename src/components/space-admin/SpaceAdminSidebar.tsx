import { type FC } from 'react';
import {
    LayoutDashboard,
    ShoppingBag,
    Calendar,
    MessageSquare,
    Settings,
    Users,
    BarChart2,
    Tag,
    ClipboardList,
    Utensils,
    Megaphone,
    Shield
} from 'lucide-react';
import { type Space } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SpaceAdminSidebarProps {
    space: Space;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

type Feature = 'dashboard' | 'products' | 'orders' | 'bookings' | 'events' | 'services' | 'posts' | 'promotions' | 'customers' | 'analytics' | 'roles' | 'settings';

export const SpaceAdminSidebar: FC<SpaceAdminSidebarProps> = ({ space, activeTab, onTabChange }) => {

    const getFeatures = (category: string): Feature[] => {
        const common: Feature[] = ['dashboard', 'posts', 'promotions', 'customers', 'analytics', 'roles', 'settings'];

        switch (category) {
            case 'Restaurant':
                return ['dashboard', 'products', 'orders', 'bookings', ...common]; // Products = Menu items
            case 'Shop':
            case 'Fashion':
            case 'Tech':
                return ['dashboard', 'products', 'orders', ...common];
            case 'Service':
                return ['dashboard', 'services', 'bookings', ...common];
            case 'Entertainment':
                return ['dashboard', 'events', 'bookings', ...common];
            default:
                return ['dashboard', 'products', ...common];
        }
    };

    const features = getFeatures(space.category);

    const menuItems = [
        { id: 'dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
        { id: 'products', label: space.category === 'Restaurant' ? 'Menu' : 'Produits', icon: space.category === 'Restaurant' ? Utensils : ShoppingBag },
        { id: 'services', label: 'Services', icon: ClipboardList },
        { id: 'orders', label: 'Commandes', icon: ClipboardList },
        { id: 'bookings', label: 'Réservations', icon: Calendar },
        { id: 'events', label: 'Événements', icon: Calendar },
        { id: 'posts', label: 'Publications', icon: MessageSquare },
        { id: 'promotions', label: 'Promotions', icon: Megaphone },
        { id: 'customers', label: 'Clients', icon: Users },
        { id: 'analytics', label: 'Statistiques', icon: BarChart2 },
        { id: 'roles', label: 'Rôles & Membres', icon: Shield },
        { id: 'settings', label: 'Paramètres', icon: Settings },
    ];

    const filteredMenu = menuItems.filter(item => features.includes(item.id as Feature));

    return (
        <div className="w-64 bg-white border-r h-screen sticky top-0 flex flex-col">
            <div className="p-6 border-b">
                <div className="flex items-center space-x-3">
                    <img src={space.logo} alt={space.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                        <h2 className="font-bold text-gray-900 truncate">{space.name}</h2>
                        <p className="text-xs text-gray-500 truncate">{space.category}</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {filteredMenu.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            activeTab === item.id
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <item.icon className={cn("h-5 w-5", activeTab === item.id ? "text-blue-600" : "text-gray-400")} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t">
                <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900">Plan Pro</h4>
                    <p className="text-xs text-blue-700 mt-1">Accédez à toutes les fonctionnalités avancées.</p>
                    <button className="mt-3 text-xs font-medium text-white bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700 w-full transition-colors">
                        Mettre à niveau
                    </button>
                </div>
            </div>
        </div>
    );
};
