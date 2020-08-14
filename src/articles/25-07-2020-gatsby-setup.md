---
path: "/setup-gatsby-with-typescript-tailwind-unit-test"
date: "2020-07-25"
title: "Cách blog này được tạo ra với GatsbyJS + Typescript + TailwindCSS"
featuredImage: ../images/setup-gatsby-typescript-tailwind/gatsby-featured.png
---

*GatsbyJS* là một framework dựa trên ReactJS vàn GraphQL, phù hợp để xây dựng những ứng dụng web một cách nhanh cùng với hiệu năng vượt trội. Bài viết này sẽ nói về cách mình setup một project `GatsbyJS`. Cụ thể là một template `GatsbyJS` sử dụng `Typescript`, `TailwindCSS (PostCSS)` và `Unit Testing`.

#### Cài đặt những thứ cần thiết

Trước khi bắt đầu bạn cần cài đặt

- Node.js

- Git

- Gatsby CLI

```shell
npm i -g gatsby-cli
```


#### Dùng Gatsby CLI để tạo 1 project GatsbyJS

Với Gatsby CLI, chỉ cần một câu lệnh là công việc này sẽ hoàn thành.

```shell
gatsby new gatsby-typescript-tailwindcss https://github.com/gatsbyjs/gatsby-starter-hello-world
```
 
