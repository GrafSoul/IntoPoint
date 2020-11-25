# IntoPoint Web App

## Keep everything interesting in one place

Don't keep secret information here :)

Application for storing links to sites, notes, code, and viewing news.

---

At this stage, the saving of bookmarks is implemented

---

### Firebase install

On site firebase.com create two projects for production and development.
In the folder /src/firebase/config replace the name of the files config.dev.example.js and config.prod.example.js
on the names config.dev.js and config.prod.js. Fill in the fields in both files.

```javascript
const prodConfig = {
  apiKey: YOUR_API_KEY,
  authDomain: YOUR_AUTH_DOMAIN,
  databaseURL: YOUR_DATABASE_URL,
  projectId: YOUR_PROJECT_ID,
  storageBucket: YOUR_PROJECT_STORAGE,
  messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

export default prodConfig;
```

### Install

```
git clone https://github.com/GrafSoul/IntoPoint.git
cd IntoPoint
yarn install
// or
npm install
```

### Using

```
yarn start
// or
npm start
```

### Build App

```
yarn build
// or
npm build
```

### License

© 2020 | IntoPoint Web App | [MIT licensed].

[mit licensed]: https://github.com/GrafSoul/IntoPoint/blob/master/LICENSE
