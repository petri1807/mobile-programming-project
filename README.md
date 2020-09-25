# Developer environment setup & tips

## Contents
- [VS Code extensions](#vs-code-extensions)
- [VS Code keyboard shortcuts](#vs-code-keyboard-shortcuts)
- [VS Code settings](#vs-code-settings)
- [Cloning repo](#cloning-repo)
- [Prettier](#prettier)
- [ESLint](#eslint)


## VS Code extensions
Install these extensions from VS Code extensions, links to Visual Studio Marketplace

- [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Optional for code completion and readability

- [**nativeEmmet**](https://marketplace.visualstudio.com/items?itemName=SaugatMaharjan.nativeemmet)
- [**Simple React Snippets**](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [**Bracket Pair Colorizer**](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [**Monokai Vibrant Theme**](https://marketplace.visualstudio.com/items?itemName=s3gf4ult.monokai-vibrant)

## VS Code keyboard shortcuts
Common keyboard shortcuts to boost productivity

- `Ctrl + J` Toggle integrated terminal.
- `Ctrl + B` Toggle side bar.
- `Ctrl + Shift + P` Open command palette.
- `Ctrl + P` Search or switch between opened files.
- `Ctrl + C or Ctrl + X` Copy/Cut, if you want to copy/cut the entire line you don't need to highlight all the text, just have the cursor on the line and copy/cut
- `Shift + arrow keys` Highlight text with arrow keys. Useful for enclosing something with parentheses, curly braces or brackets. Highlight the text, type the opening parentheses etc. and the highlighted text will be inside it.
- `Ctrl + Shift + K` Delete the entire line.
- `Alt + arrow up/down` Move the line your cursor is on, or a highlighted code block up/down.
- `F2` Refactoring. Want to change a variable/class/component name? Rename refactor makes it easier, rename it once and all instances of it will be automatically refactored. Should work across files if an instance is found.

Open Keyboard Shortcuts from command palette and search for
- `Emmet Balance (outward)` and add shortcut `Ctrl + Shift + arrow down`. Now you can easily duplicate the line your cursor is on or a block of highlighted code below with this shortcut.

## VS Code settings
Settings to be configured

Open settings.json file with `Ctrl + ,`, if this opens the UI settings you can open the JSON file using the command palette `Ctrl + Shift + P` and typing `settings json`, choose `Preferences: Open Settings (JSON)`

Add these into the JSON file

```
  "workbench.settings.editor": "json",
  "git.autofetch": true,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "javascript.implicitProjectConfig.checkJs": false,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  "javascript.updateImportsOnFileMove.enabled": "always",
```

## Cloning repo
How to clone the repository to your local machine inside VS Code

- Copy the repo address `https://github.com/petri1807/mobile-programming-project.git`
- Open command palette `Ctrl + Shift + P` and type `clone`. Select `Git: Clone`
- Paste the address in and hit `Enter`
- Select the folder you want to clone this repo into.
- A popup will appear asking you
> Would you like to open the cloned repository, or add it to the current workspace?
- Select Open


## Prettier
Installing and configuring prettier for this project.

Prettier is an automated code formatter, so you no longer need to think about formatting ever again. This, together with ESLint will work wonders on your code.

```npm i -D prettier```

## ESLint
Installing and configuring eslint for this project. An .eslintrc.json file has already been created for this project, but you need to install eslint and the react plugin.

A linter is basically a tool that will look for problems in your code. This will basically do what Visual Studio or Eclipse do out of the box, search for issues such as unused variables. The rules that is uses can be entirely configured, or you can use an existing one such as the [Airbnb JavaScript Style guide](https://github.com/airbnb/javascript)

```npm install -D eslint eslint-config-prettier```
```npm i -D eslint-plugin-react```

## Using git inside VS Code
General functions for faster, easier commits, pulls, merging etc.

Open the Source Control tab in the activity bar, and you will see all changes made. 

Press the `+` icon to stage changes, write a commit message and commit with `Ctrl + Enter`

![Git](/vscodegit.jpg)

Push commits from the `...` menu.
