# i18next-async-backend

[![Build](https://github.com/Widen/i18next-async-backend/actions/workflows/build.yml/badge.svg)](https://github.com/Widen/i18next-async-backend/actions/workflows/build.yml)
[![npm](https://img.shields.io/npm/v/i18next-async-backend)](https://www.npmjs.com/package/i18next-async-backend)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-blue)](https://github.com/atlassian/changesets)

i18next backend which loads resources via promises. Useful when loading
resources via dynamic imports.

## Installation

### npm

```sh
npm install i18next-async-backend
```

### Yarn

```
yarn add i18next-async-backend
```

## Usage

```js
import i18next from 'i18next'
import AsyncBackend from 'i18next-async-backend'

const resources = {
  es: () => import('./locales/es/translation.json'),
}

i18next.use(AsyncBackend).init({
  backend: { resources },
})
```

## Recipes

### Single namespace

```js
const resources = {
  en: () => import('./locales/en/translation.json'),
  es: () => import('./locales/es/translation.json'),
}
```

### Multiple namespaces

```js
const resources = {
  en: {
    common: () => import('./locales/en/common.json'),
    glossary: () => import('./locales/en/glossary.json'),
  },
  es: {
    common: () => import('./locales/es/common.json'),
    glossary: () => import('./locales/es/glossary.json'),
  },
}
```
