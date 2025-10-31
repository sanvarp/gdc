/**
 * API Mock Client
 * Simulates backend API responses with realistic delays and errors
 *
 * IMPORTANT FOR BACKEND:
 * All functions here document the EXACT contract expected from real API endpoints.
 * Response structures, status codes, and error formats must match these definitions.
 */

import type {
  User,
  ChatSummary,
  ChatMessage,
  ChatsListResponse,
  MessagesListResponse,
  Folder,
  FileItem,
  FoldersListResponse,
  FilesListResponse,
  FileUploadResponse,
  SearchParams,
  PaginationParams,
} from '@types';

import { randomDelay, maybeFail, createApiError, createCursor, decodeCursor } from './utils';
import { mockUsers } from './fixtures/users';
import {
  mockChats,
  mockMessagesCache,
  generateChatSummaries,
  generateChatMessages,
} from './fixtures/chats';
import { mockFolders, mockFilesCache, generateFiles } from './fixtures/files';

// ============= Configuration =============
const FAILURE_RATE = 0.001; // 0.1% failure rate (casi nunca falla - perfecto para demos con clientes)
const PAGE_SIZE = 20;

// ============= Auth & User =============

/**
 * GET /me
 * Returns current authenticated user
 *
 * Backend must return:
 * - 200 OK with User object
 * - 401 Unauthorized if token invalid/missing
 */
export const getCurrentUser = async (): Promise<User> => {
  await randomDelay();
  maybeFail(FAILURE_RATE);
  return mockUsers.currentUser;
};

// ============= Chats =============

/**
 * GET /chats?search=&limit=&cursor=
 * Returns paginated list of chat summaries
 *
 * Backend must return:
 * - 200 OK with ChatsListResponse
 * - nextCursor: base64 encoded pagination token (omit if last page)
 * - Items sorted by updatedAt DESC
 */
export const getChats = async (params: SearchParams = {}): Promise<ChatsListResponse> => {
  await randomDelay();
  maybeFail(FAILURE_RATE);

  const { search = '', limit = PAGE_SIZE, cursor } = params;
  const page = cursor ? decodeCursor(cursor) : 0;

  let filtered = [...mockChats];

  // Search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      chat =>
        chat.title.toLowerCase().includes(searchLower) ||
        chat.lastMessage?.toLowerCase().includes(searchLower)
    );
  }

  // Sort by updatedAt DESC
  filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  // Paginate
  const start = page * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);
  const hasMore = end < filtered.length;

  return {
    items,
    nextCursor: hasMore ? createCursor(page + 1) : undefined,
  };
};

/**
 * POST /chats
 * Creates a new chat
 *
 * Request body: { title?: string }
 *
 * Backend must return:
 * - 201 Created with new ChatSummary
 * - Auto-generate title if not provided
 * - 400 Bad Request if validation fails
 */
