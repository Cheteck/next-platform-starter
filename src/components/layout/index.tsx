// Composants de layout pour ECHOS
import React from 'react';
import { LayoutProps, User } from '@/types';
import { Avatar, Button } from '@/components/ui';
import { 
  Home, 
  MessageCircle, 
  ShoppingBag, 
  Users, 
  Bell, 
  Search, 
  Settings, 
  LogOut,
  Plus,
  Grid3X3
} from 'lucide-react';

// Navigation items
const navigationItems = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Spaces', href: '/spaces', icon: Grid3X3 },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { name: 'Messages', href: '/chat', icon: MessageCircle },
  { name: 'Notifications', href: '/notifications', icon: Bell },
];

// Header Component
export const Header: React.FC<{ user?: User; onLogout?: () => void }> = ({ user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ECHOS</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher sur ECHOS..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Create Button */}
          <Button size="sm" className="hidden sm:inline-flex">
            <Plus className="h-4 w-4 mr-2" />
            Créer
          </Button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Avatar src={user.avatar} alt={user.name} fallback={user.name} size="sm" />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Users className="h-4 w-4 mr-3" />
                    Mon Profil
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Paramètres
                  </a>
                  <div className="border-t border-gray-100">
                    <button
                      onClick={onLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar: React.FC<{ activeItem?: string; onItemClick?: (href: string) => void }> = ({ 
  activeItem = '/', 
  onItemClick 
}) => {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-white lg:border-r lg:border-gray-200">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex flex-col flex-grow mt-5">
          <nav className="flex-1 px-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.href;
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onItemClick?.(item.href);
                  }}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};

// Main Layout Component
export const Layout: React.FC<LayoutProps & { user?: User; onLogout?: () => void; activeItem?: string; onItemClick?: (href: string) => void }> = ({ 
  children, 
  showSidebar = true, 
  showHeader = true, 
  user, 
  onLogout,
  activeItem,
  onItemClick
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header user={user} onLogout={onLogout} />}
      <div className="flex">
        {showSidebar && <Sidebar activeItem={activeItem} onItemClick={onItemClick} />}
        <main className={`flex-1 ${showSidebar ? 'lg:pl-64' : ''} ${showHeader ? 'pt-16' : ''}`}>
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Admin Layout Components
export const AdminHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Exporter
            </Button>
            <Button size="sm">
              Action
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminSidebar: React.FC<{ activeItem?: string }> = ({ activeItem = 'dashboard' }) => {
  const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Spaces', href: '/admin/spaces', icon: Grid3X3 },
    { name: 'Marketplace', href: '/admin/marketplace', icon: ShoppingBag },
    { name: 'Messages', href: '/admin/messages', icon: MessageCircle },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  ];

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-gray-900 lg:text-white">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="ml-2 text-lg font-semibold">ECHOS Admin</span>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.href;
            
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};