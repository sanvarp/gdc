/**
 * Chats Slice
 * Manages chats list and messages
 */

import type { StateCreator } from 'zustand';
import type { ChatSummary, ChatMessage, AsyncState, SearchParams } from '@types';
import { getChats, getChatMessages, sendMessage, createChat } from '@api/client';

export interface ChatsSlice {
  list: AsyncState<ChatSummary[]>;
  searchQuery: string;
  activeId: string | null;
  messages: Record<string, AsyncState<ChatMessage[]>>;
  sendingMessage: boolean;

  setSearchQuery: (query: string) => void;
  loadChats: (params?: SearchParams) => Promise<void>;
  setActiveChat: (chatId: string | null) => void;
  loadMessages: (chatId: string) => Promise<void>;
  sendChatMessage: (chatId: string, content: string) => Promise<void>;
  createNewChat: (title?: string) => Promise<string>;
}

export const createChatsSlice: StateCreator<ChatsSlice> = set => ({
  list: { data: null, status: 'idle', error: null },
  searchQuery: '',
  activeId: null,
  messages: {},
  sendingMessage: false,

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  loadChats: async (params = {}) => {
    set(state => ({
      list: { ...state.list, status: 'loading', error: null },
    }));

    try {
      const response = await getChats(params);
      set({
        list: { data: response.items, status: 'success', error: null },
      });
    } catch (error) {
      set({
        list: { data: null, status: 'error', error: error as never },
      });
    }
  },

  setActiveChat: (chatId: string | null) => {
    set({ activeId: chatId });
  },

  loadMessages: async (chatId: string) => {
    set(state => ({
      messages: {
        ...state.messages,
        [chatId]: {
          data: state.messages[chatId]?.data || null,
          status: 'loading',
          error: null,
        },
      },
    }));

    try {
      const response = await getChatMessages(chatId);
      set(state => ({
        messages: {
          ...state.messages,
          [chatId]: { data: response.items, status: 'success', error: null },
        },
      }));
    } catch (error) {
      set(state => ({
        messages: {
          ...state.messages,
          [chatId]: { data: null, status: 'error', error: error as never },
        },
      }));
    }
  },

  sendChatMessage: async (chatId: string, content: string) => {
    set({ sendingMessage: true });

    // Optimistic update: Add user message immediately
    const userMessage: ChatMessage = {
      id: `msg_${chatId}_${Date.now()}_user`,
      chatId,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    set(state => {
      const currentMessages = state.messages[chatId]?.data || [];
      return {
        messages: {
          ...state.messages,
          [chatId]: {
            data: [...currentMessages, userMessage],
            status: 'success',
            error: null,
          },
        },
      };
    });

    try {
      const assistantMsg = await sendMessage(chatId, content);

      // Add assistant message
      set(state => {
        const currentMessages = state.messages[chatId]?.data || [];
        return {
          messages: {
            ...state.messages,
            [chatId]: {
              data: [...currentMessages, assistantMsg],
              status: 'success',
              error: null,
            },
          },
          sendingMessage: false,
        };
      });

      // Reload chat list to update lastMessage
      const state = await getChats();
      set({ list: { data: state.items, status: 'success', error: null } });
    } catch (error) {
      set({ sendingMessage: false });
      throw error;
    }
  },

  createNewChat: async (title?: string) => {
    try {
      const newChat = await createChat({ title });

      // Add to list
      set(state => ({
        list: {
          ...state.list,
          data: state.list.data ? [newChat, ...state.list.data] : [newChat],
        },
        messages: {
          ...state.messages,
          [newChat.id]: { data: [], status: 'success', error: null },
        },
      }));

      return newChat.id;
    } catch (error) {
      throw error;
    }
  },
});
