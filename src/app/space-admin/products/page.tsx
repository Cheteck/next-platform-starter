'use client';

import React from 'react';
import { ProductManager } from '@/components/space-admin/ProductManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function ProductsPage() {
  const currentUser = getCurrentUser();
  const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

  return <ProductManager spaceId={userSpace.id} />;
}