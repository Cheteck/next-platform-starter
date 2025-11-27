'use client';

import React from 'react';
import { OrderManager } from '@/components/space-admin/OrderManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function OrdersPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <OrderManager spaceId={userSpace.id} />;
}
