# Web Literacy Map Keys

Maps 'key' tags to strings for tagging the Web Literacy standard.

### Creating a new version

1. `npm install`
1. Only edit the file `weblitmap.json` in the `latest/` directory. Make sure you update the version number.
1. Run `grunt build` - this will create a transfiex file in `latest/strings/`, as well as a folder including the version in the `archive` folder.
1. Tag your release with `npm version <version>` and `git push <remote> master --tags

### Usage
