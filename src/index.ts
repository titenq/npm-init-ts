#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import { styleText } from "node:util";

import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectPromptMessage = "Project Name:";
const projectNameExample = "My App";
const packageNamePlaceholder = "your-package-name";
const defaultEnvContent = "NODE_ENV=development\n";

const log = (msg: string) => console.log(`${styleText("green", "✔")} ${msg}`);

const slugifyProjectName = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const main = async () => {
  try {
    const { projectName } = await inquirer.prompt<{ projectName: string }>([
      {
        type: "input",
        name: "projectName",
        message: projectPromptMessage,
        default: projectNameExample,
        validate: (value: string) => {
          const trimmedValue = value.trim();
          const projectSlug = slugifyProjectName(trimmedValue);

          if (!trimmedValue) {
            return "Project name is required.";
          }

          if (!projectSlug) {
            return "Project name must contain letters or numbers.";
          }

          return true;
        },
      },
    ]);
    const projectSlug = slugifyProjectName(projectName);
    const targetPath = join(cwd(), projectSlug);

    if (fs.existsSync(targetPath)) {
      throw new Error(`Directory "${projectSlug}" already exists.`);
    }

    fs.mkdirSync(targetPath);
    log(`Creating project ${projectName} in ${projectSlug}...`);

    const templatePath = join(__dirname, "..", "template");

    fs.cpSync(templatePath, targetPath, { recursive: true });

    log("Template files scaffolded successfully!");

    const readmePath = join(targetPath, "README.md");
    const readmeContent = await readFile(readmePath, "utf-8");

    await writeFile(
      readmePath,
      readmeContent.split("Project Name").join(projectName.trim()),
    );

    const envPath = join(targetPath, ".env");

    await writeFile(envPath, defaultEnvContent);

    const pkgPath = join(targetPath, "package.json");
    const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));

    pkg.name = projectSlug;
    pkg.repository.url = pkg.repository.url
      .split(packageNamePlaceholder)
      .join(projectSlug);
    pkg.bugs.url = pkg.bugs.url.split(packageNamePlaceholder).join(projectSlug);
    pkg.homepage = pkg.homepage.split(packageNamePlaceholder).join(projectSlug);

    await writeFile(pkgPath, JSON.stringify(pkg, null, 2));

    log("package.json configured successfully!");
    log(".env created successfully!");
    log("Installing dependencies (this may take a moment)...");

    execSync(
      "npm install -D --silent --no-audit --no-fund typescript tsx @types/node prettier @prettier/plugin-oxc oxlint tsc-alias",
      { cwd: targetPath, stdio: "inherit" },
    );

    log("Dependencies installed successfully!");
    log("Project setup complete! Happy coding!");
    log(`Try running: cd ${projectSlug} && npm run dev`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("\x1b[31m✖\x1b[0m Error during initialization:", message);

    process.exit(1);
  }
};

main();
