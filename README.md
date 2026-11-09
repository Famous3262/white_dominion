# White Dominion

An early-stage repository for exploring an AI-assisted fashion and garment-design product. The product concept focuses on helping people explore clothing ideas and personalized fashion experiences.

> **Project status:** Early-stage development. This repository currently contains a Next.js application scaffold and supporting dependencies. The full product experience is not represented as complete or production-ready.

## Intended direction

The broader concept is to explore ways AI could support:

- Personalized fashion and style exploration
- Digital garment concepts and design workflows
- A more accessible connection between customers and fashion production

These are product goals, not a claim that every capability is implemented in the current codebase.

## Current technology

Based on the project dependencies:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase JavaScript client
- Google Generative AI SDK
- Framer Motion

## Run locally

### Requirements

- Node.js (LTS recommended)
- npm

### Setup

```bash
git clone https://github.com/Famous3262/white_dominion.git
cd white_dominion
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

```bash
npm run dev    # Start the development server
npm run build  # Build the application
npm run start  # Start the production server
npm run lint   # Run ESLint
```

## Configuration

If Supabase or Google AI services are enabled in a local implementation, configure their credentials using environment variables. Keep secrets in a local `.env.local` file and never commit API keys or service-role credentials.

## Repository

[View source code](https://github.com/Famous3262/white_dominion)

## Author

**Famous Bernard** — [@Famous3262](https://github.com/Famous3262)
