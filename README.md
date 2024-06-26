# Node Typescript Starter with the set of Authentication packages with JWT and Mongo Db

<p>
  <a href="https://github.com/JuliusAgency/node-starter-with-auth-jwt-mongo/actions/workflows/ci-build.yaml" target="_blank">
    <img alt="CI build" src="https://github.com/JuliusAgency/node-starter-with-auth-jwt-mongo/actions/workflows/ci-build.yaml/badge.svg?branch=main" />
  </a>
  <a href="https://github.com/JuliusAgency/node-starter-with-auth-jwt-mongo#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/JuliusAgency/node-starter-with-auth-jwt-mongo/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/JuliusAgency/node-starter-with-auth-jwt-mongo/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

Starter nodejs typescript application.

### The project file system tree:

.  
├── .cspell.json  
├── .editorconfig  
├── .eslintrc.json  
├── .github  
│   ├── ISSUE*TEMPLATE.md  
│   └── PULL_REQUEST_TEMPLATE.md  
├── .gitignore  
├── .husky  
│   ├── *  
│   ├── pre-commit  
│   └── pre-push  
├── .prettierignore  
├── .vscode  
├── LICENSE  
├── README.md  
├── jest.config.js  
├── package-lock.json  
├── package.json  
├── src  
│   ├── index.ts  
│   ├── app-domain  
│   ├── configuration  
│   ├── core  
│   ├── db  
│   ├── initialization  
│   ├── server  
│   └── types  
│   └── example.d.ts
├── index.ts  
└── tsconfig.json

### The project infrastructure

[Typescript](http://www.typescriptlang.org/),  
[cspell](https://www.npmjs.com/package/cspell) - A CLI tool and library for spell checking code,  
[npm-run-all](https://www.npmjs.com/package/npm-run-all) - A CLI tool to run multiple npm-scripts in parallel or sequential,  
[rimraf](https://www.npmjs.com/package/rimraf) - a deep deletion module for node.  
[ESLint](https://www.npmjs.com/package/eslint) - a static code analysis tool,  
[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) - Turns off all rules that are unnecessary or might conflict with Prettier,  
[eslint-plugin-eslint-comments](https://www.npmjs.com/package/eslint-plugin-eslint-comments) - Additional ESLint rules for ESLint directive comments (e.g. //eslint-disable-line),  
[eslint-plugin-functional](https://www.npmjs.com/package/eslint-plugin-functional) - An ESLint plugin to disable mutation and promote functional programming in JavaScript and TypeScript,  
[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) - A plugin to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names,  
[prettier](https://www.npmjs.com/package/prettier) - A code formatter,  
[jest](https://www.npmjs.com/package/jest) - A testing framework,  
[ts-jest](https://www.npmjs.com/package/ts-jest) - A Jest transformer with source map support that lets to use Jest to test projects written in TypeScript,  
[husky](https://www.npmjs.com/package/husky) - a tool that allows to use Git hooks.

### Prepare a project

1. Create a folder:

```bash
mkdir <new-app-name>
cd <new-app-name>
```

2. Clone the repository, remove git folder, init the new local git repo with the branch "main":

```bash
git clone https://github.com/JuliusAgency/node-starter-with-auth-jwt-mongo.git .
rm -r .git
git init -b main
```

3. Create remote GitHub repository with the same name;
4. Push the local repository to the remote:

```bash
git remote add origin https://github.com/JuliusAgency/<new-app-name>.git
git branch -M main
git push -u origin main
```

### Prepare for installation:

For installation a @juliusagency/<package-name> you need to define installation permissions for the project:

1. create READ_FROM_REGISTRY token:

   - go to GitHub and select your settings;
   - scroll down to "Developers settings";
   - open it and choose "Personal access tokens";
   - choice "Tokens (classic)";
   - create a token named READ_FROM_REGISTRY;
   - temporarily store the token.

2. create .npmrc file in the root directory of the project with the content:

```
  @juliusagency:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=<YOUR-READ_FROM_REGISTRY-TOKEN>
  npm.pkg.github.com/:always-auth: false
```

3. Replace the placeholder by the token value;
4. Update the .gitignore - add the .npmrc.

### Installation

```bash
npm install
```

Activate Git hooks:

```bash
npm run prepare
```

    Note: After the command is executed once, the Git hooks will run automatically before each commit and push.

### Development

```bash
cd src/app-domain
```

Place Your application code here.

### Usage the commands from the command line during the development:

Linting:

```bash
npm run lint
```

Fix the linting issues:

```bash
npm run fix
```

Testing:

```bash
npm test
```

Clean build output:

```bash
npm run clean
```

Build:

```bash
npm run build
```

Prepare:

```bash
npm run prepare
```

Git client hooks:

```bash
.husky/pre-commit
.husky/pre-push
```
