/**
 * ChatView Component
 * Main chat conversation view with messages and input
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '@store';
import { MessageList } from './MessageList';
import { PromptInput } from './PromptInput';
import { ErrorState } from '@components/ErrorState';
import { cn } from '@utils/cn';

export interface ChatViewProps {
  chatId: string;
}

export const ChatView = ({ chatId }: ChatViewProps) => {
  const navigate = useNavigate();
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);

  // Store selectors
  const messagesState = useStore((state) => state.messages[chatId]);
  const sendingMessage = useStore((state) => state.sendingMessage);
  const loadMessages = useStore((state) => state.loadMessages);
  const sendChatMessage = useStore((state) => state.sendChatMessage);
  const chatsList = useStore((state) => state.list);

  // Get current chat info
  const currentChat = chatsList.data?.find(chat => chat.id === chatId);

  // Load messages when chatId changes
  useEffect(() => {
    if (chatId) {
      setHasLoadedInitial(false);
      loadMessages(chatId).finally(() => {
        setHasLoadedInitial(true);
      });
    }
  }, [chatId, loadMessages]);

  const handleSendMessage = async (content: string) => {
    try {
      await sendChatMessage(chatId, content);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Error handling is done in the store
    }
  };

  const handleRetry = () => {
    loadMessages(chatId);
  };

  // Loading state
  if (!hasLoadedInitial) {
    return (
      <div className="relative flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-secondary-950/30 to-transparent animate-gradient bg-300% opacity-60" />

        {/* Floating glowing orbs */}
        <div className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-primary-500/20 blur-3xl animate-float animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-secondary-500/20 blur-3xl animate-float animate-glow-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary-500/30 blur-2xl animate-glow-pulse" />
              <svg
                className="animate-spin h-12 w-12 mx-auto text-primary-400 relative"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-gray-300 font-medium">Cargando conversación...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (messagesState?.status === 'error') {
    return (
      <div className="relative flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Animated gradient background with error theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-gray-950/30 to-transparent animate-gradient bg-300% opacity-60" />

        {/* Error glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-red-500/20 blur-3xl animate-glow-pulse" />

        <div className="relative z-10 flex-1 flex items-center justify-center p-5">
          <ErrorState
            title="Error al cargar mensajes"
            message="No pudimos cargar los mensajes de este chat. Por favor intenta nuevamente."
            error={messagesState.error}
            onRetry={handleRetry}
            showDetails
            size="md"
          />
        </div>
      </div>
    );
  }

  const messages = messagesState?.data || [];

  return (
    <div className="relative flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/20 via-secondary-950/20 to-transparent animate-gradient bg-300% opacity-40" />

      {/* Subtle floating glowing orbs */}
      <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl animate-float animate-glow-pulse" />
      <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-secondary-500/10 blur-3xl animate-float animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Premium Header with Back Button */}
        <header className="relative border-b border-white/5 bg-gray-900/40 backdrop-blur-xl backdrop-saturate-150">
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-secondary-500/5" />

          <div className="relative flex items-center gap-3 px-4 py-3">
            {/* Back Button */}
            <button
              onClick={() => navigate('/chats')}
              className="group relative overflow-hidden rounded-xl bg-white/5 p-2 text-gray-300 shadow-lg transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500/50 active:scale-95"
              aria-label="Volver a chats"
            >
              {/* Button glow effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-xl" />
              </div>

              <ArrowLeft className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            {/* Chat Title and Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-white truncate">
                {currentChat?.title || 'Chat'}
              </h2>
              {currentChat?.messageCount && (
                <p className="text-xs text-gray-400">
                  {currentChat.messageCount} {currentChat.messageCount === 1 ? 'mensaje' : 'mensajes'}
                </p>
              )}
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
                {/* Core dot */}
                <div className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
              </div>
              <span className="text-xs text-gray-400 hidden sm:inline">En línea</span>
            </div>
          </div>
        </header>

        {/* Messages area */}
        <MessageList
          messages={messages}
          loading={messagesState?.status === 'loading'}
          sending={sendingMessage}
        />

        {/* Input area */}
        <PromptInput onSubmit={handleSendMessage} disabled={sendingMessage} />
      </div>
    </div>
  );
};
