'use client';

import React from 'react';
import { BookingManager } from '@/components/space-admin/BookingManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function BookingsPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <BookingManager spaceId={userSpace.id} />;
}
