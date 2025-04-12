# npm-init-ts

Create Node.js TypeScript projects in seconds!
This CLI initializes a project with structure, TS, `.env`, `tsup`, `tsx`, and more!


---


Crie projetos Node.js com TypeScript em segundos!  
Este CLI inicializa um projeto com estrutura, TS, `.env`, `tsup`, `tsx`, e muito mais!

## 🚀 How to Use | Como usar
```bash
npx npm-init-ts
```

## 🧰 What It Does | O que ele faz?
- Initializes with `npm init -y`

- Creates the structure:
  - `src/index.ts` with `dotenv` pre-configured
  - `.gitignore`, `README.md`, `.env`, `.env.example`
  - `LICENSE.txt`
- Installs dependencies:
  - `typescript`, `tsx`, `tsup`, `@types/node`, `dotenv`
- Creates `tsconfig.json`
- Edits `package.json` with useful scripts


---


- Inicializa com `npm init -y`
- Cria a estrutura:
  - `src/index.ts` com `dotenv` já pronto
  - `.gitignore`, `README.md`, `.env`, `.env.example`
  - `LICENSE.txt`
- Instala dependências:
  - `typescript`, `tsx`, `tsup`, `@types/node`, `dotenv`
- Cria `tsconfig.json`
- Edita `package.json` com scripts úteis

## 📂 Final Structure | Estrutura final
```bash
📦 your-project/
├── src/
│   └── index.ts
├── .env
├── .env.example
├── .gitignore
├── LICENSE.txt
├── package.json
├── tsconfig.json
└── README.md
```


---


## 📜 Created Scripts | Scripts Criados
- `"dev"` → runs `tsx watch src/index.ts`
- `"build"` → bundles with `tsup`
- `"start"` → runs the build with NodeJS

---

- `"dev"` → roda `tsx watch src/index.ts`
- `"build"` → empacota com `tsup`
- `"start"` → roda o build com NodeJS


---


## 📝 License | Licença
This project automatically adds a `LICENSE.txt` to your project.


---


Este projeto adiciona um `LICENSE.txt` ao seu projeto automaticamente.
