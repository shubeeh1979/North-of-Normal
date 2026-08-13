# Melody & Mic

> A modern music platform for discovering artists, songs, podcasts, and licensing music.

## 🎵 Features

- **Artist Profiles** - Browse detailed artist bios, social links, and featured work
- **Music Catalog** - Discover songs with streaming links to Spotify, Apple Music, SoundCloud
- **Podcast Integration** - Listen to podcast episodes with detailed metadata
- **Licensing Inquiries** - Contact platform for music licensing for various projects
- **Responsive Design** - Beautiful UI built with Tailwind CSS and shadcn/ui components
- **Dark Mode Support** - Theme switching with next-themes

## 🛠 Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **UI Components:** shadcn/ui (Radix UI based)
- **Backend:** Base44 (no-code platform)
- **Routing:** React Router v7
- **State Management:** React Query (@tanstack/react-query)
- **Form Handling:** React Hook Form + Zod validation
- **Rich Text:** React Markdown + React Quill
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Code Quality:** ESLint, TypeScript

## 📋 Project Structure

```
.
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components (routes)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   ├── api/                # Base44 SDK integration
│   ├── main.jsx            # Application entry point
│   ├── App.jsx             # Root component
│   ├── Layout.jsx          # Layout wrapper
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── eslint.config.js        # ESLint configuration
├── jsconfig.json           # JavaScript compiler options
└── index.html              # HTML entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (recommend Node 18+)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shubeeh1979/North-of-Normal.git
cd North-of-Normal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your Base44 credentials
```

4. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript type checking

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example` with your Base44 project credentials:

```env
VITE_BASE44_API_URL=https://api.base44.com
VITE_BASE44_PROJECT_ID=your_project_id
VITE_BASE44_API_KEY=your_api_key
```

### Base44 Schema

The platform uses the following Base44 data models:

- **Artist** - Artist/band profiles with social links
- **Song** - Music tracks with streaming links
- **PodcastEpisode** - Podcast content with audio
- **LicensingInquiry** - Music licensing requests

## 🎨 Customization

### Tailwind CSS Theme

Customize colors, fonts, and spacing in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--primary))',
      // Add your color customizations
    }
  }
}
```

### Components

Add new components in `src/components/`. Use shadcn/ui CLI for pre-built components:

```bash
npm exec shadcn-ui@latest add [component-name]
```

## 🚨 Code Quality

### ESLint

Run linter to check code quality:
```bash
npm run lint
```

### Type Checking

Run TypeScript type checker:
```bash
npm run typecheck
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production bundle in the `dist/` directory.

### Deployment Platforms

The app can be deployed to:
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- Base44 hosting
- Traditional web servers (Node.js, Apache, Nginx)

## 🔐 Security

- Never commit `.env` file with real credentials
- Use `.env.example` as a template
- Store sensitive Base44 API keys in your CI/CD platform secrets
- Keep dependencies updated: `npm audit fix`

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Base44 Documentation](https://docs.base44.com/)
- [React Router](https://reactrouter.com/)

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will try the next available port. Or specify a custom port:

```bash
npm run dev -- --port 3000
```

### Dependencies Issues

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Check for TypeScript errors:

```bash
npm run typecheck
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📧 Support

For issues and feature requests, please use the [GitHub Issues](https://github.com/shubeeh1979/North-of-Normal/issues) page.
