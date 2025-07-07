# ✨ Thinkly

Thinkly is a powerful document management and AI-powered knowledge platform built with Next.js, featuring advanced semantic search and intelligent document interaction.

## 🚀 Key Features

### 🤖 AI-Powered Document Intelligence
- **💬 Document Conversations**: Chat naturally with your documents - ask questions and get instant, contextually relevant answers
- **🧠 Semantic Understanding**: Advanced AI processing extracts meaning, not just keywords from your content
- **🔍 Vector Search**: Cutting-edge vector embeddings enable searching by concepts and meaning across all documents and notes

### 📂 Seamless Document Management
- **🗄️ Unified Repository**: Centralized storage for all your important documents in one accessible location
- **🏢 Organization Structure**: Maintain separate document spaces for different teams or projects
- **⚡ Instant Retrieval**: Find exactly what you need through powerful search capabilities

### 📝 Smart Note-Taking
- **🔗 Contextual Notes**: Create notes linked directly to relevant documents
- **💡 Knowledge Capture**: Preserve insights and important information with advanced organization tools
- **🔎 Searchable Content**: All notes are indexed for semantic search alongside documents

### 🎨 Beautiful, Intuitive Interface
- **✨ Modern Design**: Clean, professional UI focused on readability and efficient interactions
- **🌓 Dark/Light Mode**: Flexible theming options for comfortable viewing in any environment
- **📱 Responsive Layout**: Optimized experience across desktop and mobile devices

### 🏛️ Enterprise-Ready
- **🔐 Organization Access Control**: Role-based permissions ensure the right people access appropriate content
- **🔒 Secure Authentication**: Robust identity management through Clerk integration
- **🔄 Real-time Updates**: Instant synchronization across all connected devices

## 🔜 Coming Soon: PDF Processing

PDF processing is not currently available since this app uses Convex as backend. Convex backend functions run in a restricted serverless JS runtime similar to Vercel Edge Functions or Cloudflare Workers.

❌ This runtime doesn't support Node.js native modules or require-heavy libraries like pdf-parse, pdfjs-dist, or anything depending on Node's fs, stream, or Buffer APIs beyond the minimal polyfills.

A separate service for PDF parsing will be developed to add this functionality in the future.

## 🏁 Getting Started

First, run the Convex development server:

```bash
npx convex dev
```

Then, in a separate terminal, run the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



