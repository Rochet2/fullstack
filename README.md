# fullstack
https://fullstack-hy.github.io/

# Black magic
- `npx create-react-app folderametocreate` creates new project
- `npm start` starts the project server
- `npx json-server --port=3001 --watch db.json` start json server to host a json file on port 3001
- `npm install axios --save` install axios as a dependency
- `npm install json-server --save` install json server as a dependency and to `package.json` under `scripts` block add `"server": "json-server -p3001 db.json"` to make it use port 3001 automatically
- `npm run server` to start json server after installing it with npm install (see above)
- `npm init` to create an npm backend and to `package.json` under `scripts` block add `"start": "node index.js"`
- `npm start` to start the backend server
- `npm install express --save` to install express
- `npm update` to update project dependencies
- `npm install` to install modules after cloning a project from github
- `node` to start an interactive node console
- `npm install --save-dev nodemon` to install nodemon (as development dependency) to automatically restart node app (server)
- add `"watch": "node_modules/.bin/nodemon index.js"` to `package.json` under `scripts` and use `npm run watch` to run auto restarting server
- In VScode use `CTRL+P` and type `ext install humao.rest-client` to install REST Client plugin
- `npm install cors --save` to install CORS middleware. Use it with `const cors = require('cors');app.use(cors())`
- Heroku: `Procfile` `web: node index.js`
- `npm run build` to create a frontend release to `build` folder
- `"proxy": "http://localhost:3001"` to frontend `package.json`
- to debug start backend with `node --inspect index.js` and in chrome open [chrome://inspect](chrome://inspect)
- `npm install mongoose --save` to install mongoose
- `npm init` to create basic backend
- `npm install --save-dev jest` to install testing framework and add `"test": "jest --verbose"` to `package.json` under `scripts`

