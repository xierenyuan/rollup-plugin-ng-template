# rollup-plugin-ng-template

angular1 rollup 引入模板

## 使用

```shell
 yarn add rollup-plugin-ng-template -D
```

## demo

```js
import html from 'rollup-plugin-ng-template'

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  plugins: [
    html()
  ]
}
```

## Options

```js
  {
    include: '**/*.html',
    exclude: '',
    // ng模块 默认是 ng  其他的 请先声明
    module: 'xx.tpl'
  }
```

## 最后ng1 已经是过去式了, 如果可以升级 到ng2 或者换到 vue2
