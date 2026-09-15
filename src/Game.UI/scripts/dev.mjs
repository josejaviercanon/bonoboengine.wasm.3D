import { spawn } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, watch } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const uiDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(uiDir, '..', '..');
const wasmDir = resolve(repoRoot, 'src', 'Game.Wasm');
const wasmWwwroot = resolve(wasmDir, 'wwwroot');
const uiWwwroot = resolve(uiDir, 'wwwroot');

const children = [];
let shuttingDown = false;

function prefixStream(name, stream, out) {
  let pending = '';
  stream.on('data', (chunk) => {
    pending += chunk.toString();
    const lines = pending.split(/\r?\n/);
    pending = lines.pop() ?? '';
    for (const line of lines) {
      if (line.length > 0) out.write(`[${name}] ${line}\n`);
    }
  });
}

function start(name, command, inheritStdio = false) {
  const child = spawn(command, {
    cwd: uiDir,
    shell: true,
    stdio: inheritStdio ? 'inherit' : ['ignore', 'pipe', 'pipe'],
  });
  if (!inheritStdio) {
    prefixStream(name, child.stdout, process.stdout);
    prefixStream(name, child.stderr, process.stderr);
  }
  child.on('exit', (code) => {
    if (shuttingDown) return;
    console.log(`[${name}] exited with code ${code}`);
    shutdown(code ?? 1);
  });
  children.push(child);
  return child;
}

function syncAsset(name) {
  const source = resolve(uiWwwroot, name);
  if (!existsSync(source)) return;
  const destination = resolve(wasmWwwroot, name);
  mkdirSync(destination, { recursive: true });
  cpSync(source, destination, { recursive: true, force: true });
  console.log(`[copy] ${name} -> Game.Wasm/wwwroot/${name}`);
}

let copyTimer = null;
function scheduleCopy() {
  if (copyTimer) clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyTimer = null;
    for (const name of ['dist', 'assets', 'audio', 'games']) syncAsset(name);
  }, 150);
}

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode !== null || child.killed) continue;
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { shell: true, stdio: 'ignore' });
    } else {
      child.kill('SIGTERM');
    }
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

for (const name of ['dist', 'assets', 'audio', 'games']) syncAsset(name);
watch(uiWwwroot, { recursive: true }, scheduleCopy);

console.log('[dev] dotnet watch  → http://localhost:5902  (browser reloads are manual)');
console.log('[dev] vite + tailwind watchers write dist/ and assets/ straight into Game.Wasm/wwwroot');

start('dotnet', 'dotnet watch run --project "' + wasmDir + '" --no-launch-profile', true);
start('vite', 'npm run watch:js');
start('css', 'npm run watch:css');
