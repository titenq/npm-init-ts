#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, basename, join } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { styleText } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectName = basename(cwd());

const log = (msg: string) => console.log(`${styleText('green', '✔')} ${msg}`);

const main = async () => {
  log(`Initializing project ${projectName}...`);
  
  execSync('npm init -y', { stdio: 'inherit' });
  log('npm initialized successfully!');

  const templatePath = join(__dirname, '..', 'template');
  
  fs.cpSync(templatePath, cwd(), { recursive: true });
  log('Template files scaffolded successfully!');

  const readmePath = join(cwd(), 'README.md');
  const readmeContent = await readFile(readmePath, 'utf-8');
  
  await writeFile(readmePath, readmeContent.replace('PROJECT_NAME', projectName));

  log('Installing dependencies (this may take a moment)...');
  execSync('npm install -D typescript tsx tsup @types/node', { stdio: 'inherit' });
  execSync('npm install dotenv', { stdio: 'inherit' });
  log('Dependencies installed successfully!');

  const pkgPath = join(cwd(), 'package.json');
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
