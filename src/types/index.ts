/**
 * Core Type Definitions
 * Defines all data contracts expected from backend
 */

// ============= User & Auth =============
export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  createdAt: string;
}

// ============= Chats =============
export interface ChatSummary {
  id: string;
  title: string;
  lastMessage?: string;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface ChatsListResponse {
  items: ChatSummary[];
  nextCursor?: string;
}

export interface MessagesListResponse {
  items: ChatMessage[];
  nextCursor?: string;
}

// ============= Files =============
export interface Folder {
  id: string;
  name: string;
  owner: string;
  canUpload: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FileItem {
  id: string;
  folderId: string;
  name: string;
  mimeType: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoldersListResponse {
  items: Folder[];
}

export interface FilesListResponse {
  items: FileItem[];
  nextCursor?: string;
}

export interface FileUploadResponse {
  success: boolean;
  file: FileItem;
}

// ============= API & Errors =============
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  limit?: number;
  cursor?: string;
}

export interface SearchParams extends PaginationParams {
  search?: string;
}

// ============= UI State =============
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: ApiError | null;
}
