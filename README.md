## Training project for JS

Contains the cool gallery of randomly sorted (each page refresh) pictures, fancy red progressbar of scrolled page amount, and Lesson Title :)

### How to run (for Jedi Knights - requires linux or macos, I was too lazy to adapt used commands for windows):

1. `npm install` - to install all dependencies listed in **package.json**
2. `start-dev` - to build project (see [esbuild](https://esbuild.github.io/)) and start Dev server with built stuff. Changes in the *.js* and *.css* will be picked up immediately after each save, so just refresh the page and see new styles or code.
3. `npm run build` - builds all the project so `./dist` directory will contain bundled css, js, and all assets. After that, `./dist` could be served by any webserver you like (`npx serve ./dist`, liveserver in VS Code or anything else)

### How to run (for Other Heroes):

1. `npm install` - to install all dependencies listed in **package.json**
2. `npm run start-dev-parcel` :)

Happy hacking!
