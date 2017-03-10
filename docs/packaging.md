## Packaging
See [Electron Builder](https://github.com/electron-userland/electron-builder).

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```
#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)
