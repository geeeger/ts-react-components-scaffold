# ts-react-components 开发脚手架

## 使用工具

- webpack@\^4.28.0
- typescript@\^3.5.0
- storybook/react@\^5.0.11
- jest@24.7.1
- gulp@\^4.0.0


## 参考工具 (cv)

-   create-react-app
-   rc-tools
-   antd-tools

## 相关资料

+ [webpack4中文文档](https://www.webpackjs.com/concepts/)
+ [ts3中文文档,建议看官方英文](https://www.tslang.cn/docs/handbook/basic-types.html)
+ [storybook/react文档](https://storybook.js.org/docs/guides/guide-react/)
+ [storybook/addons相关，直接查看github仓库readme方便,只集成了部分addons,具体请看依赖表](https://github.com/storybookjs/storybook/tree/next/addons)
+ [jest文档](https://jestjs.io/)
+ [gulp4文档](https://www.gulpjs.com.cn/docs/)
+ [babel7中文文档](https://www.babeljs.cn/docs/)
+ [babel-loader文档](https://webpack.docschina.org/loaders/babel-loader/)
+ [eslint-config-react-app文档](https://www.npmjs.com/package/eslint-config-react-app)
+ [eslint中文文档](https://cn.eslint.org/)
+ [stylelint文档](https://stylelint.io/)
+ [@commitlint/configangular文档](https://www.npmjs.com/package/@commitlint/config-angular)
+ [husky git钩子文档](https://github.com/typicode/husky/blob/master/DOCS.md)
+ [lint-staged文档](https://github.com/okonet/lint-staged)
+ [preitter文档](https://prettier.io/docs/en/)
+ [test相关 enzyme文档](https://airbnb.io/enzyme/)
+ [test相关 @testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
+ [test相关 react-test-renderer](https://reactjs.org/docs/test-renderer.html)

## 项目相关

#### 如何修改umd包的信息

可修改scripts/rc-tools/config/webpack.base.js 的output选项

#### 如何修改无需引入的全局依赖

可增减scripts/rc-tools/config/webpack.base.js 的externals子项

#### 如何修改lib包产出

可修改tsconfig.json 可修改为产出带babelruntime的es5 commonjs模块

#### 是否允许修改该模板

允许，因为该模板本身就是拼凑的，有很多地方，工具以及任务是冗余的

#### 如何开发

将保护master分支，开发分支时从master检出，由owner检查代码后合并至master(目前没有ci，没有集成ci功能)

### Usage

安装项目依赖

```sh
npm i
```

---

使用storybook作为开发环境(启动项目、可视的)

```sh
npm run storybook
```

---

同时可再起一个testwath 对测试进行watch

```sh
npm run test:watch
```

---

构建产出

```sh
npm run build
```

---

从模板创建一个组件

```sh
npm run create -- -n TestComponent
```

#### 其他命令

按git commit生成changelog

```sh
npm run changelog
```

---

测试

```sh
npm test
```

---

对全部文件进行格式化(不区分文件类型)

```sh
npm run prettier
```

---

对源文件进行格式化（只格式化js,jsx,ts,tsx,json,md）

```
npm run prettier:source
```

---

对源文件进行eslint检查

```sh
npm run eslint
```

---

对源文件进行eslint检查并自动修复可修复项

```sh
npm run eslint:fix
```

---

对源文件样式进行检查

```sh
npm run stylelint
```

---

对源文件样式进行检查并自动修复可修复项

```sh
npm run stylelint:fix
```

---

对源文件进行typecheck

```sh
npm run typecheck
```
