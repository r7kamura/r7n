# r7n

The tool that powers [r7kamura/r7kamura.com](https://github.com/r7kamura/r7kamura.com).

## Set up

Use Node.js 16 or later.

This tool was created during the Node.js 16 era, and has been verified to work with at least that version. It will likely work with future versions as well, but that cannot be guaranteed.

```
npm install
```

## Usage

### On local development

Run a server and open http://localhost:3000.

```
ARTICLES_DIRECTORY_PATHS=../r7kamura.com/articles npm run dev
```

### On publishment flow

Build static files into ./out directory.

```
npm run export
```

## Naming

```
r 7 n
^^^ ^
|   `-- Next.js
`------ r7kamura.com
```
