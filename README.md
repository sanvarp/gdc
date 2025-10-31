# Frontend SPA - React + Vite + TypeScript + Tailwind CSS

Una aplicación de página única (SPA) moderna y profesional para gestión de chats y archivos, construida con las mejores prácticas de desarrollo frontend.

## 🎯 Características Principales

- ✅ **Chats**: Historial completo con búsqueda, conversaciones con asistente inteligente
- ✅ **Archivos**: Navegación por carpetas, gestión de permisos, upload condicional con drag & drop
- ✅ **Admin**: Módulo placeholder para futuras funcionalidades administrativas
- ✅ **UI Responsive**: Diseño mobile-first que se adapta perfectamente a todos los dispositivos
- ✅ **Accesibilidad**: Cumple con WCAG AA, navegación por teclado, focus rings, ARIA labels
- ✅ **API Mock**: Sistema completo de mocks con delays y errores simulados para pruebas de UX
- ✅ **Documentación**: Contratos API documentados en `docs/CONTRATOS.md` para el backend

## 🛠️ Stack Tecnológico

- **React 18** - Biblioteca UI con hooks y concurrent features
- **TypeScript** (strict mode) - Tipado estático completo
- **Vite** - Build tool ultrarrápido con HMR
- **Tailwind CSS** - Framework utility-first con paleta de marca personalizada
- **React Router** - Navegación declarativa para SPA
- **Zustand** - Estado global ligero y performante
- **Vitest + React Testing Library** - Testing moderno
- **ESLint + Prettier** - Code quality y formato consistente

## 🎨 Paleta de Marca

```css
Primary:   #2596be  /* Azul principal */
Secondary: #61a4a8  /* Verde azulado */
Accent:    #90a73f  /* Verde oliva */
Neutral:   #ffffff  /* Blanco */
```

Todas las combinaciones de color cumplen con contraste AA (4.5:1 mínimo para texto).

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/                  # API mock con fixtures
│   │   ├── client.ts         # Cliente API principal
│   │   ├── utils.ts          # Helpers (delay, errors, pagination)
│   │   └── fixtures/         # Datos de prueba
│   │       ├── users.ts
│   │       ├── chats.ts
│   │       └── files.ts
│   ├── components/           # Componentes UI reutilizables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Skeleton.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   ├── features/             # Módulos por funcionalidad
│   │   ├── chats/
│   │   │   ├── ChatHistoryList.tsx
│   │   │   ├── ChatItem.tsx
│   │   │   ├── ChatView.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── PromptInput.tsx
│   │   ├── files/
│   │   │   ├── FolderGrid.tsx
│   │   │   ├── FolderCard.tsx
│   │   │   ├── FileTable.tsx
│   │   │   ├── FileRow.tsx
│   │   │   └── UploadButton.tsx
│   │   └── admin/
│   ├── layouts/              # Layouts de página
│   │   ├── AppShell.tsx      # Layout principal
│   │   ├── Sidebar.tsx       # Navegación lateral
│   │   └── MainContent.tsx   # Wrapper de contenido
│   ├── pages/                # Páginas/rutas
│   │   ├── HomePage.tsx
│   │   ├── ChatsPage.tsx
│   │   ├── FilesPage.tsx
│   │   └── AdminPage.tsx
│   ├── store/                # Estado global (Zustand)
│   │   ├── index.ts          # Store principal
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── uiSlice.ts
│   │       ├── chatsSlice.ts
│   │       └── filesSlice.ts
│   ├── types/                # Definiciones de tipos
│   │   └── index.ts
│   ├── utils/                # Utilidades
│   │   ├── cn.ts             # Merge de clases Tailwind
│   │   └── formatters.ts     # Formateo de datos
│   ├── test/                 # Setup de tests
│   │   └── setup.ts
│   ├── App.tsx               # Componente raíz
│   ├── main.tsx              # Entry point
│   └── index.css             # Estilos globales
├── docs/
│   └── CONTRATOS.md          # Especificación API para backend
├── public/
├── tests/                    # Tests unitarios y de integración
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone <url>
cd frontend

