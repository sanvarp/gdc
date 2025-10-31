/**
 * Chat Fixtures
 */

import { faker } from '@faker-js/faker';
import type { ChatSummary, ChatMessage } from '@types';

// Generate mock chat summaries
export const generateChatSummaries = (count: number): ChatSummary[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `chat_${String(i + 1).padStart(3, '0')}`,
    title: faker.lorem.sentence({ min: 3, max: 6 }),
    lastMessage: faker.lorem.sentence(),
    messageCount: faker.number.int({ min: 1, max: 50 }),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
  }));
};

// Generate mock messages for a chat
export const generateChatMessages = (chatId: string, count: number): ChatMessage[] => {
  const messages: ChatMessage[] = [];

  for (let i = 0; i < count; i++) {
    const role = i % 2 === 0 ? 'user' : 'assistant';
    messages.push({
      id: `msg_${chatId}_${String(i + 1).padStart(3, '0')}`,
      chatId,
      role,
      content: faker.lorem.paragraph({ min: 1, max: 3 }),
      createdAt: faker.date.recent({ days: 7 }).toISOString(),
    });
  }

  return messages.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
};

// Pre-generated chats for consistency
export const mockChats: ChatSummary[] = generateChatSummaries(15);

// Sort by updatedAt DESC to get most recent first
mockChats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

// Messages cache
export const mockMessagesCache: Record<string, ChatMessage[]> = {};

// Initialize ALL chats with messages
mockChats.forEach(chat => {
  mockMessagesCache[chat.id] = generateChatMessages(chat.id, chat.messageCount);
});

// GUARANTEE: The 5 most recent chats ALWAYS have good messages (5-10 messages each)
mockChats.slice(0, 5).forEach((chat, index) => {
  // Force a good number of messages (5-10) for top 5 chats
  const minMessages = 5;
  const maxMessages = 10;
  const messageCount = minMessages + index; // 5, 6, 7, 8, 9 messages

  // Update the chat's message count
  chat.messageCount = messageCount;

  // Regenerate messages with the guaranteed count
  mockMessagesCache[chat.id] = generateChatMessages(chat.id, messageCount);
});
