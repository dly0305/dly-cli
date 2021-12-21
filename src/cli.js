import arg from "arg";
import inquirer from "inquirer";

import pkg from '../package.json'
import { createTemplate } from './main'

export async function cli(args) {
  // 接用户输入的内容，解析格式化命令行参数
  let options = parseArgumentsIntoOptions(args);
  // 根据解析后用户输入的内容，回答版本号和创建询问列表 执行是否询问
  options = await promptForMissingOptions(options);
  if (options.operation === 'create') {
    // 根据询问后结果，执行创建模板
    await createTemplate(options);
  }
}

// 格式化用户输入的命令行参数
function parseArgumentsIntoOptions(rawArgs) {
  // arg 解析原始命令行参数，返回对象
  const args = arg({
      '--version': Boolean,
      '--git': Boolean,
      '--install': Boolean,
      '-v': '--version',
      '-g': '--git',
      '-i': '--install',

    },
    {
      argv: rawArgs.slice(2)
    })

  return {
    ...args,
    version: args['--version'] || false,
    git: args['--git'] || false,
    install: args['--install'] || false,
    operation: args._[0],  //解析用户第一个参数
    name: args._[1], // 解析用户第二个参数(传入的名称)
  };
}

// 根据解析后用户输入的内容，回答版本号和创建询问列表 执行是否询问
async function promptForMissingOptions(options) {
  let _options = { ...options };
  const { operation, name, version } = _options;
  // 根据命令执行对应的操作
  if (version) {
    // 输出当前版本号
    console.log(pkg.version)
  }

  let questions = [];
// 执行创建操作,进行创建询问列表
  if (operation === 'create') {
    questions.push({
      type: 'list', // 单选列表类型
      name: 'webpackVersion',
      message: '请选择需要创建的 webpack 脚手架版本',
      choices: ['v4', 'v5'],
      default: 'v4',
    });
    // 如果名称没有输入,提示输入名称
    if (!name) {
      questions.push({
        type: 'input',
        name: 'name',
        message: '请输入项目名称',
        default: 'first-webpack',
      });
    }
  }
  //交互提示， 进行询问
  const answer = await inquirer.prompt(questions);
  _options = {
    ..._options,
    webpackVersion: answer.webpackVersion,
    name: answer.name,
  }
  // 返回询问结果
  return _options;
}

