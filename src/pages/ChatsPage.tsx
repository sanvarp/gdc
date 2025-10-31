/**
 * Chats Page
 * Shows chat history list or active chat view
 */

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '@store';
import { ChatHistoryList, ChatView } from '@features/chats';

export function ChatsPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const { searchQuery, setSearchQuery } = useStore();

  useEffect(() => {
    // Load user on mount for permissions
    useStore.getState().loadUser();
  }, []);

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {chatId ? (
        <ChatView chatId={chatId} />
      ) : (
        <div className="h-full w-full">
          <ChatHistoryList
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      )}
    </div>
  );
}
