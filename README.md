<div align="center">
<h1>diy-cli</h1>
   <a href="https://www.npmjs.com/package/dly-cli">
      <img src="https://img.shields.io/npm/v/dly-cli.svg" alt="npm package" />
   </a>
   <a href="https://www.npmjs.com/package/dly-cli">
      <img src="https://img.shields.io/npm/dm/dly-cli.svg" alt="npm downloads" />
   </a>
   <a href="https://www.npmjs.com/package/dly-cli">
      <img src="https://img.shields.io/npm/l/dly-cli.svg" alt="npm downloads" />
   </a>
</div>

## 介绍

`dly-cli` 是安装由我搭建的 webpack 脚手架的 cli 工具。

## 快速开始

### 安装

```shell
$ npm install dly-cli -g
```

### 创建脚手架工程

```shell
$ dly-cli create name # 根据 name 创建项目文件夹(如果不传入 name 会进行询问)
$ cd name # 进入项目根目录
$ npm dev # 以开发环境启动项目
```

`注: 会在当前终端目录下以传入的名称, 生成一个文件夹`

### 选择版本
执行了 `create` 指令后会询问要以什么 webpack 版本进行创建, 目前暂时只提供 v4 版本 webpack 脚手架


## 指令

| 指令名称              | 说明                                           |
| --------------------- | ---------------------------------------------- |
| `create <name>`       | 创建 webpack 脚手架前端工程                          |
| `-version -v`         | 查看当前版本                                   |
| `--git -g`            | 创建 webpack 脚手架前端工程, 执行初始化 `git` 操作 |
| `--install -i`        | 创建 webpack 脚手架前端工程, 使用 `npm` 安装依赖  |
