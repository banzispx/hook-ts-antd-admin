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