Với câu lệnh trên, bạn sẽ tạo ra một thư mục `gatsby-typescript-tailwindcss` với `gatsby-starter-hello-world` template. Gatsby có rất nhiều template được cộng đồng xây dựng bạn có thể tìm kiếm ở [đây](https://www.gatsbyjs.org/starters/?v=2).

Mình cũng có tạo 1 template là thành quả của bài viết này nếu muốn dùng mà không muốn đọc hết thì tìm trong github của mình nhé 😘.

Quay lại, sử dụng `gatsby-starter-hello-world` bạn sẽ có một project gatsby không có bất kỳ plugin nào. Vì mục đích là để làm blog nên sau này chỉ thêm những plugin cần thiết cho việc đó thôi. Trên trang chủ của GatsbyJS bạn cũng có thể tìm được một cái template starter dùng cho viết blog đó 😋.

#### Setup Typescript

GatsbyJS hiện tại có hỗ trợ phần nào cho Typescript, chỉ cần đổi extension của file từ `.js` sang `.tsx` là được. Tuy nhiên với những file như `gatsby-config.js`, `gatsby-brower.js`, `gatsby-node.js` thì không dùng Typescirpt được nhé.

Nhớ tạo file `tsconfig.json nhé`
```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ESNext",
    "lib": ["DOM", "ESNext"],
    "jsx": "preserve",
    "esModuleInterop": true,
    "strict": true,
    "noEmit": true,
    "noUnusedLocals": false,
  },
  "exclude": [
    "node_modules",
    "public",
    ".cache",
  ]
}
```

Mình thì có dùng Alias Import của Typescript nên cần phải cài thêm `tsconfig-paths-webpack-plugin`

```shell
npm i -D tsconfig-paths-webpack-plugin
```

Sau đó, thêm vào update lại file gatsby-node.js
```javascript
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsConfigPathsPlugin()],
    },
  });
};
```

Bây giờ update lại file `tsconfig.json` để thêm alias, trong trường hợp của mình thì thêm 2 cái này
```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ESNext",
    "lib": ["DOM", "ESNext"],
    "jsx": "preserve",
    "esModuleInterop": true,
    "strict": true,
    "noEmit": true,
    "noUnusedLocals": false,
    // Thêm @components/* và @utils/*
    "baseUrl": "src",
    "paths": {
      "@utils/*": ["./utils/*"],
      "@components/*": ["./components/*"],
    }
  },
  "exclude": [
    "node_modules",
    "public",
    ".cache",
  ]
}
```

Sau khi thêm xong thì thay vì
```typescript
import Layout from '../../../components/layout.tsx';
```

thì ở bất cứ thư mục nào chỉ cần
```typescript
import Layout from '@components/layout.tsx';
```

<br>

#### Setup TailwindCSS

`TailwindCSS` là một CSS framework mà mình khá thích và dạo gần đây cũng thích style Atomic CSS. Nếu bạn không thích thì có thể dùng `styled-component`/`emotion` hay SASS tuỳ thích nhé.

Để setup `TailwindCSS` thì đầu tiên bạn phải cài PostCSS. Gatsby có sẵn `gatsby-plugin-postcss` luôn.

```shell
npm i tailwindcss gatsby-plugin-postcss cssnano autoprefixer postcss-import
```

Giải thích một chút về những thứ bạn vừa cài:

- `cssnano` là một plugin của `postcss` dùng để minified css giúp cho bundle size của bạn nhỏ hơn, đối với việc build ra static file như GatsbyJS thì bundle càng nhỏ càng tốt đúng không 😉

- `autoprefixer` là một plugin của `postcss` sẽ tự động thêm các prefix để code css của bạn chạy được trên các browser khác nhau.

- `postcss-import` là một plugin của `postcss` hỗ trợ syntax `@import`.

- `tailwindcss` nhân vật chính, thật ra nó cũng là 1 plugin của `postcss` 😬.

Đầu tiên thêm mở file `gatsby-config.js` lên thêm plugin postcss vô.

```javascript
module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
  ]
}
```

Bây giờ tạo file `tailwind.config.js` với nội dung như sau:

```javascript
module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {},
  variants: {},
  plugins: [],
};
```

Cơ bản thế này là đủ. Tuy nhiên để biết cụ thể bạn có thể làm gì trong file config này thì nên đọc document của TailwindCSS nhé. Ở đây mình có config để dùng `PurgeCSS` trên những file `.tsx`, việc này sẽ loại bỏ những utility class bạn không sử dụng ra khỏi bundle giúp nó nhỏ hơn.

Cuối cùng tạo file `postcss.config.js` nữa là xong cho TailwindCSS

```javascript
const tailwindConfig = require('./tailwind.config');

module.exports = () => ({
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(tailwindConfig),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
  ],
});
```

Về cơ bản là file này để gắn mấy cái plugin của `PostCSS` thôi. Giờ thì bạn đã sẵn sàng để sử dụng TailwindCSS rồi đó. Để bắt đầu thì hãy tạo file `src/css/style.css` với nội dung sau:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

Sau đó trong file `gatsby-browser.js`

```javascript
import './src/css/style.css';
```

#### Setup ESLint

Hiện tại TSLint đã bị deprecated nên mình sẽ dùng ESLint cho hợp thời nhé. Đầu tiên là cài những package sau:

```shell
npm i -D eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier
```

Tạo file `.eslintrc`

```json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  "overrides": [
    {
      "files": [
        "*.ts",
        "*.js",
        "*.tsx",
        "*.jsx"
      ],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
      }
    },
  ]
} 
```

Tạo file `.prettierrc`

```json
{
  "arrowParens": "avoid",
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "trailingComma": "es5",
  "printWidth": 120,
  "endOfLine": "lf"
}
```

Nếu muốn tự dộng fix lint khi save file thì hãy tạo file `.vscode/settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  }
}
```

#### Cuối cùng là Unit Test

Thật ra để làm blog thì phần này không cần thiết đâu, nhưng mà mục đích của cái template này có thể làm gì cũng được nên mình sẽ thêm phần setup unit test nữa.

Ở đây mình sẽ dùng `Jest` và `@testing-library/react`. Đầu tiên là cài đặt một số thứ:

```shell
npm i -D @babel/preset-typescript @testing-library/react jest @types/jest babel-jest identity-obj-proxy
```

File `jest-preprocess.js`

```javascript
const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
};

module.exports = require('babel-jest').createTransformer(babelOptions);
```

File `loadershim.js`

```javascript
global.___loader = {
  enqueue: jest.fn(),
};
```

File `jest.config.js`

```javascript
module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@templates/(.*)': '<rootDir>/src/templates/$1',
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
    __BASE_PATH__: ``,
  },
  testURL: 'http://localhost',
  moduleDirectories: ['node_modules', '__dirname', 'src'],
  setupFiles: [`<rootDir>/loadershim.js`],
};
```

Trong file trên thì mình sẽ dùng package `identity-obj-proxy` để mock các file css, scss... File binary thì `__mocks__/file-mock.js`

```javascript
module.exports = 'test-file-stub'; 
```

Mock thêm Gatsby nữa `__mocks__/gatsby.ts`

```typescript
import React from 'react';
const gastby = jest.requireActual('gatsby');

module.exports = {
  ...gastby,
  graphql: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(
      ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
        React.createElement('a', { ...rest, href: to })
    ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
};
```

#### Lúc làm thì mò lâu lắm, viết lại có thể sẽ có chút sai sót bữa nào rảnh sẽ test lại cái bài viết này 😵
