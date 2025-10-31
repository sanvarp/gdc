/**
 * ChatHistoryList Component
 * List of chat summaries with search and filtering
 * Premium design with glassmorphism and animations
 */

import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@store';
import { ChatItem } from './ChatItem';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Skeleton } from '@components/Skeleton';
import { EmptyState } from '@components/EmptyState';
import { ErrorState } from '@components/ErrorState';
import { cn } from '@utils/cn';

export interface ChatHistoryListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={cn(
          "group relative backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/70 to-white/60",
          "rounded-2xl border border-white/30 p-5 space-y-3 shadow-depth-lg",
          "animate-fade-in-scale animate-glow-pulse",
          `animate-stagger-${Math.min(index + 1, 5)}`
        )}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer rounded-2xl" />

        <div className="relative space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Skeleton variant="text" width="65%" height={22} className="rounded-lg" />
            <Skeleton variant="text" width={70} height={18} className="rounded-full" />
          </div>
          <Skeleton variant="text" width="92%" height={18} className="rounded-lg" />
          <Skeleton variant="text" width="75%" height={18} className="rounded-lg" />
          <div className="flex items-center gap-2 pt-1">
            <Skeleton variant="text" width={90} height={18} className="rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const ChatHistoryList = ({
  searchQuery,
  onSearchChange,
}: ChatHistoryListProps) => {
  const navigate = useNavigate();

  // Store selectors
  const chatsList = useStore((state) => state.list);
  const activeId = useStore((state) => state.activeId);
  const loadChats = useStore((state) => state.loadChats);
  const setActiveChat = useStore((state) => state.setActiveChat);
  const createNewChat = useStore((state) => state.createNewChat);

  // Load chats on mount
  useEffect(() => {
    if (chatsList.status === 'idle') {
      loadChats();
    }
  }, [chatsList.status, loadChats]);

  // Filter chats based on search query
  const filteredChats = useMemo(() => {
    if (!chatsList.data) return [];

    if (!searchQuery.trim()) {
      return chatsList.data;
    }

    const query = searchQuery.toLowerCase();
    return chatsList.data.filter(
      (chat) =>
        chat.title.toLowerCase().includes(query) ||
        chat.lastMessage?.toLowerCase().includes(query)
    );
  }, [chatsList.data, searchQuery]);

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
    navigate(`/chats/${chatId}`);
  };

  const handleNewChat = async () => {
    try {
      const newChatId = await createNewChat('New Chat');
      setActiveChat(newChatId);
      navigate(`/chats/${newChatId}`);
    } catch (error) {
      console.error('Failed to create new chat:', error);
    }
  };

  const handleRetry = () => {
    loadChats();
  };

  const handleSearchClear = () => {
    onSearchChange('');
  };

  // Loading state
  if (chatsList.status === 'loading' && !chatsList.data) {
    return (
      <div className="relative h-full flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Dark theme animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-secondary-950/30 to-transparent animate-gradient bg-300% opacity-60" />

        {/* Floating glowing orbs - dark theme */}
        <div className="absolute top-10 left-5 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl animate-float animate-glow-pulse" />
        <div className="absolute bottom-20 right-5 h-48 w-48 rounded-full bg-secondary-500/20 blur-3xl animate-float animate-glow-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-white/10 backdrop-blur-2xl bg-gradient-to-b from-gray-900/80 to-gray-900/60 shadow-floating">
            <Button
              variant="primary"
              size="md"
              fullWidth
              disabled
              aria-label="Crear nuevo chat"
              className="shadow-glow-sm bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 opacity-60"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="font-semibold">Nuevo Chat</span>
            </Button>
          </div>

          {/* Loading skeleton */}
          <div className="flex-1 overflow-y-auto p-5" aria-busy="true" aria-label="Cargando chats">
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (chatsList.status === 'error') {
    return (
      <div className="relative h-full flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Dark theme animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-gray-950/30 to-transparent animate-gradient bg-300% opacity-60" />

        {/* Error glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-red-500/20 blur-3xl animate-glow-pulse" />

        <div className="relative z-10 flex-1 flex items-center justify-center p-5">
          <ErrorState
            title="Error al cargar chats"
            message="No pudimos cargar tu historial de chats. Por favor intenta nuevamente."
            error={chatsList.error}
            onRetry={handleRetry}
            showDetails
            size="sm"
          />
        </div>
      </div>
    );
  }

  const hasChats = (chatsList.data?.length || 0) > 0;
  const hasFilteredChats = filteredChats.length > 0;

  return (
    <div className="relative h-full flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Dark theme animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/30 via-secondary-950/30 to-transparent animate-gradient bg-300% opacity-60" />

      {/* Floating glowing orbs - dark theme */}
      <div className="absolute top-10 left-5 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl animate-float animate-glow-pulse" />
      <div className="absolute bottom-20 right-5 h-48 w-48 rounded-full bg-secondary-500/20 blur-3xl animate-float animate-glow-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 h-32 w-32 rounded-full bg-accent-500/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with New Chat button - Dark glassmorphism */}
        <div className="p-5 space-y-4 border-b border-white/10 backdrop-blur-2xl bg-gradient-to-b from-gray-900/80 to-gray-900/60 shadow-floating">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={handleNewChat}
            aria-label="Crear nuevo chat"
            className={cn(
              "shadow-glow-md hover:shadow-glow-lg transform hover:scale-[1.03]",
              "transition-all duration-300 group relative overflow-hidden",
              "bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500",
              "hover:from-primary-500 hover:via-primary-400 hover:to-secondary-400"
            )}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <svg
              className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="font-semibold">Nuevo Chat</span>
          </Button>

          {/* Search input - Dark theme */}
          {hasChats && (
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

              <Input
                type="search"
                placeholder="Buscar conversaciones..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                fullWidth
                aria-label="Buscar chats"
                className={cn(
                  "relative backdrop-blur-xl bg-gray-800/50 border-gray-700/50 pl-10",
                  "text-gray-100 placeholder:text-gray-400",
                  "focus:border-primary-400/50 focus:shadow-glow-sm focus:bg-gray-800/70",
                  "transition-all duration-300 rounded-xl"
                )}
              />

              {/* Search icon */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 p-1.5",
                    "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500/50",
                    "rounded-lg transition-all duration-200 hover:scale-110"
                  )}
                  aria-label="Limpiar búsqueda"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Chat list - Dark theme with custom scrollbar */}
        <div
          className={cn(
            "flex-1 overflow-y-auto p-5",
            "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900/50"
          )}
          role="list"
          aria-label="Historial de chats"
        >
          {!hasChats ? (
            // No chats at all
            <div className="animate-fade-in-up">
              <EmptyState
                icon={
                  <div className="animate-float relative">
                    <div className="absolute inset-0 bg-primary-500/20 blur-2xl animate-glow-pulse" />
                    <svg
                      className="w-full h-full relative text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                }
                title="Aún no hay chats"
                description="Comienza una nueva conversación haciendo clic en el botón de arriba."
                size="sm"
              />
            </div>
          ) : !hasFilteredChats ? (
            // No results for search query
            <div className="animate-fade-in-up">
              <EmptyState
                icon={
                  <div className="animate-float relative">
                    <div className="absolute inset-0 bg-secondary-500/20 blur-2xl animate-glow-pulse" />
                    <svg
                      className="w-full h-full relative text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                }
                title="No se encontraron resultados"
                description={`No hay chats que coincidan con "${searchQuery}". Intenta con una búsqueda diferente.`}
                size="sm"
              />
            </div>
          ) : (
            // Display filtered chats with stagger animations
            <div className="space-y-4" role="list">
              {filteredChats.map((chat, index) => {
                const animationDelay = `animate-stagger-${Math.min(index + 1, 5)}`;
                return (
                  <div key={chat.id} role="listitem" className={animationDelay}>
                    <ChatItem
                      chat={chat}
                      isActive={chat.id === activeId}
                      onClick={handleChatClick}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Results count footer - Dark theme */}
        {hasChats && searchQuery && (
          <div
            className={cn(
              "p-4 border-t border-white/10 backdrop-blur-2xl",
              "bg-gradient-to-b from-gray-900/80 to-gray-900/60",
              "text-sm text-gray-300 text-center font-medium shadow-depth-lg"
            )}
            role="status"
            aria-live="polite"
          >
            {hasFilteredChats ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
                Mostrando {filteredChats.length} de {chatsList.data?.length || 0}{' '}
                {(chatsList.data?.length || 0) === 1 ? 'chat' : 'chats'}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                No se encontraron coincidencias
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
