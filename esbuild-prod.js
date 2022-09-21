/*
  This is the separate esbuild config-in-js for building frontend part on PROD settings
*/
const { build } = require('esbuild');
const { sassPlugin }  = require('esbuild-sass-plugin');
const colors = require('colors');
colors.enable();

build(
  {
    entryPoints: {
      index: './frontend/src/index.js',
      style: './frontend/src/style.scss',
      worker: './frontend/src/web_workers/worker.js',
    },
    plugins: [
      sassPlugin()
    ],
    bundle: true,
    minify: true,
    target: ['esnext'],
    sourcemap: false,
    outdir: './dist',
    logLevel: 'info',
  }
).then(() => console.log('[FRONTEND PROD]'.green.bold, 'build successful, check [./dist] folder\n'));
