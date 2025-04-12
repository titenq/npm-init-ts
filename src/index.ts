#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { cwd } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = path.basename(cwd());

const log = (msg: string) => console.log(`\x1b[32m✔\x1b[0m ${msg}`);

const writeFile = (filePath: string, content: string) => {
  fs.writeFileSync(path.join(cwd(), filePath), content);
  log(`${filePath} created successfully!`);
};

const main = () => {
  execSync('npm init -y', { stdio: 'inherit' });
  log(`Project ${projectName} created successfully!`);

  fs.mkdirSync('src', { recursive: true });
  log('src directory created successfully!');

  writeFile('src/index.ts', `import 'dotenv/config';

const { NODE_ENV } = process.env;
const message: string = 'Hello World!';

console.log(message);
console.log(NODE_ENV);
`);

  writeFile('.gitignore', `node_modules
.env
dist
`);

  writeFile('README.md', `# ${projectName}
`);
  
  writeFile('.env', `NODE_ENV=development
`);
  
  writeFile('.env.example', `NODE_ENV=
`);

  copyFile(path.join(__dirname, '..', 'LICENSE.txt'), path.join(cwd(), 'LICENSE.txt'));
  log('LICENSE.txt file copied successfully!');

  execSync('npm install -D typescript tsx tsup @types/node', { stdio: 'inherit' });
  log('Development dependencies installed successfully!');

  execSync('npm install dotenv', { stdio: 'inherit' });
  log('dotenv installed successfully!');

  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  pkg.scripts = {
    dev: 'tsx watch src/index.ts',
    build: 'tsup src/index.ts --format cjs,esm --dts --tsconfig tsconfig.json',
    start: 'node dist/index.js',
  };

  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  log('package.json scripts edited successfully!');

  writeFile('tsconfig.json', `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`);

  log('Initial files created successfully!');
};

main();