export const createChat = async (data: { title?: string }): Promise<ChatSummary> => {
  await randomDelay();
  maybeFail(FAILURE_RATE);

  const newChat: ChatSummary = {
    id: `chat_${Date.now()}`,
    title: data.title || 'Nueva conversación',
    lastMessage: undefined,
    messageCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockChats.unshift(newChat);
  mockMessagesCache[newChat.id] = [];

  return newChat;
};

/**
 * GET /chats/:id/messages?limit=&cursor=
 * Returns paginated messages for a chat
 *
 * Backend must return:
 * - 200 OK with MessagesListResponse
 * - Messages sorted by createdAt ASC (oldest first)
 * - 404 Not Found if chat doesn't exist
 */
export const getChatMessages = async (
  chatId: string,
  params: PaginationParams = {}
): Promise<MessagesListResponse> => {
  await randomDelay();
  maybeFail(FAILURE_RATE);

  // Check if chat exists
  const chat = mockChats.find(c => c.id === chatId);
  if (!chat) {
    throw createApiError('NOT_FOUND', `Chat ${chatId} not found`);
  }

  // Generate messages if they don't exist yet
  if (!mockMessagesCache[chatId]) {
    mockMessagesCache[chatId] = generateChatMessages(chatId, chat.messageCount);
  }

  const messages = mockMessagesCache[chatId];

  const { limit = PAGE_SIZE, cursor } = params;
  const page = cursor ? decodeCursor(cursor) : 0;

  const start = page * limit;
  const end = start + limit;
  const items = messages.slice(start, end);
  const hasMore = end < messages.length;

  return {
    items,
    nextCursor: hasMore ? createCursor(page + 1) : undefined,
  };
};

/**
 * POST /chats/:id/messages
 * Sends a message to the chat and receives assistant response
 *
 * Request body: { content: string }
 *
 * Backend must return:
 * - 201 Created with assistant's ChatMessage response
 * - Validate content length (max 4000 chars)
 * - 400 Bad Request if validation fails
 * - 404 Not Found if chat doesn't exist
 *
 * Note: Streaming responses not implemented in this mock
 */
export const sendMessage = async (chatId: string, content: string): Promise<ChatMessage> => {
  await randomDelay(500, 2000); // Longer delay for AI response
  maybeFail(FAILURE_RATE);

  if (content.length > 4000) {
    throw createApiError('VALIDATION_ERROR', 'Message exceeds 4000 characters');
  }

  const messages = mockMessagesCache[chatId];
  if (!messages) {
    throw createApiError('NOT_FOUND', `Chat ${chatId} not found`);
  }

  // Add user message
  const userMessage: ChatMessage = {
    id: `msg_${chatId}_${Date.now()}_user`,
    chatId,
    role: 'user',
    content,
    createdAt: new Date().toISOString(),
  };
  messages.push(userMessage);

  // Simulate assistant response
  await randomDelay(300, 800);
  const assistantMessage: ChatMessage = {
    id: `msg_${chatId}_${Date.now()}_assistant`,
    chatId,
    role: 'assistant',
    content: `Esta es una respuesta simulada a: "${content.substring(0, 50)}..."`,
    createdAt: new Date().toISOString(),
  };
  messages.push(assistantMessage);

  // Update chat summary
  const chat = mockChats.find(c => c.id === chatId);
  if (chat) {
    chat.lastMessage = assistantMessage.content;
    chat.messageCount = messages.length;
    chat.updatedAt = new Date().toISOString();
  }

  return assistantMessage;
};

// ============= Files =============

/**
 * GET /folders
 * Returns list of accessible folders for current user
 *
 * Backend must return:
 * - 200 OK with FoldersListResponse
 * - Only folders user has permission to access
 * - canUpload flag based on user permissions
 */
export const getFolders = async (): Promise<FoldersListResponse> => {
  await randomDelay();
  maybeFail(FAILURE_RATE);

  return {
    items: mockFolders,
  };
};

/**
 * GET /folders/:id/files?limit=&cursor=
 * Returns paginated files in a folder
 *
 * Backend must return:
 * - 200 OK with FilesListResponse
 * - Files sorted by updatedAt DESC
 * - 403 Forbidden if user lacks access
 * - 404 Not Found if folder doesn't exist
 */
export const getFolderFiles = async (
  folderId: string,
  params: PaginationParams = {}
): Promise<FilesListResponse> => {
  await randomDelay();
  maybeFail(FAILURE_RATE);

  const files = mockFilesCache[folderId];
  if (!files) {
    throw createApiError('NOT_FOUND', `Folder ${folderId} not found`);
  }

  const { limit = PAGE_SIZE, cursor } = params;
  const page = cursor ? decodeCursor(cursor) : 0;

  // Sort by updatedAt DESC
  const sorted = [...files].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const start = page * limit;
  const end = start + limit;
  const items = sorted.slice(start, end);
  const hasMore = end < sorted.length;

  return {
    items,
    nextCursor: hasMore ? createCursor(page + 1) : undefined,
  };
};

/**
 * POST /folders/:id/upload
 * Uploads a file to the folder
 *
 * Request: multipart/form-data with file
 *
 * Backend must:
 * - Validate user has files:upload:folder:{folderId} permission
 * - Validate MIME type (pdf, images, txt, docx)
 * - Validate file size (max 15MB)
 * - Return 201 Created with FileUploadResponse
 * - Return 403 Forbidden if no upload permission
 * - Return 400 Bad Request if validation fails
 */
export const uploadFile = async (folderId: string, file: File): Promise<FileUploadResponse> => {
  await randomDelay(800, 2500); // Upload takes longer
  maybeFail(FAILURE_RATE);

  // Validate folder exists
  const folder = mockFolders.find(f => f.id === folderId);
  if (!folder) {
    throw createApiError('NOT_FOUND', `Folder ${folderId} not found`);
  }

  // Validate upload permission
  if (!folder.canUpload) {
    throw createApiError('FORBIDDEN', `No upload permission for folder ${folderId}`);
  }

  // Validate file size (15MB)
  const maxSize = 15 * 1024 * 1024;
  if (file.size > maxSize) {
    throw createApiError('VALIDATION_ERROR', 'File size exceeds 15MB limit');
  }

  // Validate MIME type
  const allowedTypes = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/gif',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  if (!allowedTypes.includes(file.type)) {
    throw createApiError('VALIDATION_ERROR', `File type ${file.type} not allowed`);
  }

  // Create file record
  const newFile: FileItem = {
    id: `file_${folderId}_${Date.now()}`,
    folderId,
    name: file.name,
    mimeType: file.type,
    size: file.size,
    uploadedBy: mockUsers.currentUser.name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Add to cache
  if (!mockFilesCache[folderId]) {
    mockFilesCache[folderId] = [];
  }
  mockFilesCache[folderId].unshift(newFile);

  return {
    success: true,
    file: newFile,
  };
};
