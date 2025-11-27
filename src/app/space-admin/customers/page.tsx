'use client';

import React from 'react';
import { CustomerManager } from '@/components/space-admin/CustomerManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function CustomersPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <CustomerManager spaceId={userSpace.id} />;
}
