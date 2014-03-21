# Web Literacy Map Keys

Maps 'key' tags to strings for tagging the Web Literacy standard.

### Creating a new version

1. Only edit the file `weblitmap.json` in the `src/` directory. Make sure you update the version number.
1. `npm install`
1. Run `grunt generate` - this will create a transfiex file in `dist/`.
1. Tag your release with `npm version <version>` and `git push <remote> master --tags
1. Upload the transifex file in `dist/` to be translated

### Downloading locales and building the js with langs

1. Run `grunt build`
2. Your files will get downloaded from Transifex and `web-literacy-client.with-langs.js` will be generated. Hurray!
