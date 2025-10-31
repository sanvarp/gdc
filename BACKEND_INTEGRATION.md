# Especificación API Backend - Gases del Caribe Frontend

## Información General

**Proyecto**: Asistente Inteligente de Documentación GDC
**Frontend Framework**: React 18 + TypeScript + Vite
**Estado Management**: Zustand
**Autenticación**: Microsoft Entra ID (Azure AD)

---

## 📋 Tabla de Contenidos

1. [Configuración y URLs](#configuración-y-urls)
3. [Estructura de Respuestas](#estructura-de-respuestas)
4. [Endpoints de Chats](#endpoints-de-chats)
5. [Endpoints de Archivos](#endpoints-de-archivos)
6. [Manejo de Errores](#manejo-de-errores)
7. [Consideraciones de Azure Blob Storage](#consideraciones-de-azure-blob-storage)

---

## Configuración y URLs

### Variables de Entorno Frontend

El frontend usa estas variables de entorno (`.env`):

```bash
VITE_API_BASE_URL=http://localhost:3000
VITE_USE_MOCK_API=false  # true = usa datos mock, false = usa API real
```

### Base URL Esperada

```
Production: https://api.gasesdelcaribe.com
Development: http://localhost:3000
```

Todos los endpoints comienzan con `/api/`

---


## Estructura de Respuestas

### Respuestas Exitosas

**Formato estándar para colecciones:**

```typescript
{
  "items": Array<T>,           // Array de objetos (chats, archivos, etc)
  "total": number,              // Total de items disponibles
  "page": number,               // Página actual (opcional)
  "pageSize": number,           // Items por página (opcional)
  "hasMore": boolean            // Si hay más items (opcional)
}
```

**Formato estándar para items individuales:**

```typescript
{
  "data": T,                    // El objeto solicitado
  "message": string             // Mensaje opcional de éxito
}
```

### Timestamps

**IMPORTANTE:** Todos los timestamps deben ser **ISO 8601 strings**:

```typescript
"createdAt": "2024-10-30T14:30:00.000Z"  // ✅ Correcto
"createdAt": 1698675000000                // ❌ Incorrecto (no usar timestamps numéricos)
```

---

## Endpoints de Chats

### 1. Listar Todos los Chats

```http
GET /api/chats?page=1&pageSize=50&sortBy=updatedAt&sortOrder=desc
```

**Query Parameters (opcionales):**
- `page`: número de página (default: 1)
- `pageSize`: items por página (default: 50)
- `sortBy`: campo para ordenar (default: "updatedAt")
- `sortOrder`: "asc" | "desc" (default: "desc")

**Response 200:**

```json
{
  "items": [
    {
      "id": "chat_abc123",
      "title": "Consulta sobre cláusula de contrato",
      "lastMessage": "La cláusula 3.2 establece que...",
      "messageCount": 12,
      "createdAt": "2024-10-29T10:00:00.000Z",
      "updatedAt": "2024-10-30T14:30:00.000Z"
    }
  ],
  "total": 45,
  "page": 1,
  "pageSize": 50,
  "hasMore": false
}
```

**Estructura de cada objeto Chat:**

```json
{
  "id": "string - ID único del chat",
  "title": "string - Título del chat",
  "lastMessage": "string o null - Último mensaje enviado",
  "messageCount": "number - Cantidad de mensajes",
  "createdAt": "string - Fecha creación formato ISO 8601",
  "updatedAt": "string - Fecha actualización formato ISO 8601"
}
```

---

### 2. Obtener Mensajes de un Chat

```http
GET /api/chats/{chatId}/messages?page=1&pageSize=50
```

**Path Parameters:**
- `chatId`: ID del chat

**Query Parameters (opcionales):**
- `page`: número de página (default: 1)
- `pageSize`: mensajes por página (default: 50)

**Response 200:**

```json
{
  "items": [
    {
      "id": "msg_xyz789",
      "chatId": "chat_abc123",
      "role": "user",
      "content": "¿Qué dice la cláusula 3.2 del contrato?",
      "createdAt": "2024-10-30T14:25:00.000Z"
    },
    {
      "id": "msg_xyz790",
      "chatId": "chat_abc123",
      "role": "assistant",
      "content": "La cláusula 3.2 establece que el plazo de entrega es de 30 días hábiles...",
      "createdAt": "2024-10-30T14:25:05.000Z",
      "sources": [
        {
          "fileId": "file_123",
          "fileName": "Contrato_GDC_2024.pdf",
          "page": 3,
          "excerpt": "...plazo de entrega de 30 días hábiles..."
        }
      ]
    }
  ],
  "total": 12,
  "hasMore": false
}
```

**Estructura de cada Mensaje:**

```json
{
  "id": "string - ID único del mensaje",
  "chatId": "string - ID del chat al que pertenece",
  "role": "string - 'user' o 'assistant'",
  "content": "string - Contenido del mensaje",
  "createdAt": "string - Fecha formato ISO 8601",
  "sources": [
    {
      "fileId": "string - ID del documento",
      "fileName": "string - Nombre del archivo",
      "page": "number (opcional) - Página del documento",
      "excerpt": "string - Fragmento relevante del documento"
    }
  ]
}
```

**NOTA:** El campo `sources` solo debe incluirse en mensajes del asistente que hacen referencia a documentos.

---

### 3. Enviar Mensaje en un Chat

```http
POST /api/chats/{chatId}/messages
```

**Path Parameters:**
- `chatId`: ID del chat

**Request Body:**

```json
{
  "content": "¿Cuál es el monto máximo de indemnización?"
}
```

**Response 200:**

```json
{
  "id": "msg_new123",
  "chatId": "chat_abc123",
  "role": "assistant",
  "content": "Según la cláusula 7.4, el monto máximo de indemnización es...",
  "createdAt": "2024-10-30T14:30:00.000Z",
  "sources": [
    {
      "fileId": "file_456",
      "fileName": "Contrato_Servicios_2024.pdf",
      "page": 12,
      "excerpt": "...monto máximo de indemnización de $50,000 USD..."
    }
  ]
}
```

**IMPORTANTE:** El frontend usa **Optimistic UI Update**:
1. Frontend agrega mensaje del usuario INMEDIATAMENTE a la UI
2. Envía request al backend
3. Backend procesa y retorna respuesta del asistente
4. Frontend agrega respuesta del asistente a la UI

**El backend SOLO debe retornar el mensaje del asistente, NO el mensaje del usuario.**

---

### 4. Crear Nuevo Chat

```http
POST /api/chats
```

**Request Body:**

```json
{
  "title": "Nuevo Chat",
  "initialMessage": "¿Qué contratos tenemos activos?"
}
```

**Response 201:**

```json
{
  "id": "chat_new789",
  "title": "Nuevo Chat",
  "lastMessage": null,
  "messageCount": 0,
  "createdAt": "2024-10-30T14:35:00.000Z",
  "updatedAt": "2024-10-30T14:35:00.000Z"
}
```

Si se proporciona `initialMessage`, el backend debe:
1. Crear el chat
2. Procesar el mensaje inicial
3. Retornar el chat con `messageCount: 2` (user + assistant)

---

## Endpoints de Archivos

### 1. Listar Carpetas

```http
GET /api/folders
```

**Response 200:**

```json
{
  "items": [
    {
      "id": "folder_contratos",
      "name": "Contratos",
      "description": "Contratos y acuerdos legales",
      "fileCount": 45,
      "canUpload": true,
      "icon": "📄",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-10-30T14:00:00.000Z"
    },
    {
      "id": "folder_politicas",
      "name": "Políticas Internas",
      "description": "Políticas y procedimientos de la empresa",
      "fileCount": 23,
      "canUpload": false,
      "icon": "📋",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-10-28T11:00:00.000Z"
    }
  ],
  "total": 5
}
```

**Estructura de cada Carpeta:**

```json
{
  "id": "string - ID único de la carpeta",
  "name": "string - Nombre de la carpeta",
  "description": "string - Descripción de la carpeta",
  "fileCount": "number - Cantidad de archivos en la carpeta",
  "canUpload": "boolean - Si el usuario puede subir archivos aquí",
  "icon": "string (opcional) - Emoji para la carpeta",
  "createdAt": "string - Fecha creación formato ISO 8601",
  "updatedAt": "string - Fecha actualización formato ISO 8601"
}
```

---

### 2. Listar Archivos de una Carpeta

```http
GET /api/folders/{folderId}/files?page=1&pageSize=50&sortBy=name&sortOrder=asc
```

**Path Parameters:**
- `folderId`: ID de la carpeta

**Query Parameters (opcionales):**
- `page`: número de página
- `pageSize`: archivos por página
- `sortBy`: "name" | "size" | "uploadedAt" (default: "uploadedAt")
- `sortOrder`: "asc" | "desc" (default: "desc")

**Response 200:**

```json
{
  "items": [
    {
      "id": "file_abc123",
      "name": "Contrato_Servicio_GDC_2024.pdf",
      "size": 2457600,
      "type": "application/pdf",
      "uploadedBy": "Juan Pérez",
      "uploadedAt": "2024-10-15T09:30:00.000Z",
      "downloadUrl": "https://gdcstorage.blob.core.windows.net/documents/file_abc123.pdf?sv=..."
    }
  ],
  "total": 45,
  "hasMore": false
}
```

**Estructura de cada Archivo:**

```json
{
  "id": "string - ID único del archivo",
  "name": "string - Nombre del archivo con extensión",
  "size": "number - Tamaño en bytes",
  "type": "string - Tipo MIME (ej: application/pdf)",
  "uploadedBy": "string - Nombre del usuario que subió",
  "uploadedAt": "string - Fecha de carga formato ISO 8601",
  "downloadUrl": "string - URL temporal con SAS token de Azure"
}
```

**IMPORTANTE sobre `downloadUrl`:**
- Debe ser una **Azure Blob Storage SAS URL** con tiempo de expiración
- Recomendado: 1 hora de validez
- El frontend NO almacena estas URLs, las solicita cada vez que lista archivos

---

### 3. Subir Archivo

```http
POST /api/folders/{folderId}/upload
Content-Type: multipart/form-data
```

**Path Parameters:**
- `folderId`: ID de la carpeta destino

**Request Body (multipart/form-data):**

```
file: [archivo binario]
```

**Validaciones en Backend:**
- ✅ Tamaño máximo: 15MB (15,728,640 bytes)
- ✅ Tipos permitidos: PDF, DOCX, TXT, XLSX
- ✅ Usuario tiene permiso `canUpload` en esta carpeta

**Response 200:**

```json
{
  "id": "file_new456",
  "name": "Nuevo_Contrato_2024.pdf",
  "size": 1234567,
  "type": "application/pdf",
  "uploadedBy": "María González",
  "uploadedAt": "2024-10-30T14:40:00.000Z",
  "downloadUrl": "https://gdcstorage.blob.core.windows.net/documents/file_new456.pdf?sv=...",
  "message": "Archivo subido exitosamente"
}
```

**Frontend Implementación:**

```typescript
const formData = new FormData();
formData.append('file', fileObject);

fetch(`${API_BASE_URL}/api/folders/${folderId}/upload`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    // NO incluir Content-Type, el browser lo añade automáticamente con boundary
  },
  body: formData
});
```

---

## Manejo de Errores

### Formato Estándar de Error

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El archivo excede el tamaño máximo permitido",
    "details": {
      "maxSize": 15728640,
      "receivedSize": 20000000
    }
  }
}
```

### Códigos de Error Esperados

| HTTP Code | Error Code | Descripción | Cuándo usar |
|-----------|------------|-------------|-------------|
| 400 | `VALIDATION_ERROR` | Datos inválidos | Body malformado, campos faltantes |
| 401 | `UNAUTHORIZED` | No autenticado | Token inválido/expirado |
| 403 | `FORBIDDEN` | Sin permisos | Usuario no tiene acceso al recurso |
| 404 | `NOT_FOUND` | Recurso no existe | Chat/Archivo/Carpeta no encontrada |
| 413 | `FILE_TOO_LARGE` | Archivo muy grande | Supera 15MB |
| 415 | `UNSUPPORTED_FILE_TYPE` | Tipo no permitido | Archivo no es PDF/DOCX/TXT/XLSX |
| 429 | `RATE_LIMIT_EXCEEDED` | Demasiados requests | Rate limiting |
| 500 | `INTERNAL_SERVER_ERROR` | Error del servidor | Error inesperado en backend |
| 503 | `SERVICE_UNAVAILABLE` | Servicio no disponible | Azure Blob Storage caído |

### Ejemplo de Error:

**Request:**
```http
POST /api/folders/folder_123/upload
```

**Response 413:**
```json
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "El archivo excede el tamaño máximo de 15MB",
    "details": {
      "fileName": "documento_grande.pdf",
      "fileSize": 20000000,
      "maxSize": 15728640
    }
  }
}
```

---

## Consideraciones de Azure Blob Storage

### Flujo de Subida de Archivos

```
┌─────────┐                ┌─────────┐                ┌──────────────┐
│ Frontend│                │ Backend │                │ Azure Blob   │
│         │                │   API   │                │   Storage    │
└────┬────┘                └────┬────┘                └──────┬───────┘
     │                          │                            │
     │  POST /upload            │                            │
     │  (multipart/form-data)   │                            │
     ├─────────────────────────>│                            │
     │                          │                            │
     │                          │  Upload file to blob       │
     │                          ├───────────────────────────>│
     │                          │                            │
     │                          │  Return blob URL           │
     │                          │<───────────────────────────┤
     │                          │                            │
     │                          │  Save metadata in DB       │
     │                          │  (fileId, name, blobUrl)   │
     │                          │                            │
     │  Return success + URL    │                            │
     │<─────────────────────────┤                            │
     │                          │                            │
```

### Responsabilidades del Backend

1. **Recibir archivo del frontend** (multipart/form-data)
2. **Validar archivo**: tamaño, tipo, permisos
3. **Subir a Azure Blob Storage**:
   ```typescript
   const blobName = `${folderId}/${fileId}_${fileName}`;
   await blobClient.upload(fileBuffer, fileBuffer.length);
   ```
4. **Generar SAS URL** con expiración (1 hora recomendado)
5. **Guardar metadata en base de datos**:
   - fileId, fileName, fileSize, fileType
   - blobUrl (URL base sin SAS)
   - folderId, uploadedBy, uploadedAt
6. **Retornar al frontend**: metadata + SAS URL para descarga

### Generación de SAS URLs

**IMPORTANTE:** Cuando el frontend lista archivos, el backend debe:
- ✅ Generar SAS URLs frescas en cada request
- ✅ Usar tiempo de expiración corto (1 hora)
- ✅ Incluir solo permisos de lectura (`r`)

```typescript
// Ejemplo (Node.js con @azure/storage-blob)
const sasUrl = await blobClient.generateSasUrl({
  permissions: BlobSASPermissions.parse("r"), // Solo lectura
  expiresOn: new Date(Date.now() + 3600 * 1000), // 1 hora
});
```

### ¿Por qué NO subir directamente desde frontend?

**Razones de seguridad:**
- ❌ Expondría credenciales de Azure en el frontend
- ❌ No habría validación de archivos
- ❌ No habría control de permisos por usuario/carpeta
- ❌ No habría auditoría de quién subió qué

**Con backend como intermediario:**
- ✅ Credenciales seguras en servidor
- ✅ Validación antes de subir
- ✅ Control de permisos (`canUpload`)
- ✅ Auditoría completa (userId, timestamp)
- ✅ Procesamiento adicional (OCR, indexación para IA)

---

## Configuración Recomendada para Backend

### Variables de Entorno Backend

```bash
# Server
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@host:5432/gdc_db

# Azure Blob Storage
AZURE_STORAGE_ACCOUNT=gdcstorage
AZURE_STORAGE_KEY=your_storage_key_here
AZURE_STORAGE_CONTAINER=documents
AZURE_STORAGE_SAS_EXPIRATION=3600  # 1 hora en segundos

# Microsoft Entra ID (Azure AD)
# NOTA: Variables para autenticación (implementar en el futuro)
# ENTRA_TENANT_ID=your_tenant_id
# ENTRA_CLIENT_ID=your_client_id
# ENTRA_CLIENT_SECRET=your_client_secret

# File Upload
MAX_FILE_SIZE=15728640  # 15MB en bytes
ALLOWED_FILE_TYPES=application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

# CORS
CORS_ORIGIN=https://gdc-frontend.com,http://localhost:5173
```

### CORS Configuration

El backend debe permitir estos origins:
- Development: `http://localhost:5173` (Vite default)
- Production: Tu dominio de frontend

```javascript
// Express.js ejemplo
app.use(cors({
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## Testing de la API

### Postman Collection

Incluimos una colección de Postman con todos los endpoints. Importar desde:
```
/docs/GDC_API.postman_collection.json
```

### Variables de Prueba

```json
{
  "baseUrl": "http://localhost:3000",
  "authToken": "Bearer eyJhbGc...",
  "testChatId": "chat_test123",
  "testFolderId": "folder_contratos",
  "testFileId": "file_test456"
}
```

---

## Checklist de Implementación

### Fase 1: Chats (Core Functionality)
- [ ] GET /api/chats - Listar chats
- [ ] GET /api/chats/:id/messages - Obtener mensajes
- [ ] POST /api/chats/:id/messages - Enviar mensaje
- [ ] POST /api/chats - Crear chat
- [ ] Integración con IA (GPT-4/Claude) para respuestas
- [ ] Sistema de referencias (sources) a documentos

### Fase 2: Archivos (Storage)
- [ ] GET /api/folders - Listar carpetas
- [ ] GET /api/folders/:id/files - Listar archivos
- [ ] POST /api/folders/:id/upload - Subir archivo
- [ ] Integración con Azure Blob Storage
- [ ] Generación de SAS URLs
- [ ] Validación de archivos (tamaño, tipo)
- [ ] Control de permisos (canUpload)

### Fase 3: Seguridad y Performance
- [ ] Autenticación con Microsoft Entra ID (futuro)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Logging y auditoría
- [ ] Manejo de errores estandarizado
- [ ] Caché de respuestas frecuentes

### Fase 4: Procesamiento IA
- [ ] Indexación de documentos para búsqueda
- [ ] OCR para PDFs escaneados
- [ ] Embeddings de documentos
- [ ] Sistema de búsqueda semántica
- [ ] RAG (Retrieval-Augmented Generation)

---

## Contacto y Soporte

**Frontend Developer:** [Tu nombre]
**Email:** [Tu email]
**Documentación Frontend:** `/frontend/README.md`
**Repositorio:** [URL del repo]

**Fecha de última actualización:** 30 de Octubre 2024
**Versión de API:** 1.0.0

---

## Ejemplos de Integración Completos

### Ejemplo 1: Usuario Envía Mensaje

**Frontend Flow:**
```typescript
// 1. Usuario escribe "¿Qué dice la cláusula 5?"
const userMessage = {
  id: `msg_${Date.now()}_user`,
  chatId: 'chat_123',
  role: 'user',
  content: '¿Qué dice la cláusula 5?',
  createdAt: new Date().toISOString()
};

// 2. Agregar mensaje a UI inmediatamente (Optimistic Update)
updateUI(userMessage);

// 3. Enviar al backend
const response = await fetch(`${API_URL}/api/chats/chat_123/messages`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content: userMessage.content })
});

// 4. Backend procesa y retorna respuesta del asistente
const assistantMessage = await response.json();
// {
//   "id": "msg_456",
//   "role": "assistant",
//   "content": "La cláusula 5 establece...",
//   "sources": [...]
// }

// 5. Agregar respuesta a UI
updateUI(assistantMessage);
```

### Ejemplo 2: Usuario Sube Archivo

**Frontend Flow:**
```typescript
// 1. Usuario selecciona archivo
const file = event.target.files[0];

// 2. Validar en frontend
if (file.size > 15 * 1024 * 1024) {
  showError('Archivo muy grande. Máximo 15MB');
  return;
}

// 3. Crear FormData
const formData = new FormData();
formData.append('file', file);

// 4. Subir al backend
const response = await fetch(`${API_URL}/api/folders/folder_123/upload`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
    // NO incluir Content-Type aquí
  },
  body: formData
});

// 5. Backend responde con metadata + URL
const newFile = await response.json();
// {
//   "id": "file_789",
//   "name": "contrato.pdf",
//   "downloadUrl": "https://gdcstorage.blob.core.windows.net/..."
// }

// 6. Actualizar lista de archivos
refreshFilesList();
```

---

**FIN DE ESPECIFICACIÓN**
