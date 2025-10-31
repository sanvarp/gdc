/**
 * User Fixtures
 */

import type { User } from '@types';

export const mockUsers: Record<string, User> = {
  currentUser: {
    id: 'user_001',
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    roles: ['user', 'editor'],
    permissions: [
      'chats:read',
      'chats:write',
      'files:read',
      'files:upload:folder:folder_001',
      'files:upload:folder:folder_002',
    ],
    createdAt: '2024-01-15T10:00:00Z',
  },
};
