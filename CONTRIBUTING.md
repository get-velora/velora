# Contributing to Velora

Contributions are welcome and appreciated. Whether you're reporting a bug, suggesting an enhancement, or submitting code, your participation helps improve Velora for the community.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm or npm
- Git

### Development Setup

```bash
git clone https://github.com/get-velora/velora.git
cd velora
pnpm install
pnpm dev
```


---

## Types of Contributions

### Bug Reports

If you find a bug, please open an issue with the following information:

1. Clear title describing the issue
2. Steps to reproduce the problem
3. Expected behavior vs actual behavior
4. Browser/OS information if relevant
5. Screenshots or error messages (if applicable)

Example:

```
Title: College list filtering not working with test scores below 1200

Steps to reproduce:
1. Navigate to colleges page
2. Enter test score of 1150
3. Click filter
4. Note that schools with 1200+ average test scores still appear

Expected: Only schools with average test score of 1150 or below appear
Actual: All schools are displayed regardless of test score filter
Browser: Chrome 126, macOS 14.4
```

### Feature Requests

Before requesting a feature, check existing issues to avoid duplicates.

When submitting a feature request:

1. Provide a clear use case
2. Explain the problem it solves
3. Include any relevant UI/UX mockups or descriptions
4. Consider edge cases

### Code Contributions

Before starting work on code:

1. Check open issues and pull requests
2. Comment on the issue or create one to discuss the approach
3. For major changes, open an issue first to gauge community interest

---

## Development Guidelines

### Code Style

- Use TypeScript with proper type annotations
- Follow the existing code patterns in the project
- Keep functions and components focused and single-purpose
- Write meaningful variable and function names
- Use single-line comments only

### Svelte Components

- Leverage Svelte 5 reactive runes: `$state`, `$derived`, `$effect`
- Keep components modular and reusable
- Type component props explicitly
- Avoid unnecessary watchers or effects

### Commit Messages

Write clear, descriptive commit messages:

Good:

```
Fix: college list not sorting by GPA correctly
Feature: add calendar event duplication
Docs: clarify persistence layer architecture
Refactor: simplify detail panel state management
```

Avoid:

```
fix stuff
updates
idk
asdf
```

### Testing

Before submitting a pull request:

1. Test your changes locally across multiple viewports:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile-like narrow screens
2. Test on different browsers if possible
3. Verify localStorage persistence works as expected
4. Check that data export/import functions correctly

---

## Submitting Changes

### Creating a Pull Request

1. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes
   git checkout -b fix/issue-description
   ```

2. Make your changes with meaningful commits

3. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a pull request against the `main` branch

5. In the PR description, include:
   - What problem does this solve?
   - How was it tested?
   - Any breaking changes?
   - Related issues (use `Closes #123`)

### PR Review Process

1. Automated checks run (linting, builds)
2. Maintainer reviews the code
3. Feedback is provided if needed
4. Iterate on feedback
5. Merge once approved

All contributors are expected to be respectful and collaborative during code review.

---

## Project Structure

Understanding the project layout helps when contributing:

```
src/
├── lib/
│   ├── persist.ts         # Persistence layer (localStorage)
│   ├── store.svelte.ts    # Reactive stores (colleges, activities, etc.)
│   ├── nodesData.ts       # Skill tree node definitions
│   ├── types.ts           # TypeScript interfaces
│   └── utils.ts           # Utility functions
├── components/
│   ├── SkillTreeCanvas.svelte    # Main skill tree visualization
│   ├── DetailPanel.svelte        # Node detail view
│   ├── LeftBar.svelte           # Navigation
│   └── ...
└── routes/
    ├── map/              # Skill tree page
    ├── colleges/         # College list page
    ├── activities/       # Activities page
    ├── documents/        # Writing workspace
    ├── calendar/         # Calendar page
    └── settings/         # Settings page
```

### Key Files

- `src/lib/persist.ts` - Handles all data persistence and versioning
- `src/lib/nodesData.ts` - Contains the 16 nodes and 40+ resources
- `src/components/SkillTreeCanvas.svelte` - SVG rendering and interactions

---

## Documentation

Documentation improvements are always welcome:

- Fix typos or unclear explanations
- Add examples to comments
- Improve README or API documentation
- Add inline code documentation for complex logic

---

## Code of Conduct

This project maintains a respectful and inclusive community. All contributors are expected to:

- Treat all participants with respect
- Welcome newcomers and provide constructive feedback
- Assume good intentions
- Focus feedback on code, not people
- Report harassment or inappropriate behavior

---

## Questions?

- Check existing issues and discussions
- Ask questions in pull request comments
- Open a discussion for design questions
- No question is too basic—we're here to help

---

## Recognition

Contributors are valued members of the community. Your contributions will be:

- Recognized in commit history
- Featured in release notes for significant contributions
- Appreciated and acknowledged for your work

Thank you for helping make Velora better.
