# Notes on General Build

## Initial Installs

/server
- express
- nodemon
- jsonwebtoken
- bcrypt
- pg

- added   `"type": "module",` to server/package.json file to use ES6 ES module imports `import x from 'x';` instead of `const x = require('x');`
- need to install typescript with `npm install typescript --save-dev`
- we then add `"build": "tsc"` to server/package.json file as well that will create a command for node to run the typescript compiler (tsc), which converts the TS code to JS code
- create a "server.ts" file in the server directory
- fireship recommends doing `npm i -D @types/node` which should help with TS recognizing node related types, like in import statements, I can not see teh difference as of yet
- then need to make tsconfig.json file with `npx tsc --init`, strict mode will be active automatically, fireship makes this file manually but this seems to be good for me
- however we change `"module": CommonJS"` in the `compilerOptions` object to `"module": NodeNext"`, and also change `"moduleResolution": "Node10"` to `"moduleResolution": "NodeNext"` as well, and these change how TS looks for modules, and are needed or are better for using `import` over `require`
    - **NOTE** this will require us to add the file extension when we import local files, like `import db from "./db.js"`, but do not need for module imports
- also setting `"target": "ES2020"` in the compilerOptions as well, this decides what style of JS we compile to, and we want a more modern one
- also add or uncomment `"sourceMap": true,`, which maps compiled JS back to TS and is helpful for debugging

- now also getting a few tips from the video https://www.youtube.com/watch?v=qy8PxD3alWw, which is specifically using typescript with express and node
- so to start I am going to make a basic express sever like we ave done in the server.js file, without TS, just:
```
import express from "express";

const app = express()
const port = 5000;

app.get("/", (req, res) => {
    res.send(`setting up TS with express`);
})

// Start Server
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
})
```
- so we load in theh browser and get the response
- now we can turn this into a typescript file, server.ts, and we see typescript is not picking up and of our types for express, all of our declarations for express are of type `any`, so typescrpt isnt actually doing anything for us, we can see this if we ovr over our `app.listen` and `app.get` lines
- actually in my file sicne I have already installed the node types, we see an error on the import statement saying typescript couldnt find a declaration file for express module, so it is implicitly giving anything from it the `any` type (**NOTE** this may actually be because I used the import keyword and typescript recoginized that)
- this is neat
- so we install the express type set with `npm i -D @types/express`
- now we see TS is recognizing the `app.` declarations as type `Express`, neat
- also we could add to the import statement `import express, {Express, Request, Response} from "express";` to the import statement, and that will add those types so we can annotate the express functions, like say `(req: Request, res: Response)` to explicitly declare those types for illustration, but we see if we hover over the `req` and `res` that TS already recognizes these automatically so it is not necesary
- i think I will do it since I am new to this 
```
import express, {Express, Request, Response} from "express";

const app: Express = express()
const port = 5000;

app.get("/", (req: Request, res: Response) => {
    res.send(`setting up TS with express`);
})

// Start Server
app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
})
```
- the next thing he does is make the TS config with `npx tsc --init` like I did, so that is good to see
- he also adds an output as the /dist folder, I think I should do that since my directory looks very messy rn
- and we can then do `npx tsc` which for us should be the same as the `npm run build` command we made earlier, and we see our JS is compiled in the dist folder, and we can then do `node dist/server.js` and we see the server starts and it works again, but this time it was made from the TS file
- so he is adding shortcuts to his package.js file now, liek we did eariler, he adds `"start": "node dist/server.js"` and `"build": "npx tsc"`, whereas our previous ones were `"start": "node server"`, which we will change to `"start": "node dist/server"`, and we have `"build": "tsc"`, which we will leave
    - the reason for the descrepancies is we do not actually need to specify the file extension, "node dist/server" will work fine, but it might be worth specifying the extension so that we can guarentee it will always choose the right file
    - also since we have typescript installed on our machine, we do not need to do "npx tsc", we can simply have `"build": "tsc"`, `npx` is used to run a command from a module we may not have on our machine, but since we have installed typescript with node, we can just do "tsc", perhaps there is a reason for this I will find out later
- so now we want to set up the build process and nodemon server process so this all happens automatically, we have done this partially in the past for nodemon with the `"dev": "nodemon server",` script set up in package.js, now we just want to change it for this project and ad the automatic tsc "watching" of our TS files, so **IF WE WERE ON UNIX WE WOULD ADD** `"dev": "tsc -w & nodemon dist/server.js"`, **BUT SINCE WE ARE ON STUPID WINDOWS WE HAVE TO** install a whole other ass package npm-run-all with `npm i -D npm-run-all`, then we add 3 scrips to our package file: `"node-watch": "nodemon dist/server.js",`, `"tsc-watch": "tsc -w",`, and `"dev": "npm-run-all -p tsc-watch node-watch"`, so this tell the module to run both of those in parallel because cmd is whack
- now when we do `npm run dev` we get automatic updates to our compiled JS files when we change the TS file, and we also get the nodemon server automatically refreshed as well, big yay
- so immediately after he covers the cross platform solution with the package "concurrently", which is another option i read about when finding npm-rum-all, but Im glad I figured it our myself :D
- also we want to get another package that will automatically clear out the "dist" folder each time we compile, instead of just overwriting, that way old files that are not used anymroe get deleted , we can use the package rimraf, and install it with `npm i rimraf`, he mentions using it in production so I will install not just in dev
    - so we now modify our build script to `"build": "rimraf dist && tsc",`, which basically runs `rm -rf` on dist then compiles TS with tsc, and even though the parallel `&` operator cant be used on windows, `&&` can
    - so then we add `"prestart": "npm run build",`, adn this is interesting, since with the `pre` name node recognizes this and runs this script each time `start` is run before running start, so that is cool
    - so now if we add extra files to "dist" and call `npm run start` we see that first `build` is run and the new files are deleted then our TS is compiled, then finally `start` is run and we start the Server
    - so we want this same behaviour for the automatic tsc/nodemon script, so we just add `"predev": "npm run build",` as well, and now when we first start the dev server we have a reset on dist, then we compile, and then on each chnage we are automatically compoling and refreshign the server, perfecttttttt
- and now the project is set up to use TS and express in a way that we can develop easily and see our changes as we go, noice