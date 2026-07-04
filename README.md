# ⚖️ DharmaAI — AI-Powered Legal Assistance Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue?logo=react)](https://react.dev/)
[![Fastify](https://img.shields.io/badge/Backend-Fastify%20%2B%20Node.js-black?logo=fastify)](https://fastify.dev/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter%20%28Gemini%29-purple)](https://openrouter.ai/)

> **DharmaAI** acts as a vital bridge between complex statutory law and everyday citizens. By translating dense legal frameworks into plain, human-readable rights and matching users with verified legal professionals, it ensures justice and legal literacy are never gatekept by complex jargon.

🔗 **Live Demo:** *Coming Soon* ([Preview Placeholder](https://github.com/abhini1516/DharmaAI))

---

## 📖 Table of Contents
1. [Problem Statement](#-problem-statement)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [Project Architecture & Workflow](#-project-architecture--workflow)
5. [Folder Structure](#-folder-structure)
6. [API Documentation](#-api-documentation)
7. [Installation & Setup](#-installation--setup)
8. [Future Enhancements](#-future-enhancements)
9. [Skills Demonstrated](#-skills-demonstrated)
10. [License & Contact](#-license--contact)

---

## 🛑 Problem Statement
For the general public, navigating legal systems or understanding central acts can be incredibly intimidating. Legal documentation is dense, vocabulary is specialized, and finding a verified professional matching a specific context is often inefficient. 

**DharmaAI flips the paradigm.** Instead of catering strictly to legal professionals, this platform places the end consumer at the center—demystifying legal concepts, increasing statutory literacy, and facilitating direct paths to representation.

---

## ✨ Key Features

| Feature | Description | Core Technology |
| :--- | :--- | :--- |
| **🤖 AI Legal Assistant** | Conversational chat interface responding to complex queries in plain language. | OpenRouter (Gemini 2.5 Flash) |
| **📁 Citizen's Library** | Curated breakdowns of essential laws (DPDP Act 2023, IT Act 2000, Consumer Protection). | React + Tailwind UI |
| **🔍 Lawyer Directory** | Dynamic matching matrix allowing users to look up legal practitioners by specialized field. | MongoDB Atlas |
| **📱 Unified Monorepo** | Highly decoupled but neatly integrated frontend/backend structures managed cleanly via custom workspaces. | `pnpm` Workspaces |

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React, TypeScript, Vite
* **Styling:** Tailwind CSS, shadcn/ui

### Backend
* **Runtime & Framework:** Node.js, Fastify (TypeScript)
* **AI Ecosystem:** OpenRouter API Integration (`Google Gemini 2.5 Flash`)
* **Database Layer:** MongoDB Atlas (Cloud)

### Tooling & Deployment
* **Monorepo Engine:** `pnpm`
* **Target Platforms:** Vercel (Frontend), Render (Backend)

---

## 🏗️ Project Architecture & Workflow

### Architecture Diagram
```text
                 User
                   │
                   ▼
        React + Vite Frontend
                   │
          HTTP REST API Calls
                   │
                   ▼
         Node.js + Fastify Backend
             │                │
             │                │
             ▼                ▼
       OpenRouter API      MongoDB Atlas
             │
             ▼
     Google Gemini 2.5 Flash
```

---

### Application Workflow
1. User interacts with the clean **DharmaAI** interface to state a grievance or ask a structural legal question.
2. The UI pushes a contextually anchored query structure downstream via **REST endpoints**.
3. The **Fastify Backend** appends system instructions/guardrails and invokes **OpenRouter**.
4. **Gemini 2.5 Flash** processes the legal query, generating an accessible response structure.
5. Concurrent requests for local bar directory matching pull directly from mapped collections on **MongoDB Atlas**.

---

## 📂 Folder Structure

```text
DharmaAI/
├── artifacts/
│   ├── dharma-ai/          # React + Vite Frontend Application
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── api-server/         # Fastify REST Engine
│       ├── src/
│       ├── routes/
│       ├── lib/
│       ├── data/
│       ├── scripts/        # Database Seeding Scripts
│       └── package.json
├── package.json
├── pnpm-workspace.yaml
├── README.md
└── .env.example

# 🌐 API Documentation

## AI Chat

**POST** `/api/chat`

Request

```json
{
  "message": "Explain consumer rights in India"
}
```

Returns an AI-generated legal explanation.

---

## Get Lawyers

**GET**

```
/api/lawyers
```

Returns all registered lawyers.

---
## Search Lawyers

**GET**

```
/api/lawyers?specialization=criminal
```

Returns lawyers matching the selected specialization.

---
# 🚀 Installation & Setup

## Prerequisites

- Node.js
- pnpm

---

## Clone Repository

```bash
git clone https://github.com/abhini1516/DharmaAI.git

cd DharmaAI
```

---

## Configure Environment Variables

Create a `.env` file using `.env.example`.

```env
OPENROUTER_API_KEY=your_openrouter_api_key

MONGODB_URI=your_mongodb_connection_string

PORT=3001

NODE_ENV=development
```

---

## Install Dependencies

```bash
pnpm install
```

---

## Run Backend

```bash
cd artifacts/api-server

pnpm run dev
```

---

## Run Frontend

```bash
cd artifacts/dharma-ai

pnpm run dev
```

---

# 🔮 Future Enhancements

- 🎙️ Voice-enabled legal assistant
- 📄 OCR for legal documents
- 📑 PDF summarization
- 🌐 Multilingual support
- 🔐 User authentication
- 💬 Conversation history
- 📅 Lawyer appointment booking
- ⚖️ Case law search

---
# 🧠 Skills Demonstrated

- Full-Stack Engineering: Designing resilient client-server modules with Fastify and React.

- Intelligent Prompt Engineering: Structuring system contexts to keep AI legal breakdowns safe, sound, and legally informative.

- Database Management: Scalable schema building using MongoDB cloud clusters.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👤 Author

**Abhini S**

Pre-Final Year Computer Science Engineering Student

- GitHub: https://github.com/abhini1516
- LinkedIn: https://www.linkedin.com/in/abhini-s-220345281/
- Email: abhiniprojects7@gmail.com
