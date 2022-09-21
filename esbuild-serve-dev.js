/*
  This is the separate esbuild config-in-js for running dev server
*/
const { serve } = require('esbuild');
const colors = require('colors');
colors.enable();

serve(
  { servedir: './dist' },
  {
    entryPoints: {
      index: './frontend/src/index.js',
      style: './frontend/src/style.css',
      worker: './frontend/src/web_workers/worker.js',
    },
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: './dist',
    logLevel: 'info',
  }
).then(() => console.log('[FRONTEND]'.green.bold, 'build successful'));
