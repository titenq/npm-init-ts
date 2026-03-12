#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { cwd } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectName = path.basename(cwd());

const log = (msg: string) => console.log(`\x1b[32m✔\x1b[0m ${msg}`);

const main = async () => {
  log(`Initializing project ${projectName}...`);
  
  execSync('npm init -y', { stdio: 'inherit' });
  log('npm initialized successfully!');

  const templatePath = path.join(__dirname, '..', 'template');
  
  fs.cpSync(templatePath, cwd(), { recursive: true });
  log('Template files scaffolded successfully!');

  const readmePath = path.join(cwd(), 'README.md');
  const readmeContent = await readFile(readmePath, 'utf-8');
  
  await writeFile(readmePath, readmeContent.replace('PROJECT_NAME', projectName));

  log('Installing dependencies (this may take a moment)...');
  execSync('npm install -D typescript tsx tsup @types/node', { stdio: 'inherit' });
  execSync('npm install dotenv', { stdio: 'inherit' });
  log('Dependencies installed successfully!');

  const pkgPath = path.join(cwd(), 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf-8'));

  pkg.scripts = {
    dev: 'tsx watch src/index.ts',
    build: 'tsup src/index.ts --format cjs,esm --dts --tsconfig tsconfig.json',
    start: 'node dist/index.js',
    test: 'echo "Error: no test specified" && exit 1',
  };

  await writeFile(pkgPath, JSON.stringify(pkg, null, 2));

  log('package.json scripts updated successfully!');
  log('\nProject setup complete! Happy coding!');
  log('Try running: npm run dev');
};

main().catch((err) => {
  console.error('\x1b[31m✖\x1b[0m Error during initialization:', err);
  process.exit(1);
});
