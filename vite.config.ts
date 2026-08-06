import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';

const gitHash = execSync('git rev-parse --short=7 HEAD').toString().trim().toUpperCase();

// Tire-style DOT date code: build week + Svelte major + 2-digit year.
const now = new Date();
const jan1 = new Date(now.getFullYear(), 0, 1);
const week = String(
	Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7),
).padStart(2, '0');
const yy = String(now.getFullYear()).slice(-2);
const dotCode = `DOT${week} SV5 ${yy}`;

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__GIT_HASH__: JSON.stringify(gitHash),
		__DOT_CODE__: JSON.stringify(dotCode)
	}
});
