'use client';

import React from 'react';
import { PromotionManager } from '@/components/space-admin/PromotionManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function PromotionsPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <PromotionManager spaceId={userSpace.id} />;
}
