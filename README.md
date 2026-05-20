# Resume Builder 📄
Live Demo: https://ats-resume-builder-lyart.vercel.app/

A client-side resume builder designed for ATS compatibility, built with React, TypeScript and Tailwind CSS. Fill in your information, preview your CV in real time, and download it as a professional PDF directly from the browser.

## Description

Resume Builder is a fully client-side application that allows users to create and export ATS-optimized resumes without any backend. It features a live preview panel that updates as you type, four color scheme options, five ATS-safe font choices, drag-and-drop section reordering, and PDF export powered by @react-pdf/renderer. All data is automatically saved to localStorage so nothing is lost on page refresh.

## Motivation

This project was built to demonstrate frontend-focused TypeScript skills including:
- Global state management with Zustand and automatic localStorage persistence
- Schema-driven type safety with Zod — types are inferred directly from validation schemas
- Real-time live preview that mirrors the PDF output
- PDF generation with ATS-safe embedded fonts and clickable hyperlinks
- Drag-and-drop UX with @dnd-kit for section reordering

## Tech Stack
- **React + TypeScript** — UI and type safety
- **Vite** — build tool
- **Tailwind CSS v4** — styling
- **Zustand** — global state with persist middleware
- **Zod** — schema validation and type inference
- **@react-pdf/renderer** — PDF generation
- **@dnd-kit** — drag and drop
- **lucide-react** — icons

## Features
- Fill out personal info, summary, work experience, education, skills and projects
- Live CV preview updates in real time as you type
- 4 color schemes: Emerald, Ruby, Sapphire, Amber
- 5 ATS-safe fonts: Inter, Arimo, Caladea, Cabin, Merriweather
- Reorder and toggle visibility of CV sections via drag and drop
- Per-field validation on blur with inline error messages powered by Zod
- Auto-save to localStorage
- Download a PDF with embedded ATS-safe fonts and clickable hyperlinks
- Responsive — works on mobile and desktop

## Quick Start

### Prerequisites
- Node.js 18+

### 1. Clone the repository

```bash
git clone https://github.com/francoronchese/ResumeBuilder.git
cd ResumeBuilder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at http://localhost:5173.
