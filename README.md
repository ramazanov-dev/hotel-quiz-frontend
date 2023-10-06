# Hotel quiz frontend
Frontend for my own quiz app

## Requirements

* Node.JS version 18 or greater;
* Yarn version 3 or greater;
* BASH environment. Any linux based OS or WSL or Git Bash

### If you use Microsoft VS Code

Run in terminal after all modules installed:

```shell
yarn dlx @yarnpkg/sdks vscode
```

## Features

* _tsconfig.json_ optimized for building React apps;
* ESLint included;
* Husky included. It allows passing checks before git commiting. Checks are scripted in _scripts/checks.sh_ folder;
* ESBuild is used instead of create-react-app for faster building

## How to's:

__Build__: `yarn build`. After this, _index.js_ and _index.css_ files will be in _public_ directory\
__Run in development mode__: `yarn dev`\
__Lint__: `yarn lint`

### How to prepare to development

1. Copy _src/config.example.js_ file to _src/config.js_ and fill it as you want.
2. Run `yarn prepare`
