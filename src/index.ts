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
  
  fs.mkdirSync('src/controllers', { recursive: true });
  log('src/controllers directory created successfully!');
  
  fs.mkdirSync('src/helpers', { recursive: true });
  log('src/helpers directory created successfully!');
  
  fs.mkdirSync('src/interfaces', { recursive: true });
  log('src/interfaces directory created successfully!');
    
  fs.mkdirSync('src/routes', { recursive: true });
  log('src/routes directory created successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'src', 'index.ts'), path.join(cwd(), 'src', 'index.ts'));
  log('index.ts file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', '.gitignore'), path.join(cwd(), '.gitignore'));
  log('.gitignore file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', '.env'), path.join(cwd(), '.env'));
  log('.env file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', '.env.example'), path.join(cwd(), '.env.example'));
  log('.env.example file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'LICENSE.txt'), path.join(cwd(), 'LICENSE.txt'));
  log('LICENSE.txt file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'tsconfig.json'), path.join(cwd(), 'tsconfig.json'));
  log('tsconfig.json file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'src', 'controllers', 'pingController.ts'), path.join(cwd(), 'src', 'controllers', 'pingController.ts'));
  log('pingController.ts file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'src', 'helpers', 'errorHandler.ts'), path.join(cwd(), 'src', 'helpers', 'errorHandler.ts'));
  log('errorHandler.ts file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'src', 'interfaces', 'errorInterface.ts'), path.join(cwd(), 'src', 'interfaces', 'errorInterface.ts'));
  log('errorInterface.ts file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'src', 'interfaces', 'pingInterface.ts'), path.join(cwd(), 'src', 'interfaces', 'pingInterface.ts'));
  log('pingInterface.ts file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'src', 'routes', 'indexRoute.ts'), path.join(cwd(), 'src', 'routes', 'indexRoute.ts'));
  log('indexRoute.ts file copied successfully!');

  copyFile(path.join(__dirname, '..', 'template', 'src', 'routes', 'pingRoute.ts'), path.join(cwd(), 'src', 'routes', 'pingRoute.ts'));
  log('pingRoute.ts file copied successfully!');

  writeFile('README.md', `# ${projectName}
  `);

  execSync('npm install -D typescript tsx tsup @types/node', { stdio: 'inherit' });
  log('Development dependencies installed successfully!');

  execSync('npm install dotenv fastify @fastify/cors @fastify/cookie @fastify/jwt zod fastify-type-provider-zod', { stdio: 'inherit' });
  log('dotenv installed successfully!');

  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  pkg.scripts = {
    dev: 'tsx watch src/index.ts',
    build: 'tsup src/index.ts --format cjs,esm --dts --tsconfig tsconfig.json',
    start: 'node dist/index.js',
  };

  pkg.type = "module";

  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

  log('package.json scripts edited successfully!');
  log('Initial files created successfully!');
};

main();