# Instalar dependencias
npm install

# Copiar variables de entorno (opcional)
cp .env.example .env
```

### Scripts Disponibles

```bash
# Desarrollo (abre en http://localhost:3000)
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Tests
npm run test           # Ejecutar tests
npm run test:ui        # UI de Vitest
npm run test:coverage  # Coverage report

# Linting
npm run lint           # Verificar código
npm run lint:fix       # Arreglar automáticamente

# Formateo
npx prettier --write . # Formatear todos los archivos
```

## 🗺️ Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Home - Página de bienvenida con resumen |
| `/chats` | Lista de chats con búsqueda |
| `/chats/:chatId` | Vista de conversación individual |
| `/files` | Grid de carpetas accesibles |
| `/files/:folderId` | Tabla de archivos en carpeta |
| `/admin` | Placeholder para panel admin (futuro) |

## 🔌 API Mock

El frontend incluye un sistema completo de mocks en `src/api/client.ts` que simula el comportamiento del backend:

### Características de los Mocks

- **Delays realistas**: 200-1200ms por request
- **Tasa de error configurable**: 5% por defecto
- **Paginación**: Cursor-based pagination
- **Validaciones**: MIME types, tamaños de archivo, longitud de mensajes
- **Fixtures**: Datos de prueba generados con Faker.js

### Endpoints Implementados

#### Autenticación
- `GET /me` - Usuario actual

#### Chats
- `GET /chats` - Lista con búsqueda y paginación
- `POST /chats` - Crear chat
- `GET /chats/:id/messages` - Mensajes paginados
- `POST /chats/:id/messages` - Enviar mensaje

#### Archivos
- `GET /folders` - Carpetas accesibles
- `GET /folders/:id/files` - Archivos paginados
- `POST /folders/:id/upload` - Upload (max 15MB)

**Ver especificación completa en `docs/CONTRATOS.md`**

## 🎨 Componentes UI

### Componentes Base

- **Button** - 4 variantes, 3 tamaños, estados disabled/loading
- **Card** - Con header, content, footer opcionales
- **Input/Textarea** - Labels, errores, char counter
- **Modal** - Con focus trap y escape/overlay close
- **Toast** - Notificaciones con 4 variantes
- **Skeleton** - Placeholders de carga
- **EmptyState/ErrorState** - Estados vacíos y errores

### Features

#### Chats
- Lista con búsqueda en tiempo real
- Vista de conversación con roles diferenciados
- Input con contador de caracteres (max 4000)
- Auto-scroll al recibir mensajes
- Estados: loading, empty, error

#### Files
- Grid responsivo de carpetas (1-3 columnas)
- Tabla sorteable de archivos
- Upload con drag & drop
- Validación de MIME type y tamaño
- Permisos condicionales (canUpload)
- Formateo de tamaños y fechas

## 🏪 Estado Global (Zustand)

### Slices

```typescript
// Auth
user: AsyncState<User>
loadUser(), logout()

// UI
sidebarOpen: boolean
toasts: Toast[]
toggleSidebar(), showToast(), dismissToast()

// Chats
list: AsyncState<ChatSummary[]>
messages: Record<chatId, AsyncState<ChatMessage[]>>
loadChats(), createNewChat(), sendChatMessage()

