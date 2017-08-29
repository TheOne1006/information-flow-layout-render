# information flow layout render

1. Only fit the mobile end
2. without anything library
3. support async fetch data
4. support mock get more data

### Usage
```bash
yarn information-flow-layout-render
# or
npm install --save information-flow-layout-render
```

```js
// in js file
import InformationFlowLayoutRender from 'information-flow-layout-render'
/**
 * 创建信息流 实例
 * @param {Array} initData 初始化的数据, 在 mock状态为全部数据
 * @param {Number} nextPage 下一页的页数, (因为initData 可能为第一页)
 * @param {Number} pageShowNum 每页展示数量
 * @param {Boolean} mockRemoteLoad ture: 模拟获取远程数据, false: 使用 ajax/fetch 拉取远程数据
 * @param {Function} ajaxFetch 如果 mockRemoteLoad=false, 则必填方法, 如果 mockRemoteLoad=true 时 ajaxFetch 没有必要填写
 * ajaxFetch({ page , success, fail })
 */

const app = new InformationFlowLayoutRender({
  initData,
  nextPage,
  pageShowNum,
  mockRemoteLoad,
  ajaxFetch
});

/**
 * @param {Object} watchOptions 监听选项
 * @param {Boolean} watchOptions.scroll 是否支持滚动加载
 * @param {string} / { HTMLElement } watchOptions.dom 监听滚动的
 * @param {number} watchOptions.onEndReachedThreshold 距离底部 多少px距离 执行加载, 默认 50px
 */
const watchOptions = {
  scroll,
  dom,
  onEndReachedThreshold
}
/**
 * @param {Object} statisticOption 统计选项, 可缺省
 * @param {string} / { number } statisticOption.sxinid 标记
 * @param {number} delay 延迟 delay ms 执行跳转, 默认 100ms
 */
const statisticOption = {

}

/**
 * @param {string} / {HTMLElement} dom对象, 或者 唯一id
 * @param {Object} watchOptions 监听选项
 * @param {Object} statisticOption 监听选项
 * @param {Boolean} isLazy 惰性初始化(监听body 才能可使用)
 */
app.init(dom, watchOptions, statisticOption, isLazy)
```

```html
<!-- in html file  -->
<script type="text/javascript" src="/<path>/<to>/<dir>/information-flow-layout-render.umd.min.js">
</script>
```

data 格式
```js
// stype 布局模式
const BIG_IMG = 0    // 全文大图
const IMG_TEXT = 1   // 左侧1张图, 右侧内容
const IMGS = 2       // 多图模式

// type
const SHOW_DESC = 0       // 显示描述
const SHOW_SRC_TIME = 1   // 显示来源和日期

var data = [
  // 三图模式
  // 图片比例 - 宽高比例 3:2
  // iphone6中尺寸为 - 宽高 124px: 83.5px
  // Galaxy S5 尺寸 - 宽高 106px : 71.3px
  {
    "curl":"http://url.com",          // 跳转地址
    "title":"title",                  // 必填
    "desc":"this is a description",   // SHOW_DESC 显示描述, 必填, 否则不显示
    "images": [
      "img uri",
      "img uri",
      "img uri",
    ],
    "src":"来源",
    "time":"yy-dd",
    "stype": IMGS,
    "type": SHOW_DESC,
  },
  // 大图模式
  // 图片比例: 宽高比例 2 : 1 左右
  // iphone6中尺寸为 - 宽高 378px : 164.3px
  // Galaxy S5 尺寸 - 宽高 324px : 140.87px
  {
    "curl":"http://www.url.com",          // 跳转地址
    "title":"title",
    "desc":"this is a description",    // SHOW_SRC_TIME 非必填
    "imageUrl": "img uri",         // 只需要一张图片
    "src":"来源",   // SHOW_SRC_TIME 必填
    "time":"yy-dd", // SHOW_SRC_TIME 必填
    "stype": BIG_IMG,
    "type": SHOW_SRC_TIME,
  },
  // 左图右文
  // 图片比例: 宽高比例 3:2
  // iphone6中尺寸为 - 宽高 124px: 82.0px
  // Galaxy S5 尺寸 - 宽高 107px : 70.95px
  {
    "curl":"http://www.url.com",          // 跳转地址
    "title":"title",
    "desc":"this is a description",    // SHOW_DESC 必填
    "imageUrl": "img uri",         // 只需要一张图片
    "src":"来源",   // SHOW_DESC 非必填
    "time":"yy-dd", // SHOW_DESC 非必填
    "stype": IMG_TEXT,
    "type": SHOW_DESC,
  },
]

```



