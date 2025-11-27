'use client';

import React from 'react';
import { EventManager } from '@/components/space-admin/EventManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function EventsPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <EventManager spaceId={userSpace.id} />;
}
