## Training project for JS

Contains three mind-blowing parts (choose your favourite!):
- the cool paginated picture gallery fetched from [Lorem Picsum](https://picsum.photos/)
- amazing microblog tab with post-to-localstorage functionality
- pretty nice account search by username with [JSONPlaceholder](https://jsonplaceholder.typicode.com/) on the backend (try typing `Bret`)
- aaand fancy red progressbar of scrolled page amount on the top of that luxurious design! ...and Lesson Title :)

### How to run (for Jedi Knights - requires linux or macos, I was too lazy to adapt used commands for windows):

1. `npm install` - to install all dependencies listed in **package.json**
2. `start-dev` - to build project (see [esbuild](https://esbuild.github.io/)) and start Dev server with built stuff. Changes in the *.js* and *.css* will be picked up immediately after each save, so just refresh the page and see new styles or code.
3. `npm run build` **(optional, not required for local dev)** - builds all the project so `./dist` directory will contain bundled css, js, and all assets. After that, `./dist` could be served by any webserver you like (`npx serve ./dist`, liveserver in VS Code or anything else)

### How to run (for Other Heroes):

1. `npm install` - to install all dependencies listed in **package.json**
2. `npm run start-dev-parcel` - all the things here work totally equal to `esbuild`-based Jedi option above

Happy hacking!
