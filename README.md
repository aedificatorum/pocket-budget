# Pocket-Budget

## Live demo
https://pocket-budget-demo.netlify.com/

## Develop
```bash
# for a fake in-memory store
npm run start:inmemory

# for firestore 
npm run start:firestore
```

You'll need to set the client-side credentials for your firebase app in `src/Components/Firebase/firebase.js`.

## Release
```bash
npm run build
```

Deploy the contents of the `build` folder, and ensure the domain is added to the Firebase auth's list of domains.

## Screenshots

### Pocket budget add form
![Pocket budget add form](docs/screenshot_add.png)

### Pocket budget overview screen
![pocket budget overview](docs/screenshot_overview.png)

### SVG icons
https://heroicons.dev/
