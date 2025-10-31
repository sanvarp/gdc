/**
 * Main App Component
 * Sets up routing and layout
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@layouts';
import { HomePage, ChatsPage, FilesPage, AdminPage } from '@pages';
import { Toast } from '@components';
import { useStore, selectToasts } from '@store';

function App() {
  const toasts = useStore(selectToasts);
  const { loadUser, dismissToast } = useStore();

  useEffect(() => {
    // Load current user on app mount
    loadUser();
  }, [loadUser]);

  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chats/:chatId" element={<ChatsPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/files/:folderId" element={<FilesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AppShell>

      {/* Toast notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          variant={toast.type}
          message={toast.message}
          onClose={() => dismissToast(toast.id)}
          position="top-right"
        />
      ))}
    </BrowserRouter>
  );
}

export default App;
