# npm-init-ts

![](https://img.shields.io/github/stars/titenq/npm-init-ts.svg) ![](https://img.shields.io/github/forks/titenq/npm-init-ts.svg) ![](https://img.shields.io/github/issues/titenq/npm-init-ts.svg)

Create Node.js TypeScript projects in seconds!
This CLI scaffolds a Node.js TypeScript project with a ready-to-use structure, env loading, `oxlint`, `prettier`, and `tsc-alias`.

## How to Use

Go to the directory where you want the project folder to be created:

```bash
cd /path/to/projects
npx npm-init-ts
```

Then enter a value for `Project Name`. The CLI will:

- create a folder using the slugified project name
- use the exact value you typed in the generated `README.md`
- use the slug for `package.json` `name` and GitHub URLs
- leave `<your_github_username>` in `package.json` for you to replace manually

## What It Generates

- Copies a complete `package.json` template
- Creates the structure:
  - `src/index.ts` with central env loading
  - `src/config/env.ts` using `loadEnvFile()`
  - `.gitignore`, `README.md`, `.env`, `.env.example`
  - `LICENSE.txt`
- Installs development dependencies:
  - `typescript`, `tsx`, `tsc-alias`, `@types/node`, `oxlint`, `prettier`
- Creates `tsconfig.json`
- Adds `oxlint`, `prettier`, and `tsc-alias` configuration
- Fills `name` and GitHub placeholder fields in `package.json`
- Creates `.env` in the project root

After generation, edit `<your_github_username>` in these `package.json` fields:

- `homepage`
- `repository.url`
- `bugs.url`

## Final Structure

```bash
📦 your-project/
├── src/
│   └── index.ts
│   └── config/
│       └── env.ts
├── .env
├── .env.example
├── .gitignore
├── LICENSE.txt
├── package.json
├── tsconfig.json
└── README.md
```

## Generated Scripts

- `npm run dev` runs the project in watch mode
- `npm run build` compiles with `tsc` and resolves import paths with `tsc-alias`
- `npm run start` runs the built output
- `npm run lint` runs formatting, linting, and type-checking
- `npm run format` applies `oxlint --fix` and `prettier --write`

## Root Env

The generated project creates `.env` in the project root. Default content:

```env
NODE_ENV=development
```

## License

This project automatically adds a `LICENSE.txt` to your project under `GPL-3.0`.
