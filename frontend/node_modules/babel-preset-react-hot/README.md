# Babel preset for React hot module replacement and error catching

This preset will configure Babel for `react-transform-hmr` and `react-transform-catch-errors`.

This preset should only be used for development builds.

## Install

```sh
yarn add babel-preset-react-hot --dev

# or

npm install babel-preset-react-hot --save-dev
```

Configure babel via .babelrc

```

{
  "env": {
    "development": {
      "presets": ["react-hot"]
    }
  }
}

```

## Origin

This package was forked from [`babel-preset-react-hmre`](https://www.npmjs.com/package/babel-preset-react-hmre) which seemingly isn't maintained anymore and the Github repo was deleted.

As it had an outdated dependency on [`redbox-react`](https://github.com/commissure/redbox-react) in React >=15.5.0 a warning was printed about a deprecated prop types import. This package has that dependency updated and so no warning should be printed.
