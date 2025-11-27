'use client';

import React from 'react';
import { DashboardOverview } from '@/components/space-admin/DashboardOverview';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function SpaceAdminDashboard() {
  const currentUser = getCurrentUser();
  const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

  return <DashboardOverview space={userSpace} />;
}