### Development

```bash
git clone https://github.com/TheOne1006/information-flow-layout-render.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

**Start coding!** `package.json` and entry files are already set up for you, so don't worry about linking to your main file, typings, etc. Just keep those files with the same names.

### Features

 - Zero-setup. After running `npm install` things will be setup for you :wink:
 - **[RollupJS](https://rollupjs.org/)** for multiple optimized bundles following the [standard convention](http://2ality.com/2017/04/setting-up-multi-platform-packages.html) and [Tree-shaking](https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/).
 - Tests, coverage and interactive watch mode using **[Jest](http://facebook.github.io/jest/)**
 - **[Prettier](https://github.com/prettier/prettier)** and **[TSLint](https://palantir.github.io/tslint/)** for code formatting and consistency.
 - **Docs automatic generation and deployment** to `gh-pages`, using **[TypeDoc](http://typedoc.org/)**
 - Automatic types `(*.d.ts)` file generation
 - **[Travis](https://travis-ci.org)** integration and **[Coveralls](https://coveralls.io/)** report
 - (Optional) **Automatic releases and changelog**, using [Semantic release](https://github.com/semantic-release/semantic-release), [Commitizen](https://github.com/commitizen/cz-cli), [Conventional changelog](https://github.com/conventional-changelog/conventional-changelog) and [Husky](https://github.com/typicode/husky) (for the git hooks)

### Excluding peerDependencies

On library development, one might want to set some peer dependencies, and thus remove those from the final bundle. You can see in [Rollup docs](https://rollupjs.org/#peer-dependencies) how to do that.

The good news is here is setup for you, you only must include the dependency name in `external` property within `rollup.config.js`. For example, if you wanna exclude `lodash`, just write there `external: ['lodash']`.

### NPM scripts

 - `npm t`: Run test suite
 - `npm start`: Runs `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generage bundles and typings, create docs
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)

### Automatic releases

If you'd like to have automatic releases with Semantic Versioning, follow these simple steps.

_**Prerequisites**: you need to create/login accounts and add your project to:_
 - npm
 - Travis
 - Coveralls

Run the following command to prepare hooks and stuff:

```bash
npm run semantic-release-prepare
```

Follow the console instructions to install semantic release run it (answer NO to "Generate travis.yml").

_Note: make sure you've setup `repository.url` in your `package.json` file_

```bash
npm install -g semantic-release-cli
semantic-release setup
# IMPORTANT!! Answer NO to "Generate travis.yml" question. Is already prepared for you :P
```

From now on, you'll need to use `npm run commit`, which is a convenient way to create conventional commits.

Automatic releases are possible thanks to [semantic release](https://github.com/semantic-release/semantic-release), which publishes your code automatically on github and npm, plus generates automatically a changelog. This setup is highly influenced by [Kent C. Dodds course on egghead.io](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)

### Git Hooks

There is already set a `precommit` hook for formatting your code with Prettier :nail_care:

By default, there are 2 disabled git hooks. They're set up when you run the `npm run semantic-release-prepare` script. They make sure:
 - You follow a [conventional commit message](https://github.com/conventional-changelog/conventional-changelog)
 - Your build is not gonna fail in [Travis](https://travis-ci.org) (or your CI server), since it's runned locally before `git push`

This makes more sense in combination with [automatic releases](#automatic-releases)

### FAQ

#### `Array.prototype.from`, `Promise`, `Map`... is undefined?

TypeScript or Babel only provides down-emits on syntactical features (`class`, `let`, `async/away`...), but not on functional features (`Array.prototype.find`, `Set`, `Promise`...), . For that, you need Polyfills, such as [`core-js`](https://github.com/zloirock/core-js) or [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) (which extends `core-js`).

For a library, `core-js` plays very nicely, since you can import just the polyfills you need:

```javascript
import "core-js/fn/array/find"
import "core-js/fn/string/includes"
import "core-js/fn/promise"
...
```

#### What is `npm install` doing the first time runned?

It runs the script `tools/init` which sets up everything for you. In short, it:
 - Configures RollupJS for the build, which creates the bundles.
 - Configures `package.json` (typings file, main file, etc)
 - Renames main src and test files

#### What if I don't want git-hooks, automatic releases or semantic-release?

Then you may want to:
 - Remove `commitmsg`, `postinstall` scripts from `package.json`. That will not use those git hooks to make sure you make a conventional commit
 - Remove `npm run semantic-release` from `.travis.yml`

#### What if I don't want to use coveralls or report my coverage?

Remove `npm run report-coverage` from `.travis.yml`
