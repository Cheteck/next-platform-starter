'use client';

import React from 'react';
import { SettingsManager } from '@/components/space-admin/SettingsManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function SettingsPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <SettingsManager space={userSpace} />;
}
