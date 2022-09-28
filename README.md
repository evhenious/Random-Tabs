## The Project is a JS | TS playground for different cool things

Contains the following mind-blowing parts (choose your favourite!):
- the cool paginated picture gallery fetched from [Lorem Picsum](https://picsum.photos/)
- amazing microblog tab with post-to-localstorage functionality
- pretty nice account search by username with [JSONPlaceholder](https://jsonplaceholder.typicode.com/) on the backend (try typing `Bret`)
- userlist table integrated with local backend API (see Postman collection `./_helperDoc/FSon.postman_collection.json` for API docs)
- media tab with possibility to **capture webcamera stream**, and record it on backend side (keep an eye on `./streams` catalog)
- aaand fancy red progressbar of scrolled page amount on the top of that luxurious design! ...and Lesson Title :)

### How to run on localhost:
1. `npm install`

> #### **steps for Jedi Knights** - requires linux or macos, I was too lazy to adapt used commands for windows:
2. `start-dev` - to build project (see [esbuild](https://esbuild.github.io/)) and start Dev server with built stuff. Changes in the *.js* and *.css* will be picked up immediately after each save, so just refresh the page and see new styles or code. Also runs backend part in parallel

> #### **steps for Other Heroes** (*might require some love and tweaking, I mostly use the way above*):
2. `npm run start-dev-parcel` - all the things here work totally equal to `esbuild`-based Jedi option above

### How to Build for prod:
1. `npm run build` - builds all the **Frontend part** so `./dist` directory will contain bundled css, js, and all assets. After that, `./dist` could be served by any webserver you like (`npx serve ./dist`, `liveserver` in VS Code or anything else)
2. TODO - build Backend part. Now BE is on TypeScript, so requires to be transpiled, at least

Happy hacking!
