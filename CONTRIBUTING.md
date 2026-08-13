# Contributing to Melody & Mic

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and professional in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/North-of-Normal.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## Development Workflow

### Before You Start

- Check existing [Issues](https://github.com/shubeeh1979/North-of-Normal/issues) and [Pull Requests](https://github.com/shubeeh1979/North-of-Normal/pulls)
- Discuss large changes in an issue first

### Making Changes

1. Create a descriptive branch name: `feature/add-user-auth` or `fix/broken-link`
2. Make atomic commits with clear messages:
   ```
   git commit -m "Add user authentication component"
   ```
3. Keep commits focused and logical

### Code Style

- Follow existing code patterns
- Use ESLint: `npm run lint`
- Format with Prettier (if configured)
- Write meaningful variable/function names
- Add comments for complex logic

### Testing

- Test your changes locally: `npm run dev`
- Check for TypeScript errors: `npm run typecheck`
- Ensure linting passes: `npm run lint`

## Submitting Changes

### Pull Request Process

1. Push to your fork
2. Create a Pull Request with a clear title and description
3. Link related issues: "Closes #123"
4. Describe what changed and why
5. Include before/after screenshots if UI changes
6. Wait for review and address feedback

### PR Title Format

- `feat: Add new feature description`
- `fix: Fix bug description`
- `docs: Update documentation`
- `style: Format code`
- `refactor: Refactor code`
- `perf: Improve performance`

### PR Description Template

```markdown
## Description
Brief description of changes

## Related Issues
Closes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing steps

## Screenshots (if applicable)
[Add before/after screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Linting passes (`npm run lint`)
- [ ] No console errors or warnings
- [ ] TypeScript types are correct
```

## Reporting Issues

### Bug Reports

Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Your environment (OS, Node version, etc.)
- Screenshots/logs if applicable

### Feature Requests

Describe:
- Problem you're trying to solve
- Proposed solution
- Why this feature would be useful
- Any alternatives considered

## Git Workflow

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: Add my feature"

# Push to your fork
git push origin feature/my-feature

# Create Pull Request on GitHub
```

## Project Structure

When adding new features:

- Components go in `src/components/`
- Pages go in `src/pages/`
- Utilities in `src/lib/`
- Custom hooks in `src/hooks/`
- API calls in `src/api/`

## Commit Message Guidelines

- Use imperative mood ("add" not "added")
- Start with type: feat, fix, docs, style, refactor, perf, test
- Be descriptive but concise
- Reference issues when relevant

## Questions?

Open an issue with your question or ask in discussions.

Thank you for contributing! 🎉
