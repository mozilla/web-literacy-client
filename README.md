# Web Literacy Client

This is a utility to map each version of the Web Literacy Map to a set of machine-readable tags.

The goal of this repository is to:

- Store *version history* for the map with [tags](https://github.com/k88hudson/weblit-keys/releases)
- Provide *localized versions* of each tag via [Transifex](https://www.transifex.com/projects/p/webmaker)
- Provide translations for deprecated tags in older versions of the map by mapping them to new literacies

### Creating a new version

1. Edit `src/weblitmap.json`. Make sure you update the version number.
1. Run `npm install`, and then `grunt generate`. This will create `dist/weblitmap_strings.{{version}}.json`, a Transifex-compatible file.
1. Commit your changes and tag your release with `npm version {{version}}`.
1. Upload `dist/weblitmap_strings.{{version}}.json` to Transifex!

### Downloading new locales

1. Run `grunt build`
2. Your files will get downloaded from Transifex and `dist/web-literacy-client.with-langs.js` will be generated. Hurray!
