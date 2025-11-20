# Spotify Design System - Next.js App

A production-ready Next.js application built with Spotify's design language, featuring a complete component library and ready for deployment on Vercel.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 What's Included

### Design System
- **Complete Spotify color palette** - Brand colors, backgrounds, text colors, accents
- **Typography system** - Display, headings, body, and label styles
- **Spacing system** - 8px base unit with consistent scales
- **Component library** - 15+ production-ready React components

### Components
- **Button** - 5 variants, 4 sizes, loading states
- **Card** - Multiple variants with interactive states
- **Input** - Form inputs with icons and validation
- **MediaCard** - Album/playlist/artist cards with play buttons
- **Navigation** - Sidebar, NavItem, TopBar components
- **Player** - Complete playback control bar
- **Badge** - Status and label badges

### Tech Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vercel-ready** - Optimized for deployment

## 🎨 Using the Design System

### Colors
```tsx
<div className="bg-spotify-green text-black">Primary CTA</div>
<div className="bg-base text-white">Card background</div>
```

### Typography
```tsx
<h1 className="text-h1">Heading</h1>
<p className="text-body-lg">Body text</p>
```

### Components
```tsx
import { Button, Card, MediaCard } from '@/components';

<Button variant="primary" size="lg">Get Premium</Button>
<MediaCard 
  title="Playlist Name"
  subtitle="Artist, Song, etc"
  imageUrl="/image.jpg"
  showPlayButton
/>
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles & Tailwind
├── components/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── MediaCard.tsx
│   ├── Navigation.tsx
│   ├── Player.tsx
│   ├── Badge.tsx
│   └── index.ts          # Component exports
├── lib/
│   └── utils.ts          # Utility functions
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript config
└── package.json
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Next Steps

The design system and components are ready. You can now:

1. **Add your features** - Build pages using the component library
2. **Integrate APIs** - Connect to Spotify API or your backend
3. **Add authentication** - Implement user login/signup
4. **Customize** - Modify colors, spacing, or components as needed

## 📚 Documentation

- Full design system details in attached files
- Component props and usage in `components/*.tsx`
- Utility functions in `lib/utils.ts`

## 🤝 Contributing

This is a starter template. Feel free to customize and extend it for your needs!

## 📝 License

MIT
