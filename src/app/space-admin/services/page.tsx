'use client';

import React from 'react';
import { ServiceManager } from '@/components/space-admin/ServiceManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function ServicesPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <ServiceManager spaceId={userSpace.id} />;
}
