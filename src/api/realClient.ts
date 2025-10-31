/**
 * Real API Client
 * PRODUCTION READY - Use this when backend is deployed
 *
 * HOW TO SWITCH FROM MOCK TO REAL:
 * 1. Set VITE_USE_MOCK_API=false in .env
 * 2. Set VITE_API_BASE_URL=your-backend-url in .env
 * 3. In store slices, import from './realClient' instead of './client'
 */

import { http } from './httpClient';
import { API_ENDPOINTS } from '@/config/api';
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

// ============= Auth & User =============

/**
 * GET /api/me
 * Returns current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
  return http.get<User>(API_ENDPOINTS.auth.me);
};

// ============= Chats =============

/**
 * GET /api/chats?search=&limit=&cursor=
 * Returns paginated list of chat summaries
 */
export const getChats = async (params: SearchParams = {}): Promise<ChatsListResponse> => {
  return http.get<ChatsListResponse>(API_ENDPOINTS.chats.list, params as Record<string, string | number>);
};

/**
 * POST /api/chats
 * Creates a new chat
 */
export const createChat = async (data: { title?: string }): Promise<ChatSummary> => {
  return http.post<ChatSummary>(API_ENDPOINTS.chats.create, data);
};

/**
 * GET /api/chats/:id/messages?limit=&cursor=
 * Returns paginated messages for a chat
 */
export const getChatMessages = async (
  chatId: string,
  params: PaginationParams = {}
): Promise<MessagesListResponse> => {
  return http.get<MessagesListResponse>(
    API_ENDPOINTS.chats.messages(chatId),
    params as Record<string, string | number>
  );
};

/**
 * POST /api/chats/:id/messages
 * Sends a message to the chat and receives assistant response
 */
export const sendMessage = async (chatId: string, content: string): Promise<ChatMessage> => {
  return http.post<ChatMessage>(API_ENDPOINTS.chats.sendMessage(chatId), { content });
};

// ============= Files =============

/**
 * GET /api/folders
 * Returns list of accessible folders for current user
 */
export const getFolders = async (): Promise<FoldersListResponse> => {
  return http.get<FoldersListResponse>(API_ENDPOINTS.files.folders);
};

/**
 * GET /api/folders/:id/files?limit=&cursor=
 * Returns paginated files in a folder
 */
export const getFolderFiles = async (
  folderId: string,
  params: PaginationParams = {}
): Promise<FilesListResponse> => {
  return http.get<FilesListResponse>(
    API_ENDPOINTS.files.folderFiles(folderId),
    params as Record<string, string | number>
  );
};

/**
 * POST /api/folders/:id/upload
 * Uploads a file to the folder
 */
export const uploadFile = async (folderId: string, file: File): Promise<FileUploadResponse> => {
  return http.upload<FileUploadResponse>(API_ENDPOINTS.files.upload(folderId), file);
};

/**
 * DELETE /api/files/:id
 * Deletes a file
 */
export const deleteFile = async (fileId: string): Promise<void> => {
  return http.delete<void>(API_ENDPOINTS.files.delete(fileId));
};

/**
 * GET /api/files/:id/download
 * Downloads a file
 */
export const downloadFile = async (fileId: string): Promise<Blob> => {
  // Special case for file downloads
  const response = await fetch(API_ENDPOINTS.files.download(fileId));
  if (!response.ok) {
    throw new Error('Download failed');
  }
  return response.blob();
};
