'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SpaceAdminSidebar } from '@/components/space-admin/SpaceAdminSidebar';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function SpaceAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];
    const pathname = usePathname();
    const router = useRouter();

    // Extract active tab from pathname
    const getActiveTab = () => {
        if (pathname === '/space-admin') return 'dashboard';
        const segments = pathname.split('/');
        return segments[segments.length - 1] || 'dashboard';
    };

    const handleTabChange = (tab: string) => {
        if (tab === 'dashboard') {
            router.push('/space-admin');
        } else {
            router.push(`/space-admin/${tab}`);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SpaceAdminSidebar
                space={userSpace}
                activeTab={getActiveTab()}
                onTabChange={handleTabChange}
            />

            <main className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
