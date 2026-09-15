// Renders design/og-image.html to public/og-image.png with a local Chrome or Edge in headless mode.
// Usage: pnpm og:image (set CHROME_PATH if the browser is not found)
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;
const RENDER_BUDGET_MS = 3000;

const BROWSER_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const browser = BROWSER_CANDIDATES.find((candidate) => candidate && existsSync(candidate));
if (!browser) {
  process.stderr.write('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.\n');
  process.exit(1);
}

const source = pathToFileURL(resolve('design/og-image.html')).href;
const output = resolve('public/og-image.png');

execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  `--window-size=${WIDTH},${HEIGHT}`,
  `--virtual-time-budget=${RENDER_BUDGET_MS}`,
  `--screenshot=${output}`,
  source,
]);

process.stdout.write(`Link preview written to ${output}\n`);
