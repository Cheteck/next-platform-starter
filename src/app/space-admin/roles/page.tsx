'use client';

import React from 'react';
import { RoleManager } from '@/components/space-admin/RoleManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function RolesPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <RoleManager spaceId={userSpace.id} />;
}
