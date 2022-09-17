/*
  This is the separate esbuild config-in-js for running dev server
*/
const { serve } = require('esbuild');

serve(
  { servedir: './dist' },
  {
    entryPoints: {
      index: './static/index.js',
      style: './static/index.css',
      worker: './static/web_workers/worker.js',
    },
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: './dist',
    logLevel: 'info'
  }
);
