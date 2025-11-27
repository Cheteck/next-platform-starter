'use client';

import React from 'react';
import { PostManager } from '@/components/space-admin/PostManager';
import { getCurrentUser, spaces } from '@/lib/mock-data';

export default function PostsPage() {
    const currentUser = getCurrentUser();
    const userSpace = spaces.find(s => s.ownerId === currentUser.id) || spaces[0];

    return <PostManager spaceId={userSpace.id} />;
}
