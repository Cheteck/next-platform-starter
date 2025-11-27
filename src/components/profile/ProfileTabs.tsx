import { type FC, type ReactNode } from 'react';

export type TabId = 'posts' | 'about' | 'photos' | 'videos' | 'network';

interface Tab {
    id: TabId;
    label: string;
    count?: number;
}

interface ProfileTabsProps {
    activeTab: TabId;
    onTabChange: (tab: TabId) => void;
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs: Tab[] = [
        { id: 'posts', label: 'Publications' },
        { id: 'about', label: 'À propos' },
        { id: 'photos', label: 'Photos' },
        { id: 'videos', label: 'Vidéos' },
        { id: 'network', label: 'Réseau' },
    ];

    return (
        <div className="bg-white shadow rounded-xl mb-6 sticky top-[70px] z-20">
            <nav className="flex overflow-x-auto scrollbar-hide px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`
              flex-shrink-0 px-4 py-4 text-sm font-medium border-b-2 transition-all duration-200
              ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }
            `}
                    >
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                }`}>
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    );
};
