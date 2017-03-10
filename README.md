<img align="right" width="350" height="255" src="https://s3-us-west-2.amazonaws.com/assets.dashboard/gifs/DashGif.gif">
# Serverless Dashboard

This project is about providing a user-friendly layer on top of the serverless CLI.

See the goals of the project [here](./docs/README.md)

## [Download App](http://bit.ly/serverless-dashboard)

## Features

- [x] Run serverless commands from GUI
- [x] Invoke functions via GUI
- [x] Setup & Manage AWS profiles
- [ ] Point and click editing
- [Add yours here!](https://github.com/serverless/dashboard/issues)

## Install and run locally

Download the latest version of the desktop app [here](http://bit.ly/serverless-dashboard)

Or install the desktop app locally

First, clone the repo via git:

```bash
git clone https://github.com/serverless/dashboard.git
```

And then install dependencies.

```bash
cd dashboard && npm install
```

## Running locally

Run these two commands __simultaneously__ in different console tabs.

```bash
npm start
npm run dev
```

Run `npm run dev` (starts webpack + hot-reloading) and `npm start` (starts electron) in separate terminal windows.

*Note: requires a node version >= 4 and an npm version >= 2.*

## File structure:

- `./app` react/redux app for UI
- `./app/desktop/main.development.js` is the electron main process file
- `./static` Static assets like images/fonts/svgs
- `./resources` Icons needed for packaging

## Module Structure

Using a [two package.json structure](https://github.com/electron-userland/electron-builder/wiki/Two-package.json-Structure).

1. If the module is native to a platform or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./app/package.json`.
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`.   See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md).
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.

## CSS Modules

Uses [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

# Prior Art

Forked from the amazing [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
