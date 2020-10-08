# Booking app (Client & Server)

*** Requiremnet ***
- Node.js and Git must be intalled in your machine.
- Heroku account

### Client (Front-end)- React

1. Create react app by using following command in terminal: `npx create-react-app <app name>` (Use "." instead of naming the app if you want to create the app directly in the directory.)
2. Install axios by using following command in terminal. We need this method to communicate with back-end server for requestings data (t.ex. get, post data..): `npm install axios`.
3. Add `"proxy": "http://localhost:8000"` (localhost port url to server.) in package.json file of client.
 

### Server (Back-end)- Node.js/Express/MySQL
1. Create package.json file by using following command in terminal: `npm init`.
2. Install express, mysql, body-parser by using following command: `npm install express mysql body-parser`.
3. Install cors by using following command in terminal to action to server policy (to get data from other servers.): `npm install cors`.
4. Create `.gitignore` file in root directory where server.js file exists and add node_modules in the file.
5. Add `"heroku-postbuild": "cd client && npm install --only=dev && npm install && npm run build"` in package.json file of server.
6. Add following code in `server.js`. Important to have the code script after all app.get(). 
`if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }`

### SQL database
1. Create data in the MySQL database to connect to back-end server.

### Initiate git repository
1. Initiate Git repository in your root directory by using following command line: `git init`.
2. Add all files to repository: `git add .`.
3. Commit repository: `git commit -m "initial"`.

### Create Heroku app repository and Deploy local git repository to Heroku app repository
1. Login to heroku by using following command line: `heroku login`.
2. Create a new heroku app repository: `heroku create <your app name>`
3. Deploy git local repository to Heroku app repository: `git push heorku master`.

