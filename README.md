# Melody & Mic

> A modern music platform for discovering artists, songs, podcasts, and licensing music.

🎵 **Live Demo:** [Deploy to Netlify - See DEPLOYMENT.md]

## 📖 Quick Navigation

- 🚀 [Quick Start](./docs/INDEX.md) - Get started in 3 minutes
- 📚 [Documentation](./docs) - Complete guides and references
- 🛠 [Contributing](./CONTRIBUTING.md) - How to contribute
- 📋 [License](./LICENSE) - MIT License

## 🎯 Features

✨ **Artist Discovery** - Browse detailed artist profiles with social links

🎵 **Music Catalog** - Discover songs with streaming links (Spotify, Apple Music, SoundCloud)

🎙️ **Podcast Hub** - Listen to episodes with metadata and audio player

⚖️ **Music Licensing** - Submit licensing inquiries for various project types

🎨 **Beautiful UI** - Responsive design with dark mode support

⚡ **Fast & Modern** - Built with React 18, Vite, and Tailwind CSS

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18 + Vite |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Backend** | Base44 (no-code platform) |
| **State** | React Query + React Router v7 |
| **Forms** | React Hook Form + Zod |
| **Deployment** | GitHub Actions + Netlify |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm 8+
- Base44 account

### Quick Setup

```bash
# 1. Clone repository
git clone https://github.com/shubeeh1979/North-of-Normal.git
cd North-of-Normal

# 2. Run setup
node setup.js

# 3. Configure environment
cp .env.example .env
# Edit .env with Base44 credentials

# 4. Start development
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Documentation

Complete documentation is available in the `docs/` folder:

- **[INDEX.md](./docs/INDEX.md)** - Documentation overview and setup checklist
- **[GETTING_STARTED.md](./docs/GETTING_STARTED.md)** - Development guide with examples
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Technical architecture and design patterns
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Netlify deployment instructions
- **[GITHUB_SECRETS.md](./docs/GITHUB_SECRETS.md)** - GitHub Secrets configuration guide

## 📦 Available Scripts

```bash
# Development
npm run dev         # Start dev server (http://localhost:5173)
npm run preview     # Preview production build

# Production
npm run build       # Build for production
npm run lint        # Run ESLint
npm run typecheck   # Check TypeScript types

# Setup
node setup.js       # Automated setup script
```

## 🌐 Deployment

### Netlify (Recommended)

1. Connect GitHub repository to Netlify
2. Configure environment variables
3. Push to `main` branch for automatic deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

### GitHub Actions CI/CD

Automated workflows handle:
- ✅ Code linting and type checking
- ✅ Production builds
- ✅ Netlify deployment
- ✅ Pull request previews

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development workflow
- Code style guidelines
- Pull request process
- Issue reporting

## 📁 Project Structure

```
North-of-Normal/
├── src/
│   ├── components/          # React components
│   ├── pages/               # Page routes
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities
│   ├── api/                 # Base44 integration
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── data/
│   └── schemas/             # Base44 data schemas
├── docs/                    # Documentation
├── .github/
│   └── workflows/           # GitHub Actions
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
├── netlify.toml             # Netlify config
├── setup.js                 # Setup script
└── README.md
```

## 🔐 Configuration

### Environment Variables

Create `.env` from `.env.example`:

```env
VITE_BASE44_API_URL=https://api.base44.com
VITE_BASE44_PROJECT_ID=your_project_id
VITE_BASE44_API_KEY=your_api_key
VITE_ENVIRONMENT=development
```

### Required Secrets (for GitHub Actions)

- `NETLIFY_AUTH_TOKEN` - Netlify authentication
- `NETLIFY_SITE_ID` - Netlify site ID
- `VITE_BASE44_API_URL` - Base44 API URL
- `VITE_BASE44_PROJECT_ID` - Base44 project ID
- `VITE_BASE44_API_KEY` - Base44 API key

See [GITHUB_SECRETS.md](./docs/GITHUB_SECRETS.md) for setup instructions.

## 📊 Performance

- ⚡ Vite: ~300ms cold start
- 📦 Optimized bundle size with code splitting
- 🌍 Netlify CDN for global edge caching
- 💨 Automatic image optimization
- 🎯 Lighthouse score: 90+

## 🔗 Data Models

### Artist
```json
{
  "name": "string",
  "slug": "string",
  "bio": "string",
  "genre": "string",
  "location": "string",
  "spotify_url": "string",
  "featured": "boolean"
}
```

### Song
```json
{
  "title": "string",
  "artist": "string",
  "duration": "string",
  "genre": "string",
  "release_date": "date",
  "spotify_url": "string",
  "featured": "boolean"
}
```

## 🐛 Troubleshooting

### Development Issues

**Port already in use:**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails:**
```bash
npm run typecheck  # Check types
npm run lint       # Check linting
```

For more help, see [docs/](./docs/)

## 📞 Support

- 📚 [Documentation](./docs)
- 🐛 [Report Issues](https://github.com/shubeeh1979/North-of-Normal/issues)
- 💬 [Discussions](https://github.com/shubeeh1979/North-of-Normal/discussions)
- 📖 [Contributing Guide](./CONTRIBUTING.md)

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details

Copyright (c) 2026 Melody & Mic Contributors

---

**Ready to get started?** 🚀

1. Read [Quick Start Guide](./docs/INDEX.md)
2. Run `node setup.js`
3. Follow the prompts
4. Start building!

Happy coding! 🎵