// Files
folders: AsyncState<Folder[]>
filesByFolder: Record<folderId, AsyncState<FileItem[]>>
loadFolders(), loadFolderFiles(), uploadFileToFolder()
```

## 🧪 Testing

### Cobertura

- **Componentes UI**: Button, Card, Input, Modal
- **Store**: authSlice, uiSlice
- **API**: Todos los endpoints mock
- **Integración**: Flujos completos de chats y files

### Ejecutar Tests

```bash
npm test                # Modo watch
npm run test:ui         # Interfaz gráfica
npm run test:coverage   # Reporte de cobertura
```

## ♿ Accesibilidad (WCAG AA)

- ✅ Contraste de color mínimo 4.5:1
- ✅ Navegación completa por teclado (Tab, Enter, Escape)
- ✅ Focus rings visibles en todos los controles
- ✅ ARIA labels, roles y live regions
- ✅ Elementos semánticos (nav, main, aside, article)
- ✅ Tamaños de toque mínimos 44x44px en móvil
- ✅ Textos alternativos en imágenes

## 📱 Responsive Design

### Breakpoints

```css
sm:  640px   /* Móvil horizontal */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Desktop grande */
2xl: 1536px  /* Desktop XL */
```

### Estrategia Mobile-First

- Layouts fluidos con flexbox/grid
- Sidebar se oculta en móvil (overlay)
- Tablas se convierten a cards en móvil
- Botones y controles táctiles (min 44px)
- Espaciado adaptativo

## 🔐 Permisos y Seguridad

### Sistema de Permisos

```typescript
permissions: [
  "chats:read",
  "chats:write",
  "files:read",
  "files:upload:folder:{folderId}"
]
```

El frontend valida permisos localmente (UI) pero el backend debe hacer la validación autoritativa.

### Recomendaciones Backend

- CORS configurado correctamente
- Rate limiting por endpoint
- Validación de inputs (XSS, SQL injection)
- Tokens JWT con expiración
- HTTPS en producción
- Headers de seguridad (CSP, HSTS, etc.)

## 📚 Documentación para Backend

El archivo `docs/CONTRATOS.md` contiene la especificación completa:

- ✅ Estructura exacta de requests/responses
- ✅ Códigos de error esperados
- ✅ Validaciones de datos
- ✅ Comportamiento de paginación
- ✅ Permisos requeridos por endpoint
- ✅ Ejemplos de uso

**⚠️ El backend DEBE implementar los contratos exactamente como se documentan.**

## 🎯 Decisiones de Diseño

### ¿Por qué Zustand sobre Redux?

- Menos boilerplate
- API más simple
- Mejor TypeScript support
- Sin providers necesarios
- Devtools integradas

### ¿Por qué Cursor Pagination?

- Más eficiente con datasets grandes
- Consistente con inserciones/eliminaciones
- Mejor para tiempo real
- No sufre de page drift

### ¿Por qué Mocks en lugar de MSW?

- Simplicidad de setup
- Control total sobre estados
- Delays/errores configurables
- Portabilidad (no depende de service workers)

### ¿Por qué Feature Folders?

- Coloca código relacionado junto
- Escalabilidad (features independientes)
- Facilita testing
- Reutilización clara (components vs features)

## 🚦 Próximos Pasos (Post-MVP)

### UI/UX
- [ ] Implementar dark mode completo
- [ ] Añadir animaciones micro-interacciones
- [ ] Optimistic updates en mutations
- [ ] Infinite scroll en listas
- [ ] Offline support con service workers

### Features
- [ ] Módulo Admin funcional
- [ ] Chat con streaming (Server-Sent Events)
- [ ] Edición de mensajes
- [ ] Compartir archivos entre usuarios
- [ ] Notificaciones push

### Performance
- [ ] Code splitting por ruta
- [ ] Lazy loading de imágenes
- [ ] Virtual scrolling en listas largas
- [ ] React Query para caching
- [ ] Memoization estratégica

### DevX
- [ ] Storybook para componentes
- [ ] Chromatic para visual regression
- [ ] E2E tests con Playwright
- [ ] CI/CD pipeline
- [ ] Análisis de bundle size

## 🤝 Contribución

1. Fork del repositorio
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar funcionalidad X'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Convenciones

- Commits: Conventional Commits
- Código: ESLint + Prettier
- Tests: Mínimo 70% coverage para PRs
- TypeScript: Strict mode, sin `any`

