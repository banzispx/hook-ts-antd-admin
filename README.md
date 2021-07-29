# Getting Started with Create React App

git hook ==>使用 git 钩子，在 commit 前校验代码，并格式化代码

[使用方法](https://blog.csdn.net/qq_32090185/article/details/107911593)

1、npm i husky lint-staged -D

2、在 package.json 配置如下

```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }
```

[commitLint](https://github.com/conventional-changelog/commitlint) 常用 type 类型

```
build	编译相关的修改，例如发布版本、对项目构建或者依赖的改动
chore	其他修改, 比如改变构建流程、或者增加依赖库、工具等
ci	持续集成修改
docs	文档修改
feat	新特性、新功能
fix	修改bug
perf	优化相关，比如提升性能、体验
refactor	代码重构
revert	回滚到上一个版本
style	代码格式修改, 注意不是 css 修改
test	测试用例修改
```
