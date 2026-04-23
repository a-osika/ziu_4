# Todo App Lab 7

This is a React-based todo application using Material-UI with custom theming support.

## Tokens Generation

The application uses design tokens for theming. The tokens are defined in JSON files (`tokens/Light.tokens.json` and `tokens/Dark.tokens.json`) and are processed by `tokens/generateTokens.js` to generate CSS variables in `src/styles/tokens.css`.

To regenerate the tokens CSS file, run:

```bash
npm run tokens
```

This command is automatically run before development and build scripts.

## Code Formatting

The project uses Prettier for code formatting. To format all supported files, run:

```bash
npm run format
```

This will format TypeScript, JavaScript, JSON, CSS, Markdown, and HTML files in the project.
